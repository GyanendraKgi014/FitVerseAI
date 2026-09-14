import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  Users, 
  Building2, 
  Search, 
  Flame, 
  Sparkles, 
  Footprints, 
  ChevronUp, 
  ShieldCheck 
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { collegeLeaderboard, departmentLeaderboard, achievementsList } from '../data/mockData';
import { LeaderboardUser } from '../types';
import { useFitness } from '../context/FitnessContext';

export const Leaderboard: React.FC = () => {
  const { profile } = useFitness();
  const [activeTab, setActiveTab] = useState<'college' | 'department' | 'hostel'>('college');
  const [searchQuery, setSearchQuery] = useState('');

  // Top 3 Podium
  const topThree = collegeLeaderboard.slice(0, 3);
  const remainingList = collegeLeaderboard.filter((u) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="sm" dot>
              Inter-Collegiate Arena
            </Badge>
            <span className="text-xs text-slate-400">SIH National Campus League</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Campus Fitness Leaderboards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Compete with students across premier institutions in India. Top ranked universities win annual sports endowments.
          </p>
        </div>

        {/* Tab switcher: College, Department, Hostel */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 self-start">
          <button
            onClick={() => setActiveTab('college')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'college'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All-India Student Rank
          </button>
          <button
            onClick={() => setActiveTab('department')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'department'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Department Shields
          </button>
        </div>
      </div>

      {/* Podium Showcase: 2nd, 1st, 3rd */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
        {/* Silver #2 */}
        <Card hoverEffect className="border-slate-300 dark:border-slate-700 bg-gradient-to-b from-slate-100/50 to-transparent flex flex-col items-center text-center order-2 md:order-1 pt-8">
          <div className="relative">
            <img
              src={topThree[1].avatar}
              alt={topThree[1].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-slate-300 shadow-md"
            />
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-300 text-slate-800 text-xs font-bold shadow">
              #2 Silver
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mt-4">
            {topThree[1].name}
          </h3>
          <span className="text-xs text-slate-500">{topThree[1].college} • {topThree[1].department}</span>
          <div className="mt-4 px-4 py-1.5 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-xs font-black text-slate-800 dark:text-slate-200">
            {topThree[1].points.toLocaleString()} XP
          </div>
          <span className="text-[11px] text-slate-400 mt-2">{topThree[1].workoutsCompleted} Workouts • {topThree[1].stepsThisWeek.toLocaleString()} Steps</span>
        </Card>

        {/* Gold #1 */}
        <Card hoverEffect className="border-amber-400 dark:border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent flex flex-col items-center text-center order-1 md:order-2 shadow-xl shadow-amber-500/10 relative -translate-y-2 pt-6">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Crown className="w-8 h-8 text-amber-500 fill-amber-500 animate-bounce" />
          </div>
          <div className="relative mt-2">
            <img
              src={topThree[0].avatar}
              alt={topThree[0].name}
              className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-xl shadow-amber-500/30"
            />
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-slate-900 text-xs font-black shadow">
              #1 Gold
            </span>
          </div>
          <h3 className="font-black text-lg text-slate-900 dark:text-white mt-4">
            {topThree[0].name}
          </h3>
          <span className="text-xs text-slate-500 font-medium">{topThree[0].college} • {topThree[0].department}</span>
          <div className="mt-4 px-5 py-2 rounded-xl bg-amber-500 text-white text-sm font-black shadow-md shadow-amber-500/30">
            {topThree[0].points.toLocaleString()} XP
          </div>
          <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-2">
            {topThree[0].badge} • {topThree[0].stepsThisWeek.toLocaleString()} steps
          </span>
        </Card>

        {/* Bronze #3 */}
        <Card hoverEffect className="border-amber-700/30 dark:border-amber-700/50 bg-gradient-to-b from-amber-900/5 to-transparent flex flex-col items-center text-center order-3 pt-8">
          <div className="relative">
            <img
              src={topThree[2].avatar}
              alt={topThree[2].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-700 shadow-md"
            />
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-700 text-white text-xs font-bold shadow">
              #3 Bronze
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mt-4">
            {topThree[2].name}
          </h3>
          <span className="text-xs text-slate-500">{topThree[2].college} • {topThree[2].department}</span>
          <div className="mt-4 px-4 py-1.5 rounded-xl bg-amber-800/20 text-xs font-black text-amber-800 dark:text-amber-400">
            {topThree[2].points.toLocaleString()} XP
          </div>
          <span className="text-[11px] text-slate-400 mt-2">{topThree[2].workoutsCompleted} Workouts • {topThree[2].stepsThisWeek.toLocaleString()} Steps</span>
        </Card>
      </div>

      {/* Main Ranking Table & Search */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {activeTab === 'college' ? 'All-India College Student Rankings' : 'Inter-Departmental Rankings'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live standings based on workout volume, form accuracy, and step counts
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search college or student..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
        </div>

        {activeTab === 'college' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium">
                  <th className="pb-3 w-12 text-center">Rank</th>
                  <th className="pb-3">Student & Institution</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Workouts</th>
                  <th className="pb-3">Steps This Week</th>
                  <th className="pb-3 text-right">Fitness XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {remainingList.map((user) => {
                  const isUser = user.isCurrentUser;
                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors ${
                        isUser ? 'bg-primary-500/10 dark:bg-primary-500/15 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 text-center font-bold text-slate-900 dark:text-white">
                        {user.rank <= 3 ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs">
                            #{user.rank}
                          </span>
                        ) : (
                          `#${user.rank}`
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {user.name} {isUser && <span className="text-[10px] text-primary-600 dark:text-primary-400">(You)</span>}
                            </span>
                            <span className="text-[10px] text-slate-400">{user.college}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">{user.department}</td>
                      <td className="py-3">{user.workoutsCompleted} completed</td>
                      <td className="py-3 font-mono">{user.stepsThisWeek.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <span className="font-extrabold text-primary-600 dark:text-primary-400">
                          {user.points.toLocaleString()} XP
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentLeaderboard.map((dept) => (
              <div
                key={dept.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary-500/20 text-primary-600 dark:text-primary-400">
                    Rank #{dept.rank}
                  </span>
                  <span className="text-xs text-slate-400">{dept.department}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {dept.name}
                </h4>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>🔥 Total Points: <strong>{dept.points.toLocaleString()} XP</strong></div>
                  <div>🏃 Steps Logged: <strong>{dept.stepsThisWeek.toLocaleString()}</strong></div>
                  <div>🏋️ Sessions: <strong>{dept.workoutsCompleted}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Badges & Medals Showcase */}
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Medal className="w-5 h-5 text-amber-500" />
          Earnable Campus Medals & Hackathon Trophies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementsList.map((ach) => (
            <Card
              key={ach.id}
              className={`p-4 flex items-start gap-3.5 ${
                ach.unlocked ? 'border-primary-500/40 bg-emerald-50/10' : 'opacity-60'
              }`}
            >
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {ach.title}
                  </h4>
                  {ach.unlocked ? (
                    <Badge variant="green" size="sm">Unlocked</Badge>
                  ) : (
                    <span className="text-[10px] text-slate-400">Locked</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {ach.description}
                </p>
                <div className="mt-2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  +{ach.xpReward} Campus XP
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
