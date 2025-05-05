
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { ChevronRight, BookOpen, Brain, Target, Users, Clock } from 'lucide-react';
import { useMissionStore } from '@/store/missionStore';
import MissionCard from '@/components/missions/MissionCard';

const AnamneseIntroPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { missions, setActiveMission, setMissionProgress } = useMissionStore();
  
  // Find relevant missions
  const startAnamneseMission = missions.find(m => m.id === 'start-anamnese');
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o questionário", {
        duration: 3000,
      });
      navigate('/register');
      return;
    }
    
    // Set the mission as active when user visits this page
    if (startAnamneseMission && !startAnamneseMission.completed) {
      setActiveMission('start-anamnese');
    }
  }, [isAuthenticated, navigate, startAnamneseMission, setActiveMission]);
  
  const handleStartQuiz = () => {
    // Progress on the mission
    if (startAnamneseMission && !startAnamneseMission.completed) {
      setMissionProgress('start-anamnese', 1);
    }
    navigate('/anamnese-phases');
  };
  
  const handleBack = () => {
    navigate('/tests');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg rounded-xl mb-8 border-0 bg-gradient-to-br from-white to-blue-50">
              <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Anamnese Psicológica
              </h1>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">O que é uma Anamnese Psicológica?</h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        A anamnese psicológica é uma entrevista inicial que visa coletar informações relevantes 
                        sobre o histórico de vida do paciente, suas queixas principais, comportamentos, emoções, 
                        relacionamentos e outros aspectos que ajudam o psicólogo a compreender melhor o contexto 
                        e as necessidades específicas de cada pessoa.
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed">
                        Este questionário está dividido em fases que abordam diferentes aspectos da sua vida e experiências.
                        Cada fase foi cuidadosamente elaborada para fornecer uma compreensão abrangente da sua situação atual.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Instruções</h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        O formulário a seguir contém questões que irão nos ajudar a compreender melhor suas necessidades.
                        Por favor, responda às perguntas com sinceridade e o máximo de detalhes possível.
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Suas informações são confidenciais e serão utilizadas apenas para fins terapêuticos. Não há respostas
                        certas ou erradas, o importante é que você expresse seus sentimentos e pensamentos genuínos.
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed">
                        Se alguma pergunta for desconfortável, você pode optar por respondê-la mais tarde. O importante é 
                        que possamos construir um panorama completo da sua situação atual.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Como funciona o questionário?</h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        O questionário está dividido em 5 fases:
                      </p>
                      <ul className="space-y-3 mb-5">
                        {[
                          {label: "FASE 1", desc: "Identificação e queixas principais", color: "bg-blue-100 text-blue-700"},
                          {label: "FASE 2", desc: "História de vida e desenvolvimento pessoal", color: "bg-teal-100 text-teal-700"},
                          {label: "FASE 3", desc: "Padrões emocionais e comportamentais", color: "bg-green-100 text-green-700"},
                          {label: "FASE 4", desc: "Relacionamentos e dinâmicas interpessoais", color: "bg-amber-100 text-amber-700"},
                          {label: "FASE 5", desc: "Autoconceito e perspectivas futuras", color: "bg-purple-100 text-purple-700"}
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.color}`}>
                              {item.label}
                            </span>
                            <span className="text-gray-700">{item.desc}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center gap-3 text-gray-700 border-t border-gray-100 pt-4">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <p className="text-sm">
                          A partir das suas respostas, poderemos desenvolver um plano terapêutico personalizado 
                          que atenda às suas necessidades específicas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="p-5 rounded-xl border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">Recomendado para você</p>
                </div>
                <h3 className="text-xl font-bold mb-2">Comece Sua Jornada</h3>
                <p className="mb-5 text-white/80 text-sm">
                  Ao completar este questionário, você terá uma compreensão mais profunda de seus padrões emocionais e comportamentais.
                </p>
                <Button 
                  onClick={handleStartQuiz} 
                  className="w-full bg-white hover:bg-gray-100 text-indigo-700 border-0"
                >
                  Iniciar Agora <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Card>
              
              {startAnamneseMission && (
                <div className="animate-fade-in">
                  <p className="text-sm font-medium text-gray-700 mb-2 pl-1">Sua missão atual:</p>
                  <MissionCard 
                    mission={startAnamneseMission} 
                    isActive={true}
                    className="bg-white"
                  />
                </div>
              )}
              
              <div className="flex justify-center">
                <Button variant="outline" size="sm" onClick={handleBack} className="text-gray-600">
                  Voltar para seleção de testes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnamneseIntroPage;
