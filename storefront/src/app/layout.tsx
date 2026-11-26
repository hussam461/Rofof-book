import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-arabic";
import { DirectionProvider } from "@/components/ui/direction";
import { StoreProvider } from "@/components/store-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "rofof book",
  description: "متجر كتب إلكتروني",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <DirectionProvider direction="rtl">
          <StoreProvider>{children}</StoreProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
