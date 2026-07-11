export default function FooterDashboard() {
  return (
    <footer className="border-t border-emerald-100 bg-white/80 py-5 text-slate-600 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-sm md:flex-row sm:px-6 lg:px-8">
        <span>© {new Date().getFullYear()} QRForest. All rights reserved.</span>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 transition hover:text-emerald-900">
          Gunardi
        </a>
      </div>
    </footer>
  );
}
