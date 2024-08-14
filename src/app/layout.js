import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header/header";
import { CrowdFundingProvider } from "@/Context/CrowdFunding";
import Footer from "@/components/Footer/Footer";
import "antd/dist/reset.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen  bg-dark-300  font-sans antialiased",
          inter.className
        )}
      >
        <CrowdFundingProvider>
          <Header />
          {children}
          <Footer />
        </CrowdFundingProvider>
      </body>
    </html>
  );
}
