
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const BurnoutIntroPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const handleStart = () => {
    navigate('/burnout');
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
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 shadow-md mb-8">
            <h1 className="text-3xl font-bold text-center mb-8">TESTE DE BURNOUT PROFISSIONAL</h1>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">INTRODUÇÃO</h2>
                
                <p className="mb-4">Prezado(a) Colaborador(a),</p>
                
                <p className="mb-4">
                  Este questionário foi desenvolvido para avaliar como você tem se sentido em relação ao seu trabalho 
                  nas últimas semanas. Seu objetivo é identificar possíveis sinais de esgotamento profissional (burnout) 
                  para que possamos desenvolver estratégias tanto individuais quanto organizacionais para promover um 
                  ambiente de trabalho mais saudável.
                </p>
                
                <p className="mb-4">
                  Suas respostas são confidenciais e ajudarão a compor um panorama sobre o bem-estar no ambiente de trabalho. 
                  Os resultados serão analisados tanto individualmente (para seu autoconhecimento) quanto de forma agregada 
                  (para ações coletivas).
                </p>
                
                <p>
                  Por favor, responda com sinceridade, pensando em sua experiência atual.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">O QUE É BURNOUT?</h2>
                
                <p className="mb-4">
                  Burnout é uma síndrome resultante do estresse crônico no local de trabalho que não foi gerenciado com sucesso. 
                  É caracterizado por três dimensões:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Exaustão:</strong> Sentimentos de esgotamento de energia ou esgotamento</li>
                  <li><strong>Cinismo/Despersonalização:</strong> Sentimentos negativos ou cínicos relacionados ao trabalho, distanciamento mental do trabalho</li>
                  <li><strong>Redução da eficácia profissional:</strong> Sentimentos de incompetência e falta de realização</li>
                </ul>
                
                <p>
                  O burnout afeta não apenas o bem-estar individual, mas também o desempenho profissional e pessoal. 
                  Identificar seus sinais precocemente é fundamental para intervenções eficazes.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">INSTRUÇÕES</h2>
                
                <p className="mb-4">
                  O questionário está dividido em 7 partes que abordam diferentes aspectos da sua experiência profissional:
                </p>
                
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Histórico profissional breve</li>
                  <li>Exaustão emocional</li>
                  <li>Despersonalização e cinismo</li>
                  <li>Realização profissional</li>
                  <li>Sintomas físicos e ambiente organizacional</li>
                  <li>Estratégias de enfrentamento e suporte</li>
                  <li>Fatores externos e equilíbrio vida-trabalho</li>
                </ul>
                
                <p className="mb-4">
                  Para cada questão, selecione a alternativa que melhor representa sua experiência:
                </p>
                
                <ul className="list-none space-y-1 mb-4">
                  <li><strong>A</strong> = Nunca/Discordo totalmente</li>
                  <li><strong>B</strong> = Raramente/Discordo parcialmente</li>
                  <li><strong>C</strong> = Às vezes/Nem concordo nem discordo</li>
                  <li><strong>D</strong> = Frequentemente/Concordo parcialmente</li>
                  <li><strong>E</strong> = Sempre/Concordo totalmente</li>
                </ul>
              </div>
            </div>
          </Card>
              
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Voltar
            </Button>
            <Button onClick={handleStart} className="flex items-center gap-2">
              Iniciar Questionário <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BurnoutIntroPage;
