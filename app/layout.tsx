import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import LeftSidebar from "@/components/shared/leftSideBar";
import Bottombar from "@/components/shared/bottomBar";
import RightSidebar from "@/components/shared/rightSideBar";
import Topbar from "@/components/shared/topBar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}