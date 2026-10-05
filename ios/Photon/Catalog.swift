import Foundation

struct Piece: Identifiable, Hashable, Decodable {
    let slug: String
    let title: String
    let section: String
    let line: String
    var id: String { slug }
    /// The lab pages are long documents that scroll under the native buttons.
    var scrolls: Bool { section == "The Lab" }
}

enum Catalog {
    static let piecesDir: URL = Bundle.main.bundleURL.appendingPathComponent("Pieces", isDirectory: true)

    /// Only pieces whose HTML is actually in the bundle are listed, so a
    /// catalog entry without its page never shows as a dead row.
    static let pieces: [Piece] = {
        let url = piecesDir.appendingPathComponent("catalog.json")
        guard let data = try? Data(contentsOf: url),
              let all = try? JSONDecoder().decode([Piece].self, from: data) else { return [] }
        return all.filter { FileManager.default.fileExists(atPath: fileURL(for: $0).path) }
    }()

    static let sections: [(name: String, pieces: [Piece])] = {
        var order: [String] = []
        var bySection: [String: [Piece]] = [:]
        for p in pieces {
            if bySection[p.section] == nil { order.append(p.section) }
            bySection[p.section, default: []].append(p)
        }
        return order.map { ($0, bySection[$0] ?? []) }
    }()

    static func fileURL(for piece: Piece) -> URL {
        piecesDir.appendingPathComponent("\(piece.slug).html")
    }

    static func neighbour(of piece: Piece, offset: Int) -> Piece? {
        guard let i = pieces.firstIndex(of: piece), !pieces.isEmpty else { return nil }
        return pieces[(i + offset + pieces.count) % pieces.count]
    }
}
