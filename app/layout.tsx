import { Toaster } from 'sonner'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import ModalProvider from '@/components/providers/setting-provider';
import { EdgeStoreProvider } from '../lib/edgestore';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion-Clone-Project",
  description: "The connected workspace where better, faster work happens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className} suppressHydrationWarning>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            {/* shadcn theme */}
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="notion-clone-2"
            >
              <Toaster position='bottom-center' />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>

        </ConvexClientProvider>
      </body>
    </html>
  );
}
