
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const AnamneseIntroPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o questionário", {
        duration: 3000,
      });
      navigate('/register');
    }
  }, [isAuthenticated, navigate]);
  
  const handleStartQuiz = () => {
    navigate('/anamnese-phases');
  };
  
  const handleBack = () => {
    navigate('/tests');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-6 shadow-md mb-8">
          <h1 className="text-3xl font-bold text-center mb-8">Anamnese Psicológica</h1>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">O que é uma Anamnese Psicológica?</h2>
              <p className="mb-4">
                A anamnese psicológica é uma entrevista inicial que visa coletar informações relevantes 
                sobre o histórico de vida do paciente, suas queixas principais, comportamentos, emoções, 
                relacionamentos e outros aspectos que ajudam o psicólogo a compreender melhor o contexto 
                e as necessidades específicas de cada pessoa.
              </p>
              
              <p className="mb-4">
                Este questionário está dividido em fases que abordam diferentes aspectos da sua vida e experiências.
                Cada fase foi cuidadosamente elaborada para fornecer uma compreensão abrangente da sua situação atual.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Instruções</h2>
              <p className="mb-4">
                O formulário a seguir contém questões que irão nos ajudar a compreender melhor suas necessidades.
                Por favor, responda às perguntas com sinceridade e o máximo de detalhes possível.
              </p>
              
              <p className="mb-4">
                Suas informações são confidenciais e serão utilizadas apenas para fins terapêuticos. Não há respostas
                certas ou erradas, o importante é que você expresse seus sentimentos e pensamentos genuínos.
              </p>
              
              <p>
                Se alguma pergunta for desconfortável, você pode optar por respondê-la mais tarde. O importante é 
                que possamos construir um panorama completo da sua situação atual.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Como funciona o questionário?</h2>
              <p className="mb-4">
                O questionário está dividido em 5 fases:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Fase 1:</strong> Identificação e queixas principais</li>
                <li><strong>Fase 2:</strong> História de vida e desenvolvimento pessoal</li>
                <li><strong>Fase 3:</strong> Padrões emocionais e comportamentais</li>
                <li><strong>Fase 4:</strong> Relacionamentos e dinâmicas interpessoais</li>
                <li><strong>Fase 5:</strong> Autoconceito e perspectivas futuras</li>
              </ul>
              
              <p className="mt-6">
                A partir das suas respostas, poderemos desenvolver um plano terapêutico personalizado que 
                atenda às suas necessidades específicas.
              </p>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" size="lg" onClick={handleBack}>
            Voltar
          </Button>
          
          <Button size="lg" onClick={handleStartQuiz} className="flex items-center gap-2">
            Continuar para as Fases <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AnamneseIntroPage;
