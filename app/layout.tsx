import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/shared/components/AppShell/AppShell";

export const metadata: Metadata = {
  title: "Familiar Lite – Hotel CRM Demo",
  description: "Mini Next.js demo inspired by Familiar / Friendly client stack."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
