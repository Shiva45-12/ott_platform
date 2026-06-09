import React from 'react';
import { ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      desc: 'By accessing or streaming content from StreamX, you agree to comply with and be bound by these Terms and Conditions of Service. If you do not agree, you must immediately terminate your utilization of our service.'
    },
    {
      title: '2. Subscription & Billing Plans',
      desc: 'StreamX offers a variety of subscription options (Mobile Only, Premium Yearly, Premium Monthly). Subscriptions are billed in advance at the start of your billing cycle and will auto-renew unless cancelled at least 24 hours prior to the next billing date. Payments are secure and non-refundable except where mandated by local consumer law.'
    },
    {
      title: '3. Permitted Use & Restrictions',
      desc: 'All streaming media, software, text, graphics, and logos provided on StreamX are the exclusive intellectual property of StreamX and its content licensing partners. You are granted a limited, personal, non-transferable license to watch content for personal, non-commercial entertainment. Any duplication, redistribution, recording, or public screening of StreamX content is strictly prohibited and subject to legal prosecution.'
    },
    {
      title: '4. Account Security & Verification',
      desc: 'You are responsible for maintaining the confidentiality of your credentials (OTP mobile logins and profiles). We are not liable for any unauthorized access resulting from user negligence. Simultaneous stream counts are restricted based on your active plan tier (up to 2 devices for Premium and 1 device for Mobile Only).'
    },
    {
      title: '5. Service Termination & Modifications',
      desc: 'StreamX reserves the absolute right to suspend or block accounts that violate copyright policies, practice account sharing credentials, or engage in suspicious automation scripts. Content catalogs, features, pricing tiers, and terms are subject to modifications over time to enhance user experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20 pl-0 md:pl-20 pt-6 select-none relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[850px] mx-auto px-4 md:px-8 relative z-10 pt-14 md:pt-4">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center text-gray-300 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Terms & Conditions
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium">Agreement & Conditions of Service Usage</p>
          </div>
        </div>

        {/* Introduction Panel */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-8 flex gap-4 items-start">
          <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-bold text-[15px] mb-1">Effective Date: May 25, 2026</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
              Please read these Terms carefully before accessing or subscribing to StreamX. These terms constitute a legally binding agreement between you and StreamX Entertainment Network.
            </p>
          </div>
        </div>

        {/* Terms Sections Card Container */}
        <div className="flex flex-col gap-6">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.03] transition-all"
            >
              <h2 className="text-white text-base sm:text-lg font-black mb-3 border-b border-white/5 pb-2 tracking-tight">
                {section.title}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium">
                {section.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Security watermark */}
        <div className="mt-12 text-center flex flex-col items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-gray-600" />
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest">Secured & Certified by StreamX Security Network</p>
        </div>

      </div>
    </div>
  );
};

export default Terms;
