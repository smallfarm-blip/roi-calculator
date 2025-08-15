import React from 'react';
import { CurrentMetrics } from './components/CurrentMetrics';
import { PotentialImprovement } from './components/PotentialImprovement';
import { ROITable } from './components/ROITable';
import { ROIProjections } from './components/ROIProjections';

function App() {
  return (
    <div className="min-h-screen bg-[oklch(0.985_0.002_247.839)]">
      {/* Hero Section */}
      <section className="bg-black text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-teal-500 rounded-full opacity-60"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-teal-500 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-teal-500 rounded-full opacity-50"></div>
        <div className="absolute top-20 right-1/3 w-2 h-2 bg-teal-500 rounded-full opacity-70"></div>
        <div className="absolute bottom-32 right-10 w-5 h-5 bg-teal-500 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-teal-500 rounded-full opacity-60"></div>
        
        <div className="max-w-4xl mx-auto px-4 py-16 text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <img 
              src="/sdLogo.png" 
              alt="Strategy & Design Co" 
              className="h-16 w-auto brightness-0 invert"
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4">A/B Testing ROI Calculator</h2>
          
          <p className="text-[oklab(0.999994_0.0000455677_0.0000200868_/_0.8)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover how much revenue growth you can achieve through data-driven A/B 
            testing. Calculate your potential ROI and make informed investment decisions.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-teal-500 font-medium">FREE CALCULATOR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-[oklch(0.872_0.01_258.338)]">NO SIGNUP REQUIRED</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="bg-[oklch(0.985_0.002_247.839)] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Calculate Your A/B Testing ROI
            </h2>
            <p className="text-[oklch(0.707_0.022_261.325)] max-w-2xl mx-auto">
              Enter your current metrics and see how optimization can impact your bottom line
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CurrentMetrics />
            <PotentialImprovement />
          </div>
          
          <div className="mb-12">
            <ROITable />
          </div>
        </div>
      </section>

      {/* ROI Projections */}
      <ROIProjections />
    </div>
  );
}

export default App;