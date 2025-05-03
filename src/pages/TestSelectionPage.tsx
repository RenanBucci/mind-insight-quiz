
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuthStore } from '@/store/authStore';
import { useQuizStore } from '@/store/quizStore';
import { useBurnoutStore } from '@/store/burnoutStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FileText, Briefcase } from 'lucide-react';

const TestSelectionPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { isQuizCompleted } = useQuizStore();
  const { isBurnoutCompleted } = useBurnoutStore();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar os testes", {
        duration: 3000,
      });
      navigate('/register');
    }
  }, [isAuthenticated, navigate]);

  const handleAnamnesiClick = () => {
    navigate('/anamnese-intro');
  };

  const handleBurnoutClick = () => {
    navigate('/burnout-intro');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Selecione um Questionário para Iniciar
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className={`transition-all hover:shadow-md ${isQuizCompleted() ? 'border-primary/40' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Anamnese Psicológica
                </CardTitle>
                <CardDescription>
                  Avaliação inicial para compreensão do perfil psicológico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Este questionário permite identificar dados básicos, motivos de consulta e principais queixas atuais.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    {isQuizCompleted() && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Concluído</span>}
                  </div>
                  <Button onClick={handleAnamnesiClick}>
                    {isQuizCompleted() ? 'Revisar Questionário' : 'Iniciar Questionário'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={`transition-all hover:shadow-md ${isBurnoutCompleted() ? 'border-primary/40' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6" />
                  Burnout Profissional
                </CardTitle>
                <CardDescription>
                  Avaliação de esgotamento profissional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Este questionário avalia como você tem se sentido em relação ao seu trabalho e identifica possíveis sinais de burnout.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    {isBurnoutCompleted() && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Concluído</span>}
                  </div>
                  <Button onClick={handleBurnoutClick}>
                    {isBurnoutCompleted() ? 'Revisar Questionário' : 'Iniciar Questionário'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestSelectionPage;
