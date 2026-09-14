import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Plus, 
  MessageSquare, 
  Flame, 
  Dumbbell, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  User, 
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { initialChatMessages } from '../data/mockData';
import { ChatMessage } from '../types';
import { useFitness } from '../context/FitnessContext';

export const AICoach: React.FC = () => {
  const { profile, setActiveTab } = useFitness();

  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const sidebarHistory = [
    { id: 'h-1', title: 'Campus Marathon 10K Prep', date: 'Yesterday' },
    { id: 'h-2', title: 'Hostel Budget High-Protein Diet', date: '06 Sep' },
    { id: 'h-3', title: 'Exam Week 8-Min Desk Stretches', date: '04 Sep' },
    { id: 'h-4', title: 'Shin Splints Prevention on Turf', date: '29 Aug' },
  ];

  const suggestedChips = [
    "Create my workout plan",
    "I want to lose weight on a hostel diet",
    "Suggest mess food hacks for protein",
    "What exercises improve stamina for campus sports?",
    "Healthy snacks for midnight exam cramming"
  ];

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate intelligent response tailored to student context
    setTimeout(() => {
      let aiResponseText = "";
      let workoutRec = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('workout plan') || lower.includes('create my workout')) {
        aiResponseText = `Here is a custom **Dorm & Academic Friendly 4-Day Split** designed for your schedule at ${profile.college}:\n\n` +
          `• **Day 1 (Mon): Push & Chest Focus** — 3 sets of 15 Push-ups, Pike push-ups, and Chair tricep dips.\n` +
          `• **Day 2 (Tue): Cardio & Campus Perimeter Jog** — 25-minute interval run around academic quad + 50 Jumping Jacks.\n` +
          `• **Day 3 (Wed): Active Recovery & Yoga** — Cat-cow spinal resets & hamstring flexibility.\n` +
          `• **Day 4 (Thu): Legs & Core** — 4 sets of 20 Air Squats, 16 Walking Lunges, and 60-sec Forearm Plank.\n\n` +
          `Every routine is calibrated for dorm floor space with zero equipment required.`;
        workoutRec = {
          title: 'Dorm Room HIIT & Calisthenics',
          duration: '25 Minutes',
          intensity: 'Moderate-High',
          exercises: ['Push-up', 'Air Squat', 'Forearm Plank', 'Jumping Jack']
        };
      } else if (lower.includes('diet') || lower.includes('weight') || lower.includes('mess') || lower.includes('protein')) {
        aiResponseText = `Here are **4 High-Yield Hostel Mess Hacks** for clean student nutrition:\n\n` +
          `1. **Sprouts & Egg Power Breakfast**: Request 2 extra boiled eggs or double the sprouted moong portion in the mess morning queue.\n` +
          `2. **Lentil Maximizer**: Dal is often watery; ask for the dense bottom layer of the dal vat for triple the legume protein content!\n` +
          `3. **Dorm Snack Swap**: Replace 2-minute instant noodles with roasted chana, makhana, and roasted peanuts—3x more fiber, zero trans fats.\n` +
          `4. **Hydration Rule**: Drink a glass of water 20 minutes before lunch to avoid mistaking thirst for canteen cravings.`;
      } else if (lower.includes('stamina') || lower.includes('running')) {
        aiResponseText = `To boost cardiovascular stamina without interfering with lecture attendance:\n\n` +
          `• **Zone 2 Campus Brisk Walks**: Take the stairs instead of the elevator in your department building and walk between hostels at a brisk 6 km/h pace.\n` +
          `• **Tempo Intervals**: 30-second sprint, 60-second recovery jog for 8 cycles.\n` +
          `• **Breathe through Nose**: Practice nasal diaphragmatic breathing to build aerobic threshold and reduce exam-time anxiety.`;
      } else {
        aiResponseText = `That's an important fitness question for student life! Staying consistent during heavy academic cycles is all about micro-habits rather than grueling 2-hour gym sessions.\n\n` +
          `Would you like me to tailor a 15-minute quick session right now on the **AI Workout** camera tracker, or calculate your daily caloric needs based on your current weight (${profile.weightKg} kg)?`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        workoutRecommendation: workoutRec
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="blue" size="sm" dot>
            Student Wellness LLM
          </Badge>
          <span className="text-xs text-slate-400">SIH26196 Knowledge Model</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          FitVerse AI Fitness Coach
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Personalized dorm workouts, hostel mess nutrition strategies, and cognitive stress reduction.
        </p>
      </div>

      {/* Main Container: Sidebar + Chat Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[640px]">
        {/* Left Sidebar: Recent History & Student Summary (1 col) */}
        <div className="hidden lg:flex flex-col gap-4">
          <Card className="flex-1 flex flex-col justify-between border-slate-200 dark:border-slate-800">
            <div className="space-y-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs font-semibold"
                icon={<Plus className="w-4 h-4 text-primary-500" />}
                onClick={() => {
                  setMessages(initialChatMessages);
                }}
              >
                New Fitness Inquiry
              </Button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 block mb-2">
                  Recent Conversations
                </span>
                <div className="space-y-1.5">
                  {sidebarHistory.map((item) => (
                    <button
                      key={item.id}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors group flex items-start justify-between"
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-slate-700 dark:text-slate-300 truncate font-medium">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">{item.date}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Context Card in Sidebar */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Student Profile</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">Level {profile.level}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                {profile.name} • {profile.college}
              </p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                <span>Goal: {profile.fitnessGoal}</span>
                <span>BMI: {profile.bmi}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Area: Active Chat Window (3 cols) */}
        <Card className="lg:col-span-3 flex flex-col h-[650px] p-0 border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Top Bar of Chat */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-teal-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-500" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  FitVerse Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </h3>
                <span className="text-[11px] text-slate-400 block">
                  Trained on collegiate sports medicine & Indian hostel nutritional science
                </span>
              </div>
            </div>
            <Badge variant="green" size="sm">Active Model</Badge>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className="shrink-0 mt-1">
                  {msg.sender === 'user' ? (
                    <img
                      src={profile.avatarUrl}
                      alt="You"
                      className="w-8 h-8 rounded-full object-cover border border-primary-500"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center border border-primary-500/20">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-emerald-600 text-white shadow-md shadow-primary-500/20 rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/60 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Workout Recommendation Card if present */}
                  {msg.workoutRecommendation && (
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-primary-500/30 shadow-md space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Dumbbell className="w-4 h-4 text-primary-500" />
                          {msg.workoutRecommendation.title}
                        </span>
                        <Badge variant="teal" size="sm">
                          {msg.workoutRecommendation.duration}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {msg.workoutRecommendation.exercises.map((ex) => (
                          <span
                            key={ex}
                            className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full text-xs"
                        icon={<ArrowRight className="w-3.5 h-3.5" />}
                        iconPosition="right"
                        onClick={() => setActiveTab('workout')}
                      >
                        Launch Routine in AI Workout
                      </Button>
                    </div>
                  )}

                  <span className={`text-[10px] text-slate-400 block px-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <div className="w-7 h-7 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span>Coach is thinking and reviewing student protocols...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Suggested Question Chips */}
          <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-semibold text-slate-400 shrink-0">Prompt:</span>
            {suggestedChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-500/40 text-slate-700 dark:text-slate-300 text-xs shrink-0 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Footer */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about dorm workouts, mess meal hacks, or exam recovery..."
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-xs sm:text-sm text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
              />
              <Button
                variant="primary"
                size="md"
                className="rounded-2xl shrink-0"
                icon={<Send className="w-4 h-4" />}
                onClick={() => handleSendMessage()}
              >
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
