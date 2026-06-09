import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, ChevronLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Input, 2: OTP
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('phone'); // phone or email
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Detect if input is email or phone
    if (inputValue.includes('@') || /[a-zA-Z]/.test(inputValue)) {
      setInputType('email');
    } else {
      setInputType('phone');
    }
  }, [inputValue]);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleContinue = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    setStep(2);
    setTimer(30);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 4) {
      // Simulate successful login
      navigate('/');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#fbb700]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#fbb700]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Login / Register</h2>
                  <p className="text-gray-400 text-sm">Enter your Mobile Number or Email to continue</p>
                </div>

                <form onSubmit={handleContinue} className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      {inputType === 'email' ? (
                        <Mail className="w-5 h-5 text-gray-500 group-focus-within:text-[#fbb700] transition-colors" />
                      ) : (
                        <Phone className="w-5 h-5 text-gray-500 group-focus-within:text-[#fbb700] transition-colors" />
                      )}
                    </div>
                    <input 
                      type="text"
                      placeholder="Mobile Number or Email"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#fbb700] focus:ring-1 focus:ring-[#fbb700] outline-none transition-all placeholder-gray-500"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={!inputValue}
                    className="w-full py-3.5 bg-[#fbb700] hover:bg-[#ffd64d] text-black rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#fbb700]/20"
                  >
                    Continue
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <div className="relative flex items-center py-5">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center group">
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </button>
                    <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center group">
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.79 1.56 0 2.95.69 3.77 1.84-3.13 1.98-2.64 5.92.51 7.15-.75 1.83-1.63 3.3-2.95 3.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <button onClick={() => setStep(1)} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors mr-2">
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Verify Details</h2>
                </div>

                <div className="mb-8">
                  <p className="text-gray-400 text-sm">We have sent a 4-digit OTP to</p>
                  <p className="text-white font-medium mt-1">{inputValue}</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-8">
                  <div className="flex justify-between gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-14 h-14 bg-black/50 border border-white/20 rounded-xl text-center text-2xl font-bold text-white focus:border-[#fbb700] focus:ring-1 focus:ring-[#fbb700] outline-none transition-all"
                      />
                    ))}
                  </div>

                  <button 
                    type="submit" 
                    disabled={otp.join('').length !== 4}
                    className="w-full py-3.5 bg-[#fbb700] hover:bg-[#ffd64d] text-black rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#fbb700]/20"
                  >
                    Verify & Proceed
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-400">
                    Didn't receive the OTP?{' '}
                    {timer > 0 ? (
                      <span className="text-white font-medium">Resend in {timer}s</span>
                    ) : (
                      <button onClick={() => setTimer(30)} className="text-[#fbb700] font-medium hover:underline">
                        Resend Now
                      </button>
                    )}
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          <p className="mt-8 text-center text-[11px] text-gray-500 font-medium max-w-[280px] mx-auto leading-relaxed">
            By proceeding, you agree to our <Link to="/terms" className="text-gray-400 hover:text-[#fbb700] underline">Terms of Use</Link> and <Link to="/privacy" className="text-gray-400 hover:text-[#fbb700] underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
