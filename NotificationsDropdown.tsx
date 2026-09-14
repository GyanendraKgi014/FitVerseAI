import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Sparkles, Droplets, Trophy, Flame } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { NotificationItem } from '../../types';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'reminder':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'challenge':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'campus':
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-primary-500" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="absolute right-0 top-12 z-40 w-80 sm:w-96 rounded-2xl glass-panel shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-slate-800 dark:text-white">Campus Alerts</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-600 dark:text-primary-400">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Check className="w-3.5 h-3.5" /> Mark read
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No notifications right now. Keep moving!
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 transition-colors flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                  !item.read ? 'bg-primary-500/[0.03] dark:bg-primary-500/[0.05]' : ''
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                      {item.timeAgo}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center">
          <span className="text-[10px] text-slate-400">
            Powered by FitVerse AI Campus Pulse • SIH26196
          </span>
        </div>
      </motion.div>
    </>
  );
};
