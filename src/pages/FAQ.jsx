import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const categories = ['All', 'Subscription & Plans', 'Streaming & Devices', 'Account & Security'];

  const faqs = [
    {
      id: 'f1',
      question: 'How do I subscribe to StreamX Premium?',
      answer: 'To subscribe, click the gold "Subscribe" button on the top-bar or go to /plans, choose your preferred billing cycle (Monthly or Yearly), and complete the payment using UPI, Credit/Debit card, or Netbanking.',
      category: 'Subscription & Plans'
    },
    {
      id: 'f2',
      question: 'Can I watch StreamX on multiple devices simultaneously?',
      answer: 'Yes! The StreamX Premium plan allows you to logged-in to up to 5 devices and watch on up to 2 devices simultaneously. The Mobile Only plan is limited to 1 logged-in mobile/tablet device.',
      category: 'Streaming & Devices'
    },
    {
      id: 'f3',
      question: 'What video quality is supported on StreamX?',
      answer: 'We support resolutions up to 4K UHD with HDR10+ and Dolby Vision, depending on your subscription plan and device capabilities. Mobile Only plan supports up to 720p HD.',
      category: 'Streaming & Devices'
    },
    {
      id: 'f4',
      question: 'How do I cancel my auto-renewal subscription?',
      answer: 'You can manage and cancel your active subscription directly from Profile > Settings > Account page. Once cancelled, your premium benefits will continue until the end of your current billing period.',
      category: 'Subscription & Plans'
    },
    {
      id: 'f5',
      question: 'How do I link and activate my Smart TV?',
      answer: 'Open the StreamX app on your Smart TV, select Login, and note the 4-digit code. Then, on your phone, go to /profile > Activate TV, enter the code, and tap Activate. Your TV will sync instantly.',
      category: 'Streaming & Devices'
    },
    {
      id: 'f6',
      question: 'How do I change my profile password or mobile number?',
      answer: 'You can update your personal details and OTP verification settings by visiting Profile > Settings > My Account. Standard OTP verification is required to authorize any sensitive profile modifications.',
      category: 'Account & Security'
    },
    {
      id: 'f7',
      question: 'Is there a free trial or free content available?',
      answer: 'Yes! We offer a selection of free preview content under our "StreamX Originals: 1st Episode Free" strip. This allows you to test the streaming quality on your device without purchasing a plan.',
      category: 'Subscription & Plans'
    },
    {
      id: 'f8',
      question: 'Why is my stream buffering or playing in low resolution?',
      answer: 'We use adaptive bitrate streaming to ensure a continuous playback. Buffering usually occurs due to an unstable internet connection. Ensure you have a minimum of 5 Mbps for HD and 25 Mbps for 4K streaming.',
      category: 'Streaming & Devices'
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' ? true : faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 pl-0 md:pl-20 pt-6 select-none relative overflow-hidden">
      {/* Dynamic ambient backdrop glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[850px] mx-auto px-4 md:px-8 relative z-10 pt-14 md:pt-4">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center text-gray-300 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              FAQ
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium">Frequently Asked Questions & Support Hub</p>
          </div>
        </div>

        {/* Real-time search bar */}
        <div className="relative w-full mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, features, plan questions..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ffae00]/40 focus:bg-white/[0.05] outline-none transition-all placeholder-gray-500"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
              className={`flex-none px-5 py-2 rounded-full text-xs font-black transition-all border ${activeCategory === cat ? 'bg-primary text-black border-primary shadow-lg shadow-primary/10' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/15'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`bg-white/[0.02] border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${isExpanded ? 'border-white/15 bg-white/[0.04]' : 'border-white/5 hover:border-white/10 hover:bg-white/[0.03]'}`}
                    onClick={() => toggleExpand(faq.id)}
                  >
                    {/* Question Header */}
                    <div className="p-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isExpanded ? 'text-primary' : 'text-gray-400'}`} />
                        <span className="text-[14px] sm:text-base font-bold text-white leading-snug">{faq.question}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white bg-white/10' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Answer content (expandable) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 text-[13px] sm:text-sm text-gray-300 leading-relaxed pl-12 border-t border-white/5 bg-black/20">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="py-20 text-center">
                <HelpCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-1">No FAQs match your search</h3>
                <p className="text-gray-400 text-sm">Try typing different keywords or select another filter tab.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
