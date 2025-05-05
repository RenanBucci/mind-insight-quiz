
import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface QuestionCardProps {
  questionId: number;
  questionText: string;
  sectionTitle: string;
  options?: string[];
  answer: string | null;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onPrev: () => void;
  showSubQuestion?: boolean;
  subQuestionText?: string;
  subAnswer?: string | null;
  onSubAnswer?: (answer: string) => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
  questionType?: string;
  currentQuestionNumber?: number;
  totalQuestions?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionId,
  questionText,
  sectionTitle,
  options = ['A', 'B', 'C', 'D', 'E'],
  answer,
  onAnswer,
  onNext,
  onPrev,
  showSubQuestion = false,
  subQuestionText = '',
  subAnswer = null,
  onSubAnswer = () => {},
  isLastQuestion = false,
  isFirstQuestion = false,
  questionType = 'choice',
  currentQuestionNumber = 1,
  totalQuestions = 1,
}) => {
  // Map options to their full descriptions
  const optionLabels = {
    'A': 'Nunca/Discordo totalmente',
    'B': 'Raramente/Discordo parcialmente',
    'C': 'Às vezes/Nem concordo nem discordo',
    'D': 'Frequentemente/Concordo parcialmente',
    'E': 'Sempre/Concordo totalmente'
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-3 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          {sectionTitle}
        </h1>
        <p className="text-sm text-gray-500">Questão {currentQuestionNumber} de {totalQuestions}</p>
        
        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
      
      <Card className="p-6 md:p-8 mb-8 shadow-lg rounded-xl border-0 overflow-hidden relative bg-gradient-to-br from-white to-blue-50">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="hidden md:block text-7xl font-bold text-indigo-200 leading-none">
            {questionId}
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-6">
              <div className="md:hidden flex-shrink-0 text-4xl font-bold text-indigo-400 leading-none mr-2">
                {questionId}
              </div>
              <div>
                <p className="text-lg md:text-xl text-gray-800 font-medium">{questionText}</p>
                
                {questionType === 'choice' && (
                  <div className="mt-2">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1">
                          <HelpCircle className="h-3 w-3" />
                          <span>Ver explicação das opções</span>
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2 p-2">
                          <h4 className="text-sm font-medium">Significado das opções:</h4>
                          <ul className="space-y-1 text-sm">
                            {Object.entries(optionLabels).map(([key, value]) => (
                              <li key={key} className="flex items-start gap-2">
                                <span className="font-bold">{key}:</span> 
                                <span className="text-gray-600">{value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
              </div>
            </div>
            
            {questionType === 'choice' ? (
              <RadioGroup 
                value={answer || ""}
                onValueChange={onAnswer}
                className="space-y-3"
              >
                {options.map((option) => (
                  <div 
                    key={option} 
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                  >
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${option}`} 
                      className="text-blue-600"
                    />
                    <Label 
                      htmlFor={`option-${option}`} 
                      className="cursor-pointer text-lg flex-1"
                    >
                      <span className="font-medium">{option}</span> - {optionLabels[option as keyof typeof optionLabels] || option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              questionText.length > 50 ? (
                <Textarea
                  value={answer || ""}
                  onChange={(e) => onAnswer(e.target.value)}
                  placeholder="Digite sua resposta aqui..."
                  className="w-full min-h-[150px] bg-white/70 border-blue-100 focus-visible:ring-blue-400"
                />
              ) : (
                <Input
                  type="text"
                  value={answer || ""}
                  onChange={(e) => onAnswer(e.target.value)}
                  placeholder="Digite sua resposta aqui..."
                  className="w-full bg-white/70 border-blue-100 focus-visible:ring-blue-400"
                />
              )
            )}
            
            {showSubQuestion && (
              <div className="mt-8 pt-5 border-t border-blue-100">
                <p className="text-base italic mb-3 text-gray-700">{subQuestionText}</p>
                <Input
                  type="text"
                  value={subAnswer || ""}
                  onChange={(e) => onSubAnswer(e.target.value)}
                  placeholder="Digite sua resposta aqui..."
                  className="w-full bg-white/70 border-blue-100 focus-visible:ring-blue-400"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between mt-8">
        <Button 
          onClick={onPrev}
          variant="outline" 
          size="lg"
          className="px-6 py-6 text-base flex items-center gap-2 transition-all hover:translate-x-[-2px]"
          disabled={isFirstQuestion}
        >
          <ChevronLeft className="mr-1" /> Anterior
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!answer} 
          size="lg"
          className="px-6 py-6 text-base gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700 transition-all hover:translate-x-[2px]"
        >
          {isLastQuestion ? 'Finalizar' : 'Próxima'} <ChevronRight className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
