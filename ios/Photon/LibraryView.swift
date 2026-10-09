import SwiftUI

private enum LibraryStyle {
    // The same warm ground and paper as the full experiments.
    static let ground = Register.ink
    static let paper = Register.cream
    static let panel = Color(red: 0.085, green: 0.08, blue: 0.07)
    static let muted = Color(red: 0.65, green: 0.63, blue: 0.59)
    static let accent = Color(red: 0.80, green: 0.91, blue: 0.44)
}

struct LibraryView: View {
    @State private var path: [Piece] = []
    @State private var selectedSection = "All"
    @State private var turned = false
    @Environment(\.dynamicTypeSize) private var typeSize
    @Environment(\.horizontalSizeClass) private var sizeClass
    @ScaledMetric(relativeTo: .largeTitle) private var titleSize = 32

    private var visiblePieces: [Piece] {
        Catalog.pieces.filter { selectedSection == "All" || $0.section == selectedSection }
    }

    var body: some View {
        NavigationStack(path: $path) {
            ScrollViewReader { reader in
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 0, pinnedViews: [.sectionHeaders]) {
                        introduction
                            .padding(.top, 18)
                            .padding(.bottom, 22)
                        if let piece = Catalog.pieces.first(where: { $0.slug == "kanizsa" }) {
                            featuredIllusion(piece)
                                .padding(.bottom, 24)
                        }
                        Section {
                            LazyVGrid(columns: columns, alignment: .leading, spacing: 24) {
                                ForEach(visiblePieces) { piece in
                                    NavigationLink(value: piece) { IllusionCard(piece: piece) }
                                        .buttonStyle(.plain)
                                        .accessibilityIdentifier("piece-" + piece.slug)
                                }
                            }
                            .padding(.top, 12)
                            .padding(.bottom, 28)
                        } header: {
                            collectionHeader
                                .id("collection")
                        }
                        Text("Vision is construction, not recording.")
                            .font(.system(.footnote, design: .serif))
                            .foregroundStyle(LibraryStyle.muted)
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

    private var introduction: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("CIAMAC’S")
                .font(.system(.caption2, design: .monospaced).weight(.medium))
                .tracking(2.8)
                .foregroundStyle(LibraryStyle.accent)
            Text("Optical Illusions")
                .font(.system(size: titleSize, weight: .regular, design: .serif))
                .foregroundStyle(LibraryStyle.paper)
                .fixedSize(horizontal: false, vertical: true)
                .accessibilityAddTraits(.isHeader)
            Text("Small experiments. Unreliable eyes.")
                .font(.subheadline)
                .foregroundStyle(LibraryStyle.muted)
                .fixedSize(horizontal: false, vertical: true)
            Link(destination: URL(string: "https://photon.ciamac.com/privacy")!) {
                Label("Privacy & support", systemImage: "arrow.up.right")
                    .font(.footnote)
                    .foregroundStyle(LibraryStyle.paper)
                    .frame(minHeight: 44, alignment: .leading)
            }
            .accessibilityHint("Opens the privacy policy and contact information in your browser")
        }
    }

    private func featuredIllusion(_ piece: Piece) -> some View {
        VStack(spacing: 0) {
            HStack {
                Text("TRY THIS")
                    .font(.system(.caption2, design: .monospaced).weight(.medium))
                    .tracking(1.5)
                Spacer()
                Image(systemName: "arrow.triangle.2.circlepath")
                    .font(.subheadline)
            }
            .foregroundStyle(LibraryStyle.accent)
            .padding(.horizontal, 18)
            .padding(.top, 18)

            if sizeClass == .regular && !typeSize.isAccessibilitySize {
                HStack(alignment: .center, spacing: 28) {
                    KanizsaPreview(turned: turned)
                        .frame(width: 320, height: 220)
                        .accessibilityHidden(true)
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Is there a triangle?")
                            .font(.system(.title2, design: .serif))
                            .foregroundStyle(LibraryStyle.paper)
                        Text(turned ? "Only the three discs changed. Your mind supplied the edges." : "Three notched discs. The edges you see are supplied by your mind.")
                            .font(.subheadline)
                            .foregroundStyle(LibraryStyle.muted)
                            .fixedSize(horizontal: false, vertical: true)
                        revealButton
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(.horizontal, 24)
                .padding(.vertical, 10)
            } else {
                Button { turned.toggle() } label: {
                    VStack(alignment: .leading, spacing: 0) {
                        KanizsaPreview(turned: turned)
                            .frame(height: 150)
                            .frame(maxWidth: .infinity)
                            .accessibilityHidden(true)
                        Text("Is there a triangle?")
                            .font(.system(.title3, design: .serif))
                            .foregroundStyle(LibraryStyle.paper)
                        Text(turned ? "Tap to bring it back." : "Tap the shapes to break the illusion.")
                            .font(.footnote)
                            .foregroundStyle(LibraryStyle.muted)
                            .padding(.top, 5)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .padding(18)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityIdentifier("triangle-reveal")
                .accessibilityLabel("Is there a triangle?")
                .accessibilityValue(turned ? "Notches turned away. Three separate discs." : "Notches aligned. An implied triangle.")
                .accessibilityHint(turned ? "Double-tap to align the notches." : "Double-tap to turn the notches away from the centre.")
            }
            Rectangle().fill(LibraryStyle.paper.opacity(0.12)).frame(height: 1)
                .accessibilityHidden(true)
            NavigationLink(value: piece) {
                HStack {
                    Text("Explore illusory contours")
                        .font(.footnote.weight(.medium))
                    Spacer(minLength: 12)
                    Image(systemName: "arrow.right").font(.footnote)
                }
                .foregroundStyle(LibraryStyle.paper)
                .padding(.horizontal, 18)
                .padding(.vertical, 6)
                .frame(minHeight: 46)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityIdentifier("featured-experiment")
        }
        .background(LibraryStyle.panel, in: RoundedRectangle(cornerRadius: 18))
        .overlay(RoundedRectangle(cornerRadius: 18).stroke(LibraryStyle.paper.opacity(0.10), lineWidth: 1))
    }

    private var revealButton: some View {
        Button { turned.toggle() } label: {
            Text(turned ? "Bring the triangle back" : "Turn the shapes")
                .font(.subheadline.weight(.medium))
                .foregroundStyle(LibraryStyle.ground)
                .padding(.horizontal, 18)
                .frame(minHeight: 44)
                .background(LibraryStyle.accent, in: Capsule())
        }
        .buttonStyle(.plain)
        .accessibilityIdentifier("triangle-reveal")
        .accessibilityValue(turned ? "Notches turned away. Three separate discs." : "Notches aligned. An implied triangle.")
    }

    private var collectionHeader: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .firstTextBaseline) {
                Text("Explore")
                    .font(.system(.title2, design: .serif))
                    .foregroundStyle(LibraryStyle.paper)
                    .accessibilityAddTraits(.isHeader)
                Spacer()
                Text("\(visiblePieces.count) experiments")
                    .font(.caption)
                    .foregroundStyle(LibraryStyle.muted)
                    .accessibilityIdentifier("experiment-count")
            }
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(["All"] + Catalog.sections.map(\.name), id: \.self) { section in
                        Button { selectedSection = section } label: {
                            Text(section)
                                .font(.subheadline.weight(.medium))
                                .foregroundStyle(selectedSection == section ? LibraryStyle.ground : LibraryStyle.paper)
                                .padding(.horizontal, 15)
                                .frame(minHeight: 44)
                                .background(selectedSection == section ? LibraryStyle.paper : LibraryStyle.panel, in: Capsule())
                        }
                        .buttonStyle(.plain)
                        .accessibilityIdentifier("filter-" + section)
                        .accessibilityAddTraits(selectedSection == section ? .isSelected : [])
                    }
                }
            }
        }
        .padding(.vertical, 10)
        .background(LibraryStyle.ground)
    }
}

private struct IllusionCard: View {
    let piece: Piece

    private var title: String {
        guard piece.title.hasPrefix("The ") else { return piece.title }
        let short = String(piece.title.dropFirst(4))
        return short.prefix(1).uppercased() + short.dropFirst()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 9) {
            Image("preview-" + piece.slug)
                .resizable()
                .aspectRatio(1.5, contentMode: .fit)
                .background(LibraryStyle.ground)
                .clipShape(RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).stroke(LibraryStyle.paper.opacity(0.13), lineWidth: 1))
                .accessibilityHidden(true)
            Text(title)
                .font(.subheadline.weight(.medium))
                .foregroundStyle(LibraryStyle.paper)
                .fixedSize(horizontal: false, vertical: true)
            Text(piece.line)
                .font(.footnote)
                .foregroundStyle(LibraryStyle.muted)
                .fixedSize(horizontal: false, vertical: true)
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
