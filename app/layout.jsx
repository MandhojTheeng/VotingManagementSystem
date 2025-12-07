import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Election Commission of Nepal",
  description: "Official Digital Voting Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 p-0 w-screen min-h-screen bg-white text-black overflow-x-hidden">
        <Navbar />
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}