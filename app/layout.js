import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spend Wise Campus",
  description: "AI powered expense tracker for students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            {/* Header */}
            <Header />

            <main className="min-h-screen">
              {children}
            </main>

            <Toaster richColors />

            {/* Footer */}
            <footer className="bg-purple-100 dark:bg-zinc-900 py-12">
              <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                <p>© 2025 Spend Wise Campus. All rights reserved.</p>
              </div>
            </footer>

          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}