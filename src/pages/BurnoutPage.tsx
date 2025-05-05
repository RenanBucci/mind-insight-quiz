
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuestionCard from '@/components/quiz/QuestionCard';
import QuizProgress from '@/components/quiz/QuizProgress';
import { useAuthStore } from '@/store/authStore';
import { useBurnoutStore } from '@/store/burnoutStore';
import { useMissionStore } from '@/store/missionStore';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Activity, BadgeCheck, Clock } from 'lucide-react';

const BurnoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { 
    questions, 
    setAnswer, 
    setSubAnswer, 
    getAnsweredCount, 
    markBurnoutCompleted
  } = useBurnoutStore();
  
  const { setMissionProgress, completeMission } = useMissionStore();
  
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
      return;
    }
    
    // Update mission progress
    setMissionProgress('start-burnout', 1);
  }, [isAuthenticated, navigate, setMissionProgress]);
  
  const handleAnswer = (answer: string) => {
    setAnswer(currentQuestion.id, answer);
  };
  
  const handleSubAnswer = (answer: string) => {
    setSubAnswer(currentQuestion.id, answer);
  };
  
  const handlePrevQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/burnout-intro');
    }
  };
  
  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitBurnout();
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
    
    // Update missions
    completeMission('start-burnout');
    completeMission('complete-burnout');
    setMissionProgress('complete-all-tests', 1);
    
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

  if (!isAuthenticated || !currentQuestion) {
    return null;
  }

  // Extract the section title after the colon
  const sectionTitle = currentQuestion.section?.split(':')[1]?.trim() || "BURNOUT PROFISSIONAL";
  
  // Determine if we should show sub question
  const showSubQuestion = Boolean(
    currentQuestion.subQuestion && 
    ['C', 'D', 'E'].includes(currentQuestion.answer || '')
  );

  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <Layout>
      <div 
        className="min-h-screen py-12 px-4"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(241,245,249,1) 0%, rgba(255,255,255,1) 100%)'
        }}
      >
        <div className="container mx-auto">
          {currentQuestionIndex === 0 && (
            <div className="max-w-3xl mx-auto mb-12">
              <Card className="p-6 border-0 shadow-lg rounded-xl bg-gradient-to-br from-orange-50 to-white mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                      TESTE DE BURNOUT PROFISSIONAL
                    </h1>
                    <p className="text-gray-700 mb-4">
                      Este teste avalia seu nível de esgotamento profissional através 
                      de questões que abordam diferentes aspectos do seu bem-estar no trabalho.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <BadgeCheck className="h-4 w-4 text-green-500" />
                        <span>{questions.length} questões</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-orange-500" />
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
            questionId={currentQuestion.id}
            questionText={currentQuestion.text}
            sectionTitle={sectionTitle}
            options={currentQuestion.options}
            answer={currentQuestion.answer}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            showSubQuestion={showSubQuestion}
            subQuestionText={currentQuestion.subQuestion?.text}
            subAnswer={currentQuestion.subQuestion?.answer}
            onSubAnswer={handleSubAnswer}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BurnoutPage;
