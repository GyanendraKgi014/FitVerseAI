import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FitnessProvider, useFitness } from './context/FitnessContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { EmergencySOSModal } from './components/common/EmergencySOSModal';
import { WorkoutCelebrationModal } from './components/common/WorkoutCelebrationModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { AIWorkout } from './pages/AIWorkout';
import { AICoach } from './pages/AICoach';
import { Progress } from './pages/Progress';
import { Leaderboard } from './pages/Leaderboard';
import { Challenges } from './pages/Challenges';
import { DietPlanner } from './pages/DietPlanner';
import { Profile } from './pages/Profile';

const AppContent: React.FC = () => {
  const { activeTab } = useFitness();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'workout':
        return <AIWorkout />;
      case 'coach':
        return <AICoach />;
      case 'progress':
        return <Progress />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'challenges':
        return <Challenges />;
      case 'diet':
        return <DietPlanner />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <MobileNav />

      {/* Global Portals / Modals */}
      <EmergencySOSModal />
      <WorkoutCelebrationModal />
    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <FitnessProvider>
        <AppContent />
      </FitnessProvider>
    </ToastProvider>
  );
}

export default App;
