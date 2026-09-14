import {
  StudentProfile,
  DailyStats,
  WorkoutSession,
  ExerciseInfo,
  Achievement,
  ChallengeItem,
  LeaderboardUser,
  DailyMealPlan,
  ChatMessage,
  NotificationItem,
} from "../types";

export const initialStudentProfile: StudentProfile = {
  id: "std-25035-1179-0041",
  name: "Sonakshi Verma",
  email: "gyanendrasrlboy1@gmail.com",
  college: "Krishna Institute of Technology",
  department: "BCA",
  studentId: "2503511790041",
  academicYear: "2rd Year (BCA)",
  age: 20,
  heightCm: 175,
  weightKg: 68,
  bmi: 22.2, // Normal: 18.5 - 24.9
  fitnessGoal: "Muscle Gain",
  fitnessScore: 82,
  avatarUrl: "profile.png",
  level: 1,
  xp: 3850,
  nextLevelXp: 0,
  streakDays: 1,
};

export const initialDailyStats: DailyStats = {
  todayWorkoutMinutes: 0,
  goalWorkoutMinutes: 40,
  fitnessScore: 0,
  stepsCurrent: 0,
  stepsGoal: 10000,
  waterGlasses: 0,
  waterGoalGlasses: 8,
  caloriesBurned: 0,
  caloriesGoal: 0.0,
  restingHeartRate: 0,
  sleepHours: 0.0,
  sleepGoalHours: 0.0,
};

export const exercisesData: ExerciseInfo[] = [
  {
    id: "pushups",
    name: "Push-up",
    category: "Upper Body & Core",
    targetMuscles: ["Chest", "Triceps", "Shoulders", "Core"],
    defaultReps: 15,
    caloriesPerRep: 0.6,
    instructions: [
      "Place your hands shoulder-width apart on the mat.",
      "Maintain a neutral spine and straight body line from head to heels.",
      "Lower your chest until your elbows reach roughly 90 degrees.",
      "Push firmly back up while engaging your chest and core.",
    ],
    idealJointAngles: [
      { name: "Elbow Angle", min: 80, max: 95 },
      { name: "Hip Alignment", min: 170, max: 180 },
    ],
  },
  {
    id: "squats",
    name: "Air Squat",
    category: "Lower Body",
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
    defaultReps: 20,
    caloriesPerRep: 0.8,
    instructions: [
      "Stand with feet shoulder-width apart, toes pointing slightly outward.",
      "Keep your chest tall and spine neutral as you descend.",
      "Hinge back and push your hips down until thighs are parallel to ground.",
      "Drive through your heels to return to the standing posture.",
    ],
    idealJointAngles: [
      { name: "Knee Flexion", min: 85, max: 100 },
      { name: "Torso Incline", min: 45, max: 65 },
    ],
  },
  {
    id: "plank",
    name: "Forearm Plank",
    category: "Core Stability",
    targetMuscles: ["Rectus Abdominis", "Transverse Abdominis", "Lower Back"],
    defaultReps: 60, // Seconds
    caloriesPerRep: 0.25, // per second
    instructions: [
      "Rest on your forearms with elbows directly beneath your shoulders.",
      "Tighten your glutes and core to keep your body in a rigid horizontal plane.",
      "Do not let your hips sag down or pike into the air.",
      "Breathe steadily and hold your head aligned with spine.",
    ],
    idealJointAngles: [
      { name: "Back Flatness", min: 172, max: 180 },
      { name: "Shoulder-Elbow Angle", min: 88, max: 92 },
    ],
  },
  {
    id: "jumpingjacks",
    name: "Jumping Jack",
    category: "Cardio & Agility",
    targetMuscles: ["Full Body", "Calves", "Deltoids", "Cardiovascular"],
    defaultReps: 30,
    caloriesPerRep: 0.5,
    instructions: [
      "Begin standing upright with feet together and arms at your sides.",
      "Jump feet out to the sides while raising arms overhead synchronously.",
      "Jump back to the starting stance in a light, rhythmic cadence.",
      "Keep knees softly bent upon landing to protect joints.",
    ],
    idealJointAngles: [
      { name: "Arm Elevation", min: 160, max: 180 },
      { name: "Leg Spread", min: 40, max: 60 },
    ],
  },
  {
    id: "lunges",
    name: "Walking Lunge",
    category: "Lower Body & Balance",
    targetMuscles: ["Quadriceps", "Glutes", "Hamstrings", "Hip Flexors"],
    defaultReps: 16,
    caloriesPerRep: 0.75,
    instructions: [
      "Take a controlled, generous step forward with one leg.",
      "Lower your hips until both knees are bent at approximately 90-degree angles.",
      "Ensure front knee does not track past your front toes.",
      "Push off front foot to step through into the opposite lunge.",
    ],
    idealJointAngles: [
      { name: "Front Knee Angle", min: 85, max: 95 },
      { name: "Rear Knee Clearance", min: 80, max: 90 },
    ],
  },
];

export const workoutHistory: WorkoutSession[] = [
  {
    id: "wk-1",
    date: "Today, 07:15 AM",
    exerciseName: "AI Pose Squat & Plank Circuit",
    durationMinutes: 28,
    reps: 45,
    calories: 260,
    accuracyScore: 94,
    status: "Completed",
  },
  {
    id: "wk-2",
    date: "Yesterday, 06:40 PM",
    exerciseName: "HIIT Jumping Jacks & Lunges",
    durationMinutes: 35,
    reps: 60,
    calories: 310,
    accuracyScore: 91,
    status: "Completed",
  },
  {
    id: "wk-3",
    date: "08 Sep, 08:00 AM",
    exerciseName: "Core Stabilizer & Push-ups",
    durationMinutes: 25,
    reps: 40,
    calories: 220,
    accuracyScore: 88,
    status: "Completed",
  },
  {
    id: "wk-4",
    date: "07 Sep, 05:30 PM",
    exerciseName: "Campus Perimeter Jog & Sprint",
    durationMinutes: 42,
    reps: 0,
    calories: 430,
    accuracyScore: 96,
    status: "Target Met",
  },
];

export const weeklyActivityData = [
  { day: "Mon", minutes: 35, calories: 340, steps: 8400 },
  { day: "Tue", minutes: 45, calories: 420, steps: 10200 },
  { day: "Wed", minutes: 20, calories: 190, steps: 6100 },
  { day: "Thu", minutes: 50, calories: 480, steps: 11300 },
  { day: "Fri", minutes: 40, calories: 390, steps: 9500 },
  { day: "Sat", minutes: 60, calories: 590, steps: 12400 },
  { day: "Sun", minutes: 28, calories: 260, steps: 6450 },
];

export const monthlyProgressData = [
  { week: "Week 1", score: 68, activeDays: 4, avgCalories: 380, weight: 70.2 },
  { week: "Week 2", score: 74, activeDays: 5, avgCalories: 430, weight: 69.5 },
  { week: "Week 3", score: 79, activeDays: 6, avgCalories: 490, weight: 68.8 },
  { week: "Week 4", score: 82, activeDays: 6, avgCalories: 540, weight: 68.0 },
];

export const sleepTrackingData = [
  { day: "Mon", totalHours: 6.8, deepHours: 1.8, remHours: 2.1 },
  { day: "Tue", totalHours: 7.4, deepHours: 2.2, remHours: 2.4 },
  { day: "Wed", totalHours: 6.2, deepHours: 1.5, remHours: 1.9 },
  { day: "Thu", totalHours: 7.8, deepHours: 2.5, remHours: 2.6 },
  { day: "Fri", totalHours: 6.5, deepHours: 1.6, remHours: 2.0 },
  { day: "Sat", totalHours: 8.5, deepHours: 3.0, remHours: 2.8 },
  { day: "Sun", totalHours: 7.2, deepHours: 2.1, remHours: 2.3 },
];

export const waterIntakeHistory = [
  { time: "08:00 AM", amountMl: 250, glasses: 1 },
  { time: "10:30 AM", amountMl: 250, glasses: 1 },
  { time: "01:15 PM", amountMl: 250, glasses: 1 },
  { time: "03:45 PM", amountMl: 250, glasses: 1 },
  { time: "06:00 PM", amountMl: 250, glasses: 1 },
];

export const achievementsList: Achievement[] = [
  {
    id: "ach-1",
    title: "14-Day Dorm Streak",
    description:
      "Maintained consecutive daily physical activity for 2 weeks in hostel",
    iconName: "Flame",
    unlocked: true,
    unlockedAt: "Today",
    category: "streak",
    xpReward: 300,
  },
  {
    id: "ach-2",
    title: "Perfect Form Master",
    description:
      "Achieved 95%+ posture score on AI Vision pose tracker across 5 sets",
    iconName: "Award",
    unlocked: true,
    unlockedAt: "Yesterday",
    category: "workout",
    xpReward: 250,
  },
  {
    id: "ach-3",
    title: "Hydration Hero",
    description: "Logged 8 full glasses of water for 7 consecutive days",
    iconName: "Droplets",
    unlocked: true,
    unlockedAt: "06 Sep",
    category: "hydration",
    xpReward: 150,
  },
  {
    id: "ach-4",
    title: "Campus Sprinter",
    description: "Covered 10,000+ steps across academic blocks in a single day",
    iconName: "Footprints",
    unlocked: true,
    unlockedAt: "04 Sep",
    category: "campus",
    xpReward: 200,
  },
  {
    id: "ach-5",
    title: "Hostel Centurion",
    description: "Complete 100 recorded AI camera workouts",
    iconName: "Trophy",
    unlocked: false,
    category: "workout",
    xpReward: 500,
  },
  {
    id: "ach-6",
    title: "Exam Season Zen",
    description:
      "Completed 10-minute mindfulness & stretching session during finals week",
    iconName: "Sparkles",
    unlocked: false,
    category: "streak",
    xpReward: 200,
  },
];

export const challengesList: ChallengeItem[] = [
  {
    id: "ch-1",
    title: "30-Day Campus Transformation Challenge",
    type: "monthly",
    category: "Full Body Endurance",
    participantsCount: 842,
    progressPercent: 65,
    daysRemaining: 11,
    reward: "FitVerse Gold Badge + Cafeteria Healthy Meal Voucher",
    targetDescription:
      "Complete at least 25 minutes of AI guided workout 24 days out of 30",
    isJoined: true,
    isCompleted: false,
  },
  {
    id: "ch-2",
    title: "Hostel Block C vs Block D Steps War",
    type: "weekly",
    category: "Cardio & Walking",
    participantsCount: 310,
    progressPercent: 88,
    daysRemaining: 2,
    reward: "Inter-Hostel Sports Trophy Point & 500 XP",
    targetDescription: "Average 9,000 steps daily as a dorm collective",
    isJoined: true,
    isCompleted: false,
  },
  {
    id: "ch-3",
    title: "7-Minute Morning Dorm Plank Streak",
    type: "daily",
    category: "Core & Posture",
    participantsCount: 520,
    progressPercent: 100,
    daysRemaining: 0,
    reward: "Core Champion Badge + 100 XP",
    targetDescription:
      "Hold plank posture with AI precision checking for 7 minutes cumulative",
    isJoined: true,
    isCompleted: true,
  },
  {
    id: "ch-4",
    title: "SIH Annual 10K Campus Run Prep",
    type: "campus",
    category: "Stamina",
    participantsCount: 1240,
    progressPercent: 42,
    daysRemaining: 18,
    reward: "Official College Marathon Bib + Finisher Jersey",
    targetDescription:
      "Accumulate 45 km outdoor jog distance before hackathon finals",
    isJoined: false,
    isCompleted: false,
  },
];

export const collegeLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    id: "u-1",
    name: "Rohan Deshmukh",
    college: "IIT Bombay",
    department: "Mechanical Engg",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    points: 9420,
    workoutsCompleted: 68,
    stepsThisWeek: 78500,
    badge: "🏆 Grandmaster",
  },
  {
    rank: 2,
    id: "u-2",
    name: "Pooja Sundaram",
    college: "NIT Trichy",
    department: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    points: 9150,
    workoutsCompleted: 64,
    stepsThisWeek: 74200,
    badge: "🥈 Elite Athlete",
  },
  {
    rank: 3,
    id: "u-3",
    name: "Kabir Verma",
    college: "BITS Pilani",
    department: "Electrical & Electronics",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    points: 8840,
    workoutsCompleted: 59,
    stepsThisWeek: 71900,
    badge: "🥉 Campus Warrior",
  },
  {
    rank: 4,
    id: "std-25035-1179-0014",
    name: "Raja Kushwaha(You)",
    college: "Krishna Institute of Technology",
    department: "BCA",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    points: 8420,
    workoutsCompleted: 52,
    stepsThisWeek: 68400,
    badge: "⚡ Top 5 Contender",
    isCurrentUser: true,
  },
  {
    rank: 5,
    id: "u-5",
    name: "Ananya Roy",
    college: "Delhi University",
    department: "Biotechnology",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    points: 8190,
    workoutsCompleted: 48,
    stepsThisWeek: 66100,
    badge: "🌟 Rising Star",
  },
  {
    rank: 6,
    id: "u-6",
    name: "Vikramaditya Iyer",
    college: "Anna University",
    department: "Civil Engineering",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    points: 7920,
    workoutsCompleted: 45,
    stepsThisWeek: 64200,
    badge: "🏃 Marathoner",
  },
  {
    rank: 7,
    id: "u-7",
    name: "Divya Nambiar",
    college: "VIT Vellore",
    department: "Information Technology",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    points: 7650,
    workoutsCompleted: 43,
    stepsThisWeek: 61800,
    badge: "🧘 Flexibility Pro",
  },
];

export const departmentLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    id: "d-1",
    name: "Computer Science & Engg",
    college: "IIT Bombay",
    department: "240 Active Students",
    avatar:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=120&auto=format&fit=crop&q=80",
    points: 384500,
    workoutsCompleted: 1420,
    stepsThisWeek: 1890000,
    badge: "🏆 #1 Dept Shield",
  },
  {
    rank: 2,
    id: "d-2",
    name: "Mechanical Engineering",
    college: "IIT Bombay",
    department: "195 Active Students",
    avatar:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120&auto=format&fit=crop&q=80",
    points: 341200,
    workoutsCompleted: 1280,
    stepsThisWeek: 1720000,
    badge: "🥈 Iron Dept",
  },
  {
    rank: 3,
    id: "d-3",
    name: "Electrical Engineering",
    college: "IIT Bombay",
    department: "210 Active Students",
    avatar:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=120&auto=format&fit=crop&q=80",
    points: 318900,
    workoutsCompleted: 1190,
    stepsThisWeek: 1580000,
    badge: "🥉 Spark Force",
  },
];

export const dailyStudentDiet: DailyMealPlan = {
  targetCalories: 2250,
  targetProtein: 135,
  targetCarbs: 260,
  targetFat: 65,
  breakfast: [
    {
      name: "Hostel Mess Boiled Eggs / Sprouted Moong Salad",
      portion: "3 Eggs or 1.5 Cups Sprouted Moong",
      calories: 280,
      protein: 21,
      carbs: 22,
      fat: 10,
      isMessFriendly: true,
      notes:
        "Available daily in hostel breakfast; add chopped cucumber & lemon.",
    },
    {
      name: "Oats with Milk & Banana Slices",
      portion: "1 Large Bowl (50g Oats + 200ml Toned Milk)",
      calories: 320,
      protein: 12,
      carbs: 54,
      fat: 5,
      isMessFriendly: true,
      notes: "Quick dorm breakfast using hot mess milk.",
    },
  ],
  lunch: [
    {
      name: "Mess Dal Tadka with 3 Phulkas (Rotis)",
      portion: "1.5 Katori Dal + 3 Dry Rotis",
      calories: 420,
      protein: 18,
      carbs: 68,
      fat: 9,
      isMessFriendly: true,
      notes: "Ask for ghee to be applied lightly on rotis.",
    },
    {
      name: "Paneer Bhurji / Soya Chunks Curry",
      portion: "100g Paneer or 40g Cooked Soya",
      calories: 270,
      protein: 24,
      carbs: 8,
      fat: 16,
      isMessFriendly: true,
      notes: "Excellent affordable protein source for college hostels.",
    },
    {
      name: "Fresh Cucumber & Tomato Salad",
      portion: "1 Bowl with Pinch of Chaat Masala",
      calories: 45,
      protein: 2,
      carbs: 8,
      fat: 0.5,
      isMessFriendly: true,
      notes: "Fiber keeps energy steady through afternoon lectures.",
    },
  ],
  dinner: [
    {
      name: "Steamed Jeera Rice with Rajma / Chana Dal",
      portion: "1 Medium Bowl Rice + 1.5 Bowl Rajma",
      calories: 440,
      protein: 19,
      carbs: 76,
      fat: 7,
      isMessFriendly: true,
      notes: "Rich in complex carbs for muscle glycogen replenishment.",
    },
    {
      name: "Low-Fat Curd (Dahi) or Buttermilk (Chaas)",
      portion: "1 Glass (200ml)",
      calories: 90,
      protein: 6,
      carbs: 8,
      fat: 3,
      isMessFriendly: true,
      notes: "Probiotics help digestion after stressful study days.",
    },
  ],
  snacks: [
    {
      name: "Roasted Chana & Makhana Mix (Study Snack)",
      portion: "1 Cup (50g)",
      calories: 190,
      protein: 9,
      carbs: 26,
      fat: 4.5,
      isMessFriendly: true,
      notes: "Replaces unhealthy deep-fried canteen samosas and chips.",
    },
    {
      name: "Handful of Almonds & Walnuts + Green Tea",
      portion: "10-12 Nuts + 1 Mug Unsugared Green Tea",
      calories: 140,
      protein: 5,
      carbs: 4,
      fat: 12,
      isMessFriendly: true,
      notes:
        "Omega-3 fatty acids improve memory consolidation during exam revision.",
    },
  ],
};

export const initialChatMessages: ChatMessage[] = [
  {
    id: "m-1",
    sender: "ai",
    text: "Namaste Raja! 🇮🇳 I'm your FitVerse AI Coach. Whether you need a quick 15-minute dorm workout between lectures, hostel mess nutrition hacks, or exam stress relief techniques, I'm right here to guide you. How are you feeling today?",
    timestamp: "09:00 AM",
    actions: [
      { label: "Create 15-min Dorm Plan", actionKey: "create_dorm_plan" },
      { label: "Hostel Mess Protein Hacks", actionKey: "mess_protein" },
      { label: "Reduce Exam Tension", actionKey: "exam_tension" },
    ],
  },
  {
    id: "m-2",
    sender: "user",
    text: "I have semester exams next week and spend 9 hours sitting at my study desk. What can I do for lower back stiffness without losing revision time?",
    timestamp: "09:02 AM",
  },
  {
    id: "m-3",
    sender: "ai",
    text: "Exam season sitting fatigue is super common among students! Here is the **FitVerse 8-Minute Desk Reset Protocol** that restores spinal blood flow without draining mental stamina:\n\n1. **Cat-Cow Chair Stretches** (1.5 mins): Inhale to arch spine, exhale to round shoulders.\n2. **Seated Glute Figure-4 Stretch** (2 mins): Releases tight piriformis muscles compressing the sciatic nerve.\n3. **Standing Thoracic Rotations** (2 mins): Loosens mid-back from hunching over laptops.\n4. **Wall Squat Isometric Hold** (2.5 mins): Reactivates quadriceps and wakes up cerebral blood flow.\n\nTake a sip of water right after. Would you like me to start an AI pose-monitored timer for this session?",
    timestamp: "09:03 AM",
    workoutRecommendation: {
      title: "Dorm Desk Posture Decompressor",
      duration: "8 Minutes",
      intensity: "Low (Restorative)",
      exercises: [
        "Chair Cat-Cow",
        "Figure-4 Stretch",
        "Thoracic Twist",
        "Wall Sit",
      ],
    },
  },
];

export const upcomingCampusEvents = [
  {
    id: "ev-1",
    title: "SIH Annual Inter-Collegiate 5K Marathon",
    date: "14 Sep, 06:30 AM",
    location: "Main Academic Campus Oval Ground",
    badge: "College Trophy",
    attendees: 380,
  },
  {
    id: "ev-2",
    title: "Sunrise Flow: Student Yoga & Mindfulness",
    date: "16 Sep, 06:45 AM",
    location: "Hostel Quadrangle Lawn",
    badge: "Stress Buster",
    attendees: 195,
  },
  {
    id: "ev-3",
    title: "Hackathon Calisthenics Push-Up Blitz",
    date: "18 Sep, 05:00 PM",
    location: "Student Activity Centre (SAC)",
    badge: "Cash Prize",
    attendees: 240,
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "🔥 14-Day Streak Unlocked!",
    message:
      "Awesome consistency! You earned +300 XP and the Dorm Streak Master badge.",
    timeAgo: "15 mins ago",
    type: "achievement",
    read: false,
  },
  {
    id: "notif-2",
    title: "💧 Hydration Reminder",
    message:
      "Time for your 6th glass of water! Only 3 glasses left to hit your daily target.",
    timeAgo: "45 mins ago",
    type: "reminder",
    read: false,
  },
  {
    id: "notif-3",
    title: "🏆 Hostel Block War Update",
    message:
      "Hostel Block C just moved to #1 rank with 12,400 average daily steps.",
    timeAgo: "2 hours ago",
    type: "campus",
    read: true,
  },
  {
    id: "notif-4",
    title: "🏃 SIH Campus Marathon",
    message:
      "Registrations close in 48 hours. Claim your student racer kit now.",
    timeAgo: "5 hours ago",
    type: "challenge",
    read: true,
  },
];
