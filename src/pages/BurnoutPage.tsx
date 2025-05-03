
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuestionCard from '@/components/quiz/QuestionCard';
import QuizProgress from '@/components/quiz/QuizProgress';
import { useAuthStore } from '@/store/authStore';
import { useBurnoutStore } from '@/store/burnoutStore';
import { toast } from 'sonner';

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {currentQuestionIndex === 0 && (
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            TESTE DE BURNOUT PROFISSIONAL
          </h1>
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
        />
        
        <div className="text-center text-sm text-text-secondary mt-4">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </div>
      </div>
    </Layout>
  );
};

export default BurnoutPage;
