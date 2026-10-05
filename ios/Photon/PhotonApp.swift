import SwiftUI

@main
struct PhotonApp: App {
    var body: some Scene {
        WindowGroup {
            LibraryView()
                .preferredColorScheme(.dark)
        }
    }
}

enum Register {
    static let ink = Color(red: 0x0c / 255, green: 0x0b / 255, blue: 0x09 / 255)
    static let cream = Color(red: 0xe8 / 255, green: 0xe0 / 255, blue: 0xd0 / 255)
    static let dim = cream.opacity(0.40)
    static let faint = cream.opacity(0.15)
}
