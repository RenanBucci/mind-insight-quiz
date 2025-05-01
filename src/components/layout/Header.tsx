
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Check if we're in a Router context
  let navigate;
  try {
    navigate = useNavigate();
  } catch (error) {
    // If not in Router context, we'll handle navigation differently
    console.log("Navigation context not available");
  }

  const handleNavigation = (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      // Fallback for when Router is not available
      window.location.href = path;
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/d6b7cfbd-dbf9-4dbc-9630-7e1ed11c4895.png" 
            alt="Instituto Suavemente" 
            className="h-12 md:h-16"
          />
        </div>
        
        {isAuthenticated && (
          <nav className="hidden md:flex space-x-4 text-sm">
            <button 
              onClick={() => handleNavigation('/quiz')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Questionário
            </button>
            <button 
              onClick={() => handleNavigation('/report')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Relatório
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
