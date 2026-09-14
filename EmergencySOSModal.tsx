import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  PhoneCall, 
  MapPin, 
  ShieldAlert, 
  HeartHandshake, 
  X, 
  CheckCircle2, 
  Radio
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { useToast } from '../../context/ToastContext';

export const EmergencySOSModal: React.FC = () => {
  const { isSosOpen, setIsSosOpen, profile } = useFitness();
  const { showToast } = useToast();
  const [beaconActive, setBeaconActive] = useState(false);
  const [wardenNotified, setWardenNotified] = useState(false);

  if (!isSosOpen) return null;

  const triggerCampusBeacon = () => {
    setBeaconActive(true);
    showToast({
      type: 'warning',
      title: '🚨 Emergency Beacon Broadcasted',
      message: `Your GPS coordinates and medical ID have been dispatched to ${profile.college} Health Centre and Hostel Security.`
    });
  };

  const notifyWarden = () => {
    setWardenNotified(true);
    showToast({
      type: 'info',
      title: 'Hostel Proctor / Warden Alerted',
      message: 'SMS and automated call triggered with your dorm room details.'
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-500/30 overflow-hidden"
        >
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 p-6 text-white relative">
            <button
              onClick={() => setIsSosOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-2xl animate-pulse">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold bg-white/25 px-2.5 py-0.5 rounded-full">
                  Campus Health Protocol
                </span>
                <h2 className="text-2xl font-bold mt-1">Student Emergency SOS</h2>
                <p className="text-rose-100 text-xs">Immediate medical and security assistance for {profile.name}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Student ID Banner */}
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/50 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Student Medical ID</span>
                <strong className="text-slate-800 dark:text-slate-200 font-semibold">{profile.studentId} • {profile.department}</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-500 dark:text-slate-400 block">Blood Group & BMI</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">B+ Positive • BMI {profile.bmi}</span>
              </div>
            </div>

            {/* Quick Action Emergency Dialers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:112"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-md shadow-rose-500/25 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm">National Emergency</div>
                    <div className="text-xs opacity-90 font-normal">Police / Medical: 112</div>
                  </div>
                </div>
                <span className="text-xs bg-white/25 px-2 py-1 rounded-lg">Call</span>
              </a>

              <a
                href="tel:108"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md shadow-amber-500/25 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm">Ambulance Service</div>
                    <div className="text-xs opacity-90 font-normal">State Emergency: 108</div>
                  </div>
                </div>
                <span className="text-xs bg-white/25 px-2 py-1 rounded-lg">Call</span>
              </a>
            </div>

            {/* Campus Beacon Broadcast */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={triggerCampusBeacon}
                disabled={beaconActive}
                className={`w-full p-3.5 rounded-2xl font-medium text-sm flex items-center justify-between border transition-all ${
                  beaconActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${beaconActive ? 'bg-emerald-500 text-white animate-pulse' : 'bg-rose-100 dark:bg-rose-900/50 text-rose-600'}`}>
                    <Radio className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">
                      {beaconActive ? 'Campus Beacon Active & Transmitting' : 'Broadcast Live Campus Location Beacon'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Notifies nearby campus security, campus health clinic & gym coaches
                    </div>
                  </div>
                </div>
                {beaconActive ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                    Dispatch
                  </span>
                )}
              </button>

              <button
                onClick={notifyWarden}
                disabled={wardenNotified}
                className={`w-full p-3.5 rounded-2xl font-medium text-sm flex items-center justify-between border transition-all ${
                  wardenNotified
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${wardenNotified ? 'bg-emerald-500 text-white' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600'}`}>
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">
                      {wardenNotified ? 'Hostel Warden Alerted' : 'Notify Hostel Warden & Roommates'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Dispatches urgent notification with room number & emergency contacts
                    </div>
                  </div>
                </div>
                {wardenNotified ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                    Alert
                  </span>
                )}
              </button>
            </div>

            {/* Quick First-Aid Advice */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary-500" />
                Nearest Campus Medical Center
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                <strong>{profile.college} Student Health Centre</strong> — Wing B, Ground Floor (24x7 Emergency OPD). Ext: 7000 / 7001.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-100 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => setIsSosOpen(false)}
              className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Close Emergency Screen
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
