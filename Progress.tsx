import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart as LineChartIcon, 
  Flame, 
  Scale, 
  Moon, 
  Droplets, 
  Calendar, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  Dumbbell 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  weeklyActivityData, 
  monthlyProgressData, 
  sleepTrackingData, 
  workoutHistory 
} from '../data/mockData';
import { useFitness } from '../context/FitnessContext';

export const Progress: React.FC = () => {
  const { profile, dailyStats, workoutList } = useFitness();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  // Calorie comparison data (Burned vs Intake)
  const caloriesComparisonData = [
    { day: 'Mon', burned: 540, intake: 2150 },
    { day: 'Tue', burned: 620, intake: 2280 },
    { day: 'Wed', burned: 410, intake: 2050 },
    { day: 'Thu', burned: 680, intake: 2320 },
    { day: 'Fri', burned: 590, intake: 2200 },
    { day: 'Sat', burned: 740, intake: 2450 },
    { day: 'Sun', burned: 540, intake: 2100 },
  ];

  // Weight and BMI timeline data
  const weightBmiHistory = [
    { month: 'Apr', weight: 72.5, bmi: 23.7 },
    { month: 'May', weight: 71.4, bmi: 23.3 },
    { month: 'Jun', weight: 70.8, bmi: 23.1 },
    { month: 'Jul', weight: 69.9, bmi: 22.8 },
    { month: 'Aug', weight: 68.9, bmi: 22.5 },
    { month: 'Sep', weight: 68.0, bmi: 22.2 },
  ];

  // Water intake weekly history
  const weeklyWaterData = [
    { day: 'Mon', glasses: 7, target: 8 },
    { day: 'Tue', glasses: 8, target: 8 },
    { day: 'Wed', glasses: 6, target: 8 },
    { day: 'Thu', glasses: 8, target: 8 },
    { day: 'Fri', glasses: 7, target: 8 },
    { day: 'Sat', glasses: 9, target: 8 },
    { day: 'Sun', glasses: 5, target: 8 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="green" size="sm" dot>
              Biometric Analytics
            </Badge>
            <span className="text-xs text-slate-400">Campus Longitudinal Health</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Student Progress & Vitals Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comprehensive analytics for physical training, caloric balance, sleep cycles, and hydration.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              timeframe === 'weekly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Weekly View
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              timeframe === 'monthly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Trend
          </button>
        </div>
      </div>

      {/* Workout Streak Heatmap Banner */}
      <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                14-Day Dorm & Campus Fitness Streak
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Consistent daily physical workout completed without interruption.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Personal Best: 18 Days
            </span>
          </div>
        </div>

        {/* 28-day Streak Blocks Matrix */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 pt-2">
          {Array.from({ length: 28 }).map((_, idx) => {
            const isCompleted = idx >= 14; // last 14 days active
            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 group relative"
              >
                <div
                  className={`w-full h-8 rounded-lg transition-transform group-hover:scale-110 flex items-center justify-center text-[10px] font-bold ${
                    isCompleted
                      ? 'bg-gradient-to-t from-amber-500 to-orange-400 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <span className="text-[9px] text-slate-400 hidden sm:block">
                  Day {idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Primary Charts Grid: Workout Activity vs Caloric Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Activity Minutes */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-primary-500" />
                {timeframe === 'weekly' ? 'Weekly Active Exercise Minutes' : 'Monthly Performance Score'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Duration logged via AI camera and campus activities
              </p>
            </div>
            <Badge variant="green" size="sm">Goal: 40m/day</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {timeframe === 'weekly' ? (
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="minutes" name="Minutes" fill="#22C55E" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Line type="monotone" dataKey="score" name="Fitness Score" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Caloric Intake vs Active Burn */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Caloric Intake vs Exercise Burn
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily mess nutrition kcal vs training expenditure
              </p>
            </div>
            <Badge variant="amber" size="sm">Deficit: ~200 kcal</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={caloriesComparisonData}>
                <defs>
                  <linearGradient id="colorIntake" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBurned" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="intake" name="Diet Intake (kcal)" stroke="#3B82F6" fill="url(#colorIntake)" strokeWidth={2} />
                <Area type="monotone" dataKey="burned" name="Workout Burn (kcal)" stroke="#F97316" fill="url(#colorBurned)" strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Secondary Graphs: Weight & BMI Trends, Sleep Tracking, Water Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weight & BMI Trend */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-teal-500" />
                Weight & BMI Evolution
              </h3>
              <p className="text-xs text-slate-500">6-Month Trendline</p>
            </div>
            <span className="text-xs font-bold text-emerald-600">-4.5 kg</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightBmiHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[65, 75]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
                <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="#14B8A6" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center text-xs text-slate-500">
            Current: <strong>{profile.weightKg} kg</strong> (BMI {profile.bmi} Healthy)
          </div>
        </Card>

        {/* Sleep Quality */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-indigo-500" />
                Sleep Architecture
              </h3>
              <p className="text-xs text-slate-500">Exam Recovery Index</p>
            </div>
            <span className="text-xs font-bold text-indigo-600">Avg 7.2h</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepTrackingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="totalHours" name="Total Sleep (hrs)" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center text-xs text-slate-500">
            Deep restorative sleep: <strong>2.1 hrs/night</strong>
          </div>
        </Card>

        {/* Water Intake Graph */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-500" />
                Weekly Hydration Log
              </h3>
              <p className="text-xs text-slate-500">Target: 8 Glasses (2L)</p>
            </div>
            <span className="text-xs font-bold text-cyan-600">88% Hit Rate</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyWaterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="glasses" name="Glasses" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center text-xs text-slate-500">
            Helps prevent cognitive fatigue during hostel study hours
          </div>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-500" />
              Chronological Activity Timeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified sessions with posture scores and calorie metrics
            </p>
          </div>
          <Badge variant="blue" size="sm">{workoutList.length} Sessions Logged</Badge>
        </div>

        <div className="space-y-4">
          {workoutList.map((session, idx) => (
            <div
              key={session.id}
              className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0">
                <Dumbbell className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {session.exerciseName}
                  </h4>
                  <span className="text-xs text-slate-400">{session.date}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600 dark:text-slate-300">
                  <span>⏱️ Duration: <strong>{session.durationMinutes} min</strong></span>
                  <span>🔥 Burned: <strong>{session.calories} kcal</strong></span>
                  {session.reps > 0 && <span>🔢 Reps: <strong>{session.reps}</strong></span>}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    🎯 Accuracy: {session.accuracyScore}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
