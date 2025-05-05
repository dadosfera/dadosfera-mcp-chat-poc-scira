import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ChatSidebar } from "@/components/chat-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Providers } from "./providers";
import "./globals.css";
import Script from "next/script";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dadosfera.ai"),
  title: "Dadosfera AutodriveDDF Chat",
  description: "Dadosfera AutodriveDDF Chat is a minimalistic MCP client with a good feature set.",
  openGraph: {
    siteName: "Dadosfera AutodriveDDF Chat",
    url: "https://dadosfera.ai/",
    images: [
      {
        url: "https://dadosfera.ai/wp-content/webp-express/webp-images/uploads/2022/06/Logo-Dadosfera1-1.png.webp",
        width: 1200,
        height: 630,
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.className}`}>
        <Providers>
          <div className="flex h-dvh w-full">
            <ChatSidebar />
            <main className="flex-1 flex flex-col relative">
              <div className="absolute top-4 left-4 z-50">
                <SidebarTrigger>
                  <button className="flex items-center justify-center h-8 w-8 bg-muted hover:bg-accent rounded-md transition-colors">
                    <Menu className="h-4 w-4" />
                  </button>
                </SidebarTrigger>
              </div>
              <div className="flex-1 flex justify-center">
                {children}
              </div>
            </main>
          </div>
        </Providers>
        {/* <Script defer src="https://cloud.umami.is/script.js" data-website-id="1373896a-fb20-4c9d-b718-c723a2471ae5" /> */}
      </body>
    </html>
  );
}
