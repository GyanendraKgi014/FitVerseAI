import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Flame, 
  Calendar, 
  Gift, 
  CheckCircle2, 
  Clock, 
  Users, 
  ChevronRight, 
  Trophy, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { challengesList } from '../data/mockData';
import { useFitness } from '../context/FitnessContext';
import { useToast } from '../context/ToastContext';

export const Challenges: React.FC = () => {
  const { profile, setActiveTab } = useFitness();
  const { showToast } = useToast();

  // State for 30-Day Calendar Days (Day 1 to 30)
  const [completedDays, setCompletedDays] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
  ]);

  const toggleDayCompletion = (day: number) => {
    if (completedDays.includes(day)) {
      setCompletedDays((prev) => prev.filter((d) => d !== day));
    } else {
      setCompletedDays((prev) => [...prev, day]);
      showToast({
        type: 'success',
        title: `Day ${day} Completed! 🎯`,
        message: '30-Day Campus Fitness progress updated.'
      });
    }
  };

  const currentDay = 15;
  const progressPercent = Math.round((completedDays.length / 30) * 100);

  const weeklyTargets = [
    { title: 'Burn 2,500 kcal in AI Sessions', current: 2150, target: 2500, unit: 'kcal' },
    { title: 'Log 4 Pose Detection Workouts', current: 3, target: 4, unit: 'sessions' },
    { title: 'Accumulate 50,000 Campus Steps', current: 42300, target: 50000, unit: 'steps' },
    { title: 'Drink 2L Water 6 Days this Week', current: 5, target: 6, unit: 'days' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="green" size="sm" dot>
              Campus League Challenges
            </Badge>
            <span className="text-xs text-slate-400">SIH Innovation Initiative</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Fitness Challenges & Rewards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Commit to the 30-day transformation sprint, conquer inter-hostel bounties, and win certified campus perks.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Flame className="w-4 h-4 fill-white" />}
          onClick={() => setActiveTab('workout')}
        >
          Daily Workout Ready
        </Button>
      </div>

      {/* Featured 30-Day Fitness Challenge Grid Card */}
      <Card className="border-primary-500/30 bg-gradient-to-br from-primary-500/5 via-teal-500/5 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                30-Day Campus Fitness & Posture Sprint
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Complete at least 20 minutes of daily physical activity. Click a day to toggle completion.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Overall Completion</span>
              <strong className="text-lg font-black text-primary-600 dark:text-primary-400">{progressPercent}%</strong>
            </div>
            <div className="w-32 bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 30-Day Interactive Matrix Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
          {Array.from({ length: 30 }).map((_, idx) => {
            const dayNum = idx + 1;
            const isDone = completedDays.includes(dayNum);
            const isToday = dayNum === currentDay;

            return (
              <button
                key={dayNum}
                onClick={() => toggleDayCompletion(dayNum)}
                className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 relative ${
                  isDone
                    ? 'bg-gradient-to-t from-primary-500 to-emerald-500 text-white border-primary-400 shadow-md shadow-primary-500/20'
                    : isToday
                    ? 'bg-white dark:bg-slate-800 border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-bold shadow-lg'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                }`}
              >
                {isToday && (
                  <span className="absolute -top-1.5 px-1.5 py-0.2 rounded-full bg-primary-500 text-[8px] font-black text-white uppercase">
                    Today
                  </span>
                )}
                <span className="text-xs font-bold">Day {dayNum}</span>
                <span className="text-base">
                  {isDone ? '✓' : isToday ? '⭐' : '⭕'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <span>{completedDays.length} of 30 days checked off</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Reward: Gold Scholar Fitness Certificate + ₹500 Cafeteria Voucher
          </span>
        </div>
      </Card>

      {/* Weekly Goals & Bounties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goals Progress */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                This Week's Fitness Targets
              </h3>
              <p className="text-xs text-slate-500">Resets every Sunday midnight</p>
            </div>
            <Badge variant="blue" size="sm">Week 37</Badge>
          </div>

          <div className="space-y-4">
            {weeklyTargets.map((item, i) => {
              const pct = Math.min(100, Math.round((item.current / item.target) * 100));
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.title}
                    </span>
                    <span className="text-slate-500">
                      {item.current.toLocaleString()} / {item.target.toLocaleString()} {item.unit} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Monthly Rewards & Campus Vouchers */}
        <Card className="border-amber-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-500" />
                Campus Rewards & Perks
              </h3>
              <p className="text-xs text-slate-500">Sponsored for SIH26196 student participants</p>
            </div>
            <Badge variant="amber" size="sm">Available</Badge>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-500/20 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Campus Cafeteria Healthy Smoothie Voucher
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Redeemable at Central Dining Hall with 25+ completed AI workouts
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500 text-white shadow-sm shrink-0">
                Unlocked
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Gym Pro Equipment Priority Access Pass
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Priority slot reservation at Institute Sports Center
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                Lvl 15 Required
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  FitVerse Gold Scholar T-Shirt & SIH Trophy
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Awarded to top 100 university athletes at hackathon conclusion
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                Rank #4
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Community Challenges List */}
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
          All Active Campus Challenges
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challengesList.map((ch) => (
            <Card key={ch.id} hoverEffect className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge variant={ch.isCompleted ? 'green' : 'blue'} size="sm">
                    {ch.category}
                  </Badge>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                    {ch.title}
                  </h4>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 block">Remaining</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {ch.daysRemaining > 0 ? `${ch.daysRemaining} days` : 'Finished'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ch.targetDescription}
              </p>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Progress</span>
                  <span className="font-semibold text-primary-600 dark:text-primary-400">{ch.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full" style={{ width: `${ch.progressPercent}%` }} />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800 text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {ch.participantsCount} students
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  🎁 {ch.reward}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
