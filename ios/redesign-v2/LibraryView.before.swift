import SwiftUI

private enum LibraryStyle {
    static let ground = Color(red: 0.055, green: 0.055, blue: 0.065)
    static let panel = Color(red: 0.095, green: 0.095, blue: 0.11)
    static let paper = Color(red: 0.94, green: 0.92, blue: 0.86)
    static let muted = Color(red: 0.65, green: 0.65, blue: 0.64)
    static let accent = Color(red: 0.80, green: 0.91, blue: 0.44)
}

struct LibraryView: View {
    @State private var path: [Piece] = []
    @State private var selectedSection = "All"
    @State private var reveal = false
    @Environment(\.dynamicTypeSize) private var typeSize

    private var visiblePieces: [Piece] {
        Catalog.pieces.filter { selectedSection == "All" || $0.section == selectedSection }
    }

    var body: some View {
        NavigationStack(path: $path) {
            ScrollView {
                VStack(alignment: .leading, spacing: 30) {
                    masthead
                    introduction
                    featuredIllusion
                    gallery
                    Text("Your eyes gather light. Your mind makes the picture.")
                        .font(.system(.footnote, design: .serif))
                        .foregroundStyle(LibraryStyle.muted)
                        .padding(.bottom, 24)
                }
                .padding(.horizontal, 24)
                .padding(.top, 16)
                .frame(maxWidth: 860, alignment: .leading)
                .frame(maxWidth: .infinity)
            }
            .background(LibraryStyle.ground.ignoresSafeArea())
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

    private var masthead: some View {
        HStack(alignment: .center) {
            Text("CIAMAC")
                .font(.system(.caption, design: .monospaced).weight(.medium))
                .tracking(3)
            Spacer()
            Text("A BOOK OF ILLUSIONS")
                .font(.system(.caption2, design: .monospaced))
                .tracking(1.2)
                .foregroundStyle(LibraryStyle.muted)
                .multilineTextAlignment(.trailing)
        }
        .foregroundStyle(LibraryStyle.paper)
        .padding(.bottom, 4)
        .accessibilityElement(children: .combine)
    }

    private var introduction: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Seeing is\nbelieving?")
                .font(.system(.largeTitle, design: .serif).weight(.regular))
                .foregroundStyle(LibraryStyle.paper)
                .fixedSize(horizontal: false, vertical: true)
            Text("Look. Touch. Question what you see.")
                .font(.subheadline)
                .foregroundStyle(LibraryStyle.muted)
        }
    }

    private var featuredIllusion: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("START WITH A QUESTION")
                    .font(.system(.caption2, design: .monospaced))
                    .tracking(1.3)
                Spacer()
                Image(systemName: "eye")
            }
            .foregroundStyle(LibraryStyle.accent)
            .padding(20)

            IllusionArtwork(slug: "kanizsa", reveal: reveal)
                .frame(height: 210)
                .accessibilityLabel(reveal ? "Three complete circles. The implied triangle has disappeared." : "Three circles with wedges removed imply a triangle whose edges are not drawn.")

            VStack(alignment: .leading, spacing: 12) {
                Text(reveal ? "The edges were never there." : "Is there a triangle?")
                    .font(.system(.title2, design: .serif))
                    .foregroundStyle(LibraryStyle.paper)
                Text(reveal ? "Your mind supplied the missing shape. Restore the gaps and watch it return." : "You see its edges. But none of them are drawn.")
                    .font(.subheadline)
                    .foregroundStyle(LibraryStyle.muted)
                    .fixedSize(horizontal: false, vertical: true)
                Button { reveal.toggle() } label: {
                    HStack {
                        Text(reveal ? "Bring it back" : "Reveal the trick")
                        Spacer()
                        Image(systemName: reveal ? "arrow.counterclockwise" : "arrow.up.right")
                    }
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(LibraryStyle.ground)
                    .padding(.horizontal, 16)
                    .frame(minHeight: 48)
                    .background(LibraryStyle.accent, in: RoundedRectangle(cornerRadius: 12))
                }
                .buttonStyle(.plain)
                .accessibilityHint("Changes the cut circles into full circles, or restores the missing wedges.")
                if let piece = Catalog.pieces.first(where: { $0.slug == "kanizsa" }) {
                    NavigationLink(value: piece) {
                        Text("Explore the full experiment")
                            .font(.footnote)
                            .foregroundStyle(LibraryStyle.paper)
                            .frame(maxWidth: .infinity, minHeight: 44)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(20)
        }
        .background(LibraryStyle.panel, in: RoundedRectangle(cornerRadius: 24))
        .overlay(RoundedRectangle(cornerRadius: 24).stroke(LibraryStyle.paper.opacity(0.08), lineWidth: 1))
    }

    private var gallery: some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack(alignment: .firstTextBaseline) {
                Text("Trust your eyes.\nThen test them.")
                    .font(.system(.title2, design: .serif))
                    .foregroundStyle(LibraryStyle.paper)
                Spacer()
                Text(String(format: "%02d", visiblePieces.count))
                    .font(.system(.caption, design: .monospaced))
                    .foregroundStyle(LibraryStyle.muted)
            }
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(["All"] + Catalog.sections.map(\.name), id: \.self) { section in
                        Button { selectedSection = section } label: {
                            Text(section)
                                .font(.subheadline.weight(.medium))
                                .foregroundStyle(selectedSection == section ? LibraryStyle.ground : LibraryStyle.paper)
                                .padding(.horizontal, 17)
                                .frame(minHeight: 44)
                                .background(selectedSection == section ? LibraryStyle.paper : LibraryStyle.panel, in: Capsule())
                        }
                        .buttonStyle(.plain)
                        .accessibilityAddTraits(selectedSection == section ? .isSelected : [])
                    }
                }
            }
            LazyVGrid(columns: [GridItem(.adaptive(minimum: typeSize.isAccessibilitySize ? 280 : 155), spacing: 12)], alignment: .leading, spacing: 12) {
                ForEach(visiblePieces) { piece in
                    NavigationLink(value: piece) { IllusionCard(piece: piece) }
                        .buttonStyle(.plain)
                }
            }
        }
    }
}

private struct IllusionCard: View {
    let piece: Piece

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            IllusionArtwork(slug: piece.slug)
                .frame(height: 122)
                .clipped()
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 7) {
                HStack {
                    Text(piece.section.uppercased())
                        .font(.system(.caption2, design: .monospaced))
                        .tracking(0.8)
                    Spacer(minLength: 4)
                    Image(systemName: "arrow.up.right")
                        .font(.caption2)
                }
                .foregroundStyle(LibraryStyle.accent)
                Text(piece.title)
                    .font(.subheadline.weight(.medium))
                    .foregroundStyle(LibraryStyle.paper)
                    .fixedSize(horizontal: false, vertical: true)
                Text(piece.line)
                    .font(.footnote)
                    .foregroundStyle(LibraryStyle.muted)
                    .fixedSize(horizontal: false, vertical: true)
                Spacer(minLength: 0)
            }
            .padding(14)
            .frame(maxWidth: .infinity, minHeight: 132, alignment: .topLeading)
        }
        .background(LibraryStyle.panel, in: RoundedRectangle(cornerRadius: 18))
        .overlay(RoundedRectangle(cornerRadius: 18).stroke(LibraryStyle.paper.opacity(0.07), lineWidth: 1))
        .contentShape(RoundedRectangle(cornerRadius: 18))
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(piece.title). \(piece.line)")
        .accessibilityHint("Opens the experiment")
    }
}

/// Illustrations for browsing, separate from the experiment's calibrated stimulus.
private struct IllusionArtwork: View {
    let slug: String
    var reveal = false

    var body: some View {
        Canvas { context, size in
            let w = size.width, h = size.height
            let center = CGPoint(x: w / 2, y: h / 2)
            let unit = min(w, h)
            let paper = LibraryStyle.paper
            let accent = LibraryStyle.accent
            func line(_ points: [CGPoint], _ color: Color = paper, _ width: CGFloat = 2) {
                guard let first = points.first else { return }
                var p = Path(); p.move(to: first)
                for point in points.dropFirst() { p.addLine(to: point) }
                context.stroke(p, with: .color(color), lineWidth: width)
            }
            func circle(_ x: CGFloat, _ y: CGFloat, _ radius: CGFloat, _ color: Color = paper) {
                context.fill(Path(ellipseIn: CGRect(x: x - radius, y: y - radius, width: radius * 2, height: radius * 2)), with: .color(color))
            }
            switch slug {
            case "kanizsa":
                let r = unit * 0.12
                let vertices = [CGPoint(x: w * 0.5, y: h * 0.21), CGPoint(x: w * 0.28, y: h * 0.77), CGPoint(x: w * 0.72, y: h * 0.77)]
                for v in vertices { circle(v.x, v.y, r) }
                if !reveal {
                    var triangle = Path(); triangle.move(to: vertices[0]); triangle.addLine(to: vertices[1]); triangle.addLine(to: vertices[2]); triangle.closeSubpath()
                    context.fill(triangle, with: .color(LibraryStyle.panel))
                }
            case "scintillating-grid", "receptive-field":
                for i in 1...5 {
                    let x = w * CGFloat(i) / 6
                    line([CGPoint(x: x, y: h * 0.12), CGPoint(x: x, y: h * 0.88)], paper.opacity(0.35), 5)
                }
                for j in 1...4 {
                    let y = h * CGFloat(j) / 5
                    line([CGPoint(x: w * 0.1, y: y), CGPoint(x: w * 0.9, y: y)], paper.opacity(0.35), 5)
                    for i in 1...5 { circle(w * CGFloat(i) / 6, y, 3.5) }
                }
            case "ebbinghaus":
                for (cx, radius, orbit) in [(w * 0.28, unit * 0.07, unit * 0.22), (w * 0.74, unit * 0.025, unit * 0.13)] {
                    circle(cx, center.y, unit * 0.048, accent)
                    for i in 0..<6 {
                        let a = Double(i) * .pi / 3
                        circle(cx + CGFloat(cos(a)) * orbit, center.y + CGFloat(sin(a)) * orbit, radius)
                    }
                }
            case "cafe-wall", "checker-shadow", "change-blindness":
                let tile = w / 7
                for row in 0..<5 {
                    for col in -1..<8 where (col + row) % 2 == 0 {
                        let offset: CGFloat = row % 2 == 0 ? 0 : tile * 0.4
                        context.fill(Path(CGRect(x: CGFloat(col) * tile + offset, y: CGFloat(row) * h / 5, width: tile, height: h / 5 - 2)), with: .color(paper))
                    }
                }
            case "ponzo", "inverse-problem":
                line([CGPoint(x: w * 0.18, y: h * 0.9), CGPoint(x: w * 0.46, y: h * 0.1)], paper.opacity(0.7))
                line([CGPoint(x: w * 0.82, y: h * 0.9), CGPoint(x: w * 0.54, y: h * 0.1)], paper.opacity(0.7))
                for y in [h * 0.34, h * 0.73] { line([CGPoint(x: w * 0.33, y: y), CGPoint(x: w * 0.67, y: y)], accent, 5) }
            case "muller-lyer":
                for (y, sign) in [(h * 0.32, CGFloat(1)), (h * 0.7, CGFloat(-1))] {
                    let left = w * 0.28, right = w * 0.72, dx = unit * 0.1, dy = unit * 0.1
                    line([CGPoint(x: left, y: y), CGPoint(x: right, y: y)], accent, 3)
                    line([CGPoint(x: left + dx * sign, y: y - dy), CGPoint(x: left, y: y), CGPoint(x: left + dx * sign, y: y + dy)])
                    line([CGPoint(x: right - dx * sign, y: y - dy), CGPoint(x: right, y: y), CGPoint(x: right - dx * sign, y: y + dy)])
                }
            case "afterimage", "opponent-afterimage", "trichromatic-mixing":
                for (dx, dy, color) in [(CGFloat(-0.12), CGFloat(0.08), Color.red), (CGFloat(0.12), CGFloat(0.08), Color.green), (CGFloat(0), CGFloat(-0.12), Color.blue)] {
                    var layer = context; layer.blendMode = .screen
                    layer.fill(Path(ellipseIn: CGRect(x: center.x + dx * unit - unit * 0.2, y: center.y + dy * unit - unit * 0.2, width: unit * 0.4, height: unit * 0.4)), with: .color(color))
                }
                circle(center.x, center.y, 2, paper)
            case "cornsweet", "contrast-sensitivity":
                let rect = CGRect(x: w * 0.12, y: h * 0.2, width: w * 0.76, height: h * 0.6)
                context.fill(Path(rect), with: .linearGradient(Gradient(colors: [paper.opacity(0.12), paper, paper.opacity(0.12)]), startPoint: CGPoint(x: w * 0.12, y: 0), endPoint: CGPoint(x: w * 0.88, y: 0)))
                line([CGPoint(x: center.x, y: h * 0.2), CGPoint(x: center.x, y: h * 0.8)], LibraryStyle.ground, 2)
            case "motion-aftereffect", "aperture-problem":
                var p = Path()
                for i in 0...350 {
                    let angle = CGFloat(i) * 0.075, radius = CGFloat(i) / 350 * unit * 0.40
                    let point = CGPoint(x: center.x + cos(angle) * radius, y: center.y + sin(angle) * radius)
                    if i == 0 { p.move(to: point) } else { p.addLine(to: point) }
                }
                context.stroke(p, with: .color(paper), lineWidth: 2)
            case "troxler-fading", "motion-induced-blindness":
                for i in 0..<12 {
                    let a = Double(i) * .pi / 6
                    circle(center.x + CGFloat(cos(a)) * unit * 0.32, center.y + CGFloat(sin(a)) * unit * 0.32, unit * 0.045, accent.opacity(0.5))
                }
                circle(center.x, center.y, 2)
            case "apparent-motion":
                for i in 0..<4 { circle(w * (0.2 + CGFloat(i) * 0.2), center.y, unit * 0.07, paper.opacity(0.2 + Double(i) * 0.25)) }
            default:
                for row in 0..<4 {
                    for col in 0..<6 { circle(w * (0.16 + CGFloat(col) * 0.135), h * (0.23 + CGFloat(row) * 0.18), unit * 0.028, col < 3 ? paper : accent) }
                }
            }
        }
        .allowsHitTesting(false)
    }
}
