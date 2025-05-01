
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ReportPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { questions, isQuizCompleted } = useQuizStore();
  
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
          
          <div className="flex justify-center mt-8">
            <Button onClick={() => navigate('/quiz')} className="mr-4">
              Refazer Questionário
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportPage;
