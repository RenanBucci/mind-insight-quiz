
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useQuizStore } from '@/store/quizStore';
import { useBurnoutStore } from '@/store/burnoutStore';

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const { isQuizCompleted } = useQuizStore();
  const { isBurnoutCompleted } = useBurnoutStore();
  
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
            className="h-12 md:h-16 cursor-pointer"
            onClick={() => handleNavigation('/tests')}
          />
        </div>
        
        {isAuthenticated && (
          <nav className="hidden md:flex space-x-4 text-sm">
            <button 
              onClick={() => handleNavigation('/tests')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Testes
            </button>
            <button 
              onClick={() => handleNavigation('/anamnese-intro')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Anamnese {isQuizCompleted() && <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-1"></span>}
            </button>
            <button 
              onClick={() => handleNavigation('/burnout-intro')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Burnout {isBurnoutCompleted() && <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-1"></span>}
            </button>
            <button 
              onClick={() => handleNavigation('/report')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Relatório Anamnese
            </button>
            <button 
              onClick={() => handleNavigation('/burnout-report')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Relatório Burnout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
