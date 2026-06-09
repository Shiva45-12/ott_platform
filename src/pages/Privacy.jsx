import React from 'react';
import { ArrowLeft, ShieldAlert, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Privacy = () => {
  const points = [
    {
      title: '1. Information We Collect',
      desc: 'We collect personal information to provide and improve your streaming experience. This includes mobile numbers (for secure OTP log in), active subscription details, billing data, device identifiers, watch histories, search queries, and streaming preferences.'
    },
    {
      title: '2. How We Utilize Your Data',
      desc: 'Collected information is utilized strictly to authorize payments, deliver streaming content, analyze platform metrics, send transactional notifications (like subscription renewals), and recommend personalized content based on your streaming interest.'
    },
    {
      title: '3. Data Security & Premium Encryption',
      desc: 'We enforce industry-standard security protocols to guard your personal credentials against unauthorized theft or deletion. All financial transactions are encrypted through state-of-the-art PCI-DSS payment gateways. We never save raw credit card details on our local databases.'
    },
    {
      title: '4. Sharing of Information',
      desc: 'StreamX does not trade or lease your personal identity data to external marketing companies. We only share details with trusted service partners (e.g. payment processors, cloud hosts, and diagnostic software) under strict data-protection contracts.'
    },
    {
      title: '5. Your Rights & Choice Controls',
      desc: 'You hold full authority over your data profile. You can toggle analytical tracking options, delete customized profile directories from Profile > Settings, and request complete erasure of your login credentials by filing a request with our Help Center.'
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
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium">Protecting Your Digital Identity & Watch Security</p>
          </div>
        </div>

        {/* Introduction Panel */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-8 flex gap-4 items-start">
          <ShieldAlert className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-bold text-[15px] mb-1">Last Updated: May 25, 2026</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
              We respect your privacy. This Privacy Policy details exactly how your credentials are collected, securely encrypted, processed, and safeguarded under local data regulations.
            </p>
          </div>
        </div>

        {/* Privacy Sections Card Container */}
        <div className="flex flex-col gap-6">
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.03] transition-all"
            >
              <h2 className="text-white text-base sm:text-lg font-black mb-3 border-b border-white/5 pb-2 tracking-tight">
                {point.title}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Security watermark */}
        <div className="mt-12 text-center flex flex-col items-center gap-2">
          <KeyRound className="w-8 h-8 text-gray-600" />
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest">End-to-End Privacy Protection guaranteed by StreamX Protocol</p>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
