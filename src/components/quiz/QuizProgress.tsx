
import { Progress } from '@/components/ui/progress';
import { Award, Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizProgressProps {
  answered: number;
  total: number;
}

const QuizProgress = ({ answered, total }: QuizProgressProps) => {
  const progress = Math.round((answered / total) * 100);
  const isMobile = useIsMobile();
  
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
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
            className="h-3 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500 rounded-full" 
          />
          
          {/* Progress markers for each 25% - only show on desktop */}
          {!isMobile && (
            <div className="absolute top-0 left-0 right-0 flex justify-between mt-4">
              {[0, 25, 50, 75, 100].map((marker) => (
                <div 
                  key={marker} 
                  className="flex flex-col items-center"
                >
                  <div 
                    className={`w-2 h-2 rounded-full mb-1 
                      ${progress >= marker ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    {progress >= marker && marker > 0 && (
                      <span className="absolute -top-1 -left-1">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    )}
                  </div>
                  <span 
                    className={`text-xs ${progress >= marker ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
                  >
                    {marker}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
