import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">{t("notfound.title")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("notfound.message")}</p>
        <Link to="/" className="text-primary underline hover:text-primary/80">
          {t("notfound.back")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
