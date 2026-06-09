import React, { useState } from 'react';
import { Bell, Gift, AlertCircle, Info, CheckCircle2, ChevronRight, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'offer',
      title: 'Limited Time Offer: Get 50% Off! 🎁',
      message: 'Upgrade to StreamX Premium annual plan at half the price. Valid till midnight.',
      time: '2 hours ago',
      read: false,
      icon: <Gift className="w-6 h-6 text-[#ffae00]" />,
      bgColor: 'bg-[#ffae00]/10',
      action: 'Upgrade Now'
    },
    {
      id: 2,
      type: 'update',
      title: 'Gullak Season 5 is Streaming Now! 📺',
      message: 'Mishra Parivar is back with new stories. Catch all episodes of Season 5 in Hindi.',
      time: '5 hours ago',
      read: false,
      icon: <Bell className="w-6 h-6 text-blue-400" />,
      bgColor: 'bg-blue-400/10',
      action: 'Watch Now'
    },
    {
      id: 3,
      type: 'account',
      title: 'Payment Successful',
      message: 'Your monthly subscription of ₹299 has been successfully renewed.',
      time: '1 day ago',
      read: true,
      icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
      bgColor: 'bg-green-400/10'
    },
    {
      id: 4,
      type: 'update',
      title: 'New Device Logged In',
      message: 'We noticed a new login to your account from a Windows PC in Mumbai.',
      time: '2 days ago',
      read: true,
      icon: <AlertCircle className="w-6 h-6 text-red-400" />,
      bgColor: 'bg-red-400/10',
      action: 'Review Devices'
    },
    {
      id: 5,
      type: 'update',
      title: 'Upcoming: IND vs ENG T20',
      message: 'Set a reminder for the clash of the titans. Live streaming starts tomorrow at 7 PM.',
      time: '3 days ago',
      read: true,
      icon: <Info className="w-6 h-6 text-purple-400" />,
      bgColor: 'bg-purple-400/10'
    }
  ];

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'offers') return n.type === 'offer';
    if (activeTab === 'updates') return n.type !== 'offer';
    return true;
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-8 pl-4 md:pl-28">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-primary" /> Notifications
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base font-medium">
              Stay updated with the latest shows, offers, and account alerts.
            </p>
          </div>
          
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors border border-white/10 w-max">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-semibold">Settings</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-black/40 p-1.5 rounded-xl border border-white/5 w-max">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('updates')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'updates' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Updates
          </button>
          <button 
            onClick={() => setActiveTab('offers')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'offers' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Offers
          </button>
        </div>

        {/* Notification List */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode='popLayout'>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  key={notification.id}
                  className={`relative p-5 rounded-2xl border ${notification.read ? 'bg-[#0a0a0a] border-white/5' : 'bg-[#111] border-white/10 shadow-lg'} group cursor-pointer hover:bg-[#1a1a1a] transition-all overflow-hidden flex flex-col md:flex-row md:items-center gap-5`}
                >
                  {/* Unread indicator dot */}
                  {!notification.read && (
                    <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${notification.bgColor}`}>
                    {notification.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-base md:text-lg font-bold mb-1 ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                      {notification.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${notification.read ? 'text-gray-500' : 'text-gray-300'}`}>
                      {notification.message}
                    </p>
                    <span className="block mt-2 text-xs font-semibold text-gray-500">
                      {notification.time}
                    </span>
                  </div>

                  {/* Action Button (If any) */}
                  {notification.action && (
                    <button className="mt-3 md:mt-0 flex-shrink-0 bg-white/5 hover:bg-white/15 border border-white/10 text-white text-sm font-bold py-2 px-5 rounded-lg transition-all flex items-center gap-2 group-hover:border-white/30 w-max">
                      {notification.action}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    </button>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center justify-center text-center bg-black/20 rounded-2xl border border-white/5"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">No Notifications</h3>
                <p className="text-gray-500 text-sm">You're all caught up! Check back later for new updates.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Notifications;
