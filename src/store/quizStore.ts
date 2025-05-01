
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Question {
  id: number;
  text: string;
  options: string[];
  answer: string | null;
}

interface QuizStore {
  questions: Question[];
  loading: boolean;
  quizCompleted: boolean;
  setAnswer: (questionId: number, answer: string) => void;
  markQuizCompleted: () => void;
  resetQuiz: () => void;
  isQuizCompleted: () => boolean;
  getAnsweredCount: () => number;
}

// Our 20 psychology-related questions
const quizQuestions: Question[] = [
  {
    id: 1,
    text: "Quando você precisa se concentrar, você prefere:",
    options: ["Silêncio absoluto", "Música ambiente suave", "Um pouco de ruído de fundo"],
    answer: null
  },
  {
    id: 2,
    text: "Após um evento social intenso, você se sente:",
    options: ["Energizado e querendo mais", "Satisfeito, mas pronto para relaxar", "Completamente esgotado"],
    answer: null
  },
  {
    id: 3,
    text: "Quando enfrenta um problema difícil, sua primeira reação é:",
    options: ["Buscar ajuda de outras pessoas", "Pesquisar soluções por conta própria", "Refletir calmamente antes de agir"],
    answer: null
  },
  {
    id: 4,
    text: "Em uma situação de conflito, você tende a:",
    options: ["Confrontar diretamente a questão", "Buscar um meio-termo ou compromisso", "Evitar o confronto se possível"],
    answer: null
  },
  {
    id: 5,
    text: "Quando toma decisões importantes, você geralmente se baseia mais em:",
    options: ["Lógica e análise racional", "Intuição e sentimentos", "Conselhos de pessoas em quem confia"],
    answer: null
  },
  {
    id: 6,
    text: "Como você reage a mudanças repentinas em seus planos?",
    options: ["Adapta-se facilmente e segue em frente", "Sente-se desconfortável, mas lida com a situação", "Fica frustrado e precisa de tempo para se ajustar"],
    answer: null
  },
  {
    id: 7,
    text: "Ao lidar com estresse, você mais frequentemente:",
    options: ["Pratica atividades físicas", "Busca tempo sozinho para recarregar", "Conversa com amigos ou familiares"],
    answer: null
  },
  {
    id: 8,
    text: "Quando pensa no futuro, você é mais propenso a:",
    options: ["Planejar detalhadamente", "Definir algumas metas gerais", "Deixar as coisas acontecerem naturalmente"],
    answer: null
  },
  {
    id: 9,
    text: "Em relação ao seu espaço pessoal, você prefere:",
    options: ["Ambientes minimalistas e organizados", "Espaços aconchegantes com objetos significativos", "Ambientes vibrantes com muita personalidade"],
    answer: null
  },
  {
    id: 10,
    text: "Quando alguém próximo está triste, você tende a:",
    options: ["Oferecer conselhos práticos para resolver o problema", "Simplesmente estar presente e ouvir", "Tentar animá-los com humor ou distração"],
    answer: null
  },
  {
    id: 11,
    text: "Você se considera uma pessoa mais:",
    options: ["Espontânea e adaptável", "Planejada e organizada", "Um equilíbrio entre os dois extremos"],
    answer: null
  },
  {
    id: 12,
    text: "Como você lida com críticas?",
    options: ["Vê como oportunidade de crescimento", "Analisa cuidadosamente antes de aceitar ou rejeitar", "Tende a se sentir magoado inicialmente"],
    answer: null
  },
  {
    id: 13,
    text: "Em um grupo, você geralmente:",
    options: ["Assume papel de liderança", "Contribui ativamente, mas não necessariamente lidera", "Prefere observar e contribuir quando necessário"],
    answer: null
  },
  {
    id: 14,
    text: "Quando se depara com ideias conflitantes, você:",
    options: ["Busca imediatamente determinar qual está correta", "Considera que ambos os lados podem ter mérito", "Mantém suas próprias convicções firmemente"],
    answer: null
  },
  {
    id: 15,
    text: "Seu estilo de aprendizagem preferido é:",
    options: ["Visual (ver e ler)", "Auditivo (ouvir e discutir)", "Prático (experimentar e fazer)"],
    answer: null
  },
  {
    id: 16,
    text: "Quando algo dá errado, você frequentemente:",
    options: ["Procura imediatamente soluções", "Reflete sobre o que poderia ter sido feito diferente", "Expressa suas emoções sobre o ocorrido"],
    answer: null
  },
  {
    id: 17,
    text: "Em termos de riscos, você se considera:",
    options: ["Alguém que abraça riscos como oportunidades", "Cauteloso, mas disposto a arriscar quando necessário", "Alguém que prefere o caminho mais seguro"],
    answer: null
  },
  {
    id: 18,
    text: "Em momentos de lazer, você prefere:",
    options: ["Atividades sociais com muitas pessoas", "Encontros íntimos com poucos amigos próximos", "Tempo tranquilo para si mesmo"],
    answer: null
  },
  {
    id: 19,
    text: "Quando tem uma ideia interessante, você geralmente:",
    options: ["Implementa imediatamente para ver no que vai dar", "Planeja cuidadosamente antes de executar", "Compartilha com outros para obter feedback"],
    answer: null
  },
  {
    id: 20,
    text: "Você acredita que sua personalidade:",
    options: ["É bastante consistente ao longo do tempo", "Evolui gradualmente com novas experiências", "Varia significativamente dependendo do contexto"],
    answer: null
  }
];

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      questions: quizQuestions,
      loading: false,
      quizCompleted: false,
      setAnswer: (questionId, answer) => {
        set(state => ({
          questions: state.questions.map(q => 
            q.id === questionId ? { ...q, answer } : q
          )
        }));
      },
      markQuizCompleted: () => set({ quizCompleted: true }),
      resetQuiz: () => set({ 
        questions: quizQuestions.map(q => ({ ...q, answer: null })),
        quizCompleted: false
      }),
      isQuizCompleted: () => get().quizCompleted || get().questions.every(q => q.answer !== null),
      getAnsweredCount: () => get().questions.filter(q => q.answer !== null).length
    }),
    {
      name: 'quiz-storage',
    }
  )
);
