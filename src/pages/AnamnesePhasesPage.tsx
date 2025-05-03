
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
}

const PhaseCard: React.FC<PhaseCardProps> = ({ 
  phase, title, description, color, onClick, isAvailable = true 
}) => {
  return (
    <Card 
      className={`p-6 rounded-xl transition-all ${isAvailable ? 'cursor-pointer hover:shadow-lg' : 'opacity-60'}`}
      style={{ backgroundColor: color }}
      onClick={isAvailable ? onClick : undefined}
    >
      <h3 className="text-2xl font-bold text-white mb-2">Fase {phase}</h3>
      <p className="text-white text-sm mb-4">{description}</p>
      <Button 
        variant="secondary" 
        className="w-full bg-white hover:bg-gray-100 text-gray-800"
        disabled={!isAvailable}
      >
        {isAvailable ? 'Começar' : 'Indisponível'}
      </Button>
    </Card>
  );
};

const AnamnesePhasesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { isQuizCompleted } = useQuizStore();
  const phase1Completed = isQuizCompleted();

  // All phases info
  const phases = [
    {
      phase: 1,
      title: "Fase 1",
      description: "IDENTIFICAÇÃO E QUEIXAS PRINCIPAIS",
      color: "#4dd0e1", // Light blue
      route: "/quiz",
      available: true
    },
    {
      phase: 2,
      title: "Fase 2",
      description: "HISTÓRIA DE VIDA E DESENVOLVIMENTO PESSOAL",
      color: "#4fc3f7", // Medium blue
      route: "/quiz-phase2",
      available: phase1Completed
    },
    {
      phase: 3,
      title: "Fase 3",
      description: "PADRÕES EMOCIONAIS E COMPORTAMENTAIS",
      color: "#5c9ce6", // Darker blue
      route: "/quiz-phase3",
      available: phase1Completed
    },
    {
      phase: 4,
      title: "Fase 4",
      description: "RELACIONAMENTOS E DINÂMICAS INTERPESSOAIS",
      color: "#7a85de", // Purple blue
      route: "/quiz-phase4",
      available: phase1Completed
    },
    {
      phase: 5,
      title: "Fase 5",
      description: "AUTOCONCEITO E PERSPECTIVAS FUTURAS",
      color: "#9575cd", // Purple
      route: "/quiz-phase5",
      available: phase1Completed
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
        <h1 className="text-4xl font-bold text-center mb-12">TESTE ANAMNESE</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {phases.map((phase) => (
            <PhaseCard
              key={phase.phase}
              phase={phase.phase}
              title={phase.title}
              description={phase.description}
              color={phase.color}
              isAvailable={phase.available}
              onClick={() => handlePhaseClick(phase.route)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AnamnesePhasesPage;
