import "./globals.css";
import NavbarWrapper from "@/components/navbar-wrapper";
import Footer from "@/components/footer";

export const metadata = {
  title: "Jackson Market",
  description: "Fresh groceries delivered from Jackson Market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f4f1e8] text-[#1a1a1a] min-h-screen flex flex-col">
        <NavbarWrapper />  {/* This now passes `user={...}` */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
