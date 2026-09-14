import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ActiveTab, 
  StudentProfile, 
  DailyStats, 
  WorkoutSession,
  ExerciseType
} from '../types';
import { initialStudentProfile, initialDailyStats, workoutHistory } from '../data/mockData';
import { useToast } from './ToastContext';

interface CompletedWorkoutSummary {
  exerciseId: ExerciseType;
  exerciseName: string;
  reps: number;
  durationSeconds: number;
  calories: number;
  accuracy: number;
  xpEarned: number;
}

interface FitnessContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profile: StudentProfile;
  dailyStats: DailyStats;
  workoutList: WorkoutSession[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  incrementWater: () => void;
  resetWater: () => void;
  logSteps: (additionalSteps: number) => void;
  recordCompletedWorkout: (summary: CompletedWorkoutSummary) => void;
  isSosOpen: boolean;
  setIsSosOpen: (open: boolean) => void;
  celebrationData: CompletedWorkoutSummary | null;
  setCelebrationData: (data: CompletedWorkoutSummary | null) => void;
  updateProfile: (partial: Partial<StudentProfile>) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('fitverse_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [dailyStats, setDailyStats] = useState<DailyStats>(() => {
    const saved = localStorage.getItem('fitverse_stats');
    return saved ? JSON.parse(saved) : initialDailyStats;
  });

  const [workoutList, setWorkoutList] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem('fitverse_workouts');
    return saved ? JSON.parse(saved) : workoutHistory;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('fitverse_theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isSosOpen, setIsSosOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState<CompletedWorkoutSummary | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fitverse_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fitverse_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('fitverse_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('fitverse_stats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  useEffect(() => {
    localStorage.setItem('fitverse_workouts', JSON.stringify(workoutList));
  }, [workoutList]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const incrementWater = () => {
    setDailyStats((prev) => {
      const nextGlasses = Math.min(prev.waterGlasses + 1, 16);
      if (nextGlasses === prev.waterGoalGlasses) {
        showToast({
          type: 'success',
          title: 'Hydration Target Reached! 💧',
          message: `You've drunk ${nextGlasses} glasses (2 Liters) of water today. Excellent work!`
        });
      } else {
        showToast({
          type: 'info',
          title: 'Water Logged',
          message: `Glass ${nextGlasses} of ${prev.waterGoalGlasses} recorded.`
        });
      }
      return { ...prev, waterGlasses: nextGlasses };
    });
  };

  const resetWater = () => {
    setDailyStats((prev) => ({ ...prev, waterGlasses: 0 }));
  };

  const logSteps = (additionalSteps: number) => {
    setDailyStats((prev) => {
      const newSteps = prev.stepsCurrent + additionalSteps;
      const additionalCalories = Math.round(additionalSteps * 0.04);
      return {
        ...prev,
        stepsCurrent: newSteps,
        caloriesBurned: prev.caloriesBurned + additionalCalories
      };
    });
  };

  const recordCompletedWorkout = (summary: CompletedWorkoutSummary) => {
    const newSession: WorkoutSession = {
      id: `wk-${Date.now()}`,
      date: 'Just now',
      exerciseName: summary.exerciseName,
      durationMinutes: Math.max(1, Math.round(summary.durationSeconds / 60)),
      reps: summary.reps,
      calories: summary.calories,
      accuracyScore: summary.accuracy,
      status: 'Completed'
    };

    setWorkoutList((prev) => [newSession, ...prev]);

    // Update daily stats
    setDailyStats((prev) => {
      const durationMins = Math.max(1, Math.round(summary.durationSeconds / 60));
      const newWorkoutMinutes = prev.todayWorkoutMinutes + durationMins;
      const newCalories = prev.caloriesBurned + summary.calories;
      const newScore = Math.min(100, Math.round(prev.fitnessScore + 1));
      return {
        ...prev,
        todayWorkoutMinutes: newWorkoutMinutes,
        caloriesBurned: newCalories,
        fitnessScore: newScore
      };
    });

    // Update profile XP & Level
    setProfile((prev) => {
      const newXp = prev.xp + summary.xpEarned;
      let newLevel = prev.level;
      let newNextXp = prev.nextLevelXp;

      if (newXp >= prev.nextLevelXp) {
        newLevel += 1;
        newNextXp += 1500;
        showToast({
          type: 'success',
          title: `Level Up! Level ${newLevel} Reached! 🎖️`,
          message: 'Campus fitness level updated on the college leaderboard!'
        });
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextLevelXp: newNextXp
      };
    });

    setCelebrationData(summary);
  };

  const updateProfile = (partial: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...partial };
      // recalculate BMI if height or weight changed
      if (partial.heightCm || partial.weightKg) {
        const heightM = updated.heightCm / 100;
        const bmiVal = Number((updated.weightKg / (heightM * heightM)).toFixed(1));
        updated.bmi = bmiVal;
      }
      return updated;
    });
    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your health and academic details have been saved.'
    });
  };

  return (
    <FitnessContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profile,
        dailyStats,
        workoutList,
        isDarkMode,
        toggleDarkMode,
        incrementWater,
        resetWater,
        logSteps,
        recordCompletedWorkout,
        isSosOpen,
        setIsSosOpen,
        celebrationData,
        setCelebrationData,
        updateProfile
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
