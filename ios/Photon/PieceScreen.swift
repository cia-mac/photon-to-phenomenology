import SwiftUI
import WebKit

/// One piece, full bleed. The page draws the figure; the shell supplies what a
/// browser tab cannot: haptics at the reveal, a screen that stays awake through
/// a fixation, and navigation that never leaves the device.
struct PieceScreen: View {
    let piece: Piece
    @Binding var path: [Piece]
    @ObservedObject private var narrator = Narrator.shared
    private var look: PieceLook.Look { PieceLook.of(piece.slug) }
    @State private var card: Image?
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

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
            HStack(spacing: 8) {
                ShellButton(symbol: "chevron.left", label: "All experiments", look: look) { path.removeAll() }
                Spacer()
                if let card {
                    ShareLink(item: card, preview: SharePreview(piece.shortTitle, image: card)) {
                        DiscLabel(symbol: "square.and.arrow.up", look: look)
                    }
                    .buttonStyle(DiscPress(reduceMotion: reduceMotion))
                    .accessibilityLabel("Share this illusion")
                    .accessibilityIdentifier("share-card")
                }
                ShellButton(symbol: narrator.muted ? "speaker.slash" : "speaker.wave.2",
                            label: narrator.muted ? "Turn narration on" : "Mute narration", look: look) { narrator.toggleMute() }
                if let prev = Catalog.neighbour(of: piece, offset: -1), prev != piece {
                    ShellButton(symbol: "arrow.left", label: "Previous: \(prev.title)", look: look) { path = [prev] }
                }
                if let next = Catalog.neighbour(of: piece, offset: 1), next != piece {
                    ShellButton(symbol: "arrow.right", label: "Next: \(next.title)", look: look) { path = [next] }
                }
            }
            .padding(.horizontal, 22)   // the discs sit on the same margin as the page text
            .padding(.top, 6)
        }
        .toolbar(.hidden, for: .navigationBar)
        .statusBarHidden(true)
        .persistentSystemOverlays(.hidden)
        .onDisappear { UIApplication.shared.isIdleTimerDisabled = false }
        .task(id: piece.slug) { card = ShareCard.render(piece) }
    }
}

extension PieceScreen {
    static var topInset: CGFloat {
        (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.keyWindow?.safeAreaInsets.top ?? 59
    }
}

/// The accent of a piece's chrome, mirrored in chrome_app.css. Pieces where color, lightness or
/// adaptation is the subject keep a neutral charcoal, so nothing saturated sits beside them.
enum PieceLook {
    struct Look { let fill: Color; let glyph: Color }
    static let neutral = Look(fill: Color(red: 0x26 / 255.0, green: 0x23 / 255.0, blue: 0x1f / 255.0), glyph: Color(red: 0xf4 / 255.0, green: 0xef / 255.0, blue: 0xe4 / 255.0))

    static func of(_ slug: String) -> Look {
        switch slug {
        case "kanizsa", "gestalt-grouping": return Look(fill: Poster.blue, glyph: Poster.paper)
        case "scintillating-grid", "ponzo": return Look(fill: Poster.red, glyph: Poster.ink)
        case "cafe-wall", "apparent-motion": return Look(fill: Poster.green, glyph: Poster.paper)
        case "muller-lyer", "receptive-field", "motion-aftereffect": return Look(fill: Poster.pink, glyph: Poster.ink)
        case "aperture-problem": return Look(fill: Poster.purple, glyph: Poster.paper)
        case "ebbinghaus", "inverse-problem": return Look(fill: Poster.gray, glyph: Poster.ink)
        default: return neutral
        }
    }
}

private struct ShellButton: View {
    let symbol: String
    let label: String
    let look: PieceLook.Look
    let action: () -> Void
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        Button(action: action) { DiscLabel(symbol: symbol, look: look) }
            .buttonStyle(DiscPress(reduceMotion: reduceMotion))
            .accessibilityLabel(label)
    }
}

private struct DiscLabel: View {
    let symbol: String
    let look: PieceLook.Look

    var body: some View {
        Image(systemName: symbol)
            .font(.system(size: 16, weight: .semibold))
            .foregroundStyle(look.glyph)
            .frame(width: 44, height: 44)
            .background(look.fill, in: Circle())
            .contentShape(Circle())
    }
}

/// The picture a person shares: one illusion on its module, in the library's look, 1080 by 1350.
/// It shows the piece's still from the library, not a stimulus: a still cannot carry the effect,
/// so the card asks the question and the app answers it.
struct ShareCard: View {
    let piece: Piece
    private var field: Poster.Field? { Poster.fields[piece.slug] }

    @MainActor static func render(_ piece: Piece) -> Image? {
        let renderer = ImageRenderer(content: ShareCard(piece: piece))
        renderer.scale = 1
        guard let ui = renderer.uiImage else { return nil }
        #if DEBUG
        if UserDefaults.standard.bool(forKey: "dumpShare"), let png = ui.pngData() {
            let url = FileManager.default.temporaryDirectory.appendingPathComponent("share-\(piece.slug).png")
            try? png.write(to: url)
            NSLog("PHOTON-SHARE %@", url.path)
        }
        #endif
        return Image(uiImage: ui)
    }

    private func mono(_ size: CGFloat) -> Font { .system(size: size, weight: .semibold, design: .monospaced) }

    /// The hook leads: the one-line claim is the headline, the name of the effect sits small above it.
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("CIAMAC’S OPTICAL ILLUSIONS").font(mono(26)).tracking(5)
                Spacer()
                Text(piece.number).font(mono(26)).tracking(3)
            }
            .foregroundStyle(Poster.ink.opacity(0.62))
            .padding(.bottom, 40)

            ZStack {
                (field?.ground ?? Poster.ink)
                figure
                    .aspectRatio(1.5, contentMode: .fit)
                    .padding(.horizontal, 70)
                    .padding(.vertical, 56)
            }
            .frame(height: 700)
            .clipShape(Poster.module)

            Text(piece.shortTitle.uppercased())
                .font(mono(30)).tracking(6)
                .foregroundStyle(Poster.ink.opacity(0.62))
                .padding(.top, 52)
            Text(piece.line)
                .font(.custom("HelveticaNeue-Bold", fixedSize: 110))
                .tracking(-4.4)
                .lineSpacing(-6)
                .lineLimit(3)
                .minimumScaleFactor(0.6)
                .foregroundStyle(Poster.ink)
                .padding(.top, 18)

            Spacer(minLength: 0)
            Text("VISION IS CONSTRUCTION, NOT RECORDING.")
                .font(mono(24)).tracking(4)
                .foregroundStyle(Poster.ink.opacity(0.62))
        }
        .padding(64)
        .frame(width: 1080, height: 1350, alignment: .topLeading)
        .background(Poster.paper)
    }

    @ViewBuilder private var figure: some View {
        let image = Image("preview-" + piece.slug).resizable()
        if let field {
            // As on the library tile: the still prints in one color on the module.
            field.mark.mask { ZStack { ForEach(0..<3, id: \.self) { _ in image.grayscale(1).brightness(-0.07).luminanceToAlpha() } } }
        } else {
            image.clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
        }
    }
}

/// A disc gives under the finger, as the library's modules do.
private struct DiscPress: ButtonStyle {
    let reduceMotion: Bool
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed && !reduceMotion ? 0.9 : 1)
            .opacity(configuration.isPressed && reduceMotion ? 0.7 : 1)
            .animation(reduceMotion ? nil : .spring(response: 0.25, dampingFraction: 0.55), value: configuration.isPressed)
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
