import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  BookOpen,
  Scale,
  Heart,
  Award,
  Settings,
  Bell,
  Shield,
  Moon,
  Sun,
  Save,
  Camera,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useFitness } from "../context/FitnessContext";
import { useToast } from "../context/ToastContext";

export const Profile: React.FC = () => {
  const { profile, updateProfile, isDarkMode, toggleDarkMode } = useFitness();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: profile.name,
    college: profile.college,
    department: profile.department,
    studentId: profile.studentId,
    age: profile.age,
    heightCm: profile.heightCm,
    weightKg: profile.weightKg,
    fitnessGoal: profile.fitnessGoal,
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [campusLeaderboardVisible, setCampusLeaderboardVisible] =
    useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      college: formData.college,
      department: formData.department,
      studentId: formData.studentId,
      age: Number(formData.age),
      heightCm: Number(formData.heightCm),
      weightKg: Number(formData.weightKg),
      fitnessGoal: formData.fitnessGoal as any,
    });
  };

  const calculatedBmi = Number(
    (formData.weightKg / Math.pow(formData.heightCm / 100, 2)).toFixed(1),
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="blue" size="sm" dot>
            Student Medical & Academic ID
          </Badge>
          <span className="text-xs text-slate-400">SIH Certified Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          Student Fitness Identity
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your collegiate credentials, biometric profile, and privacy
          preferences.
        </p>
      </div>

      {/* Profile Overview Card Banner */}
      <Card className="border-primary-500/30 overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-primary-600 via-teal-600 to-secondary-600 -m-5 mb-0" />
        <div className="relative pt-0 px-2 sm:px-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-xl"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 rounded-xl bg-primary-500 text-white shadow-md hover:bg-primary-600 transition-colors"
                title="Update Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {profile.name}
                </h2>
                <Badge variant="green" size="sm">
                  Level {profile.level}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {profile.department} • {profile.college}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-semibold">
              Student ID: {profile.studentId}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Grid: Biometric Form + Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Edit Biometrics & Fitness Goals */}
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary-500" />
            Biometric & Academic Details
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Student Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Enrolled College / University
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) =>
                    setFormData({ ...formData, college: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Department / Branch
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student Roll / Enrollment No
                </label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) =>
                    setFormData({ ...formData, studentId: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 outline-none"
                  required
                />
              </div>
            </div>

            {/* Vitals: Height, Weight, Age, BMI */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  min="16"
                  max="40"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.heightCm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heightCm: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  min="120"
                  max="230"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weightKg}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weightKg: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  min="35"
                  max="160"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Calculated BMI
                </label>
                <div className="px-3 py-2 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold text-center">
                  {calculatedBmi} (Normal)
                </div>
              </div>
            </div>

            {/* Fitness Goal Selection */}
            <div className="pt-2">
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-2">
                Primary Fitness Objective
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Muscle Gain",
                  "Fat Loss",
                  "Stamina & Energy",
                  "Stress Relief & Posture",
                ].map((goal) => {
                  const isSelected = formData.fitnessGoal === goal;
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, fitnessGoal: goal as any })
                      }
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "border-primary-500 bg-primary-500/15 text-primary-700 dark:text-primary-300 font-semibold"
                          : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<Save className="w-4 h-4" />}
              >
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Right 1 Col: Preferences & Settings */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-500" />
              Preferences & Appearance
            </h3>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                {isDarkMode ? (
                  <Moon className="w-4 h-4 text-amber-400" />
                ) : (
                  <Sun className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-white block">
                    Dark Interface Theme
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Reduces screen glare during late-night hostel coding
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleDarkMode}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  isDarkMode ? "bg-primary-500" : "bg-slate-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isDarkMode ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            {/* Notification Preferences */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-primary-500" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-white block">
                    Workout & Hydration Alerts
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Push alerts for daily water & streak reminders
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notificationsEnabled ? "bg-primary-500" : "bg-slate-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    notificationsEnabled ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            {/* Privacy Controls */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-blue-500" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-white block">
                    Public Campus Ranking
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Show your username on inter-hostel leaderboards
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setCampusLeaderboardVisible(!campusLeaderboardVisible)
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  campusLeaderboardVisible ? "bg-primary-500" : "bg-slate-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    campusLeaderboardVisible ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </Card>

          {/* SIH Hackathon Verified Badge */}
          <Card className="border-teal-500/30 bg-teal-50/10 text-center p-5 space-y-2">
            <Award className="w-8 h-8 text-teal-500 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Smart India Hackathon 2024
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified Student Innovator in Problem Statement{" "}
              <strong>SIH26194</strong>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
