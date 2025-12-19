import { getAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const admin = await getAdmin();

  // 🔒 HARD BLOCK RENDER
  if (!admin || admin.role !== "ADMIN") {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
