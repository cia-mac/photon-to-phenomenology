import SwiftUI

/// The library as a wall of posters: flat fields of color, heavy type, one live figure on top.
private enum Poster {
    // The same ink and cream as the full experiments; the fields are the only added color.
    static let ink = Register.ink
    static let cream = Register.cream
    static let blue = Color(red: 0x4d / 255.0, green: 0x7f / 255.0, blue: 0xe0 / 255.0)
    static let red = Color(red: 0xe2 / 255.0, green: 0x44 / 255.0, blue: 0x2f / 255.0)
    static let ochre = Color(red: 0xe0 / 255.0, green: 0xb2 / 255.0, blue: 0x3c / 255.0)
    static let muted = Register.cream.opacity(0.62)

    static func display(_ size: CGFloat, _ style: Font.TextStyle) -> Font {
        .custom("HelveticaNeue-Bold", size: size, relativeTo: style)
    }
    static func sans(_ size: CGFloat, _ style: Font.TextStyle) -> Font {
        .custom("HelveticaNeue", size: size, relativeTo: style)
    }
    static let label = Font.system(.caption2, design: .monospaced).weight(.medium)

    /// Line figures are knocked out of a field of color. A piece that is not listed keeps
    /// its own ground and colors, because there the color or the gray is the subject.
    static let fields: [String: Color] = [
        "kanizsa": blue, "motion-aftereffect": cream, "scintillating-grid": red, "ebbinghaus": ochre,
        "cafe-wall": cream, "ponzo": blue, "muller-lyer": red, "inverse-problem": ochre,
        "aperture-problem": blue, "apparent-motion": red, "gestalt-grouping": ochre, "receptive-field": cream,
    ]
}

struct LibraryView: View {
    @State private var path: [Piece] = []
    @State private var selectedSection = "All"
    @State private var turned = false
    @Environment(\.dynamicTypeSize) private var typeSize
    @Environment(\.horizontalSizeClass) private var sizeClass
    @ScaledMetric(relativeTo: .largeTitle) private var titleSize = 70

    private var featured: Piece? { Catalog.pieces.first(where: { $0.slug == "kanizsa" }) }

    private var sectionPieces: [Piece] {
        Catalog.pieces.filter { selectedSection == "All" || $0.section == selectedSection }
    }

    /// The featured piece is the poster at the top, so the wall below does not repeat it.
    private var wallPieces: [Piece] { sectionPieces.filter { $0 != featured } }

    var body: some View {
        NavigationStack(path: $path) {
            ScrollViewReader { reader in
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 0, pinnedViews: [.sectionHeaders]) {
                        masthead
                            .padding(.horizontal, 8)
                            .padding(.top, 14)
                            .padding(.bottom, 14)
                        if let piece = featured {
                            hero(piece)
                                .padding(.bottom, 10)
                        }
                        Section {
                            LazyVGrid(columns: columns, alignment: .leading, spacing: 6) {
                                ForEach(wallPieces) { piece in
                                    NavigationLink(value: piece) { PosterTile(piece: piece, number: number(of: piece)) }
                                        .buttonStyle(PressStyle())
                                        .accessibilityIdentifier("piece-" + piece.slug)
                                }
                            }
                            .padding(.top, 6)
                            .padding(.bottom, 36)
                        } header: {
                            collectionHeader
                                .id("collection")
                        }
                        colophon
                            .padding(.horizontal, 8)
                            .padding(.bottom, 28)
                    }
                    .padding(.horizontal, 14)
                    .frame(maxWidth: 860, alignment: .leading)
                    .frame(maxWidth: .infinity)
                }
                .onChange(of: selectedSection) { _, _ in
                    // Keep the filters and the first results together, including when
                    // switching from the bottom of a long collection to a short one.
                    reader.scrollTo("collection", anchor: .top)
                }
            }
            .background(Poster.ink.ignoresSafeArea())
            // Scrolled content must not show through behind the clock and the pinned filters.
            .overlay(alignment: .top) {
                GeometryReader { geo in
                    Poster.ink
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
        .tint(Poster.blue)
    }

    private var columns: [GridItem] {
        // Large text gets room to wrap instead of being squeezed into narrow tiles.
        if typeSize >= .xxLarge { return [GridItem(.flexible())] }
        let count = sizeClass == .regular ? 3 : 2
        return Array(repeating: GridItem(.flexible(), spacing: 6, alignment: .top), count: count)
    }

    private func number(of piece: Piece) -> String {
        String(format: "%02d", (Catalog.pieces.firstIndex(of: piece) ?? 0) + 1)
    }

    private var masthead: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("CIAMAC’S")
                .font(Poster.label)
                .tracking(2.8)
                .foregroundStyle(Poster.muted)
            VStack(alignment: .leading, spacing: -titleSize * 0.3) {
                Text("Optical").lineLimit(1)
                Text("Illusions").lineLimit(1)
            }
            .font(.custom("HelveticaNeue-Bold", fixedSize: titleSize))
            .tracking(-titleSize * 0.055)
            .foregroundStyle(Poster.cream)
            .minimumScaleFactor(0.4)
            .accessibilityElement(children: .ignore)
            .accessibilityLabel("Optical Illusions")
            .accessibilityAddTraits(.isHeader)
            Text("Small experiments. Unreliable eyes.")
                .font(Poster.sans(16, .subheadline))
                .foregroundStyle(Poster.muted)
                .fixedSize(horizontal: false, vertical: true)
        }
    }

    /// The first thing on the page is an illusion you can break with one tap.
    private func hero(_ piece: Piece) -> some View {
        VStack(spacing: 0) {
            Button {
                withAnimation(.spring(response: 0.55, dampingFraction: 0.6)) { turned.toggle() }
            } label: {
                VStack(alignment: .leading, spacing: 0) {
                    HStack {
                        Text(number(of: piece))
                        Spacer()
                        // At the largest text sizes the state line would crowd the number.
                        if !typeSize.isAccessibilitySize {
                            Text(turned ? "NOTCHES TURNED" : "NOTCHES ALIGNED")
                        }
                    }
                    .font(Poster.label)
                    .tracking(1.6)
                    .accessibilityHidden(true)
                    KanizsaFigure(turn: turned ? 1 : 0)
                        .fill(Poster.ink)
                        .frame(height: sizeClass == .regular ? 330 : 196)
                        .frame(maxWidth: .infinity)
                        .padding(.top, -6)
                        .padding(.bottom, 8)
                        .accessibilityHidden(true)
                    Text("Is there a triangle?")
                        .font(Poster.display(31, .title))
                        .tracking(-1.1)
                        .fixedSize(horizontal: false, vertical: true)
                    Text(turned ? "Tap to bring it back." : "Tap the shapes to break the illusion.")
                        .font(Poster.sans(15, .subheadline))
                        .fixedSize(horizontal: false, vertical: true)
                        .padding(.top, 3)
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Poster.blue)
                .foregroundStyle(Poster.ink)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .sensoryFeedback(.impact(weight: .medium), trigger: turned)
            .accessibilityIdentifier("triangle-reveal")
            .accessibilityLabel("Is there a triangle?")
            .accessibilityValue(turned ? "Notches turned away. Three separate discs." : "Notches aligned. An implied triangle.")
            .accessibilityHint(turned ? "Double-tap to align the notches." : "Double-tap to turn the notches away from the center.")

            NavigationLink(value: piece) {
                HStack {
                    Text("Explore illusory contours")
                        .font(Poster.display(16, .subheadline))
                        .tracking(-0.2)
                    Spacer(minLength: 12)
                    Image(systemName: "arrow.right").font(.subheadline.weight(.bold))
                }
                .foregroundStyle(Poster.ink)
                .padding(.horizontal, 14)
                .frame(minHeight: 52)
                .background(Poster.cream)
                .contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .accessibilityIdentifier("featured-experiment")
        }
    }

    private var collectionHeader: some View {
        HStack(alignment: .center, spacing: 0) {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 20) {
                    ForEach(["All"] + Catalog.sections.map(\.name), id: \.self) { section in
                        Button { selectedSection = section } label: {
                            Text(section)
                                .font(Poster.display(18, .headline))
                                .tracking(-0.4)
                                .foregroundStyle(selectedSection == section ? Poster.cream : Poster.cream.opacity(0.4))
                                .frame(minWidth: 44, minHeight: 48, alignment: .leading)
                                .overlay(alignment: .bottom) {
                                    Rectangle()
                                        .fill(selectedSection == section ? Poster.cream : .clear)
                                        .frame(height: 3)
                                }
                                .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                        .accessibilityIdentifier("filter-" + section)
                        .accessibilityAddTraits(selectedSection == section ? .isSelected : [])
                    }
                }
                .padding(.leading, 8)
            }
            .accessibilityAddTraits(.isHeader)
            Text("\(sectionPieces.count)")
                .font(Poster.label)
                .tracking(1.6)
                .foregroundStyle(Poster.muted)
                .padding(.horizontal, 8)
                .accessibilityLabel("\(sectionPieces.count) experiments")
                .accessibilityIdentifier("experiment-count")
        }
        .padding(.vertical, 4)
        .background(Poster.ink)
    }

    private var colophon: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("Vision is construction, not recording.")
                .font(Poster.display(22, .title3))
                .tracking(-0.6)
                .foregroundStyle(Poster.cream)
                .fixedSize(horizontal: false, vertical: true)
            Link(destination: URL(string: "https://photon.ciamac.com/privacy")!) {
                Label("Privacy & support", systemImage: "arrow.up.right")
                    .font(Poster.sans(14, .footnote))
                    .foregroundStyle(Poster.muted)
                    .frame(minHeight: 44, alignment: .leading)
            }
            .accessibilityHint("Opens the privacy policy and contact information in your browser")
        }
    }
}

/// A tile gives a little under the finger.
private struct PressStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.spring(response: 0.25, dampingFraction: 0.7), value: configuration.isPressed)
    }
}

private struct PosterTile: View {
    let piece: Piece
    let number: String

    private var field: Color? { Poster.fields[piece.slug] }

    private var title: String {
        guard piece.title.hasPrefix("The ") else { return piece.title }
        let short = String(piece.title.dropFirst(4))
        return short.prefix(1).uppercased() + short.dropFirst()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(number)
                .font(Poster.label)
                .tracking(1.2)
            figure
                .aspectRatio(1.5, contentMode: .fit)
                .padding(.vertical, 10)
                .accessibilityHidden(true)
            Text(title)
                .font(Poster.display(20, .headline))
                .tracking(-0.6)
                .lineLimit(2, reservesSpace: true)
                .minimumScaleFactor(0.8)
                .multilineTextAlignment(.leading)
        }
        .foregroundStyle(field == nil ? Poster.cream : Poster.ink)
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .topLeading)
        .background(field ?? Poster.ink)
        .overlay {
            if field == nil { Rectangle().strokeBorder(Poster.cream.opacity(0.28), lineWidth: 1) }
        }
        .contentShape(Rectangle())
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(piece.title). \(piece.line)")
        .accessibilityHint("Opens the experiment")
    }

    @ViewBuilder private var figure: some View {
        let image = Image("preview-" + piece.slug).resizable()
        if field == nil {
            image
        } else {
            // The preview is a cream figure on ink; used as a mask, the figure prints in ink on the field.
            Poster.ink.mask { image.grayscale(1).contrast(1.9).luminanceToAlpha() }
        }
    }
}

/// Exactly three notched discs. No triangle, edge, or overlaid surface is drawn.
/// The vertices are equilateral at every size; `turn` rotates the notches away.
private struct KanizsaFigure: Shape {
    var turn: Double
    var animatableData: Double {
        get { turn }
        set { turn = newValue }
    }

    func path(in rect: CGRect) -> Path {
        let center = CGPoint(x: rect.midX, y: rect.minY + rect.height * 0.57)
        let orbit = min(rect.height * 0.37, rect.width * 0.27)
        let radius = orbit * 0.5
        var path = Path()
        for i in 0..<3 {
            let angle = -Double.pi / 2 + Double(i) * 2 * .pi / 3
            let vertex = CGPoint(x: center.x + cos(angle) * orbit, y: center.y + sin(angle) * orbit)
            let direction = atan2(center.y - vertex.y, center.x - vertex.x) + turn * .pi * 0.6
            path.move(to: vertex)
            path.addArc(center: vertex, radius: radius,
                        startAngle: .radians(direction + .pi / 6),
                        endAngle: .radians(direction + 11 * .pi / 6), clockwise: false)
            path.closeSubpath()
        }
        return path
    }
}
