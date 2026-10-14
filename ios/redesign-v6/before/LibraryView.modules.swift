import SwiftUI

/// The library as a kit of soft modules on paper: pills and discs in flat color,
/// heavy type, and everything gives a little when touched. The experiments stay dark.
private enum Poster {
    static let ink = Register.ink
    static let cream = Register.cream
    static let paper = Color(red: 0xf6 / 255.0, green: 0xf5 / 255.0, blue: 0xf1 / 255.0)
    static let pink = Color(red: 0xf2 / 255.0, green: 0x6f / 255.0, blue: 0x9e / 255.0)
    static let purple = Color(red: 0x6a / 255.0, green: 0x1c / 255.0, blue: 0xc4 / 255.0)
    static let blue = Color(red: 0x2b / 255.0, green: 0x18 / 255.0, blue: 0xf2 / 255.0)
    static let red = Color(red: 0xec / 255.0, green: 0x36 / 255.0, blue: 0x2c / 255.0)
    static let green = Color(red: 0x25 / 255.0, green: 0x6d / 255.0, blue: 0x3d / 255.0)   // dark enough for cream small text (4.8:1)
    static let gray = Color(red: 0xdf / 255.0, green: 0xde / 255.0, blue: 0xd9 / 255.0)
    static let muted = Register.ink.opacity(0.6)

    static func display(_ size: CGFloat, _ style: Font.TextStyle) -> Font {
        .custom("HelveticaNeue-Bold", size: size, relativeTo: style)
    }
    static func sans(_ size: CGFloat, _ style: Font.TextStyle) -> Font {
        .custom("HelveticaNeue", size: size, relativeTo: style)
    }
    static let label = Font.system(.caption2, design: .monospaced).weight(.semibold)

    struct Field { let ground: Color; let mark: Color }
    private static let light = Register.cream, dark = Register.ink

    /// Line figures are printed on a module of color. A piece that is not listed keeps
    /// its own ground and colors, because there the color or the gray is the subject.
    static let fields: [String: Field] = [
        "kanizsa": Field(ground: blue, mark: paper),
        "motion-aftereffect": Field(ground: pink, mark: dark),
        "scintillating-grid": Field(ground: red, mark: dark),
        "ebbinghaus": Field(ground: gray, mark: dark),
        "cafe-wall": Field(ground: green, mark: light),
        "ponzo": Field(ground: red, mark: dark),
        "muller-lyer": Field(ground: pink, mark: dark),
        "inverse-problem": Field(ground: gray, mark: dark),
        "aperture-problem": Field(ground: purple, mark: light),
        "apparent-motion": Field(ground: green, mark: light),
        "gestalt-grouping": Field(ground: blue, mark: paper),
        "receptive-field": Field(ground: pink, mark: dark),
    ]
    static let own = Field(ground: Register.ink, mark: Register.cream)
    static let module = RoundedRectangle(cornerRadius: 38, style: .continuous)
}

struct LibraryView: View {
    @State private var path: [Piece] = []
    @State private var selectedSection = "All"
    @State private var turned = false
    @Environment(\.dynamicTypeSize) private var typeSize
    @Environment(\.horizontalSizeClass) private var sizeClass
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
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
                                .padding(.bottom, 12)
                        }
                        Section {
                            LazyVGrid(columns: columns, alignment: .leading, spacing: 8) {
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
            .background(Poster.paper.ignoresSafeArea())
            // Scrolled content must not show through behind the clock and the pinned filters.
            .overlay(alignment: .top) {
                GeometryReader { geo in
                    Poster.paper
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
        return Array(repeating: GridItem(.flexible(), spacing: 8, alignment: .top), count: count)
    }

    private func number(of piece: Piece) -> String {
        String(format: "%02d", (Catalog.pieces.firstIndex(of: piece) ?? 0) + 1)
    }

    private var masthead: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(alignment: .center) {
                Text("CIAMAC’S")
                    .font(Poster.label)
                    .tracking(2.8)
                    .foregroundStyle(Poster.muted)
                Spacer()
                Text("\(Catalog.pieces.count)")
                    .font(Poster.display(17, .headline))
                    .foregroundStyle(Poster.ink)
                    .frame(width: 48, height: 48)
                    .background { StripedDisc() }
                    .accessibilityLabel("\(Catalog.pieces.count) experiments")
                    .accessibilityIdentifier("experiment-count")
        
            }
            VStack(alignment: .leading, spacing: -titleSize * 0.3) {
                Text("Optical").lineLimit(1)
                Text("Illusions").lineLimit(1)
            }
            .font(.custom("HelveticaNeue-Bold", fixedSize: titleSize))
            .tracking(-titleSize * 0.055)
            .foregroundStyle(Poster.ink)
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
        VStack(spacing: 8) {
            Button {
                withAnimation(reduceMotion ? nil : .spring(response: 0.55, dampingFraction: 0.6)) { turned.toggle() }
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
                        .fill(Poster.paper)
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
                .padding(.horizontal, 22)
                .padding(.vertical, 20)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Poster.blue, in: Poster.module)
                .foregroundStyle(Poster.paper)
                .contentShape(Poster.module)
            }
            .buttonStyle(PressStyle())
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
                .foregroundStyle(Poster.paper)
                .padding(.horizontal, 24)
                .frame(minHeight: 58)
                .background(Poster.ink, in: Capsule())
                .contentShape(Capsule())
            }
            .buttonStyle(PressStyle())
            .accessibilityIdentifier("featured-experiment")
        }
    }

    private var collectionHeader: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Explore")
                .textCase(.uppercase)
                .font(Poster.label)
                .tracking(2.8)
                .foregroundStyle(Poster.muted)
                .padding(.leading, 8)
                .accessibilityAddTraits(.isHeader)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 5) {
                    ForEach(["All"] + Catalog.sections.map(\.name), id: \.self) { section in
                        Button { selectedSection = section } label: {
                            Text(section)
                                .font(Poster.display(17, .headline))
                                .tracking(-0.4)
                                .foregroundStyle(selectedSection == section ? Poster.paper : Poster.ink)
                                .padding(.horizontal, 15)
                                .frame(minWidth: 48, minHeight: 48)
                                .background(selectedSection == section ? Poster.ink : Poster.gray, in: Capsule())
                                .contentShape(Capsule())
                        }
                        .buttonStyle(PressStyle())
                        .accessibilityIdentifier("filter-" + section)
                        .accessibilityAddTraits(selectedSection == section ? .isSelected : [])
                    }
                }
            }
        }
        .padding(.vertical, 6)
        .background(Poster.paper)
    }

    private var colophon: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("Vision is construction, not recording.")
                .font(Poster.display(22, .title3))
                .tracking(-0.6)
                .foregroundStyle(Poster.ink)
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

/// A module gives a little under the finger, and leans.
private struct PressStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View { Pressed(configuration: configuration) }

    private struct Pressed: View {
        let configuration: Configuration
        @Environment(\.accessibilityReduceMotion) private var reduceMotion

        var body: some View {
            if reduceMotion {
                // No movement; a pressed module only dims.
                configuration.label.opacity(configuration.isPressed ? 0.75 : 1)
            } else {
                configuration.label
                    .scaleEffect(configuration.isPressed ? 0.95 : 1)
                    .rotationEffect(.degrees(configuration.isPressed ? -1.5 : 0))
                    .animation(.spring(response: 0.28, dampingFraction: 0.55), value: configuration.isPressed)
            }
        }
    }
}

/// The count sits on a disc of diagonal stripes, a small piece of optical art of its own.
private struct StripedDisc: View {
    var body: some View {
        Canvas { context, size in
            context.clip(to: Path(ellipseIn: CGRect(origin: .zero, size: size)))
            context.fill(Path(CGRect(origin: .zero, size: size)), with: .color(Poster.paper))
            var x = -size.height
            while x < size.width {
                var stripe = Path()
                stripe.move(to: CGPoint(x: x, y: size.height))
                stripe.addLine(to: CGPoint(x: x + size.height, y: 0))
                stripe.addLine(to: CGPoint(x: x + size.height + 5, y: 0))
                stripe.addLine(to: CGPoint(x: x + 5, y: size.height))
                stripe.closeSubpath()
                context.fill(stripe, with: .color(Poster.gray))
                x += 10
            }
        }
        .overlay(Circle().strokeBorder(Poster.ink, lineWidth: 2))
        .accessibilityHidden(true)
    }
}

private struct PosterTile: View {
    let piece: Piece
    let number: String
    @State private var arrived = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private var printed: Bool { Poster.fields[piece.slug] != nil }
    private var field: Poster.Field { Poster.fields[piece.slug] ?? Poster.own }

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
        .foregroundStyle(field.mark)
        .padding(.horizontal, 18)
        .padding(.top, 20)
        .padding(.bottom, 18)
        .frame(maxWidth: .infinity, alignment: .topLeading)
        .background(field.ground, in: Poster.module)
        .contentShape(Poster.module)
        // Each module drops into place once, the first time it comes on screen.
        .scaleEffect(arrived || reduceMotion ? 1 : 0.82)
        .opacity(arrived || reduceMotion ? 1 : 0)
        .onAppear {
            guard !arrived else { return }
            withAnimation(.spring(response: 0.5, dampingFraction: 0.62).delay(0.04)) { arrived = true }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(piece.title). \(piece.line)")
        .accessibilityHint("Opens the experiment")
    }

    @ViewBuilder private var figure: some View {
        let image = Image("preview-" + piece.slug).resizable()
        if printed {
            // The preview is a cream figure on ink; used as a mask, the figure prints in one color on the module.
            // Darkened a touch so the ink ground drops out completely, then stacked three deep so thin, dim lines print solid.
            field.mark.mask {
                ZStack { ForEach(0..<3, id: \.self) { _ in image.grayscale(1).brightness(-0.07).luminanceToAlpha() } }
            }
        } else {
            image.clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
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
