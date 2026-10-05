import SwiftUI
import WebKit

/// One piece, full bleed. The page draws the figure; the shell supplies what a
/// browser tab cannot: haptics at the reveal, a screen that stays awake through
/// a fixation, and navigation that never leaves the device.
struct PieceScreen: View {
    let piece: Piece
    @Binding var path: [Piece]
    @ObservedObject private var narrator = Narrator.shared

    var body: some View {
        ZStack(alignment: .topLeading) {
            Register.ink.ignoresSafeArea()
            PieceWebView(piece: piece)
                .id(piece.slug)   // a new piece is a new web view; without this the old page stays up
                .ignoresSafeArea()
            if piece.scrolls {
                // content scrolls under the native buttons: hide it behind a solid band that ends
                // where the page's own content begins (its --shell-top), so nothing shows through
                let h = Self.topInset + 62
                VStack(spacing: 0) {
                    LinearGradient(stops: [.init(color: Register.ink, location: 0),
                                           .init(color: Register.ink, location: (h - 8) / h),
                                           .init(color: Register.ink.opacity(0), location: 1)],
                                   startPoint: .top, endPoint: .bottom)
                        .frame(height: h)
                    Spacer(minLength: 0)
                }
                .ignoresSafeArea()
                .allowsHitTesting(false)
            }
            HStack(spacing: 10) {
                ShellButton(symbol: "chevron.left", label: "All phenomena") { path.removeAll() }
                Spacer()
                ShellButton(symbol: narrator.muted ? "speaker.slash" : "speaker.wave.2",
                            label: narrator.muted ? "Turn narration on" : "Mute narration") { narrator.toggleMute() }
                if let prev = Catalog.neighbour(of: piece, offset: -1), prev != piece {
                    ShellButton(symbol: "arrow.left", label: "Previous: \(prev.title)") { path = [prev] }
                }
                if let next = Catalog.neighbour(of: piece, offset: 1), next != piece {
                    ShellButton(symbol: "arrow.right", label: "Next: \(next.title)") { path = [next] }
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 6)
        }
        .toolbar(.hidden, for: .navigationBar)
        .statusBarHidden(true)
        .persistentSystemOverlays(.hidden)
        .onDisappear { UIApplication.shared.isIdleTimerDisabled = false }
    }
}

extension PieceScreen {
    static var topInset: CGFloat {
        (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.keyWindow?.safeAreaInsets.top ?? 59
    }
}

private struct ShellButton: View {
    let symbol: String
    let label: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: symbol)
                .font(.system(size: 15, weight: .regular))
                .foregroundStyle(Register.cream.opacity(0.8))
                .frame(width: 44, height: 44)
                .background(Circle().fill(Color(red: 18 / 255, green: 16 / 255, blue: 13 / 255).opacity(0.62)))
                .overlay(Circle().stroke(Register.cream.opacity(0.18), lineWidth: 1))
        }
        .accessibilityLabel(label)
    }
}

struct PieceWebView: UIViewRepresentable {
    let piece: Piece

    func makeCoordinator() -> Bridge { Bridge() }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.userContentController.add(context.coordinator, name: "photon")
        config.allowsInlineMediaPlayback = true
        let web = WKWebView(frame: .zero, configuration: config)
        web.navigationDelegate = context.coordinator
        web.isOpaque = false
        web.backgroundColor = UIColor(Register.ink)
        web.scrollView.backgroundColor = UIColor(Register.ink)
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.scrollView.bounces = false
        web.allowsLinkPreview = false
        Narrator.shared.web = web
        #if DEBUG
        web.isInspectable = true
        #endif
        web.loadFileURL(Catalog.fileURL(for: piece), allowingReadAccessTo: Catalog.piecesDir)
        return web
    }

    func updateUIView(_ web: WKWebView, context: Context) {}

    static func dismantleUIView(_ web: WKWebView, coordinator: Bridge) {
        web.configuration.userContentController.removeScriptMessageHandler(forName: "photon")
        UIApplication.shared.isIdleTimerDisabled = false
        Narrator.shared.stop()
        if Narrator.shared.web === web { Narrator.shared.web = nil }
    }

    /// Messages from a piece: {t:"haptic", k:"reveal"|"tick"} and {t:"hold", on:Bool}.
    final class Bridge: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
        private let reveal = UINotificationFeedbackGenerator()
        private let tick = UIImpactFeedbackGenerator(style: .light)

        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let body = message.body as? [String: Any], let type = body["t"] as? String else { return }
            #if DEBUG
            NSLog("PHOTON-BRIDGE %@", "\(body)")   // test hook: lets a script read what the page sent
            #endif
            switch type {
            case "haptic":
                if (body["k"] as? String) == "tick" { tick.impactOccurred() } else { reveal.notificationOccurred(.success) }
            case "hold":
                UIApplication.shared.isIdleTimerDisabled = (body["on"] as? Bool) ?? false
            case "say":
                if let id = body["id"] as? String, let text = body["text"] as? String,
                   id.range(of: "^[a-z0-9-]+$", options: .regularExpression) != nil {
                    Task { @MainActor in Narrator.shared.say(id: id, text: text) }
                }
            case "stopsay":
                Task { @MainActor in Narrator.shared.stop() }
            default:
                break
            }
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            Task { @MainActor in Narrator.shared.pushState() }
            #if DEBUG
            guard UserDefaults.standard.bool(forKey: "skipGuide") else { return }   // test hook: -skipGuide YES
            let after = UserDefaults.standard.double(forKey: "skipGuideAfter")      // test hook: let the guide play out first
            DispatchQueue.main.asyncAfter(deadline: .now() + (after > 0 ? after : 3.5)) {
                webView.evaluateJavaScript("var w=document.getElementById('walk'), b=document.getElementById('wskip'); if(w && b && w.classList.contains('on')) b.click();")
            }
            #endif
        }

        /// The bundle is the whole world: a piece may load itself and nothing else.
        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            decisionHandler(action.request.url?.isFileURL == true ? .allow : .cancel)
        }
    }
}
