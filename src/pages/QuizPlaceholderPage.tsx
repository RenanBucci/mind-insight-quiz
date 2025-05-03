
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

const QuizPlaceholderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  
  // Extract phase number from URL
  const phaseNumber = location.pathname.includes('phase') 
    ? location.pathname.split('phase')[1]
    : '?';
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o questionário", {
        duration: 3000,
      });
      navigate('/register');
    }
  }, [isAuthenticated, navigate]);
  
  const handleBack = () => {
    navigate('/anamnese-phases');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            Fase {phaseNumber} - Em breve!
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-lg">
              Esta fase do questionário ainda está sendo desenvolvida e estará disponível em breve.
            </p>
          </div>
          
          <p className="mb-6">
            As questões para esta fase estão sendo cuidadosamente elaboradas por nossa equipe de psicólogos 
            para garantir uma avaliação completa e precisa.
          </p>
          
          <p className="mb-8">
            Por favor, retorne à seleção de fases e continue trabalhando com as fases disponíveis.
          </p>
          
          <div className="text-center">
            <Button size="lg" onClick={handleBack}>
              Voltar para Seleção de Fases
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuizPlaceholderPage;
