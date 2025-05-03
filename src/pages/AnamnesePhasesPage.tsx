
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';

interface PhaseCardProps {
  phase: number;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
  isAvailable?: boolean;
  progress?: number;
  questionPreview?: string[];
}

const PhaseCard: React.FC<PhaseCardProps> = ({ 
  phase, title, description, color, onClick, isAvailable = true, progress = 0, questionPreview = []
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <Card 
      className={`p-6 rounded-xl transition-all ${isAvailable ? 'cursor-pointer hover:shadow-lg' : 'opacity-60'}`}
      style={{ backgroundColor: color }}
    >
      <h3 className="text-2xl font-bold text-white mb-2">Fase {phase}</h3>
      <p className="text-white text-sm mb-4">{description}</p>
      
      {progress > 0 && (
        <div className="mb-4">
          <div className="bg-white/30 h-2 rounded-full w-full">
            <div 
              className="bg-white h-full rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white text-xs mt-1">{progress}% completo</p>
        </div>
      )}
      
      {isAvailable && questionPreview.length > 0 && (
        <div className="mb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPreview(!showPreview);
            }}
            className="text-white underline text-sm hover:text-gray-200"
          >
            {showPreview ? 'Ocultar questões' : 'Ver questões'}
          </button>
          
          {showPreview && (
            <div className="mt-2 bg-white/10 p-3 rounded text-white text-xs">
              <ul className="list-disc pl-4 space-y-2">
                {questionPreview.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <Button 
        variant="secondary" 
        className="w-full bg-white hover:bg-gray-100 text-gray-800"
        disabled={!isAvailable}
        onClick={onClick}
      >
        {isAvailable ? (progress > 0 ? 'Continuar' : 'Começar') : 'Indisponível'}
      </Button>
    </Card>
  );
};

const AnamnesePhasesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { questions, isQuizCompleted, getAnsweredCount } = useQuizStore();
  const phase1Completed = isQuizCompleted();
  
  // Calculate progress for phase 1
  const phase1Progress = Math.floor((getAnsweredCount() / questions.length) * 100);

  // Get phase 1 question previews (first 3 questions)
  const phase1Questions = questions
    .filter(q => !q.section || q.section === "IDENTIFICAÇÃO")
    .slice(0, 3)
    .map(q => q.text);

  // All phases info
  const phases = [
    {
      phase: 1,
      title: "Fase 1",
      description: "IDENTIFICAÇÃO E QUEIXAS PRINCIPAIS",
      color: "#4dd0e1", // Light blue
      route: "/quiz",
      available: true,
      progress: phase1Progress,
      questions: phase1Questions
    },
    {
      phase: 2,
      title: "Fase 2",
      description: "HISTÓRIA DE VIDA E DESENVOLVIMENTO PESSOAL",
      color: "#4fc3f7", // Medium blue
      route: "/quiz-phase2",
      available: phase1Completed,
      progress: 0,
      questions: ["Como você descreveria sua infância?", "Houve algum evento marcante que considera ter influenciado seu desenvolvimento?"]
    },
    {
      phase: 3,
      title: "Fase 3",
      description: "PADRÕES EMOCIONAIS E COMPORTAMENTAIS",
      color: "#5c9ce6", // Darker blue
      route: "/quiz-phase3",
      available: phase1Completed,
      progress: 0,
      questions: ["Como você lida com estresse e ansiedade?", "Existe algum comportamento repetitivo que você gostaria de mudar?"]
    },
    {
      phase: 4,
      title: "Fase 4",
      description: "RELACIONAMENTOS E DINÂMICAS INTERPESSOAIS",
      color: "#7a85de", // Purple blue
      route: "/quiz-phase4",
      available: phase1Completed,
      progress: 0,
      questions: ["Como você descreveria seus relacionamentos atuais?", "Existe algum padrão recorrente em seus relacionamentos?"]
    },
    {
      phase: 5,
      title: "Fase 5",
      description: "AUTOCONCEITO E PERSPECTIVAS FUTURAS",
      color: "#9575cd", // Purple
      route: "/quiz-phase5",
      available: phase1Completed,
      progress: 0,
      questions: ["Como você se define como pessoa?", "Quais são suas metas e aspirações para o futuro?"]
    }
  ];

  const handlePhaseClick = (route: string) => {
    navigate(route);
  };

  if (!isAuthenticated) {
    navigate('/register');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">TESTE ANAMNESE</h1>
        <p className="text-center text-gray-600 mb-8">Selecione uma fase para iniciar ou continuar o questionário</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {phases.map((phase) => (
            <PhaseCard
              key={phase.phase}
              phase={phase.phase}
              title={phase.title}
              description={phase.description}
              color={phase.color}
              isAvailable={phase.available}
              onClick={() => handlePhaseClick(phase.route)}
              progress={phase.progress}
              questionPreview={phase.questions}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/tests')}
            className="px-8"
          >
            Voltar para Seleção de Testes
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AnamnesePhasesPage;
