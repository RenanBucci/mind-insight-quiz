
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Brain, Activity, BadgeCheck, Trophy, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/store/quizStore';
import { useBurnoutStore } from '@/store/burnoutStore';
import { useMissionStore } from '@/store/missionStore';
import { Separator } from "@/components/ui/separator";
import MissionDashboard from '@/components/missions/MissionDashboard';

const TestSelectionPage = () => {
  const navigate = useNavigate();
  const { isQuizCompleted } = useQuizStore();
  const { isBurnoutCompleted } = useBurnoutStore();
  const { missions, completedMissions } = useMissionStore();
  
  const navigate1 = useNavigate();
  
  const handleTestSelect = (testPath: string) => {
    navigate(testPath);
  };
  
  const anamneseProgress = isQuizCompleted() ? 100 : 0;
  const burnoutProgress = isBurnoutCompleted() ? 100 : 0;
  
  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <section className="mb-16">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Bem-vindo ao Instituto Suavemente
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Escolha um teste para começar sua jornada de autoconhecimento. 
                Cada teste foi desenvolvido para ajudar você a compreender melhor 
                diferentes aspectos da sua vida e saúde mental.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden h-40 bg-gradient-to-r from-blue-600 to-indigo-700">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuLWNpcmNsZXMiIHg9IjAiIHk9IjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuLWNpcmNsZXMpIi8+PC9zdmc+')]"></div>
                  <div className="absolute right-6 bottom-0 translate-y-1/3 transform transition-transform duration-300 group-hover:translate-y-1/4">
                    <Brain className="h-32 w-32 text-white/10" />
                  </div>
                  <div className="absolute p-6 text-white z-10">
                    <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-lg mb-3">
                      <Brain className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Anamnese Psicológica</h2>
                    <p className="text-white/80">Uma avaliação completa em 5 fases</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-5">
                    <p className="text-gray-600 mb-4">
                      Uma entrevista detalhada que explora diversos aspectos da sua vida, 
                      ajudando a identificar padrões, comportamentos e sentimentos que 
                      podem contribuir para o seu bem-estar emocional.
                    </p>
                    
                    {anamneseProgress > 0 && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full"
                            style={{ width: `${anamneseProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Progresso</span>
                          <span className="text-xs font-medium text-gray-700">{anamneseProgress}%</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 mb-5">
                      <BadgeCheck className="h-4 w-4 mr-1 text-blue-500" />
                      <span>5 fases | {isQuizCompleted() ? 'Completado' : 'Em andamento'}</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-0 shadow-md"
                      onClick={() => handleTestSelect('/anamnese-intro')}
                    >
                      {isQuizCompleted() ? 'Ver Resultado' : anamneseProgress > 0 ? 'Continuar' : 'Iniciar Teste'}
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden h-40 bg-gradient-to-r from-orange-500 to-red-600">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuLWNpcmNsZXMiIHg9IjAiIHk9IjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuLWNpcmNsZXMpIi8+PC9zdmc+')]"></div>
                  <div className="absolute right-6 bottom-0 translate-y-1/3 transform transition-transform duration-300 group-hover:translate-y-1/4">
                    <Activity className="h-32 w-32 text-white/10" />
                  </div>
                  <div className="absolute p-6 text-white z-10">
                    <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-lg mb-3">
                      <Activity className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Teste de Burnout</h2>
                    <p className="text-white/80">Avaliar seu nível de esgotamento profissional</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-5">
                    <p className="text-gray-600 mb-4">
                      O teste de Burnout avalia seu nível de esgotamento profissional, 
                      identificando sinais de cansaço extremo, cinismo e redução da eficácia 
                      profissional relacionados ao trabalho.
                    </p>
                    
                    {burnoutProgress > 0 && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-orange-500 h-full"
                            style={{ width: `${burnoutProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Progresso</span>
                          <span className="text-xs font-medium text-gray-700">{burnoutProgress}%</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 mb-5">
                      <Trophy className="h-4 w-4 mr-1 text-orange-500" />
                      <span>15 questões | {isBurnoutCompleted() ? 'Completado' : 'Em andamento'}</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 border-0 shadow-md"
                      onClick={() => handleTestSelect('/burnout-intro')}
                    >
                      {isBurnoutCompleted() ? 'Ver Resultado' : burnoutProgress > 0 ? 'Continuar' : 'Iniciar Teste'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
          
          <Separator className="my-12" />
          
          <section>
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Missões</h2>
              </div>
              <p className="text-gray-600 mt-2">
                Complete missões para acompanhar seu progresso e desbloquear novas etapas da sua jornada.
              </p>
            </div>
            
            <MissionDashboard />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TestSelectionPage;
