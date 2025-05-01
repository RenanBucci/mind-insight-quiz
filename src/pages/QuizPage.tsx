
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizProgress from '@/components/quiz/QuizProgress';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const QuizPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { questions, setAnswer, getAnsweredCount, markQuizCompleted, isQuizCompleted } = useQuizStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = getAnsweredCount();
  const progress = Math.round((answeredCount / questions.length) * 100);
  
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
    
    // Automatically advance to next question after answering
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    }
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
  
  const handleSubmitQuiz = async () => {
    if (answeredCount === questions.length) {
      markQuizCompleted();
      
      try {
        // Send quiz data to webhook
        const quizData = {
          user: user,
          questions: questions,
          completedAt: new Date().toISOString()
        };
        
        // You'll need to replace this with your n8n webhook URL
        const webhookUrl = localStorage.getItem('n8nWebhook') || '';
        
        if (!webhookUrl) {
          toast.error("URL do webhook não configurada. Por favor, configure nas configurações.");
          navigate('/report');
          return;
        }
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizData),
          mode: 'no-cors' // Add this to handle CORS
        });
        
        toast.success("Dados enviados com sucesso para processamento!");
      } catch (error) {
        console.error("Erro ao enviar dados para o webhook:", error);
        toast.error("Erro ao enviar dados. Verifique o console para mais detalhes.");
      }
      
      navigate('/report');
    } else {
      toast.error("Por favor, responda todas as questões antes de continuar");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Questionário de Auto-conhecimento
          </h1>
          
          <QuizProgress answered={answeredCount} total={questions.length} />
          
          <div className="min-h-[400px]">
            <QuizQuestion
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          </div>
          
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
            
            {isLastQuestion && answeredCount === questions.length ? (
              <Button
                onClick={handleSubmitQuiz}
                size="lg"
                className="px-8"
              >
                Gerar Relatório
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={isLastQuestion || !currentQuestion.answer}
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
          
          {!currentQuestion.answer && (
            <p className="text-center text-sm text-text-secondary mt-2">
              Selecione uma resposta para continuar
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;
