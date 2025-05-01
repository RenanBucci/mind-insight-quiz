
import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  answered: number;
  total: number;
}

const QuizProgress = ({ answered, total }: QuizProgressProps) => {
  const progress = Math.round((answered / total) * 100);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-text-secondary">Progresso</span>
        <span className="text-sm font-medium">
          {answered} de {total} respondidas ({progress}%)
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default QuizProgress;
