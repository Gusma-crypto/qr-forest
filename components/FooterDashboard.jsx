export default function FooterDashboard() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-green-800 text-white py-3 shadow-inner z-40">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <span>© {new Date().getFullYear()} QRForest. All rights reserved.</span>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white transition mt-1 md:mt-0">
          Gunardi
        </a>
      </div>
    </footer>
  );
}
