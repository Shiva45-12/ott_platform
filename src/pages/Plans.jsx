import React, { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState('mobile');

  const plans = [
    {
      id: 'mobile',
      name: 'Mobile Only',
      price: '₹699',
      duration: 'Yearly',
      devices: '1',
      simultaneous: '1',
      video: 'Upto 720p HD',
      audio: 'Stereo',
      ads: 'Ad-free only on StreamX Originals & Movies'
    },
    {
      id: 'premium_yearly',
      name: 'StreamX Premium',
      price: '₹1499',
      duration: 'Yearly',
      devices: '5',
      simultaneous: '2',
      video: 'Upto 4K UHD',
      audio: 'Dolby Atmos',
      ads: 'Ad-free only on StreamX Originals & Movies'
    },
    {
      id: 'premium_monthly',
      name: 'StreamX Premium',
      price: '₹399',
      duration: 'Monthly',
      devices: '5',
      simultaneous: '1',
      video: 'Upto 4K UHD',
      audio: 'Dolby Atmos',
      ads: 'Ad-free only on StreamX Originals & Movies'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white relative flex flex-col font-sans overflow-x-hidden">
      {/* Faint Background Images Header */}
      <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden pointer-events-none opacity-30 flex">
        <div className="w-1/4 h-full bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000')] bg-cover bg-center"></div>
        <div className="w-1/4 h-full bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000')] bg-cover bg-center"></div>
        <div className="w-1/4 h-full bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000')] bg-cover bg-center"></div>
        <div className="w-1/4 h-full bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
      </div>

      {/* Header Bar */}
      <div className="relative z-20 flex justify-between items-center p-6 lg:px-12">
        <Link to="/" className="text-white hover:text-gray-300 transition">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="text-sm font-medium tracking-wide">7985132930</div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center px-4 w-full max-w-[1100px] mx-auto pb-20">
        <h1 className="text-[32px] md:text-[36px] font-semibold mb-8 text-center mt-2 tracking-tight">Choose Your Subscription Plan</h1>

        {/* Table Container */}
        <div className="w-full overflow-x-auto scrollbar-hide border border-white/10 rounded-lg">
          <div className="min-w-[740px] md:min-w-full flex flex-col bg-[#111111]/80 backdrop-blur-md">
            
            {/* Table Header / Plans selection */}
            <div className="flex border-b border-white/10 relative">
              {/* Top Left Cell */}
              <div className="w-[30%] p-5 flex flex-col justify-center bg-[#181818] sticky left-0 z-30 border-r border-white/10 shadow-[4px_0_8px_rgba(0,0,0,0.5)] flex-shrink-0">
                <h3 className="text-[#ffae00] font-medium text-lg leading-tight">Unlimited Entertainment</h3>
                <p className="text-gray-300 text-[13px] mt-1 font-medium">Exciting Content Lineup</p>
              </div>

              {/* Plan Columns */}
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-[23.33%] p-5 flex flex-col items-center justify-center border-l border-white/10 cursor-pointer transition-colors relative flex-shrink-0 ${selectedPlan === plan.id ? 'bg-[#ffae00] text-black' : 'hover:bg-white/5'}`}
                >
                  <div className={`w-4 h-4 rounded-full border-[1.5px] mb-3 flex items-center justify-center ${selectedPlan === plan.id ? 'border-black' : 'border-gray-400'}`}>
                    {selectedPlan === plan.id && <div className="w-2 h-2 bg-black rounded-full"></div>}
                  </div>
                  <div className={`text-[15px] mb-1 tracking-tight ${selectedPlan === plan.id ? 'text-black font-medium' : 'text-gray-200'}`}>{plan.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[22px] font-bold ${selectedPlan === plan.id ? 'text-black' : 'text-[#ffae00]'}`}>{plan.price}</span>
                    <span className={`text-[11px] font-medium ${selectedPlan === plan.id ? 'text-black' : 'text-gray-300'}`}>{plan.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Rows */}
            <div className="flex flex-col text-[14px]">
              {/* Row 1: Devices */}
              <div className="flex border-b border-white/10 bg-black/10 hover:bg-white/[0.02] transition-colors">
                <div className="w-[30%] p-5 flex items-center gap-2 bg-[#141414] sticky left-0 z-20 border-r border-white/10 shadow-[4px_0_8px_rgba(0,0,0,0.5)] font-medium text-gray-200 flex-shrink-0">
                  Number of logged in devices <Info className="w-4 h-4 text-[#ffae00]" />
                </div>
                {plans.map((plan) => (
                  <div key={plan.id} className="w-[23.33%] p-5 flex items-center justify-center border-r border-white/10 last:border-r-0 font-medium text-gray-100 flex-shrink-0">
                    {plan.devices}
                  </div>
                ))}
              </div>

              {/* Row 2: Simultaneous */}
              <div className="flex border-b border-white/10 bg-black/10 hover:bg-white/[0.02] transition-colors">
                <div className="w-[30%] p-5 flex items-center gap-2 bg-[#141414] sticky left-0 z-20 border-r border-white/10 shadow-[4px_0_8px_rgba(0,0,0,0.5)] font-medium text-gray-200 flex-shrink-0">
                  Watch on devices at same time <Info className="w-4 h-4 text-[#ffae00]" />
                </div>
                {plans.map((plan) => (
                  <div key={plan.id} className="w-[23.33%] p-5 flex items-center justify-center border-r border-white/10 last:border-r-0 font-medium text-gray-100 flex-shrink-0">
                    {plan.simultaneous}
                  </div>
                ))}
              </div>

              {/* Row 3: Video Quality */}
              <div className="flex border-b border-white/10 bg-black/10 hover:bg-white/[0.02] transition-colors">
                <div className="w-[30%] p-5 flex items-center gap-2 bg-[#141414] sticky left-0 z-20 border-r border-white/10 shadow-[4px_0_8px_rgba(0,0,0,0.5)] font-medium text-gray-200 flex-shrink-0">
                  Max Video Quality <Info className="w-4 h-4 text-[#ffae00]" />
                </div>
                {plans.map((plan) => (
                  <div key={plan.id} className="w-[23.33%] p-5 flex items-center justify-center border-r border-white/10 last:border-r-0 font-medium text-gray-100 flex-shrink-0">
                    {plan.video}
                  </div>
                ))}
              </div>

              {/* Row 4: Audio Quality */}
              <div className="flex border-b border-white/10 bg-black/10 hover:bg-white/[0.02] transition-colors">
                <div className="w-[30%] p-5 flex items-center gap-2 bg-[#141414] sticky left-0 z-20 border-r border-white/10 shadow-[4px_0_8px_rgba(0,0,0,0.5)] font-medium text-gray-200 flex-shrink-0">
                  Max Audio Quality <Info className="w-4 h-4 text-[#ffae00]" />
                </div>
                {plans.map((plan) => (
                  <div key={plan.id} className="w-[23.33%] p-5 flex items-center justify-center border-r border-white/10 last:border-r-0 font-medium text-gray-100 flex-shrink-0">
                    {plan.audio === 'Dolby Atmos' ? (
                      <span className="flex items-center gap-1">
                        <span className="font-extrabold tracking-tighter">Dolby</span> Atmos
                      </span>
                    ) : (
                      plan.audio
                    )}
                  </div>
                ))}
              </div>

              {/* Row 5: Ad free */}
              <div className="flex bg-black/10 hover:bg-white/[0.02] transition-colors">
                <div className="w-[30%] p-5 flex items-center gap-2 bg-[#141414] sticky left-0 z-20 border-r border-white/10 shadow-[4px_0_8px_rgba(0,0,0,0.5)] font-medium text-gray-200 flex-shrink-0">
                  Ad free experience <Info className="w-4 h-4 text-[#ffae00]" />
                </div>
                {plans.map((plan) => (
                  <div key={plan.id} className="w-[23.33%] p-5 flex items-center justify-center text-center text-[12px] md:text-[13px] border-r border-white/10 last:border-r-0 text-gray-200 flex-shrink-0">
                    {plan.ads}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col items-center w-full max-w-[450px]">
          <button className="text-[13px] font-semibold border-b border-dashed border-[#ffae00] text-[#ffae00] pb-0.5 hover:text-white hover:border-white transition-colors mb-6 uppercase tracking-wide">
            Select a promo code
          </button>
          
          <button className="w-full bg-white text-black font-extrabold py-3.5 rounded hover:bg-gray-200 transition-colors text-[16px] shadow-lg shadow-white/10">
            Pay {plans.find(p => p.id === selectedPlan)?.price}
          </button>

          <div className="mt-8 flex gap-3 text-[13px] text-gray-300 font-medium">
            <Link to="/terms" className="hover:text-white cursor-pointer">Terms and Conditions</Link>
            <span>&bull;</span>
            <Link to="/privacy" className="hover:text-white cursor-pointer">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="/faq" className="hover:text-white cursor-pointer">FAQ</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Plans;

