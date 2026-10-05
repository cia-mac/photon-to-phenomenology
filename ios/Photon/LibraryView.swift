import SwiftUI

struct LibraryView: View {
    @State private var path: [Piece] = []

    private let columns = [GridItem(.adaptive(minimum: 300), spacing: 0, alignment: .top)]

    var body: some View {
        NavigationStack(path: $path) {
            ScrollView {
                VStack(alignment: .leading, spacing: 0) {
                    Text("CIAMAC’S BOOK OF ILLUSIONS")
                        .font(.system(size: 11, design: .monospaced))
                        .tracking(2.6)
                        .foregroundStyle(Register.dim)
                        .padding(.top, 28)
                    Text("Vision is construction, not recording.")
                        .font(.custom("HelveticaNeue-Light", size: 26))
                        .foregroundStyle(Register.cream)
                        .padding(.top, 10)
                        .padding(.bottom, 34)

                    ForEach(Catalog.sections, id: \.name) { section in
                        Text(section.name.uppercased())
                            .font(.system(size: 10.5, design: .monospaced))
                            .tracking(2.4)
                            .foregroundStyle(Register.cream.opacity(0.32))
                            .padding(.bottom, 8)
                        LazyVGrid(columns: columns, alignment: .leading, spacing: 0) {
                            ForEach(Array(section.pieces.enumerated()), id: \.element.id) { i, piece in
                                NavigationLink(value: piece) {
                                    PieceRow(number: i + 1, piece: piece)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        .padding(.bottom, 34)
                    }
                }
                .padding(.horizontal, 30)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .background(Register.ink.ignoresSafeArea())
            .toolbar(.hidden, for: .navigationBar)
            .navigationDestination(for: Piece.self) { piece in
                PieceScreen(piece: piece, path: $path)
            }
            #if DEBUG
            .onAppear {   // test hook: `simctl launch ... -piece <slug>` opens that piece directly
                if path.isEmpty, let slug = UserDefaults.standard.string(forKey: "piece"),
                   let p = Catalog.pieces.first(where: { $0.slug == slug }) { path = [p] }
            }
            #endif
        }
        .tint(Register.cream)
    }
}

private struct PieceRow: View {
    let number: Int
    let piece: Piece

    var body: some View {
        HStack(alignment: .firstTextBaseline, spacing: 0) {
            Text(String(format: "%02d", number))
                .font(.system(size: 12, design: .monospaced))
                .foregroundStyle(Register.cream.opacity(0.32))
                .frame(width: 34, alignment: .leading)
            VStack(alignment: .leading, spacing: 4) {
                Text(piece.title)
                    .font(.custom("HelveticaNeue", size: 18))
                    .foregroundStyle(Register.cream)
                Text(piece.line)
                    .font(.custom("HelveticaNeue-Light", size: 13.5))
                    .foregroundStyle(Register.dim)
            }
            Spacer(minLength: 0)
        }
        .padding(.vertical, 13)
        .padding(.trailing, 24)
        .frame(minHeight: 44)
        .contentShape(Rectangle())
        .accessibilityElement(children: .combine)
    }
}
