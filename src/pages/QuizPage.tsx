
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuestionCard from '@/components/quiz/QuestionCard';
import QuizProgress from '@/components/quiz/QuizProgress';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

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
      <div className="container mx-auto px-4 py-8">
        {currentQuestionIndex === 0 && (
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              ANAMNESE PSICOLÓGICA - FASE 1
            </h1>
            
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
                que melhor representa sua experiência.
              </p>
              
              <p>Suas respostas são confidenciais e serão utilizadas apenas para fins terapêuticos.</p>
            </div>
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
        />
        
        <div className="text-center text-sm text-text-secondary mt-4">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;
