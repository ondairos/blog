import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Blog",
  description: "My personal Bloggin space.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-800">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
