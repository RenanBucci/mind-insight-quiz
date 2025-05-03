
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

  // Determine if we should show the timer based on the question type
  const showTimer = currentQuestion && currentQuestion.type === 'choice';
  
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
  };
  
  const handlePrevQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/anamnese-intro');
    }
  };
  
  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleSubmitQuiz = async () => {
    // Check if all questions have been answered
    const unansweredCount = questions.filter(q => q.answer === null || q.answer === "").length;
    
    if (unansweredCount > 0) {
      toast.error(`Por favor, responda todas as ${unansweredCount} questões antes de continuar`);
      return;
    }
    
    markQuizCompleted();
    
    try {
      // Send quiz data to webhook
      const quizData = {
        user: user,
        testType: "anamnese",
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
      navigate('/report');
    } catch (error) {
      console.error("Erro ao enviar dados para o webhook:", error);
      toast.error("Erro ao enviar dados. Verifique o console para mais detalhes.");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {currentQuestionIndex === 0 && (
            <>
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                ANAMNESE PSICOLÓGICA - FASE 1
              </h1>
              <h2 className="text-xl font-semibold mb-6 text-center">
                IDENTIFICAÇÃO E QUEIXAS PRINCIPAIS
              </h2>
              
              <div className="bg-gray-50 p-6 mb-8 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">INSTRUÇÕES AO PACIENTE</h3>
                
                <p className="mb-4">Prezado(a) paciente,</p>
                
                <p className="mb-4">
                  Esta é a primeira fase do nosso questionário de anamnese psicológica. 
                  Nesta etapa, buscamos compreender seus dados básicos, motivos que o(a) 
                  trouxeram ao atendimento, e principais queixas atuais.
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
                
                <p>Suas respostas são confidenciais e serão utilizadas apenas para fins terapêuticos.</p>
              </div>
            </>
          )}
          
          <QuizProgress answered={answeredCount} total={questions.length} />
          
          <div className="min-h-[400px]">
            <QuizQuestion
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              showTimer={currentQuestion.type === 'choice'}
            />
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevQuestion}
              variant="outline"
              size="lg"
              className="px-6"
            >
              <ChevronLeft className="mr-2" /> Anterior
            </Button>
            
            {isLastQuestion ? (
              <Button
                onClick={handleSubmitQuiz}
                size="lg"
                className="px-8"
              >
                Finalizar Questionário
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={!currentQuestion.answer && currentQuestion.answer !== ""}
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
          
          {!currentQuestion.answer && currentQuestion.answer !== "" && (
            <p className="text-center text-sm text-text-secondary mt-2">
              {currentQuestion.type === 'choice' 
                ? "Selecione uma resposta para continuar" 
                : "Digite uma resposta para continuar"}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;
