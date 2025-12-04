// src/app/layout.js
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400","500","600","700"], 
  variable: "--font-poppins"
});

export const metadata = {
  title: "Professional Task Manager",
  description: "A polished task manager app for portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
