
import { useState } from 'react';
import { Question, useQuizStore } from '@/store/quizStore';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Timer, HelpCircle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useEffect } from 'react';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (questionId: number, answer: string) => void;
  showTimer?: boolean;
}

const TIMER_DURATION = 20; // 20 seconds

const QuizQuestion = ({ question, onAnswer, showTimer = true }: QuizQuestionProps) => {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerActive, setTimerActive] = useState(showTimer);
  
  // Only show timer for multiple choice questions
  const shouldShowTimer = showTimer && question.type === 'choice';

  useEffect(() => {
    // Reset timer when question changes
    if (shouldShowTimer) {
      setTimeLeft(TIMER_DURATION);
      setTimerActive(true);
    }
    
    // Start countdown
    let timer: number | null = null;
    if (shouldShowTimer && timerActive) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer!);
            setTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [question.id, shouldShowTimer]);

  const handleOptionSelect = (value: string) => {
    onAnswer(question.id, value);
    setTimerActive(false); // Stop timer when answered
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onAnswer(question.id, e.target.value);
  };
  
  const renderOptionsMeaning = () => {
    if (question.type !== 'choice') return null;
    
    return (
      <div className="text-sm space-y-1">
        <p><strong>A</strong> = Nunca/Discordo totalmente</p>
        <p><strong>B</strong> = Raramente/Discordo parcialmente</p>
        <p><strong>C</strong> = Às vezes/Nem concordo nem discordo</p>
        <p><strong>D</strong> = Frequentemente/Concordo parcialmente</p>
        <p><strong>E</strong> = Sempre/Concordo totalmente</p>
      </div>
    );
  };

  return (
    <Card className="mb-6 transition-opacity duration-300">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start">
            <h3 className="text-lg font-medium">
              {question.text}
            </h3>
            
            {question.type === 'choice' && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <HelpCircle size={18} />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Significado das opções:</h4>
                    {renderOptionsMeaning()}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          
          {shouldShowTimer && (
            <div className={`flex items-center space-x-1 ${timeLeft < 5 ? 'text-red-500' : 'text-gray-500'}`}>
              <Timer size={16} />
              <span className="text-sm font-medium">{timeLeft}s</span>
            </div>
          )}
        </div>
        
        {question.section && (
          <p className="text-sm text-gray-500 mb-4">{question.section}</p>
        )}
        
        {question.type === 'choice' && question.options && (
          <RadioGroup
            value={question.answer || ""}
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 rounded-md border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <RadioGroupItem
                  id={`q${question.id}-option${index}`}
                  value={option}
                />
                <Label htmlFor={`q${question.id}-option${index}`} className="text-base cursor-pointer w-full">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {question.type === 'text' && (
          question.id === 74 ? (
            <Textarea 
              value={question.answer || ""}
              onChange={handleTextChange}
              placeholder="Digite sua resposta aqui..."
              className="w-full min-h-[150px]"
            />
          ) : (
            <Input
              type="text"
              value={question.answer || ""}
              onChange={handleTextChange}
              placeholder="Digite sua resposta aqui..."
              className="w-full"
            />
          )
        )}
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
