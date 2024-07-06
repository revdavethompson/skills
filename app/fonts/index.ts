import localFont from "next/font/local";
import { Inter, Indie_Flower, Shantell_Sans } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const zayne = localFont({
  src: "./Zayne.ttf",
  variable: "--font-zayne",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const shantell_sans = Shantell_Sans({
  variable: "--font-shantell-sans",
  subsets: ["latin"],
});


