
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const ReportPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { questions, isQuizCompleted, resetQuiz } = useQuizStore();
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(localStorage.getItem('n8nWebhook') || '');
  const [perplexityApiKey, setPerplexityApiKey] = useState(localStorage.getItem('perplexityApiKey') || '');
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o relatório", {
        duration: 3000,
      });
      navigate('/register');
      return;
    }
    
    if (!isQuizCompleted()) {
      toast.error("Você precisa completar o questionário primeiro", {
        duration: 3000,
      });
      navigate('/quiz');
    }
  }, [isAuthenticated, isQuizCompleted, navigate]);

  useEffect(() => {
    if (webhookUrl) {
      localStorage.setItem('n8nWebhook', webhookUrl);
    }
    if (perplexityApiKey) {
      localStorage.setItem('perplexityApiKey', perplexityApiKey);
    }
  }, [webhookUrl, perplexityApiKey]);

  const generateAiAnalysis = async () => {
    if (!perplexityApiKey) {
      toast.error("Chave API do Perplexity não configurada");
      return;
    }

    setIsAnalysisLoading(true);
    try {
      // Prepare data for analysis
      const questionAnswers = questions.map(q => `Pergunta: ${q.text}\nResposta: ${q.answer}`).join('\n\n');
      
      const prompt = `
        Analise as respostas deste questionário psicológico e forneça insights sobre a personalidade do respondente.
        Nome: ${user?.name || 'Não informado'}
        Email: ${user?.email || 'Não informado'}
        Gênero: ${user?.gender || 'Não informado'}
        
        RESPOSTAS:
        ${questionAnswers}
        
        Por favor, forneça uma análise concisa e respeitosa (em português) sobre o perfil psicológico desta pessoa com base nas respostas.
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
              content: 'Você é um psicólogo especializado em análise de perfis psicológicos. Forneça análises respeitosas, éticas e úteis com base nas respostas do questionário.'
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
  
  const handleRefreshQuiz = () => {
    resetQuiz();
    navigate('/quiz');
  };

  if (!isAuthenticated || !isQuizCompleted()) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">
                Seu Relatório de Respostas
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
                      <span className="text-primary">{question.answer}</span>
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {aiAnalysis && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  Análise Psicológica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{aiAnalysis}</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">URL do Webhook n8n</label>
                  <Input
                    placeholder="https://seu-webhook-n8n.com/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Chave API do Perplexity</label>
                  <Input
                    type="password"
                    placeholder="pplx-xxxxxxx..."
                    value={perplexityApiKey}
                    onChange={(e) => setPerplexityApiKey(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button onClick={handleRefreshQuiz} variant="outline">
              Refazer Questionário
            </Button>
            
            <Button 
              onClick={generateAiAnalysis} 
              disabled={isAnalysisLoading || !perplexityApiKey}
            >
              {isAnalysisLoading ? "Gerando Análise..." : "Gerar Análise Psicológica"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportPage;
