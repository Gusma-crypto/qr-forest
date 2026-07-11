import Navbar from "@/components/Navbar";
import FooterDashboard from "@/components/FooterDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedPageMidlewares from "@/components/ProtectedPageMidlewares";
export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <ProtectedPageMidlewares>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d1fae5,transparent_32%),linear-gradient(135deg,#f8fafc_0%,#ecfdf5_48%,#eef2ff_100%)] pt-24">
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          {children}
          <ToastContainer position="top-center" autoClose={3000} />
        </main>
        <FooterDashboard />
      </div>
    </ProtectedPageMidlewares>
  );
}
