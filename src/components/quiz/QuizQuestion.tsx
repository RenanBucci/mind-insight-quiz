
import { Question, useQuizStore } from '@/store/quizStore';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (questionId: number, answer: string) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  const handleOptionSelect = (value: string) => {
    onAnswer(question.id, value);
  };

  return (
    <Card className="mb-6 transition-opacity duration-300">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">
          {question.text}
        </h3>
        
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
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
