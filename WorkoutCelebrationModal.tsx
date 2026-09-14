import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Flame, Zap, Clock, CheckCircle, ArrowRight, Share2 } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { Button } from '../ui/Button';

export const WorkoutCelebrationModal: React.FC = () => {
  const { celebrationData, setCelebrationData, setActiveTab } = useFitness();

  useEffect(() => {
    if (celebrationData) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22C55E', '#3B82F6', '#14B8A6', '#F59E0B']
        });
      } catch (e) {
        // Fallback gracefully if canvas confetti fails in non-standard environments
      }
    }
  }, [celebrationData]);

  if (!celebrationData) return null;

  const minutes = Math.floor(celebrationData.durationSeconds / 60);
  const seconds = celebrationData.durationSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-primary-500/30 overflow-hidden text-center p-6 md:p-8"
        >
          {/* Glowing Trophy Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-primary-500 via-emerald-400 to-teal-400 p-0.5 shadow-xl shadow-primary-500/30 flex items-center justify-center"
          >
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[22px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-primary-500 animate-bounce" />
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-5">
            Workout Crushed! 🚀
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {celebrationData.exerciseName} session logged to your campus fitness profile.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 my-6">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 text-left">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                Completed Reps
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {celebrationData.reps}
              </div>
              <div className="text-[10px] text-slate-400">Target surpassed</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-500/20 text-left">
              <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-medium">
                <Flame className="w-3.5 h-3.5" />
                Calories
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {celebrationData.calories} <span className="text-xs font-normal text-slate-400">kcal</span>
              </div>
              <div className="text-[10px] text-slate-400">High burn index</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-500/20 text-left">
              <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Active Time
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {timeFormatted}
              </div>
              <div className="text-[10px] text-slate-400">Paced cadence</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-500/20 text-left">
              <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-medium">
                <Zap className="w-3.5 h-3.5" />
                Form Accuracy
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {celebrationData.accuracy}%
              </div>
              <div className="text-[10px] text-slate-400">AI Pose Verified</div>
            </div>
          </div>

          {/* XP Pill */}
          <div className="p-3 bg-gradient-to-r from-amber-500/15 via-primary-500/15 to-blue-500/15 rounded-xl border border-amber-500/30 flex items-center justify-between mb-6">
            <span className="text-xs font-medium text-amber-800 dark:text-amber-300">
              Campus XP Gained
            </span>
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
              +{celebrationData.xpEarned} XP
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              icon={<Share2 className="w-4 h-4" />}
              onClick={() => {
                navigator.clipboard?.writeText?.(
                  `I just smashed ${celebrationData.reps} reps on FitVerse AI with ${celebrationData.accuracy}% form accuracy!`
                );
                setCelebrationData(null);
              }}
            >
              Share with Dorm
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => {
                setCelebrationData(null);
                setActiveTab('progress');
              }}
            >
              View Analytics
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
