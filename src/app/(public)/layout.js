
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getUser, getAdmin } from "@/lib/auth";
import NavbarTest from "@/components/NavbarTest";

export const metadata = {
    title: "Jackson Market",
    description: "Fresh groceries delivered from Jackson Market",
};

export default async function RootLayout({ children }) {
    const admin = await getAdmin();
    const user = admin || (await getUser()); // 🔥 admin first, then user

    return (

        <div className="bg-[#eff5ee] min-h-screen flex flex-col">

            <NavbarTest user={user} />
            <main className="flex-1 mx-auto w-full ">
                {children}
            </main>
            <Footer />


        </div>
    );
}
