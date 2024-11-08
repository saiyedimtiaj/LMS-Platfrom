"use client"
import { Josefin_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import Providers from "./Providers";
import { ThemeProvider } from "./utils/theme-provider";
import { GoogleOAuthProvider } from '@react-oauth/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins"
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin"
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Toaster position="top-center" />
      <GoogleOAuthProvider clientId="977853730265-sbpvtot9raf1kunphnt8akgnv0jkca4j.apps.googleusercontent.com">
        <body className={`${poppins.variable} ${josefin.variable} bg-white bg-no-repeat dark:bg-[#020817] duration-300 dark:from-gray-900`}>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </Providers>
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}

