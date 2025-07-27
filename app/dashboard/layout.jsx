import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedPageMidlewares from '@/components/ProtectedPageMidlewares';
export const metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <ProtectedPageMidlewares>
    <div className="min-h-screen bg-green-100 pt-24">
        <Navbar />
        <main className="bg-white p-6 rounded-t-3xl shadow-lg">
            {children}
        </main>
        <Footer />
    </div>
    </ProtectedPageMidlewares>

  );
}
