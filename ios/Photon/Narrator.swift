import AVFoundation
import SwiftUI
import WebKit

/// Spoken narration for the pieces. A page asks to say a line; this speaks it unless muted, and tells the
/// page when the line has finished so the guide can wait for the voice.
///
/// A recorded file Pieces/audio/<id>.m4a, if the app carries one, is played in place of the system voice.
/// That is how a chosen voice replaces speech later without touching any page.
@MainActor
final class Narrator: NSObject, ObservableObject, AVSpeechSynthesizerDelegate, AVAudioPlayerDelegate {
    static let shared = Narrator()

    @Published private(set) var muted: Bool
    weak var web: WKWebView?

    private let synth = AVSpeechSynthesizer()
    private var player: AVAudioPlayer?
    private var currentID: String?
    private lazy var voice: AVSpeechSynthesisVoice? = Narrator.bestVoice()
    private static let key = "narrationMuted"

    override init() {
        // First launch: if VoiceOver is already reading the screen aloud, start muted so two voices never talk over each other.
        if UserDefaults.standard.object(forKey: Narrator.key) == nil {
            muted = UIAccessibility.isVoiceOverRunning
        } else {
            muted = UserDefaults.standard.bool(forKey: Narrator.key)
        }
        super.init()
        synth.delegate = self
    }

    func say(id: String, text: String) {
        stop()
        guard !muted, !text.isEmpty else { return }
        currentID = id
        activateSession()
        #if DEBUG
        NSLog("NARRATOR say %@", id)
        #endif
        if let url = Bundle.main.url(forResource: id, withExtension: "m4a", subdirectory: "Pieces/audio"),
           let p = try? AVAudioPlayer(contentsOf: url) {
            player = p
            p.delegate = self
            p.play()
            return
        }
        let u = AVSpeechUtterance(string: text)
        u.voice = voice
        u.rate = AVSpeechUtteranceDefaultSpeechRate * 0.94
        u.pitchMultiplier = 1.04
        synth.speak(u)
    }

    func stop() {
        if synth.isSpeaking { synth.stopSpeaking(at: .immediate) }
        player?.stop()
        player = nil
        currentID = nil
    }

    func toggleMute() {
        muted.toggle()
        UserDefaults.standard.set(muted, forKey: Narrator.key)
        if muted { stop() }
        pushState()
    }

    /// Tell the page whether narration is on. Called after the page loads and whenever the button is pressed.
    func pushState() {
        web?.evaluateJavaScript("window.PhotonApp && PhotonApp._voice && PhotonApp._voice(\(muted ? "false" : "true"))")
    }

    // MARK: finished

    nonisolated func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        Task { @MainActor in self.finished() }
    }

    nonisolated func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        Task { @MainActor in self.finished() }
    }

    private func finished() {
        guard let id = currentID else { return }
        currentID = nil
        #if DEBUG
        NSLog("NARRATOR done %@", id)
        #endif
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
        web?.evaluateJavaScript("window.PhotonApp && PhotonApp._done && PhotonApp._done('\(id)')")
    }

    // MARK: voice and session

    private func activateSession() {
        let s = AVAudioSession.sharedInstance()
        try? s.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
        try? s.setActive(true)
    }

    /// The best installed English voice: premium, then enhanced, then the standard one.
    private static func bestVoice() -> AVSpeechSynthesisVoice? {
        let lang = AVSpeechSynthesisVoice.currentLanguageCode()
        let prefix = lang.hasPrefix("en") ? String(lang.prefix(2)) : "en"
        let voices = AVSpeechSynthesisVoice.speechVoices().filter { $0.language.hasPrefix(prefix) }
        let ranked = voices.sorted { ($0.quality.rawValue, $1.name) > ($1.quality.rawValue, $0.name) }
        return ranked.first ?? AVSpeechSynthesisVoice(language: lang)
    }
}
