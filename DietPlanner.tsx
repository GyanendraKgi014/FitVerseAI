import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UtensilsCrossed, 
  Droplets, 
  Flame, 
  Wheat, 
  Beef, 
  Sparkles, 
  Plus, 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  Coffee, 
  Sun, 
  Moon 
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { dailyStudentDiet } from '../data/mockData';
import { useFitness } from '../context/FitnessContext';
import { useToast } from '../context/ToastContext';

export const DietPlanner: React.FC = () => {
  const { profile, dailyStats, incrementWater } = useFitness();
  const { showToast } = useToast();

  const [dietPlan, setDietPlan] = useState(dailyStudentDiet);
  const [activeMealTab, setActiveMealTab] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snacks'>('all');

  // Calculate total macros from meal plan
  const totalCalories = [
    ...dietPlan.breakfast,
    ...dietPlan.lunch,
    ...dietPlan.dinner,
    ...dietPlan.snacks
  ].reduce((acc, m) => acc + m.calories, 0);

  const totalProtein = [
    ...dietPlan.breakfast,
    ...dietPlan.lunch,
    ...dietPlan.dinner,
    ...dietPlan.snacks
  ].reduce((acc, m) => acc + m.protein, 0);

  const totalCarbs = [
    ...dietPlan.breakfast,
    ...dietPlan.lunch,
    ...dietPlan.dinner,
    ...dietPlan.snacks
  ].reduce((acc, m) => acc + m.carbs, 0);

  const totalFat = [
    ...dietPlan.breakfast,
    ...dietPlan.lunch,
    ...dietPlan.dinner,
    ...dietPlan.snacks
  ].reduce((acc, m) => acc + m.fat, 0);

  const mealSections = [
    { key: 'breakfast', label: 'Hostel Breakfast', icon: <Coffee className="w-4 h-4 text-amber-500" />, items: dietPlan.breakfast },
    { key: 'lunch', label: 'Campus Mess Lunch', icon: <Sun className="w-4 h-4 text-orange-500" />, items: dietPlan.lunch },
    { key: 'dinner', label: 'Light Dinner', icon: <Moon className="w-4 h-4 text-indigo-500" />, items: dietPlan.dinner },
    { key: 'snacks', label: 'Late-Night Study Fuel', icon: <Sparkles className="w-4 h-4 text-emerald-500" />, items: dietPlan.snacks },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="teal" size="sm" dot>
              Student Mess Nutrition Engine
            </Badge>
            <span className="text-xs text-slate-400">Budget & Campus Mess Friendly</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Student Diet & Macro Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Scientifically balanced Indian student meal plans built for college hostel mess menus and late-night study hours.
          </p>
        </div>

        <Button
          variant="accent"
          size="md"
          icon={<Droplets className="w-4 h-4" />}
          onClick={incrementWater}
        >
          Log Glass of Water ({dailyStats.waterGlasses}/{dailyStats.waterGoalGlasses})
        </Button>
      </div>

      {/* Top Macronutrient Breakdown Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Calories Card */}
        <Card className="border-primary-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Total Energy
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalCalories} <span className="text-xs font-normal text-slate-400">/ {dietPlan.targetCalories} kcal</span>
            </div>
            <div className="w-28 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-primary-500 h-full rounded-full"
                style={{ width: `${Math.min(100, (totalCalories / dietPlan.targetCalories) * 100)}%` }}
              />
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-500">
            <Flame className="w-6 h-6" />
          </div>
        </Card>

        {/* Protein Card */}
        <Card className="border-blue-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Protein (Muscle Repair)
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalProtein}g <span className="text-xs font-normal text-slate-400">/ {dietPlan.targetProtein}g</span>
            </div>
            <div className="w-28 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${Math.min(100, (totalProtein / dietPlan.targetProtein) * 100)}%` }}
              />
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
            <Beef className="w-6 h-6" />
          </div>
        </Card>

        {/* Carbs Card */}
        <Card className="border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Carbohydrates (Brain Fuel)
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalCarbs}g <span className="text-xs font-normal text-slate-400">/ {dietPlan.targetCarbs}g</span>
            </div>
            <div className="w-28 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${Math.min(100, (totalCarbs / dietPlan.targetCarbs) * 100)}%` }}
              />
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <Wheat className="w-6 h-6" />
          </div>
        </Card>

        {/* Hydration Card */}
        <Card className="border-cyan-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Hydration Balance
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {dailyStats.waterGlasses} <span className="text-xs font-normal text-slate-400">/ 8 Glasses</span>
            </div>
            <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold block mt-1">
              {(dailyStats.waterGlasses * 250) / 1000}L of 2.0L Target
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500">
            <Droplets className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Meal Breakdown Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Meal Categories */}
        <div className="lg:col-span-2 space-y-6">
          {mealSections.map((section) => (
            <Card key={section.key} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {section.label}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {section.items.reduce((s, i) => s + i.calories, 0)} kcal • {section.items.reduce((s, i) => s + i.protein, 0)}g protein
                    </span>
                  </div>
                </div>
                <Badge variant="teal" size="sm">Hostel Friendly</Badge>
              </div>

              <div className="space-y-3">
                {section.items.map((meal, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {meal.name}
                        </span>
                        {meal.isMessFriendly && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                            Available in Mess
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Portion: {meal.portion}
                      </p>
                      {meal.notes && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                          💡 {meal.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs shrink-0 self-end sm:self-center">
                      <span className="font-bold text-orange-600 dark:text-orange-400">
                        {meal.calories} kcal
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {meal.protein}g P
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Right 1 Col: Student Mess Hacks & Healthy Tips */}
        <div className="space-y-6">
          <Card className="border-teal-500/30 bg-teal-50/10 dark:bg-teal-950/10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Campus Mess Food Hacks
              </h3>
            </div>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <strong className="text-slate-900 dark:text-white block">1. Thick Dal Hack</strong>
                Ask the mess server to ladle dal from the bottom of the vessel where cooked lentils settle, giving 2.5x more protein per bowl!
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <strong className="text-slate-900 dark:text-white block">2. Dorm Electric Kettle Eggs</strong>
                Keep a mini batch of boiled eggs or soaked moong sprouts in your hostel room for quick 12g protein post-workout.
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <strong className="text-slate-900 dark:text-white block">3. Ditch Midnight Maggi</strong>
                Swap instant noodles for roasted makhana (foxnuts) + roasted chana seasoned with chaat masala. Same crunch, zero palm oil crash.
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <strong className="text-slate-900 dark:text-white block">4. Study Session Green Tea</strong>
                L-theanine in green tea combines with caffeine to provide sustained cognitive alertness without the jitters of energy drinks.
              </div>
            </div>
          </Card>

          {/* Quick Water Reminder Banner */}
          <Card className="border-cyan-500/30 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-500 mx-auto flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Hydration Status: {dailyStats.waterGlasses}/8 Glasses
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Students lose up to 15% cognitive processing speed when dehydrated by just 2%!
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              icon={<Plus className="w-3.5 h-3.5 text-cyan-500" />}
              onClick={incrementWater}
            >
              Add Glass of Water
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
