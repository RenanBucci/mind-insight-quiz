
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: string;
  completed: boolean;
  progress: number;
  totalSteps: number;
  category: 'anamnese' | 'burnout' | 'general';
  icon?: string;
}

interface MissionStore {
  missions: Mission[];
  activeMission: string | null;
  completedMissions: string[];
  setMissionProgress: (id: string, progress: number) => void;
  completeMission: (id: string) => void;
  setActiveMission: (id: string | null) => void;
  getMission: (id: string) => Mission | undefined;
  getMissionsByCategory: (category: Mission['category']) => Mission[];
  getActiveMission: () => Mission | undefined;
  resetAllMissions: () => void;
}

// Default missions that guide users through the application
const defaultMissions: Mission[] = [
  {
    id: 'start-anamnese',
    title: 'Iniciar sua jornada',
    description: 'Complete a fase 1 da anamnese psicológica',
    reward: 'Desbloqueia as próximas fases',
    completed: false,
    progress: 0,
    totalSteps: 1,
    category: 'anamnese',
    icon: 'rocket'
  },
  {
    id: 'complete-anamnese-phase1',
    title: 'Autoconhecimento Inicial',
    description: 'Complete todas as questões da fase 1',
    reward: 'Análise preliminar',
    completed: false,
    progress: 0,
    totalSteps: 1,
    category: 'anamnese',
    icon: 'milestone'
  },
  {
    id: 'complete-all-anamnese',
    title: 'Jornada Completa',
    description: 'Complete todas as fases da anamnese',
    reward: 'Relatório completo',
    completed: false,
    progress: 0,
    totalSteps: 5,
    category: 'anamnese',
    icon: 'award'
  },
  {
    id: 'start-burnout',
    title: 'Avaliação Profissional',
    description: 'Inicie o teste de burnout',
    reward: 'Insights sobre sua saúde mental no trabalho',
    completed: false,
    progress: 0,
    totalSteps: 1,
    category: 'burnout',
    icon: 'trophy'
  },
  {
    id: 'complete-burnout',
    title: 'Equilíbrio Profissional',
    description: 'Complete o teste de burnout',
    reward: 'Relatório completo de burnout',
    completed: false,
    progress: 0,
    totalSteps: 1,
    category: 'burnout',
    icon: 'badge-check'
  },
  {
    id: 'complete-all-tests',
    title: 'Explorador Completo',
    description: 'Complete todos os testes disponíveis',
    reward: 'Visão holística de sua saúde mental',
    completed: false,
    progress: 0,
    totalSteps: 2,
    category: 'general',
    icon: 'star'
  }
];

export const useMissionStore = create<MissionStore>()(
  persist(
    (set, get) => ({
      missions: defaultMissions,
      activeMission: null,
      completedMissions: [],
      
      setMissionProgress: (id, progress) => {
        set(state => ({
          missions: state.missions.map(mission => 
            mission.id === id 
              ? { 
                  ...mission, 
                  progress: progress,
                  completed: progress >= mission.totalSteps
                } 
              : mission
          )
        }));
        
        // Auto-complete mission if progress reaches total
        const mission = get().missions.find(m => m.id === id);
        if (mission && progress >= mission.totalSteps && !mission.completed) {
          get().completeMission(id);
        }
      },
      
      completeMission: (id) => {
        set(state => ({
          missions: state.missions.map(mission => 
            mission.id === id 
              ? { ...mission, completed: true, progress: mission.totalSteps } 
              : mission
          ),
          completedMissions: [...state.completedMissions, id]
        }));
      },
      
      setActiveMission: (id) => {
        set({ activeMission: id });
      },
      
      getMission: (id) => {
        return get().missions.find(mission => mission.id === id);
      },
      
      getMissionsByCategory: (category) => {
        return get().missions.filter(mission => mission.category === category);
      },
      
      getActiveMission: () => {
        const { activeMission, missions } = get();
        return activeMission ? missions.find(mission => mission.id === activeMission) : undefined;
      },
      
      resetAllMissions: () => {
        set({
          missions: defaultMissions,
          activeMission: null,
          completedMissions: []
        });
      }
    }),
    {
      name: 'mission-storage',
    }
  )
);
