
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizProgress from '@/components/quiz/QuizProgress';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const QuizPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { questions, getAnsweredCount, markQuizCompleted, isQuizCompleted } = useQuizStore();
  
  const answeredCount = getAnsweredCount();
  const allQuestionsAnswered = answeredCount === questions.length;
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o questionário", {
        duration: 3000,
      });
      navigate('/register');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmitQuiz = () => {
    if (allQuestionsAnswered) {
      markQuizCompleted();
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
          
          <div className="space-y-6">
            {questions.map((question) => (
              <QuizQuestion key={question.id} question={question} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleSubmitQuiz}
              disabled={!allQuestionsAnswered}
              size="lg"
              className="px-8"
            >
              Gerar Relatório
            </Button>
          </div>
          
          {!allQuestionsAnswered && (
            <p className="text-center text-sm text-text-secondary mt-2">
              Responda todas as questões para continuar
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;
