
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { useMissionStore } from '@/store/missionStore';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  ChevronLeft, 
  Lock, 
  CheckCircle, 
  AlarmClock, 
  Brain, 
  Users, 
  HeartHandshake, 
  Sparkles 
} from 'lucide-react';

interface PhaseCardProps {
  phase: number;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
  isAvailable?: boolean;
  progress?: number;
  questionPreview?: string[];
  icon: React.ReactNode;
  isCompleted?: boolean;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ 
  phase, title, description, color, onClick, isAvailable = true, 
  progress = 0, questionPreview = [], icon, isCompleted = false
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:translate-y-[-5px] ${
        isAvailable ? 'cursor-pointer hover:shadow-xl' : 'opacity-80'
      }`}
      onClick={isAvailable ? onClick : undefined}
    >
      <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: color }}></div>
      
      <div className="p-6 pl-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${color}20` }}>
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-800">Fase {phase}</h3>
                {isCompleted && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Concluída
                  </Badge>
                )}
              </div>
              <p className="text-gray-500 text-sm">{title}</p>
            </div>
          </div>
          
          {!isAvailable && <Lock className="text-gray-400 h-5 w-5" />}
          {isAvailable && isCompleted && <CheckCircle className="text-green-500 h-5 w-5" />}
          {isAvailable && !isCompleted && progress > 0 && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Em progresso
            </Badge>
          )}
        </div>
        
        <p className="text-gray-700 mb-5">{description}</p>
        
        {progress > 0 && (
          <div className="mb-4">
            <div className="bg-gray-100 h-2 rounded-full w-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ width: `${progress}%`, backgroundColor: color }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">{progress}% completo</p>
          </div>
        )}
        
        {isAvailable && questionPreview.length > 0 && (
          <div className="mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPreview(!showPreview);
              }}
              className="text-sm font-medium hover:underline" 
              style={{ color }}
            >
              {showPreview ? 'Ocultar questões' : 'Ver questões'}
            </button>
            
            {showPreview && (
              <div className="mt-3 p-4 rounded-lg text-sm" style={{ backgroundColor: `${color}10` }}>
                <ul className="space-y-2">
                  {questionPreview.map((question, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full mt-2" style={{ backgroundColor: color }}></span>
                      <span className="text-gray-700">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <Button 
          variant={isAvailable ? (isCompleted ? "outline" : "default") : "outline"}
          className={`w-full mt-2 ${
            !isAvailable 
              ? "text-gray-400 border-gray-200" 
              : isCompleted 
                ? "border-gray-200 hover:bg-gray-50 text-gray-700" 
                : ""
          }`}
          style={
            isAvailable && !isCompleted 
              ? { backgroundColor: color, color: '#fff', borderColor: color } 
              : {}
          }
          disabled={!isAvailable}
        >
          {isAvailable 
            ? (progress > 0 
                ? (isCompleted ? "Revisar" : "Continuar") 
                : "Começar") 
            : "Indisponível"}
        </Button>
      </div>
    </Card>
  );
};

const AnamnesePhasesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { questions, isQuizCompleted, getAnsweredCount } = useQuizStore();
  const { missions, setMissionProgress } = useMissionStore();
  const phase1Completed = isQuizCompleted();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar registrado para acessar o questionário", {
        duration: 3000,
      });
      navigate('/register');
    }
    
    // Update mission progress
    if (phase1Completed) {
      setMissionProgress('complete-anamnese-phase1', 1);
      setMissionProgress('complete-all-anamnese', 1);
    }
  }, [isAuthenticated, navigate, phase1Completed, setMissionProgress]);
  
  // Calculate progress for phase 1
  const phase1Progress = Math.floor((getAnsweredCount() / questions.length) * 100);

  // Get phase 1 question previews (first 3 questions)
  const phase1Questions = questions
    .filter(q => !q.section || q.section === "IDENTIFICAÇÃO")
    .slice(0, 3)
    .map(q => q.text);

  // Phase icons 
  const phaseIcons = [
    <AlarmClock className="h-5 w-5 text-blue-600" />,
    <Brain className="h-5 w-5 text-teal-600" />,
    <Sparkles className="h-5 w-5 text-green-600" />,
    <Users className="h-5 w-5 text-amber-600" />,
    <HeartHandshake className="h-5 w-5 text-purple-600" />
  ];

  // All phases info
  const phases = [
    {
      phase: 1,
      title: "IDENTIFICAÇÃO E QUEIXAS PRINCIPAIS",
      description: "Nesta fase, coletamos informações básicas sobre você e suas principais queixas e motivos para buscar ajuda.",
      color: "#3b82f6", // blue-500
      route: "/quiz",
      available: true,
      progress: phase1Progress,
      completed: phase1Completed,
      questions: phase1Questions,
      icon: phaseIcons[0]
    },
    {
      phase: 2,
      title: "HISTÓRIA DE VIDA E DESENVOLVIMENTO",
      description: "Exploramos sua história familiar, desenvolvimento, experiências formativas e eventos significativos.",
      color: "#14b8a6", // teal-500
      route: "/quiz-phase2",
      available: phase1Completed,
      progress: 0,
      completed: false,
      questions: ["Como você descreveria sua infância?", "Houve algum evento marcante que considera ter influenciado seu desenvolvimento?"],
      icon: phaseIcons[1]
    },
    {
      phase: 3,
      title: "PADRÕES EMOCIONAIS E COMPORTAMENTAIS",
      description: "Identificamos seus padrões emocionais, gatilhos, comportamentos recorrentes e mecanismos de enfrentamento.",
      color: "#22c55e", // green-500
      route: "/quiz-phase3",
      available: phase1Completed,
      progress: 0,
      completed: false,
      questions: ["Como você lida com estresse e ansiedade?", "Existe algum comportamento repetitivo que você gostaria de mudar?"],
      icon: phaseIcons[2]
    },
    {
      phase: 4,
      title: "RELACIONAMENTOS E DINÂMICAS",
      description: "Analisamos suas relações interpessoais, dinâmicas familiares, sociais e profissionais.",
      color: "#f59e0b", // amber-500
      route: "/quiz-phase4",
      available: phase1Completed,
      progress: 0,
      completed: false,
      questions: ["Como você descreveria seus relacionamentos atuais?", "Existe algum padrão recorrente em seus relacionamentos?"],
      icon: phaseIcons[3]
    },
    {
      phase: 5,
      title: "AUTOCONCEITO E PERSPECTIVAS FUTURAS",
      description: "Exploramos como você se vê, suas crenças sobre si mesmo, aspirações futuras e objetivos de vida.",
      color: "#a855f7", // purple-500
      route: "/quiz-phase5",
      available: phase1Completed,
      progress: 0,
      completed: false,
      questions: ["Como você se define como pessoa?", "Quais são suas metas e aspirações para o futuro?"],
      icon: phaseIcons[4]
    }
  ];

  const handlePhaseClick = (route: string) => {
    navigate(route);
  };

  return (
    <Layout>
      <div 
        className="relative pb-20"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(241,245,249,1) 0%, rgba(255,255,255,1) 100%)'
        }}
      >
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
                ANAMNESE PSICOLÓGICA
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Acompanhe seu progresso e navegue entre as diferentes fases do questionário. 
                Cada fase ajuda a compor um quadro completo da sua situação atual.
              </p>
            </div>
            
            <div className="relative space-y-6 md:space-y-8">
              {/* Vertical connector line */}
              <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-gray-200 hidden md:block"></div>
              
              {phases.map((phase, index) => (
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
                  icon={phase.icon}
                  isCompleted={phase.completed}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/tests')}
                className="px-8 py-6 text-base gap-2"
              >
                <ChevronLeft className="h-4 w-4" /> Voltar para Seleção de Testes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnamnesePhasesPage;
