import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import cowIcon from "@/assets/cow-icon.png";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/analysis", label: "Cattle Analysis" },
    { path: "/nutrition", label: "Nutrition Planner" },
    { path: "/advisor", label: "Business Advisor" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`${
            mobile ? "block py-2" : ""
          } text-sm font-medium transition-colors hover:text-primary ${
            isActive(link.path) ? "text-primary" : "text-foreground/80"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={cowIcon} alt="AgroOx" className="h-10 w-10" />
          <span className="text-xl font-bold text-primary">AgroOx AI</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-6">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" asChild className="hidden md:inline-flex">
            <Link to="/auth">Get Started</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks mobile />
                <Button variant="default" asChild className="mt-4">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
