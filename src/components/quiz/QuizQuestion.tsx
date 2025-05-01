
import { Question, useQuizStore } from '@/store/quizStore';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';

interface QuizQuestionProps {
  question: Question;
}

const QuizQuestion = ({ question }: QuizQuestionProps) => {
  const setAnswer = useQuizStore((state) => state.setAnswer);

  const handleOptionSelect = (value: string) => {
    setAnswer(question.id, value);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">
          {question.id}. {question.text}
        </h3>
        
        <RadioGroup
          value={question.answer || ""}
          onValueChange={handleOptionSelect}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`q${question.id}-option${index}`}
                name={`question-${question.id}`}
                value={option}
                checked={question.answer === option}
                onChange={() => handleOptionSelect(option)}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={`q${question.id}-option${index}`} className="text-base cursor-pointer">
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
