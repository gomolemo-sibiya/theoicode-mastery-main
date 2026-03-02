import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Code, FileText, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home", icon: BookOpen },
  { to: "/courses", label: "Courses", icon: Code },
  { to: "/curriculum/python", label: "Curriculum", icon: FileText },
  { to: "/progress", label: "Progress", icon: BarChart3 },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
            <span className="text-accent">‹/›</span>
            Theoicode
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || 
                (item.to !== "/" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon size={15} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-card px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card py-6 mt-auto">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>Theoicode — Coding a day keeps a fail away.</p>
          <p className="mt-1 text-xs">Theory → Practice → Test. No shortcuts.</p>
        </div>
      </footer>
    </div>
  );
}
