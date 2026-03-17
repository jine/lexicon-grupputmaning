import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interview Flashcard Master",
  description: "Master technical interview questions through active recall",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#0f0f0f] text-[#f5f5f5] font-sans">
        <div className="flex min-h-screen">
          <aside className="w-60 fixed left-0 top-0 bottom-0 border-r border-[#2a2a2a] bg-[#0f0f0f]">
            <div className="h-14 flex items-center px-4 border-b border-[#2a2a2a]">
              <svg className="w-5 h-5 text-[#00d4aa] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-semibold text-[#f5f5f5]">Flashcards</span>
            </div>
            <nav className="p-2">
              <a href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-[#f5f5f5] bg-[#1a1a1a] rounded">
                <svg className="w-4 h-4 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Decks
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-[#888] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] rounded">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Progress
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-[#888] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] rounded">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Leaderboard
              </a>
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#00d4aa] flex items-center justify-center text-[#0f0f0f] font-semibold text-xs">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#f5f5f5]">John Doe</div>
                  <div className="text-xs text-[#888]">1,250 XP</div>
                </div>
              </div>
            </div>
          </aside>
          <div className="flex-1 ml-60">
            <header className="h-14 flex items-center px-6 border-b border-[#2a2a2a]">
              <h1 className="text-lg font-semibold text-[#f5f5f5]">Interview Flashcard Master</h1>
            </header>
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
