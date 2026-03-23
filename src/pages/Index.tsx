import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TaskBoard from '@/components/TaskBoard';
import Analytics from '@/components/Analytics';

type Section = 'tasks' | 'analytics';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('tasks');

  return (
    <div className="flex min-h-screen">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      {activeSection === 'tasks' ? <TaskBoard /> : <Analytics />}
    </div>
  );
};

export default Index;
