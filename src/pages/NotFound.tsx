
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-text-primary mb-6">
          Oops! Página não encontrada
        </p>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button onClick={() => navigate("/")}>
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
