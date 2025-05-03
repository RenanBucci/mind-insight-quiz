
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { toast } from 'sonner';

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
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Anamnese Psicológica</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
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
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Como funciona o questionário?</h2>
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
        
        <div className="flex justify-between">
          <Button variant="outline" size="lg" onClick={handleBack}>
            Voltar
          </Button>
          
          <Button size="lg" onClick={handleStartQuiz}>
            Continuar para o Questionário
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AnamneseIntroPage;
