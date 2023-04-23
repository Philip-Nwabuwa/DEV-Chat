import Providers from "@/components/providers";
import "./globals.css";

export const metadata = {
  title: "DevChat",
  description: "A chat app for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
