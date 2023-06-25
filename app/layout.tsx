import "./globals.css";
import { Inter } from "next/font/google";
import ProviderMoralis from "@/components/ProviderMoralis";
import NotificationsProvider from "@/components/NotificationsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Raffler",
  description: "A decentralized raffle system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderMoralis>
          <NotificationsProvider>{children}</NotificationsProvider>
        </ProviderMoralis>
      </body>
    </html>
  );
}
