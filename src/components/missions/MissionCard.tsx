
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Rocket, Star, Award, BadgeCheck, Milestone } from 'lucide-react';
import { Mission } from '@/store/missionStore';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  mission: Mission;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ 
  mission, 
  isActive = false,
  onClick,
  className
}) => {
  const progressPercentage = Math.round((mission.progress / mission.totalSteps) * 100);
  
  // Map icon names to Lucide components
  const getIcon = (iconName?: string) => {
    switch(iconName) {
      case 'trophy': return <Trophy className="h-6 w-6" />;
      case 'rocket': return <Rocket className="h-6 w-6" />;
      case 'star': return <Star className="h-6 w-6" />;
      case 'award': return <Award className="h-6 w-6" />;
      case 'badge-check': return <BadgeCheck className="h-6 w-6" />;
      case 'milestone': return <Milestone className="h-6 w-6" />;
      default: return <Star className="h-6 w-6" />;
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 transition-all hover:shadow-md cursor-pointer border-l-4",
        isActive ? "border-l-blue-500" : mission.completed ? "border-l-green-500" : "border-l-gray-300",
        mission.completed ? "bg-gradient-to-r from-green-50 to-transparent" : 
          isActive ? "bg-gradient-to-r from-blue-50 to-transparent" : "",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-full",
          mission.completed ? "text-green-500 bg-green-100" : 
            isActive ? "text-blue-500 bg-blue-100" : "text-gray-500 bg-gray-100"
        )}>
          {getIcon(mission.icon)}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-gray-900">{mission.title}</h3>
            {mission.completed ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Completada
              </Badge>
            ) : isActive ? (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                Ativa
              </Badge>
            ) : null}
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{mission.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progresso</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className={cn(
                "h-1.5", 
                mission.completed ? "bg-green-100" : "bg-gray-100",
                mission.completed ? "[&>div]:bg-green-500" : isActive ? "[&>div]:bg-blue-500" : ""
              )}
            />
          </div>
          
          {mission.reward && (
            <div className="mt-3 pt-2 border-t border-dashed border-gray-200">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-gray-500">Recompensa:</span>
                <span className="font-medium text-gray-700">{mission.reward}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MissionCard;
