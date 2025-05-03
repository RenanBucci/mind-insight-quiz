
import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      <h1 className="text-3xl font-bold text-center mb-6">{sectionTitle}</h1>
      
      <Card className="p-8 mb-8 shadow-md">
        <div className="flex items-start gap-6">
          <div className="text-7xl font-bold text-blue-400 leading-none">
            {questionId}
          </div>
          <div className="flex-1">
            <p className="text-xl mb-6">{questionText}</p>
            
            {questionType === 'choice' ? (
              <RadioGroup 
                value={answer || ""}
                onValueChange={onAnswer}
                className="space-y-3"
              >
                {options.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <RadioGroupItem value={option} id={`option-${option}`} />
                    <Label htmlFor={`option-${option}`} className="cursor-pointer text-lg">
                      ( ) {option === 'A' ? 'Nunca/Discordo totalmente' : 
                          option === 'B' ? 'Raramente/Discordo parcialmente' :
                          option === 'C' ? 'Às vezes/Nem concordo nem discordo' :
                          option === 'D' ? 'Frequentemente/Concordo parcialmente' :
                          'Sempre/Concordo totalmente'}
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
                  className="w-full min-h-[120px]"
                />
              ) : (
                <Input
                  type="text"
                  value={answer || ""}
                  onChange={(e) => onAnswer(e.target.value)}
                  placeholder="Digite sua resposta aqui..."
                  className="w-full"
                />
              )
            )}
            
            {showSubQuestion && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-lg italic mb-3">{subQuestionText}</p>
                <Input
                  type="text"
                  value={subAnswer || ""}
                  onChange={(e) => onSubAnswer(e.target.value)}
                  placeholder="Digite sua resposta aqui..."
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between mt-6">
        <Button 
          onClick={onPrev}
          variant="secondary" 
          size="lg"
          className="px-8 py-6 text-lg"
        >
          <ChevronLeft className="mr-2" /> Anterior
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!answer} 
          size="lg"
          className="px-8 py-6 text-lg"
        >
          {isLastQuestion ? 'Finalizar' : 'Próxima'} <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
