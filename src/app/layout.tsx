import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EduCoder",
  description:
    "EduCoder is an innovative educational technology platform designed to bridge the gap between students and tutors. Our platform offers a comprehensive suite of tools and resources to facilitate effective learning, personalized tutoring, and seamless access to educational materials. Whether you're a student seeking help or a tutor looking to share your expertise, EduCoder provides the perfect environment for educational growth and success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
