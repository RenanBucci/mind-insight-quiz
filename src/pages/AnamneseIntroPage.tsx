
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const AnamneseIntroPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const handleStart = () => {
    navigate('/quiz');
  };

  const handleBack = () => {
    navigate('/tests');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">
                QUESTIONÁRIO DE ANAMNESE PSICOLÓGICA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">SOBRE ESTE QUESTIONÁRIO</h3>
                
                <p className="mb-4">
                  A anamnese psicológica é um procedimento inicial fundamental no processo terapêutico. 
                  Ela consiste em uma entrevista estruturada que visa coletar informações relevantes sobre o paciente, 
                  incluindo seu histórico pessoal, familiar, médico, profissional e as queixas que o levaram a buscar ajuda.
                </p>
                
                <p className="mb-4">
                  Este questionário está organizado em diferentes fases:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Fase 1:</strong> Identificação e queixas principais</li>
                  <li><strong>Fase 2:</strong> Histórico pessoal e familiar</li>
                  <li><strong>Fase 3:</strong> Avaliação de sintomas específicos</li>
                </ul>
                
                <p>
                  Suas respostas são confidenciais e serão utilizadas apenas para fins terapêuticos, 
                  auxiliando o profissional a desenvolver um plano de tratamento adequado às suas necessidades.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">INSTRUÇÕES AO PACIENTE</h3>
                
                <p className="mb-4">Prezado(a) paciente,</p>
                
                <p className="mb-4">
                  Na primeira fase do questionário, buscamos compreender seus dados básicos, 
                  motivos que o(a) trouxeram ao atendimento, e principais queixas atuais.
                </p>
                
                <p className="mb-4">
                  Por favor, responda a todas as questões com sinceridade, marcando a alternativa 
                  que melhor representa sua experiência:
                </p>
                
                <ul className="list-none space-y-1 mb-4">
                  <li><strong>A</strong> = Nunca/Discordo totalmente</li>
                  <li><strong>B</strong> = Raramente/Discordo parcialmente</li>
                  <li><strong>C</strong> = Às vezes/Nem concordo nem discordo</li>
                  <li><strong>D</strong> = Frequentemente/Concordo parcialmente</li>
                  <li><strong>E</strong> = Sempre/Concordo totalmente</li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
                <Button onClick={handleStart}>
                  Iniciar Questionário <ChevronRight className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnamneseIntroPage;
