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
      <div className="min-h-screen bg-green-100 pt-24">
        <Navbar />
        <main className="bg-white p-6 rounded-t-3xl shadow-lg">
          {children}
          <ToastContainer position="top-center" autoClose={3000} />
        </main>
        <FooterDashboard />
      </div>
    </ProtectedPageMidlewares>
  );
}
