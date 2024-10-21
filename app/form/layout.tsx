import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const dm_sans = DM_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-dm_sans", //css variables name
});

export const metadata: Metadata = {
  title: "Ledeyo Alumni",
  //   description: "",
};

export default async function RootLayout({
  children,
}: // session,
Readonly<{
  children: React.ReactNode;
  // session: Session | null;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: 'url("/bg-line2.png")',
          backgroundSize: "cover", // Optional: to cover the entire background
          backgroundPosition: "center", // Optional: to center the image
          backgroundRepeat: "no-repeat",
        }}
        className={`${inter.className} ${dm_sans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
