
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, BrainCircuit, ChevronRight, Clock, FileText, Flame, Activity, Target } from 'lucide-react';
import { useMissionStore } from '@/store/missionStore';
import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const BurnoutIntroPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { setMissionProgress } = useMissionStore();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Update mission progress when page is visited
    setMissionProgress('start-burnout', 0.5);
  }, [setMissionProgress]);
  
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
      <div className="min-h-screen py-8 md:py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Hero section */}
            <div className="mb-8 md:mb-12">
              <Card className="p-6 md:p-8 border-0 shadow-lg rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 opacity-10">
                  <Flame className="w-full h-full text-orange-500" />
                </div>
                
                <div className="flex flex-col md:flex-row items-start gap-6 z-10 relative">
                  <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white hidden md:flex items-center justify-center">
                    <Activity className="h-12 w-12" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white md:hidden">
                        <Activity className="h-6 w-6" />
                      </div>
                      <h1 className="text-2xl md:text-4xl font-bold text-orange-900">
                        Teste de Burnout Profissional
                      </h1>
                    </div>
                    
                    <p className="text-base md:text-lg text-orange-800 mb-4 md:mb-6">
                      Olá, <span className="font-semibold">{user?.name || 'Colaborador(a)'}</span>! Este questionário 
                      foi desenvolvido para identificar possíveis sinais de esgotamento profissional (burnout) e ajudar 
                      a desenvolver estratégias para um ambiente de trabalho mais saudável.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      <div className="flex items-center gap-1.5 text-sm text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">10-15 minutos</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-sm text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">7 seções</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-sm text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full">
                        <Target className="h-4 w-4" />
                        <span className="font-medium">Resultados imediatos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Content sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-0 bg-white">
                <div className="flex items-start gap-4 h-full flex-col">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">O que é Burnout?</h2>
                    <p className="text-gray-700 mb-4">
                      Burnout é uma síndrome resultante do estresse crônico no local de trabalho que não foi gerenciado com sucesso. 
                      É caracterizado por três dimensões principais:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li><strong>Exaustão:</strong> Esgotamento de energia física e emocional</li>
                      <li><strong>Cinismo:</strong> Sentimentos negativos ou distanciamento do trabalho</li>
                      <li><strong>Redução da eficácia:</strong> Sentimentos de incompetência e falta de realização</li>
                    </ul>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-0 bg-white">
                <div className="flex items-start gap-4 h-full flex-col">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Objetivos do Teste</h2>
                    <p className="text-gray-700 mb-4">
                      Este questionário ajudará a:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Identificar sinais precoces de burnout</li>
                      <li>Avaliar seu nível atual de estresse profissional</li>
                      <li>Oferecer insights sobre fatores contribuintes</li>
                      <li>Fornecer uma base para ações preventivas</li>
                      <li>Auxiliar no desenvolvimento de estratégias de bem-estar</li>
                    </ul>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-0 bg-white">
                <div className="flex items-start gap-4 h-full flex-col">
                  <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Instruções</h2>
                    <p className="text-gray-700 mb-4">
                      O questionário está dividido em 7 partes que abordam diferentes aspectos da sua experiência profissional.
                    </p>
                    <p className="text-gray-700 mb-3">
                      Para cada questão, selecione a alternativa que melhor representa sua experiência:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold bg-gray-100 px-2 py-1 rounded">A</span>
                        <span>Nunca/Discordo totalmente</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold bg-gray-100 px-2 py-1 rounded">B</span>
                        <span>Raramente/Discordo parcialmente</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold bg-gray-100 px-2 py-1 rounded">C</span>
                        <span>Às vezes/Neutro</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold bg-gray-100 px-2 py-1 rounded">D</span>
                        <span>Frequentemente/Concordo parcialmente</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold bg-gray-100 px-2 py-1 rounded">E</span>
                        <span>Sempre/Concordo totalmente</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Confidentiality note */}
            <Card className="p-6 border border-blue-100 bg-blue-50 shadow-sm mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 mt-1">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Confidencialidade</h3>
                  <p className="text-blue-700">
                    Suas respostas são confidenciais e ajudarão a compor um panorama sobre o bem-estar no ambiente de trabalho.
                    Os resultados serão analisados tanto individualmente (para seu autoconhecimento) quanto de forma agregada
                    (para ações coletivas).
                  </p>
                </div>
              </div>
            </Card>
                  
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="order-2 sm:order-1"
              >
                Voltar para Testes
              </Button>
              <Button 
                onClick={handleStart} 
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 order-1 sm:order-2"
              >
                Iniciar Questionário <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BurnoutIntroPage;
