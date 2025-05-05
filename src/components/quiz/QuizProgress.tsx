
import { Progress } from '@/components/ui/progress';
import { Award } from 'lucide-react';

interface QuizProgressProps {
  answered: number;
  total: number;
}

const QuizProgress = ({ answered, total }: QuizProgressProps) => {
  const progress = Math.round((answered / total) * 100);
  
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-blue-100 text-blue-600">
              <Award className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">Progresso do questionário</span>
          </div>
          <span className="text-sm font-medium text-blue-600">
            {answered} de {total} respondidas
          </span>
        </div>
        
        <div className="relative">
          <Progress 
            value={progress} 
            className="h-2.5 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500" 
          />
          
          {/* Progress markers for each 25% */}
          <div className="absolute top-0 left-0 right-0 flex justify-between mt-4">
            {[0, 25, 50, 75, 100].map((marker) => (
              <div 
                key={marker} 
                className="flex flex-col items-center"
              >
                <div 
                  className={`w-1.5 h-1.5 rounded-full mb-1 
                    ${progress >= marker ? 'bg-blue-500' : 'bg-gray-300'}`}
                />
                <span 
                  className={`text-xs ${progress >= marker ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
                >
                  {marker}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
