export type ActiveTab = 
  | 'dashboard'
  | 'workout'
  | 'coach'
  | 'progress'
  | 'leaderboard'
  | 'challenges'
  | 'diet'
  | 'profile';

export type ExerciseType = 'pushups' | 'squats' | 'plank' | 'jumpingjacks' | 'lunges';

export interface ExerciseInfo {
  id: ExerciseType;
  name: string;
  category: string;
  targetMuscles: string[];
  defaultReps: number;
  caloriesPerRep: number;
  instructions: string[];
  idealJointAngles: {
    name: string;
    min: number;
    max: number;
  }[];
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  department: string;
  studentId: string;
  academicYear: string;
  age: number;
  heightCm: number;
  weightKg: number;
  bmi: number;
  fitnessGoal: 'Muscle Gain' | 'Fat Loss' | 'Stamina & Energy' | 'Stress Relief & Posture';
  fitnessScore: number;
  avatarUrl: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
}

export interface DailyStats {
  todayWorkoutMinutes: number;
  goalWorkoutMinutes: number;
  fitnessScore: number;
  stepsCurrent: number;
  stepsGoal: number;
  waterGlasses: number;
  waterGoalGlasses: number;
  caloriesBurned: number;
  caloriesGoal: number;
  restingHeartRate: number;
  sleepHours: number;
  sleepGoalHours: number;
}

export interface WorkoutSession {
  id: string;
  date: string;
  exerciseName: string;
  durationMinutes: number;
  reps: number;
  calories: number;
  accuracyScore: number;
  status: 'Completed' | 'In Progress' | 'Target Met';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'streak' | 'workout' | 'hydration' | 'campus';
  xpReward: number;
}

export interface ChallengeItem {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'campus';
  category: string;
  participantsCount: number;
  progressPercent: number;
  daysRemaining: number;
  reward: string;
  targetDescription: string;
  isJoined: boolean;
  isCompleted: boolean;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  college: string;
  department: string;
  avatar: string;
  points: number;
  workoutsCompleted: number;
  stepsThisWeek: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface MealItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isMessFriendly: boolean;
  notes?: string;
}

export interface DailyMealPlan {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionKey: string;
  }[];
  workoutRecommendation?: {
    title: string;
    duration: string;
    intensity: string;
    exercises: string[];
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'achievement' | 'challenge' | 'reminder' | 'campus';
  read: boolean;
}
