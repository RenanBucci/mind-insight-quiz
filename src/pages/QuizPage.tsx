
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuestionCard from '@/components/quiz/QuestionCard';
import QuizProgress from '@/components/quiz/QuizProgress';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { useMissionStore } from '@/store/missionStore';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Brain, BadgeCheck, Clock } from 'lucide-react';

const QuizPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { questions, setAnswer, getAnsweredCount, markQuizCompleted, isQuizCompleted } = useQuizStore();
  const { setMissionProgress, completeMission } = useMissionStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = getAnsweredCount();
  
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const showInstructions = currentQuestionIndex === 0;
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o questionário", {
        duration: 3000,
      });
      navigate('/register');
    }
  }, [isAuthenticated, navigate]);
  
  const handleAnswer = (answer: string) => {
    setAnswer(currentQuestion.id, answer);
  };
  
  const handlePrevQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/anamnese-phases');
    }
  };
  
  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
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
    
    // Update missions
    completeMission('start-anamnese');
    completeMission('complete-anamnese-phase1');
    setMissionProgress('complete-all-anamnese', 1);
    setMissionProgress('complete-all-tests', 1);
    
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

  if (!isAuthenticated || !currentQuestion) {
    return null;
  }

  const sectionTitle = currentQuestion.section?.split(':')[1]?.trim() || "ANAMNESE PSICOLÓGICA";

  return (
    <Layout>
      <div 
        className="min-h-screen py-12 px-4"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(241,245,249,1) 0%, rgba(255,255,255,1) 100%)'
        }}
      >
        <div className="container mx-auto">
          {showInstructions && (
            <div className="max-w-3xl mx-auto mb-12">
              <Card className="p-6 border-0 shadow-lg rounded-xl bg-gradient-to-br from-blue-50 to-white mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                      ANAMNESE PSICOLÓGICA - FASE 1
                    </h1>
                    <p className="text-gray-700 mb-4">
                      Nesta primeira fase, buscamos compreender seus dados básicos, 
                      motivos que o(a) trouxeram ao atendimento, e principais queixas atuais.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Por favor, responda a todas as questões com sinceridade. Suas respostas são confidenciais 
                      e serão utilizadas apenas para fins terapêuticos.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <BadgeCheck className="h-4 w-4 text-green-500" />
                        <span>{questions.length} questões</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>Aprox. 10-15 minutos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          <QuizProgress answered={answeredCount} total={questions.length} />
          
          <QuestionCard
            questionId={currentQuestionIndex + 1}
            questionText={currentQuestion.text}
            sectionTitle={sectionTitle}
            options={currentQuestion.options}
            answer={currentQuestion.answer}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            questionType={currentQuestion.type}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;
