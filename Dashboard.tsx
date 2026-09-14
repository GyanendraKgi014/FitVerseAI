import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Flame,
  Footprints,
  Droplets,
  Heart,
  Scale,
  ArrowUpRight,
  Trophy,
  Bot,
  UtensilsCrossed,
  Calendar,
  Plus,
  Play,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { useFitness } from "../context/FitnessContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ProgressRing } from "../components/ui/ProgressRing";
import {
  weeklyActivityData,
  monthlyProgressData,
  achievementsList,
  challengesList,
  upcomingCampusEvents,
} from "../data/mockData";

export const Dashboard: React.FC = () => {
  const {
    profile,
    dailyStats,
    workoutList,
    incrementWater,
    setActiveTab,
    setIsSosOpen,
  } = useFitness();

  const [activeChartTab, setActiveChartTab] = useState<"weekly" | "monthly">(
    "weekly",
  );

  const workoutPercent = Math.round(
    (dailyStats.todayWorkoutMinutes / dailyStats.goalWorkoutMinutes) * 100,
  );
  const stepsPercent = Math.round(
    (dailyStats.stepsCurrent / dailyStats.stepsGoal) * 100,
  );
  const waterPercent = Math.round(
    (dailyStats.waterGlasses / dailyStats.waterGoalGlasses) * 100,
  );
  const caloriesPercent = Math.round(
    (dailyStats.caloriesBurned / dailyStats.caloriesGoal) * 100,
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Top Greeting & Campus Announcement Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary-600/10 via-teal-500/10 to-secondary-500/10 p-6 rounded-3xl border border-primary-500/20 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green" size="sm" dot>
              {profile.college} • Campus Active
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Exam Season Hydration Week
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Good Morning, {profile.name} 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            You are on a{" "}
            <strong className="text-amber-600 dark:text-amber-400">
              {profile.streakDays}-day streak!
            </strong>{" "}
            Crush your 40-minute goal today to keep <br /> Krishna Institute Of
            Technology at #1 on the national leaderboard.
          </p>
        </div>

        {/* Quick Actions Strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            icon={<Play className="w-4 h-4 fill-white" />}
            onClick={() => setActiveTab("workout")}
          >
            Start AI Workout
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={<Bot className="w-4 h-4 text-primary-500" />}
            onClick={() => setActiveTab("coach")}
          >
            AI Coach
          </Button>
        </div>
      </div>

      {/* Top Primary Highlights Grid: Today's Goal, Fitness Score, Key Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Today's Goal Card */}
        <Card
          hoverEffect
          className="lg:col-span-1 border-primary-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Today's Goal
              </span>
              <Badge variant="green" size="sm">
                {workoutPercent}%
              </Badge>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                  {dailyStats.todayWorkoutMinutes}{" "}
                  <span className="text-sm font-normal text-slate-500">
                    / {dailyStats.goalWorkoutMinutes} min
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  12 mins remaining to close rings
                </p>
              </div>
              <ProgressRing
                progress={workoutPercent}
                size={84}
                strokeWidth={8}
                startColor="#22C55E"
                endColor="#14B8A6"
              >
                <Dumbbell className="w-5 h-5 text-primary-500" />
              </ProgressRing>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-full mt-4"
            icon={<Play className="w-3.5 h-3.5 fill-current" />}
            onClick={() => setActiveTab("workout")}
          >
            Start Workout
          </Button>
        </Card>

        {/* Fitness Score Card */}
        <Card
          hoverEffect
          className="lg:col-span-1 border-teal-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Campus Fitness Score
              </span>
              <Badge variant="teal" size="sm">
                Top 5%
              </Badge>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                  82{" "}
                  <span className="text-sm font-normal text-slate-500">
                    / 100
                  </span>
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +4.2% this month
                </p>
              </div>
              <ProgressRing
                progress={82}
                size={84}
                strokeWidth={8}
                startColor="#14B8A6"
                endColor="#3B82F6"
              >
                <Award className="w-5 h-5 text-teal-500" />
              </ProgressRing>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Form: 92%</span>
            <span>Cardio: 80%</span>
            <span>Rest: 75%</span>
          </div>
        </Card>

        {/* Steps Tracker Card */}
        <Card
          hoverEffect
          className="border-blue-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Today's Steps
              </span>
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-500">
                <Footprints className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {dailyStats.stepsCurrent.toLocaleString()}
                <span className="text-xs font-normal text-slate-500">
                  {" "}
                  / {dailyStats.stepsGoal.toLocaleString()}
                </span>
              </h3>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stepsPercent}%` }}
                  transition={{ duration: 1 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>4.9 km • Academic Block Walk</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {stepsPercent}%
            </span>
          </div>
        </Card>

        {/* Water Intake Card (Interactive) */}
        <Card
          hoverEffect
          className="border-cyan-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Water Intake
              </span>
              <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-500">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {dailyStats.waterGlasses}
                <span className="text-xs font-normal text-slate-500">
                  {" "}
                  / {dailyStats.waterGoalGlasses} Glasses
                </span>
              </h3>
              <div className="flex items-center gap-1.5 mt-3">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 h-3 rounded-md transition-colors ${
                      idx < dailyStats.waterGlasses
                        ? "bg-gradient-to-t from-cyan-500 to-blue-400 shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {(dailyStats.waterGlasses * 250) / 1000}L of 2.0L logged
            </span>
            <button
              onClick={incrementWater}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Log Glass
            </button>
          </div>
        </Card>
      </div>

      {/* Secondary Metrics: Calories, BMI, Heart Rate, Streak */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wide font-medium block">
              Calories Burned
            </span>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {dailyStats.caloriesBurned}{" "}
              <span className="text-xs font-normal text-slate-400">kcal</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">
              Target: {dailyStats.caloriesGoal} kcal
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wide font-medium block">
              BMI Status
            </span>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {profile.bmi}{" "}
              <span className="text-xs font-normal text-emerald-500">
                Normal
              </span>
            </div>
            <span className="text-[10px] text-slate-400">68 kg • 175 cm</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 animate-pulse">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wide font-medium block">
              Resting Pulse
            </span>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {dailyStats.restingHeartRate}{" "}
              <span className="text-xs font-normal text-slate-400">BPM</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">
              Athletic Range
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wide font-medium block">
              Sleep Index
            </span>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {dailyStats.sleepHours}{" "}
              <span className="text-xs font-normal text-slate-400">
                / 8 hrs
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Optimal recovery</span>
          </div>
        </div>
      </div>

      {/* Main Visuals & Analytics Section: Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Activity Graphs */}
        <Card className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                Physical Activity Trends
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily exercise minutes and calorie outputs across campus week
              </p>
            </div>
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start">
              <button
                onClick={() => setActiveChartTab("weekly")}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeChartTab === "weekly"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Weekly Activity
              </button>
              <button
                onClick={() => setActiveChartTab("monthly")}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeChartTab === "monthly"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Monthly Progress
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            {activeChartTab === "weekly" ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyActivityData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorMinutes"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#22C55E"
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    name="Workout Minutes"
                    stroke="#22C55E"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMinutes)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyProgressData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="week"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    domain={[50, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Fitness Score"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Average: 39 mins/day</span>
            <span className="text-primary-600 dark:text-primary-400 font-semibold">
              Optimal consistency for student cognitive function
            </span>
          </div>
        </Card>

        {/* Right 1 Col: Quick Actions Hub & SIH Campus Spotlight */}
        <div className="space-y-4">
          <Card className="border-secondary-500/30">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Quick Action Center
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setActiveTab("workout")}
                className="p-3 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 text-primary-700 dark:text-primary-300 flex flex-col items-center text-center gap-1.5 transition-all"
              >
                <Dumbbell className="w-5 h-5 text-primary-500" />
                <span className="text-xs font-semibold">AI Pose Workout</span>
              </button>

              <button
                onClick={() => setActiveTab("diet")}
                className="p-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 flex flex-col items-center text-center gap-1.5 transition-all"
              >
                <UtensilsCrossed className="w-5 h-5 text-teal-500" />
                <span className="text-xs font-semibold">Mess Diet Plan</span>
              </button>

              <button
                onClick={() => setActiveTab("coach")}
                className="p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 flex flex-col items-center text-center gap-1.5 transition-all"
              >
                <Bot className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-semibold">Ask AI Coach</span>
              </button>

              <button
                onClick={() => setActiveTab("leaderboard")}
                className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex flex-col items-center text-center gap-1.5 transition-all"
              >
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-semibold">Leaderboards</span>
              </button>
            </div>

            {/* Emergency SOS Banner Button */}
            <button
              onClick={() => setIsSosOpen(true)}
              className="w-full mt-3 p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
                <span className="text-xs font-bold">
                  Emergency SOS & Campus Medical
                </span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </Card>

          {/* Active Campus Challenge Card */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
            <div className="flex items-center justify-between text-xs text-primary-400 font-semibold mb-2">
              <span>Campus Challenge</span>
              <span>11 Days Left</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              30-Day Campus Transformation
            </h4>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              Complete 25 mins of AI workout 24 days out of 30 to win hostel
              cafeteria vouchers.
            </p>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-primary-400 h-full rounded-full"
                style={{ width: "65%" }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
              <span>65% Achieved</span>
              <button
                onClick={() => setActiveTab("challenges")}
                className="text-primary-400 font-semibold hover:underline flex items-center gap-1"
              >
                Details <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Workout History Table & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workout History Table (2 cols) */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Recent Workout Sessions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verified sessions with AI posture detection
              </p>
            </div>
            <button
              onClick={() => setActiveTab("progress")}
              className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-1"
            >
              Full History <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium">
                  <th className="pb-3">Exercise / Routine</th>
                  <th className="pb-3">Date & Time</th>
                  <th className="pb-3">Duration</th>
                  <th className="pb-3">Calories</th>
                  <th className="pb-3">Form Accuracy</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {workoutList.slice(0, 4).map((session) => (
                  <tr
                    key={session.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                        <Dumbbell className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate max-w-[140px] sm:max-w-none">
                        {session.exerciseName}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">{session.date}</td>
                    <td className="py-3">{session.durationMinutes} min</td>
                    <td className="py-3 font-medium text-orange-600 dark:text-orange-400">
                      {session.calories} kcal
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {session.accuracyScore}%
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant="green" size="sm">
                        {session.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Upcoming Campus Events (1 col) */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-500" />
              Campus Fitness Events
            </h3>
            <span className="text-xs text-slate-400">September</span>
          </div>

          <div className="space-y-3">
            {upcomingCampusEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2 hover:border-primary-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-white">
                    {evt.title}
                  </h4>
                  <Badge variant="blue" size="sm">
                    {evt.badge}
                  </Badge>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                  <div>📅 {evt.date}</div>
                  <div>📍 {evt.location}</div>
                  <div>👥 {evt.attendees} students attending</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Student Badges & Achievements
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unlocked by consistent workout execution and campus health habits
            </p>
          </div>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline"
          >
            View Leaderboard
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievementsList.slice(0, 4).map((ach) => (
            <Card
              key={ach.id}
              hoverEffect
              className={`flex items-start gap-3.5 ${
                ach.unlocked
                  ? "border-amber-500/30 bg-amber-50/10 dark:bg-amber-950/10"
                  : "opacity-60 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {ach.title}
                  </h4>
                  {ach.unlocked && (
                    <span className="text-[10px] text-amber-500 font-semibold">
                      +{ach.xpReward} XP
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {ach.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
