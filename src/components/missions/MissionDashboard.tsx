
import React, { useState } from 'react';
import { useMissionStore, Mission } from '@/store/missionStore';
import MissionCard from './MissionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Award } from 'lucide-react';

const MissionDashboard: React.FC = () => {
  const { 
    missions, 
    activeMission, 
    setActiveMission, 
    getMissionsByCategory,
    completedMissions
  } = useMissionStore();
  
  const anameseMissions = getMissionsByCategory('anamnese');
  const burnoutMissions = getMissionsByCategory('burnout');
  const generalMissions = getMissionsByCategory('general');
  
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const handleSetActiveMission = (mission: Mission) => {
    if (mission.completed) return;
    setActiveMission(mission.id === activeMission ? null : mission.id);
  };
  
  const renderMissions = (missionList: Mission[]) => {
    return (
      <div className="space-y-3 animate-fade-in">
        {missionList.length === 0 ? (
          <p className="text-center text-gray-500 py-6">Nenhuma missão disponível nesta categoria.</p>
        ) : (
          missionList.map(mission => (
            <MissionCard
              key={mission.id}
              mission={mission}
              isActive={mission.id === activeMission}
              onClick={() => handleSetActiveMission(mission)}
            />
          ))
        )}
      </div>
    );
  };
  
  const completionRate = missions.length > 0 
    ? Math.round((completedMissions.length / missions.length) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Suas Missões</h2>
          <p className="text-gray-500 text-sm">Complete missões para avançar em sua jornada</p>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
          <Award className="text-yellow-500 h-5 w-5" />
          <span className="text-sm font-medium">{completionRate}% completo</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
          <TabsTrigger value="burnout">Burnout</TabsTrigger>
          <TabsTrigger value="general">Gerais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {missions.length === 0 ? (
            <p className="text-center text-gray-500 py-6">Nenhuma missão disponível.</p>
          ) : renderMissions(missions)}
        </TabsContent>
        
        <TabsContent value="anamnese">
          {renderMissions(anameseMissions)}
        </TabsContent>
        
        <TabsContent value="burnout">
          {renderMissions(burnoutMissions)}
        </TabsContent>
        
        <TabsContent value="general">
          {renderMissions(generalMissions)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MissionDashboard;
