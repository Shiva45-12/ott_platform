import React, { useState } from 'react';
import { Search, MessageCircle, PhoneCall, Mail, ChevronDown, ChevronUp, FileText, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HelpSupport = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: 'How do I subscribe to StreamX Premium?',
      answer: 'You can subscribe by clicking on the "Subscribe" button on the top right corner or from the Sidebar. Choose a plan that fits your needs (Mobile, Premium, or 4K Ultra) and complete the payment using UPI, Credit/Debit card, or Net Banking.'
    },
    {
      question: 'Can I watch on multiple devices?',
      answer: 'Yes! Depending on your plan, you can watch on multiple devices. The Premium plan allows 2 simultaneous screens, while the 4K Ultra plan allows up to 4 simultaneous screens.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time by going to Profile & Settings > Manage Subscription > Cancel Plan. Your subscription will remain active until the end of the current billing cycle.'
    },
    {
      question: 'Why is my video buffering?',
      answer: 'Buffering usually occurs due to a slow internet connection. We recommend a minimum speed of 5 Mbps for HD and 25 Mbps for 4K streaming. Try restarting your router or switching to a lower video quality from the player settings.'
    },
    {
      question: 'How do I change my streaming language?',
      answer: 'While watching a video, click on the "Audio & Subtitles" icon in the player controls. From there, you can select your preferred audio language and subtitle options.'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-8 pl-4 md:pl-28">
      <div className="max-w-5xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col items-center text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            Search for answers, browse our FAQs, or reach out to our support team directly. We're here 24/7.
          </p>
          
          <div className="relative w-full max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-gray-500 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for 'Cancel Subscription', 'Playback Issues'..."
              className="w-full bg-[#111] hover:bg-[#1a1a1a] focus:bg-[#111] border border-white/10 focus:border-primary text-white text-lg rounded-2xl pl-14 pr-6 py-5 outline-none transition-all shadow-xl"
            />
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#111] border border-white/5 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center text-center group cursor-pointer transition-all hover:-translate-y-1 shadow-lg">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-400 text-sm mb-4">Chat with our support agents instantly.</p>
            <span className="text-blue-400 font-bold text-sm mt-auto">Start Chat</span>
          </div>

          <div className="bg-[#111] border border-white/5 hover:border-green-500/50 rounded-2xl p-6 flex flex-col items-center text-center group cursor-pointer transition-all hover:-translate-y-1 shadow-lg">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Call Us</h3>
            <p className="text-gray-400 text-sm mb-4">Speak directly to our support team.</p>
            <span className="text-green-400 font-bold text-sm mt-auto">1800-123-4567</span>
          </div>

          <div className="bg-[#111] border border-white/5 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col items-center text-center group cursor-pointer transition-all hover:-translate-y-1 shadow-lg">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Email Support</h3>
            <p className="text-gray-400 text-sm mb-4">Drop us an email and we'll reply within 2 hours.</p>
            <span className="text-purple-400 font-bold text-sm mt-auto">support@streamx.com</span>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-7 h-7 text-primary" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-xl transition-all overflow-hidden ${openFaq === index ? 'border-primary/50 bg-[#111]' : 'border-white/10 bg-transparent hover:bg-[#111]'}`}
              >
                <button 
                  className="w-full flex items-center justify-between p-5 text-left outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className={`font-bold text-lg ${openFaq === index ? 'text-white' : 'text-gray-300'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaq === index ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400'}`}>
                    {openFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-gray-400 leading-relaxed font-medium text-base">
                        <div className="h-px w-full bg-white/10 mb-4"></div>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          {/* Report Issue Button */}
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 font-medium">Couldn't find what you were looking for?</p>
            <button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-bold transition-colors">
              <ShieldAlert className="w-5 h-5" /> Report an Issue
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpSupport;
