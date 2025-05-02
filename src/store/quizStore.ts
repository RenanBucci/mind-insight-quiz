
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type QuestionType = 'text' | 'choice';

export interface Question {
  id: number;
  section?: string;
  text: string;
  type: QuestionType;
  options?: string[];
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

// Our questions
const quizQuestions: Question[] = [
  // PART 1: Initial Data (Open questions)
  {
    id: 1,
    section: "PARTE 1: DADOS INICIAIS",
    text: "Nome completo:",
    type: "text",
    answer: null
  },
  {
    id: 2,
    section: "PARTE 1: DADOS INICIAIS",
    text: "Idade:",
    type: "text",
    answer: null
  },
  {
    id: 3,
    section: "PARTE 1: DADOS INICIAIS",
    text: "Gênero:",
    type: "text",
    answer: null
  },
  {
    id: 4,
    section: "PARTE 1: DADOS INICIAIS",
    text: "Estado civil:",
    type: "text",
    answer: null
  },
  {
    id: 5,
    section: "PARTE 1: DADOS INICIAIS",
    text: "Profissão:",
    type: "text",
    answer: null
  },
  {
    id: 6,
    section: "PARTE 1: DADOS INICIAIS",
    text: "Escolaridade:",
    type: "text",
    answer: null
  },
  {
    id: 7,
    section: "PARTE 1: DADOS INICIAIS",
    text: "Com quem reside atualmente:",
    type: "text",
    answer: null
  },
  {
    id: 8,
    section: "PARTE 1: DADOS INICIAIS",
    text: "Quem o(a) encaminhou para este atendimento:",
    type: "text",
    answer: null
  },
  // PART 2: Consultation Reason and Main Complaints
  {
    id: 9,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Estou buscando atendimento psicológico principalmente por vontade própria, não por pressão de terceiros.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 10,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Consigo identificar claramente os problemas emocionais/psicológicos que me levaram a buscar ajuda.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 11,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Meus problemas emocionais/psicológicos estão afetando negativamente minha qualidade de vida.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 12,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Meus problemas emocionais/psicológicos estão interferindo no meu desempenho profissional/acadêmico.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 13,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Meus problemas emocionais/psicológicos estão prejudicando meus relacionamentos pessoais.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 14,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Tenho expectativas realistas sobre os resultados que posso obter com o tratamento psicológico.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 15,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Sinto-me motivado(a) e comprometido(a) com o processo terapêutico que se inicia.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 16,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Acredito que posso melhorar minha condição emocional/psicológica atual.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 17,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Já busquei ajuda psicológica anteriormente para problemas semelhantes aos atuais.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 18,
    section: "PARTE 2: MOTIVO DA CONSULTA E QUEIXAS PRINCIPAIS",
    text: "Estou disposto(a) a falar abertamente sobre assuntos difíceis ou dolorosos durante o tratamento.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  // PART 3: Current Emotional Symptoms
  {
    id: 19,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Sinto-me triste, abatido(a) ou deprimido(a).",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 20,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Tenho perdido o interesse ou prazer em atividades que antes me agradavam.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 21,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Sinto-me tenso(a), nervoso(a) ou ansioso(a).",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 22,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Tenho preocupações excessivas e difíceis de controlar.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 23,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Experimento sentimentos intensos de medo ou pânico.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 24,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Sinto-me irritado(a) ou com raiva sem motivo aparente.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 25,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Tenho oscilações de humor significativas durante o dia ou entre dias.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 26,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Sinto-me emocionalmente esgotado(a) ou sem energia.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 27,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Tenho dificuldade em lidar com situações estressantes do cotidiano.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 28,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Tenho pensamentos negativos recorrentes que não consigo controlar.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 29,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Tenho pensamentos de que não vale a pena viver ou de fazer mal a mim mesmo(a).",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 30,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Sinto culpa excessiva por coisas que fiz ou deixei de fazer.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 31,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Sinto-me inadequado(a) ou inferiorizado(a) em comparação com outras pessoas.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 32,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Tenho dificuldade em tomar decisões, mesmo as mais simples.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 33,
    section: "PARTE 3: SINTOMAS EMOCIONAIS ATUAIS",
    text: "Sinto-me sobrecarregado(a) com minhas responsabilidades diárias.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  // PART 4: Physical Symptoms Related to Emotional State
  {
    id: 34,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Tenho dificuldades para adormecer ou permanecer dormindo.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 35,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Acordo muito cedo e não consigo voltar a dormir.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 36,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Sinto-me cansado(a) mesmo após uma noite de sono.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 37,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Tive alterações significativas no meu apetite (aumento ou diminuição).",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 38,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Tenho experimentado sensações físicas desconfortáveis como palpitações, falta de ar, tontura ou tremores.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 39,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Sinto dores de cabeça frequentes ou tensão muscular.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 40,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Percebo alterações na minha energia e disposição física ao longo do dia.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 41,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Sinto desconfortos digestivos (náusea, dor estomacal, diarreia, etc.) quando estou ansioso(a) ou estressado(a).",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 42,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Tenho dificuldade em relaxar fisicamente, mesmo em momentos de descanso.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 43,
    section: "PARTE 4: SINTOMAS FÍSICOS RELACIONADOS AO ESTADO EMOCIONAL",
    text: "Tenho problemas de concentração ou memória.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  // PART 5: Triggering Factors and Current Stressors
  {
    id: 44,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Consigo identificar eventos específicos que desencadearam meus problemas emocionais atuais.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 45,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Passei recentemente por mudanças significativas na minha vida (ex: mudança de emprego, residência, relacionamento).",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 46,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Vivenciei recentemente a perda de alguém importante para mim.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 47,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Estou enfrentando problemas financeiros que me preocupam.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 48,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Enfrento problemas significativos em meu relacionamento amoroso atual.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 49,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Estou passando por conflitos familiares significativos.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 50,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Enfrento dificuldades importantes no ambiente de trabalho/estudo.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 51,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Tenho sentido pressão excessiva para atingir objetivos ou expectativas (próprias ou de terceiros).",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 52,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Minha saúde física tem me preocupado ultimamente.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 53,
    section: "PARTE 5: FATORES DESENCADEANTES E ESTRESSORES ATUAIS",
    text: "Considero que os problemas que enfrento são temporários e relacionados a circunstâncias atuais da minha vida.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  // PART 6: Treatment History and Medication Use
  {
    id: 54,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Já realizei tratamento psicológico anteriormente.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 55,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Se já realizou, considere: o tratamento psicológico anterior foi eficaz para meus problemas.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 56,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Já realizei tratamento psiquiátrico anteriormente.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 57,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Atualmente faço uso de medicação psiquiátrica.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 58,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Se usa medicação, considere: percebo que a medicação tem sido eficaz para aliviar meus sintomas.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 59,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Já fui internado(a) por questões relacionadas à saúde mental.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 60,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Há histórico de transtornos mentais em minha família.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 61,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Já utilizei substâncias (álcool, drogas) como forma de lidar com meus problemas emocionais.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 62,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Busquei outras formas de tratamento ou apoio (ex: grupos de apoio, aconselhamento religioso, terapias alternativas).",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 63,
    section: "PARTE 6: HISTÓRICO DE TRATAMENTOS E USO DE MEDICAÇÃO",
    text: "Tenho expectativas positivas sobre o tratamento psicológico que estou iniciando agora.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  // PART 7: Resources and Coping Strategies
  {
    id: 64,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Conto com apoio de familiares para lidar com meus problemas emocionais.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 65,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Conto com apoio de amigos para lidar com meus problemas emocionais.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 66,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Consigo identificar atividades que me ajudam a sentir melhor quando estou mal emocionalmente.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 67,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Pratico atividades físicas regularmente.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 68,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Tenho atividades de lazer ou hobbies que me proporcionam prazer.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 69,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Utilizo práticas de relaxamento, meditação ou mindfulness para lidar com o estresse.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 70,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Consigo expressar meus sentimentos para pessoas próximas quando estou mal.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 71,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Tenho facilidade para pedir ajuda quando preciso.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 72,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Tenho clareza sobre meus pontos fortes e recursos pessoais para enfrentar dificuldades.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  {
    id: 73,
    section: "PARTE 7: RECURSOS E ESTRATÉGIAS DE ENFRENTAMENTO",
    text: "Acredito em minha capacidade de superar as dificuldades atuais.",
    type: "choice",
    options: ["A", "B", "C", "D", "E"],
    answer: null
  },
  // Additional Comments
  {
    id: 74,
    section: "ESPAÇO PARA COMENTÁRIOS ADICIONAIS",
    text: "Utilize este espaço para adicionar qualquer informação que considere relevante sobre seu estado emocional atual, sintomas ou circunstâncias que não foram contempladas nas questões acima:",
    type: "text",
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
