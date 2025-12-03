import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getUser, getAdmin } from "@/lib/auth";

export const metadata = {
  title: "Jackson Market",
  description: "Fresh groceries delivered from Jackson Market",
};

export default async function RootLayout({ children }) {
  const admin = await getAdmin();
  const user = admin || (await getUser()); // 🔥 admin first, then user

  return (
    <html lang="en">
      <body className="bg-[#f4f1e8] min-h-screen flex flex-col">
        <Navbar user={user} />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
