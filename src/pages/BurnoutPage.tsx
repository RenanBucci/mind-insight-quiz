
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuthStore } from '@/store/authStore';
import { useBurnoutStore } from '@/store/burnoutStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import QuizProgress from '@/components/quiz/QuizProgress';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const BurnoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { questions, setAnswer, setSubAnswer, getAnsweredCount, markBurnoutCompleted, isBurnoutCompleted } = useBurnoutStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = getAnsweredCount();
  
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o questionário", {
        duration: 3000,
      });
      navigate('/register');
    }
  }, [isAuthenticated, navigate]);
  
  const handleAnswer = (questionId: number, answer: string) => {
    setAnswer(questionId, answer);
    
    // For questions C, D, or E that have sub-questions
    if (['C', 'D', 'E'].includes(answer) && currentQuestion.subQuestion) {
      // Don't automatically advance to the next question, let the user answer the sub-question
    } else if (!isLastQuestion) {
      // Automatically advance to the next question after a short delay
      setTimeout(() => {
        handleNextQuestion();
      }, 500);
    }
  };
  
  const handleSubAnswer = (questionId: number, answer: string) => {
    setSubAnswer(questionId, answer);
  };
  
  const handlePrevQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleSubmitBurnout = async () => {
    // Check if all questions have been answered
    const unansweredCount = questions.filter(q => q.answer === null || q.answer === "").length;
    
    if (unansweredCount > 0) {
      toast.error(`Por favor, responda todas as ${unansweredCount} questões antes de continuar`);
      return;
    }
    
    markBurnoutCompleted();
    
    try {
      // Send burnout data to webhook
      const burnoutData = {
        user: user,
        testType: "burnout",
        questions: questions,
        completedAt: new Date().toISOString()
      };
      
      // You'll need to replace this with your n8n webhook URL
      const webhookUrl = localStorage.getItem('n8nWebhook') || '';
      
      if (!webhookUrl) {
        toast.error("URL do webhook não configurada. Por favor, configure nas configurações.");
        navigate('/burnout-report');
        return;
      }
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(burnoutData),
        mode: 'no-cors' // Add this to handle CORS
      });
      
      toast.success("Dados enviados com sucesso para processamento!");
      navigate('/burnout-report');
    } catch (error) {
      console.error("Erro ao enviar dados para o webhook:", error);
      toast.error("Erro ao enviar dados. Verifique o console para mais detalhes.");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const renderSubQuestion = () => {
    if (!currentQuestion.subQuestion || !['C', 'D', 'E'].includes(currentQuestion.answer || '')) {
      return null;
    }

    return (
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="italic text-gray-600 mb-3">{currentQuestion.subQuestion.text}</p>
        <Input
          type="text"
          value={currentQuestion.subQuestion.answer || ""}
          onChange={(e) => handleSubAnswer(currentQuestion.id, e.target.value)}
          placeholder="Digite sua resposta aqui..."
          className="w-full"
        />
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {currentQuestionIndex === 0 && (
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              TESTE DE BURNOUT PROFISSIONAL
            </h1>
          )}
          
          <QuizProgress answered={answeredCount} total={questions.length} />
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              {currentQuestion.section && (
                <p className="text-sm text-gray-500 mb-2">{currentQuestion.section}</p>
              )}
              
              <h3 className="text-lg font-medium mb-6">
                {currentQuestion.id}. {currentQuestion.text}
              </h3>
              
              <RadioGroup
                value={currentQuestion.answer || ""}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option, index) => {
                  let optionLabel = "";
                  switch (option) {
                    case "A": optionLabel = "Nunca"; break;
                    case "B": optionLabel = "Raramente"; break;
                    case "C": optionLabel = "Às vezes"; break;
                    case "D": optionLabel = "Frequentemente"; break;
                    case "E": optionLabel = "Sempre"; break;
                    default: optionLabel = option;
                  }
                  
                  return (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        id={`q${currentQuestion.id}-option${index}`}
                        value={option}
                      />
                      <Label htmlFor={`q${currentQuestion.id}-option${index}`} className="text-base cursor-pointer w-full">
                        {option} - {optionLabel}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
              
              {renderSubQuestion()}
            </CardContent>
          </Card>
          
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevQuestion}
              disabled={isFirstQuestion}
              variant="outline"
              size="lg"
              className="px-6"
            >
              <ChevronLeft className="mr-2" /> Anterior
            </Button>
            
            {isLastQuestion ? (
              <Button
                onClick={handleSubmitBurnout}
                size="lg"
                className="px-8"
                disabled={!currentQuestion.answer}
              >
                Finalizar Questionário
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={!currentQuestion.answer}
                size="lg"
                className="px-8"
              >
                Próxima <ChevronRight className="ml-2" />
              </Button>
            )}
          </div>
          
          <div className="text-center text-sm text-text-secondary mt-4">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BurnoutPage;
