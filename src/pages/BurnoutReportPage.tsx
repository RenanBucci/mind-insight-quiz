
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuthStore } from '@/store/authStore';
import { useBurnoutStore } from '@/store/burnoutStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const BurnoutReportPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { questions, isBurnoutCompleted, resetBurnout } = useBurnoutStore();
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const perplexityApiKey = localStorage.getItem('perplexityApiKey') || '';
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o relatório", {
        duration: 3000,
      });
      navigate('/register');
      return;
    }
    
    if (!isBurnoutCompleted()) {
      toast.error("Você precisa completar o questionário de burnout primeiro", {
        duration: 3000,
      });
      navigate('/burnout-intro');
    }
  }, [isAuthenticated, isBurnoutCompleted, navigate]);

  const generateAiAnalysis = async () => {
    if (!perplexityApiKey) {
      toast.error("Chave API do Perplexity não configurada");
      return;
    }

    setIsAnalysisLoading(true);
    try {
      // Prepare data for analysis
      const questionAnswers = questions.map(q => {
        let answer = '';
        switch (q.answer) {
          case 'A': answer = 'Nunca'; break;
          case 'B': answer = 'Raramente'; break;
          case 'C': answer = 'Às vezes'; break;
          case 'D': answer = 'Frequentemente'; break;
          case 'E': answer = 'Sempre'; break;
          default: answer = q.answer || 'Não respondido';
        }
        
        let result = `Pergunta: ${q.text}\nResposta: ${answer}`;
        
        if (q.subQuestion && q.subQuestion.answer && ['C', 'D', 'E'].includes(q.answer || '')) {
          result += `\nSub-pergunta: ${q.subQuestion.text}\nResposta: ${q.subQuestion.answer}`;
        }
        
        return result;
      }).join('\n\n');
      
      const prompt = `
        Analise as respostas deste questionário de burnout profissional e forneça insights sobre o nível de esgotamento profissional do respondente.
        Nome: ${user?.name || 'Não informado'}
        Email: ${user?.email || 'Não informado'}
        Gênero: ${user?.gender || 'Não informado'}
        
        RESPOSTAS:
        ${questionAnswers}
        
        Por favor, forneça uma análise concisa e respeitosa (em português) sobre o nível de burnout desta pessoa com base nas respostas.
        Indique o nível geral de burnout (baixo, moderado, alto ou severo) e considere os seguintes aspectos:
        1. Exaustão emocional
        2. Despersonalização/cinismo
        3. Realização profissional
        4. Sintomas físicos
        5. Estratégias de enfrentamento
        6. Recomendações específicas para a pessoa
      `;

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'Você é um psicólogo especializado em saúde ocupacional e burnout profissional. Forneça análises respeitosas, éticas e úteis com base nas respostas do questionário.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      const analysisText = data.choices?.[0]?.message?.content || 'Não foi possível gerar uma análise.';
      setAiAnalysis(analysisText);
    } catch (error) {
      console.error("Erro ao gerar análise:", error);
      toast.error("Erro ao gerar análise. Verifique sua chave API e tente novamente.");
    } finally {
      setIsAnalysisLoading(false);
    }
  };
  
  const handleRefreshBurnout = () => {
    resetBurnout();
    navigate('/burnout');
  };

  const handleBackToTests = () => {
    navigate('/tests');
  };

  if (!isAuthenticated || !isBurnoutCompleted()) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">
                Seu Relatório de Burnout Profissional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-medium mb-2">
                      {question.id}. {question.text}
                    </h3>
                    <p>
                      <span className="font-semibold">Sua Resposta:</span> {" "}
                      <span className="text-primary">
                        {question.answer === 'A' ? 'A - Nunca' : 
                         question.answer === 'B' ? 'B - Raramente' :
                         question.answer === 'C' ? 'C - Às vezes' :
                         question.answer === 'D' ? 'D - Frequentemente' :
                         question.answer === 'E' ? 'E - Sempre' : question.answer}
                      </span>
                    </p>
                    {question.subQuestion && question.subQuestion.answer && ['C', 'D', 'E'].includes(question.answer || '') && (
                      <p className="mt-2 ml-4 text-sm">
                        <span className="font-semibold italic">{question.subQuestion.text}</span> {" "}
                        <span className="text-primary">{question.subQuestion.answer}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {aiAnalysis && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  Análise de Burnout Profissional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{aiAnalysis}</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button onClick={handleBackToTests} variant="outline">
              Voltar para Testes
            </Button>
            
            <Button onClick={handleRefreshBurnout} variant="outline">
              Refazer Questionário de Burnout
            </Button>
            
            <Button 
              onClick={generateAiAnalysis} 
              disabled={isAnalysisLoading || !perplexityApiKey}
            >
              {isAnalysisLoading ? "Gerando Análise..." : "Gerar Análise de Burnout"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BurnoutReportPage;
