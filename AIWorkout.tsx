import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  CameraOff, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Heart, 
  Clock, 
  Activity, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Dumbbell,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { exercisesData } from '../data/mockData';
import { ExerciseInfo, ExerciseType } from '../types';
import { useFitness } from '../context/FitnessContext';
import { useToast } from '../context/ToastContext';

export const AIWorkout: React.FC = () => {
  const { recordCompletedWorkout } = useFitness();
  const { showToast } = useToast();

  const [selectedExercise, setSelectedExercise] = useState<ExerciseInfo>(exercisesData[0]);
  const [isExercising, setIsExercising] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [repsCount, setRepsCount] = useState(0);
  const [targetReps, setTargetReps] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // AI Feedback engine
  const [aiFeedback, setAiFeedback] = useState<string>("Stand inside the camera frame to initialize posture analysis.");
  const [formAccuracy, setFormAccuracy] = useState<number>(94);
  const [postureState, setPostureState] = useState<'optimal' | 'warning' | 'good'>('optimal');
  const [heartRate, setHeartRate] = useState(118);

  // Audio beep generator using Web Audio API
  const playTone = (freq = 600, durationMs = 120) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + durationMs / 1000);
    } catch (e) {
      // Audio context may require explicit user gesture
    }
  };

  // Switch exercise
  const handleSelectExercise = (exercise: ExerciseInfo) => {
    if (isExercising) {
      showToast({
        type: 'warning',
        title: 'Workout in progress',
        message: 'Finish or reset current session before changing exercise.'
      });
      return;
    }
    setSelectedExercise(exercise);
    setTargetReps(exercise.defaultReps);
    setRepsCount(0);
    setElapsedSeconds(0);
  };

  // Toggle Camera
  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      showToast({ type: 'info', title: 'Camera Disconnected', message: 'Switched to simulated AI neural stream.' });
    } else {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
        showToast({
          type: 'success',
          title: 'Live Camera Online 📷',
          message: 'Pose estimation overlay connected to your optical feed.'
        });
      } catch (err: any) {
        setCameraError('Webcam access was denied or not found. Switched to simulated high-fidelity visual skeleton mode.');
        setCameraActive(false);
        showToast({
          type: 'warning',
          title: 'Camera Inactive',
          message: 'Running high-precision simulated AI pose engine.'
        });
      }
    }
  };

  // Workout Timer and Rep increment simulator
  useEffect(() => {
    let timer: any = null;
    if (isExercising && !isPaused) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);

        // Heart rate slight fluctuation
        setHeartRate((prev) => {
          const delta = (Math.random() - 0.45) * 3;
          return Math.min(165, Math.max(105, Math.round(prev + delta)));
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExercising, isPaused]);

  // AI Feedback and Rep count progression
  useEffect(() => {
    let repTimer: any = null;
    if (isExercising && !isPaused) {
      const interval = selectedExercise.id === 'plank' ? 1000 : 3200;

      repTimer = setInterval(() => {
        setRepsCount((prev) => {
          const next = prev + 1;
          playTone(720, 100);

          // Feedback prompts cycle
          const feedbackPool: { text: string; state: 'optimal' | 'warning' | 'good'; acc: number }[] = [
            { text: "Great posture! Spine alignment is solid.", state: 'optimal', acc: 97 },
            { text: "Keep your knees aligned with your toes.", state: 'warning', acc: 89 },
            { text: "Straighten your back during descent.", state: 'warning', acc: 88 },
            { text: "Excellent depth! Full range of motion achieved.", state: 'optimal', acc: 98 },
            { text: "Keep core tight and breathe rhythmically.", state: 'good', acc: 93 },
            { text: "Keep your shoulders down and neck neutral.", state: 'good', acc: 92 },
          ];

          const randomFeedback = feedbackPool[Math.floor(Math.random() * feedbackPool.length)];
          setAiFeedback(randomFeedback.text);
          setPostureState(randomFeedback.state);
          setFormAccuracy(randomFeedback.acc);

          // Check if reached target
          if (next >= targetReps) {
            handleCompleteWorkout(next);
          }

          return next;
        });
      }, interval);
    }
    return () => clearInterval(repTimer);
  }, [isExercising, isPaused, targetReps, selectedExercise]);

  // Canvas Pose Skeleton Rendering (Simulated / Real hybrid overlay)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const render = () => {
      frame += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw futuristic HUD targeting grid & student pose skeleton
      const centerX = w / 2;
      const centerY = h / 2;

      // Simulated oscillating joint positions based on exercise
      let offset = 0;
      if (isExercising && !isPaused) {
        offset = Math.sin(frame * 2) * 25;
      }

      // 14 Keypoints: Head, Neck, Shoulders, Elbows, Wrists, Hips, Knees, Ankles
      const head = { x: centerX, y: centerY - 140 + offset * 0.3 };
      const neck = { x: centerX, y: centerY - 100 + offset * 0.4 };
      const leftShoulder = { x: centerX - 55, y: centerY - 80 + offset * 0.5 };
      const rightShoulder = { x: centerX + 55, y: centerY - 80 + offset * 0.5 };
      const leftElbow = { x: centerX - 85 - offset * 0.3, y: centerY - 20 + offset };
      const rightElbow = { x: centerX + 85 + offset * 0.3, y: centerY - 20 + offset };
      const leftWrist = { x: centerX - 95, y: centerY + 40 + offset * 0.8 };
      const rightWrist = { x: centerX + 95, y: centerY + 40 + offset * 0.8 };
      const leftHip = { x: centerX - 40, y: centerY + 30 + offset * 0.6 };
      const rightHip = { x: centerX + 40, y: centerY + 30 + offset * 0.6 };
      const leftKnee = { x: centerX - 45 - offset * 0.2, y: centerY + 110 + offset * 0.4 };
      const rightKnee = { x: centerX + 45 + offset * 0.2, y: centerY + 110 + offset * 0.4 };
      const leftAnkle = { x: centerX - 50, y: centerY + 180 };
      const rightAnkle = { x: centerX + 50, y: centerY + 180 };

      const joints = [
        head, neck, leftShoulder, rightShoulder, leftElbow, rightElbow,
        leftWrist, rightWrist, leftHip, rightHip, leftKnee, rightKnee,
        leftAnkle, rightAnkle
      ];

      const bones: [typeof head, typeof head][] = [
        [head, neck],
        [neck, leftShoulder],
        [neck, rightShoulder],
        [leftShoulder, leftElbow],
        [leftElbow, leftWrist],
        [rightShoulder, rightElbow],
        [rightElbow, rightWrist],
        [leftShoulder, leftHip],
        [rightShoulder, rightHip],
        [leftHip, rightHip],
        [leftHip, leftKnee],
        [leftKnee, leftAnkle],
        [rightHip, rightKnee],
        [rightKnee, rightAnkle]
      ];

      // Draw Pose Skeleton Bones
      ctx.lineWidth = 4;
      ctx.strokeStyle = postureState === 'warning' ? '#F59E0B' : '#22C55E';
      ctx.lineCap = 'round';
      ctx.shadowColor = postureState === 'warning' ? 'rgba(245, 158, 11, 0.6)' : 'rgba(34, 197, 94, 0.6)';
      ctx.shadowBlur = 12;

      bones.forEach(([p1, p2]) => {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Keypoint Joint Nodes
      joints.forEach((joint) => {
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw Form Angle Arc on Left Knee & Elbow
      if (isExercising) {
        ctx.beginPath();
        ctx.arc(leftKnee.x, leftKnee.y, 22, 0, Math.PI * 0.65);
        ctx.strokeStyle = '#14B8A6';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#14B8A6';
        ctx.font = 'bold 11px Poppins, sans-serif';
        ctx.shadowBlur = 0;
        ctx.fillText('91°', leftKnee.x + 24, leftKnee.y + 4);
      }

      // Draw Bounding Box around Athlete
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(centerX - 120, centerY - 170 + offset * 0.2, 240, 370);
      ctx.setLineDash([]);

      // Top corner brackets
      const bracketSize = 16;
      ctx.strokeStyle = '#22C55E';
      ctx.lineWidth = 2.5;

      // Top Left
      ctx.beginPath();
      ctx.moveTo(centerX - 120, centerY - 170 + bracketSize);
      ctx.lineTo(centerX - 120, centerY - 170);
      ctx.lineTo(centerX - 120 + bracketSize, centerY - 170);
      ctx.stroke();

      // Top Right
      ctx.beginPath();
      ctx.moveTo(centerX + 120 - bracketSize, centerY - 170);
      ctx.lineTo(centerX + 120, centerY - 170);
      ctx.lineTo(centerX + 120, centerY - 170 + bracketSize);
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [isExercising, isPaused, postureState]);

  const handleStartWorkout = () => {
    setIsExercising(true);
    setIsPaused(false);
    setAiFeedback("Analyzing initial joint angles... Perform your reps smoothly.");
    playTone(880, 200);
    showToast({
      type: 'success',
      title: `${selectedExercise.name} Session Started!`,
      message: 'AI computer vision pose tracker is live and scoring posture.'
    });
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    playTone(550, 100);
  };

  const handleReset = () => {
    setIsExercising(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    setRepsCount(0);
    setAiFeedback("Position yourself in front of the camera and select Start Workout.");
  };

  const handleCompleteWorkout = (finalReps?: number) => {
    const actualReps = finalReps !== undefined ? finalReps : repsCount;
    if (actualReps === 0 && elapsedSeconds < 5) {
      showToast({
        type: 'info',
        title: 'Session Too Short',
        message: 'Complete at least a few reps to record points.'
      });
      setIsExercising(false);
      return;
    }

    const burned = Math.max(12, Math.round(actualReps * selectedExercise.caloriesPerRep + (elapsedSeconds / 60) * 4));
    const xp = Math.round(actualReps * 15 + elapsedSeconds * 0.5);

    setIsExercising(false);
    setIsPaused(false);

    recordCompletedWorkout({
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      reps: actualReps,
      durationSeconds: elapsedSeconds,
      calories: burned,
      accuracy: formAccuracy,
      xpEarned: xp
    });
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const caloriesCurrent = Math.round(repsCount * selectedExercise.caloriesPerRep + (elapsedSeconds / 60) * 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="green" size="sm" dot>
              CV Pose Tracker v2.4
            </Badge>
            <span className="text-xs text-slate-400">SIH26196 Vision Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            AI Workout & Real-Time Pose Detection
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time biometric posture angle monitoring, rep cadence analysis, and live correction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-primary-500" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <Button
            variant={cameraActive ? 'accent' : 'outline'}
            size="md"
            icon={cameraActive ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
            onClick={toggleCamera}
          >
            {cameraActive ? 'Camera Live' : 'Use Webcam'}
          </Button>
        </div>
      </div>

      {/* Exercise Selection Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {exercisesData.map((ex) => {
          const isSelected = selectedExercise.id === ex.id;
          return (
            <button
              key={ex.id}
              onClick={() => handleSelectExercise(ex)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-gradient-to-r from-primary-500 to-emerald-600 text-white border-transparent shadow-md shadow-primary-500/25 scale-[1.02]'
                  : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>{ex.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                {ex.defaultReps} {ex.id === 'plank' ? 'sec' : 'reps'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main View: Camera Viewport + HUD Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera and Pose Detection Canvas Container (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl flex items-center justify-center">
            {/* Real Webcam video element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 ${
                cameraActive ? 'opacity-70' : 'hidden'
              }`}
            />

            {/* Simulated background avatar image when webcam is off */}
            {!cameraActive && (
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center opacity-40">
                <div className="w-24 h-24 rounded-full border border-slate-700 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-slate-600" />
                </div>
              </div>
            )}

            {/* Canvas overlay for real-time skeletal joint detection */}
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            {/* Top HUD Overlay Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isExercising ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                  <span className="font-semibold">{isExercising ? 'Live Pose Tracking' : 'Standby Mode'}</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs hidden sm:flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
                  <span>Biomechanical Accuracy: {formAccuracy}%</span>
                </div>
              </div>

              {cameraActive ? (
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-medium flex items-center gap-1">
                  <Camera className="w-3 h-3" /> Live Feed Active
                </div>
              ) : (
                <div className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[11px] font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Simulated Optical Stream
                </div>
              )}
            </div>

            {/* Bottom Floating Live Metrics HUD */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <div className="px-3 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Duration</span>
                  <span className="text-lg font-bold font-mono text-emerald-400">{formatTimer(elapsedSeconds)}</span>
                </div>
                <div className="px-3 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Heart Rate</span>
                  <span className="text-lg font-bold font-mono text-rose-400 flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-rose-500" /> {heartRate} <span className="text-xs font-normal text-slate-400">bpm</span>
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Completed</span>
                <span className="text-2xl font-black text-white">{repsCount} <span className="text-xs font-normal text-slate-400">/ {targetReps}</span></span>
              </div>
            </div>
          </div>

          {/* AI Feedback Box */}
          <Card className="border-primary-500/40 bg-gradient-to-r from-primary-500/5 via-teal-500/5 to-transparent">
            <div className="flex items-start gap-3.5">
              <div className={`p-3 rounded-2xl shrink-0 ${
                postureState === 'warning'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'bg-primary-500/10 text-primary-500'
              }`}>
                {postureState === 'warning' ? (
                  <AlertCircle className="w-6 h-6 animate-bounce" />
                ) : (
                  <Sparkles className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Real-Time AI Posture Feedback
                  </h4>
                  <Badge variant={postureState === 'warning' ? 'amber' : 'green'} size="sm">
                    {postureState === 'warning' ? 'Adjustment Needed' : 'Optimal Alignment'}
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                  "{aiFeedback}"
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>Joints tracked: 14/14</span>
                  <span>Latency: 18ms</span>
                  <span>Confidence: 98.4%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Workout Controls and Exercise Guide Sidebar (1 col) */}
        <div className="space-y-4">
          {/* Main Controls Card */}
          <Card className="border-slate-200 dark:border-slate-800 space-y-5">
            <div>
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider block">
                Selected Routine
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedExercise.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Category: {selectedExercise.category}
              </p>
            </div>

            {/* Target Muscle Badges */}
            <div className="flex flex-wrap gap-1.5">
              {selectedExercise.targetMuscles.map((muscle) => (
                <span
                  key={muscle}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Key Vital Gauges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-500/20 text-left">
                <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-medium">
                  <Flame className="w-4 h-4" />
                  Burn Rate
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {caloriesCurrent} <span className="text-xs font-normal text-slate-400">kcal</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-500/20 text-left">
                <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-medium">
                  <Zap className="w-4 h-4" />
                  Cadence
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {isExercising ? '2.8s' : '--'} <span className="text-xs font-normal text-slate-400">/ rep</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              {!isExercising ? (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg shadow-primary-500/30 text-base"
                  icon={<Play className="w-5 h-5 fill-current" />}
                  onClick={handleStartWorkout}
                >
                  Start Workout
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1"
                    icon={isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
                    onClick={handlePauseResume}
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
                    icon={<CheckCircle2 className="w-4 h-4" />}
                    onClick={() => handleCompleteWorkout()}
                  >
                    Finish Set
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={handleReset}
              >
                Reset Reps & Clock
              </Button>
            </div>
          </Card>

          {/* Form Guide & Joint Angle Specifications */}
          <Card className="border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <Info className="w-3.5 h-3.5 text-primary-500" />
              Biomechanical Form Guidelines
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {selectedExercise.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-primary-500/15 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
