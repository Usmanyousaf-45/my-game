import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-linear-to-br from-gray-600 via-gray-500 to-black text-white min-h-screen">
        <Navbar />

        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}