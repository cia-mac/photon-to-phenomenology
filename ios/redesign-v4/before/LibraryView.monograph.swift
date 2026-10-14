import SwiftUI

private enum LibraryStyle {
    // The same warm ground and paper as the full experiments.
    static let ground = Register.ink
    static let paper = Register.cream
    static let muted = Color(red: 0.65, green: 0.63, blue: 0.59)
    static let rule = Register.cream.opacity(0.16)
    static let accent = Color.accentColor   // Caspian, from the asset catalog

    /// One sans and one mono throughout. Both follow Dynamic Type.
    static func sans(_ size: CGFloat, _ style: Font.TextStyle, medium: Bool = false) -> Font {
        .custom(medium ? "HelveticaNeue-Medium" : "HelveticaNeue", size: size, relativeTo: style)
    }
    static let label = Font.system(.caption2, design: .monospaced).weight(.medium)
}

/// A hairline, the only ornament on the page.
private struct Rule: View {
    var body: some View {
        Rectangle().fill(LibraryStyle.rule).frame(height: 1).accessibilityHidden(true)
    }
}

struct LibraryView: View {
    @State private var path: [Piece] = []
    @State private var selectedSection = "All"
    @State private var turned = false
    @Environment(\.dynamicTypeSize) private var typeSize
    @Environment(\.horizontalSizeClass) private var sizeClass
    @ScaledMetric(relativeTo: .largeTitle) private var titleSize = 38

    private var visiblePieces: [Piece] {
        Catalog.pieces.filter { selectedSection == "All" || $0.section == selectedSection }
    }

    var body: some View {
        NavigationStack(path: $path) {
            ScrollViewReader { reader in
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 0, pinnedViews: [.sectionHeaders]) {
                        introduction
                            .padding(.top, 26)
                            .padding(.bottom, 26)
                        if let piece = Catalog.pieces.first(where: { $0.slug == "kanizsa" }) {
                            featuredIllusion(piece)
                                .padding(.bottom, 24)
                        }
                        Section {
                            LazyVGrid(columns: columns, alignment: .leading, spacing: 26) {
                                ForEach(visiblePieces) { piece in
                                    NavigationLink(value: piece) { IllusionCard(piece: piece, number: number(of: piece)) }
                                        .buttonStyle(.plain)
                                        .accessibilityIdentifier("piece-" + piece.slug)
                                }
                            }
                            .padding(.top, 20)
                            .padding(.bottom, 36)
                        } header: {
                            collectionHeader
                                .id("collection")
                        }
                        colophon
                            .padding(.bottom, 28)
                    }
                    .padding(.horizontal, 22)
                    .frame(maxWidth: 860, alignment: .leading)
                    .frame(maxWidth: .infinity)
                }
                .onChange(of: selectedSection) { _, _ in
                    // Keep the filters and the first results together, including when
                    // switching from the bottom of a long collection to a short one.
                    reader.scrollTo("collection", anchor: .top)
                }
            }
            .background(LibraryStyle.ground.ignoresSafeArea())
            // Scrolled content must not show through behind the clock and the pinned filters.
            .overlay(alignment: .top) {
                GeometryReader { geo in
                    LibraryStyle.ground
                        .frame(height: geo.safeAreaInsets.top)
                        .offset(y: -geo.safeAreaInsets.top)
                }
                .allowsHitTesting(false)
                .accessibilityHidden(true)
            }
            .toolbar(.hidden, for: .navigationBar)
            .navigationDestination(for: Piece.self) { piece in
                PieceScreen(piece: piece, path: $path)
            }
            #if DEBUG
            .onAppear {
                if path.isEmpty, let slug = UserDefaults.standard.string(forKey: "piece"),
                   let piece = Catalog.pieces.first(where: { $0.slug == slug }) { path = [piece] }
            }
            #endif
        }
        .tint(LibraryStyle.accent)
    }

    private var columns: [GridItem] {
        // Large text gets room to wrap instead of being squeezed into narrow cards.
        if typeSize >= .xxLarge { return [GridItem(.flexible())] }
        if sizeClass == .regular {
            return Array(repeating: GridItem(.flexible(), spacing: 18, alignment: .top), count: 3)
        }
        return [GridItem(.adaptive(minimum: 145, maximum: 270), spacing: 14, alignment: .top)]
    }

    private func number(of piece: Piece) -> String {
        String(format: "%02d", (Catalog.pieces.firstIndex(of: piece) ?? 0) + 1)
    }

    private var introduction: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("CIAMAC’S")
                .font(LibraryStyle.label)
                .tracking(2.8)
                .foregroundStyle(LibraryStyle.muted)
            Text("Optical Illusions")
                .font(.custom("HelveticaNeue-Medium", fixedSize: titleSize))
                .tracking(-titleSize * 0.028)
                .foregroundStyle(LibraryStyle.paper)
                .fixedSize(horizontal: false, vertical: true)
                .accessibilityAddTraits(.isHeader)
                .padding(.top, 10)
            Text("Small experiments. Unreliable eyes.")
                .font(LibraryStyle.sans(16, .subheadline))
                .foregroundStyle(LibraryStyle.muted)
                .fixedSize(horizontal: false, vertical: true)
                .padding(.top, 6)
        }
    }

    private var colophon: some View {
        VStack(alignment: .leading, spacing: 0) {
            Rule()
            Text("Vision is construction, not recording.")
                .font(LibraryStyle.sans(13, .footnote))
                .foregroundStyle(LibraryStyle.muted)
                .fixedSize(horizontal: false, vertical: true)
                .padding(.top, 14)
            Link(destination: URL(string: "https://photon.ciamac.com/privacy")!) {
                Label("Privacy & support", systemImage: "arrow.up.right")
                    .font(LibraryStyle.sans(13, .footnote))
                    .foregroundStyle(LibraryStyle.paper)
                    .frame(minHeight: 44, alignment: .leading)
            }
            .accessibilityHint("Opens the privacy policy and contact information in your browser")
        }
    }

    private func featuredIllusion(_ piece: Piece) -> some View {
        VStack(spacing: 0) {
            Rule()
            HStack {
                Text("TRY THIS")
                    .font(LibraryStyle.label)
                    .tracking(1.8)
                Spacer()
                Text(turned ? "NOTCHES TURNED" : "NOTCHES ALIGNED")
                    .font(LibraryStyle.label)
                    .tracking(1.8)
                    .accessibilityHidden(true)
            }
            .foregroundStyle(LibraryStyle.muted)
            .padding(.top, 12)

            if sizeClass == .regular && !typeSize.isAccessibilitySize {
                HStack(alignment: .center, spacing: 28) {
                    KanizsaPreview(turned: turned)
                        .frame(width: 320, height: 220)
                        .accessibilityHidden(true)
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Is there a triangle?")
                            .font(LibraryStyle.sans(24, .title2, medium: true))
                            .foregroundStyle(LibraryStyle.paper)
                        Text(turned ? "Only the three discs changed. Your mind supplied the edges." : "Three notched discs. The edges you see are supplied by your mind.")
                            .font(LibraryStyle.sans(15, .subheadline))
                            .foregroundStyle(LibraryStyle.muted)
                            .fixedSize(horizontal: false, vertical: true)
                        revealButton
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(.vertical, 10)
            } else {
                Button { turned.toggle() } label: {
                    VStack(alignment: .leading, spacing: 0) {
                        KanizsaPreview(turned: turned)
                            .frame(height: 168)
                            .frame(maxWidth: .infinity)
                            .accessibilityHidden(true)
                        Text("Is there a triangle?")
                            .font(LibraryStyle.sans(21, .title3, medium: true))
                            .foregroundStyle(LibraryStyle.paper)
                        Text(turned ? "Tap to bring it back." : "Tap the shapes to break the illusion.")
                            .font(LibraryStyle.sans(14, .footnote))
                            .foregroundStyle(LibraryStyle.muted)
                            .padding(.top, 5)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .padding(.top, 6)
                    .padding(.bottom, 18)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityIdentifier("triangle-reveal")
                .accessibilityLabel("Is there a triangle?")
                .accessibilityValue(turned ? "Notches turned away. Three separate discs." : "Notches aligned. An implied triangle.")
                .accessibilityHint(turned ? "Double-tap to align the notches." : "Double-tap to turn the notches away from the center.")
            }
            Rule()
            NavigationLink(value: piece) {
                HStack {
                    Text("Explore illusory contours")
                        .font(LibraryStyle.sans(14, .footnote, medium: true))
                    Spacer(minLength: 12)
                    Image(systemName: "arrow.right").font(.footnote)
                }
                .foregroundStyle(LibraryStyle.paper)
                .padding(.vertical, 6)
                .frame(minHeight: 46)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityIdentifier("featured-experiment")
        }
        .overlay(alignment: .bottom) { Rule() }
    }

    private var revealButton: some View {
        Button { turned.toggle() } label: {
            Text(turned ? "Bring the triangle back" : "Turn the shapes")
                .font(LibraryStyle.sans(15, .subheadline, medium: true))
                .foregroundStyle(LibraryStyle.paper)
                .padding(.horizontal, 18)
                .frame(minHeight: 44)
                .overlay(Rectangle().stroke(LibraryStyle.paper.opacity(0.45), lineWidth: 1))
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityIdentifier("triangle-reveal")
        .accessibilityValue(turned ? "Notches turned away. Three separate discs." : "Notches aligned. An implied triangle.")
    }

    private var collectionHeader: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .firstTextBaseline) {
                Text("Explore")
                    .textCase(.uppercase)
                    .font(LibraryStyle.label)
                    .tracking(1.8)
                    .foregroundStyle(LibraryStyle.muted)
                    .accessibilityAddTraits(.isHeader)
                Spacer()
                Text("\(visiblePieces.count) experiments")
                    .textCase(.uppercase)
                    .font(LibraryStyle.label)
                    .tracking(1.8)
                    .foregroundStyle(LibraryStyle.muted)
                    .accessibilityIdentifier("experiment-count")
            }
            .padding(.top, 14)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 24) {
                    ForEach(["All"] + Catalog.sections.map(\.name), id: \.self) { section in
                        Button { selectedSection = section } label: {
                            Text(section)
                                .font(LibraryStyle.sans(16, .subheadline, medium: true))
                                .foregroundStyle(selectedSection == section ? LibraryStyle.paper : LibraryStyle.muted)
                                .frame(minWidth: 44, minHeight: 44)
                                .overlay(alignment: .bottom) {
                                    Rectangle()
                                        .fill(selectedSection == section ? LibraryStyle.accent : .clear)
                                        .frame(height: 2)
                                }
                                .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                        .accessibilityIdentifier("filter-" + section)
                        .accessibilityAddTraits(selectedSection == section ? .isSelected : [])
                    }
                }
            }
        }
        .overlay(alignment: .bottom) { Rule() }
        .background(LibraryStyle.ground)
    }
}

private struct IllusionCard: View {
    let piece: Piece
    let number: String

    private var title: String {
        guard piece.title.hasPrefix("The ") else { return piece.title }
        let short = String(piece.title.dropFirst(4))
        return short.prefix(1).uppercased() + short.dropFirst()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(number)
                .font(LibraryStyle.label)
                .tracking(1.2)
                .foregroundStyle(LibraryStyle.muted)
            Image("preview-" + piece.slug)
                .resizable()
                .aspectRatio(1.5, contentMode: .fit)
                .padding(.top, 4)
                .padding(.bottom, 10)
                .accessibilityHidden(true)
            Rule()
            Text(title)
                .font(LibraryStyle.sans(15, .subheadline, medium: true))
                .foregroundStyle(LibraryStyle.paper)
                .fixedSize(horizontal: false, vertical: true)
                .padding(.top, 9)
            Text(piece.line)
                .font(LibraryStyle.sans(13, .footnote))
                .foregroundStyle(LibraryStyle.muted)
                .lineSpacing(2)
                .fixedSize(horizontal: false, vertical: true)
                .padding(.top, 3)
        }
        .frame(maxWidth: .infinity, alignment: .topLeading)
        .contentShape(Rectangle())
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(piece.title). \(piece.line)")
        .accessibilityHint("Opens the experiment")
    }
}

/// Exactly three notched discs. No triangle, edge, or overlaid surface is drawn.
/// The vertices are equilateral at every screen width; tapping turns the notches.
private struct KanizsaPreview: View {
    let turned: Bool

    var body: some View {
        Canvas { context, size in
            let center = CGPoint(x: size.width / 2, y: size.height * 0.54)
            let orbit = min(size.height * 0.34, size.width * 0.25)
            let radius = orbit * 0.48
            for i in 0..<3 {
                let angle = -Double.pi / 2 + Double(i) * 2 * .pi / 3
                let vertex = CGPoint(x: center.x + cos(angle) * orbit, y: center.y + sin(angle) * orbit)
                let direction = atan2(center.y - vertex.y, center.x - vertex.x) + (turned ? .pi * 0.6 : 0)
                var disc = Path()
                disc.move(to: vertex)
                disc.addArc(center: vertex, radius: radius,
                            startAngle: .radians(direction + .pi / 6),
                            endAngle: .radians(direction + 11 * .pi / 6), clockwise: false)
                disc.closeSubpath()
                context.fill(disc, with: .color(LibraryStyle.paper))
            }
        }
        .allowsHitTesting(false)
    }
}
