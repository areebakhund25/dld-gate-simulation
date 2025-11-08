import React, { useState, useEffect, useCallback } from 'react';
import { GATES, LATCHES } from './constants';
import type { Binary, GateDef, LatchDef } from './types';
import { GateCard } from './components/GateCard';
import { LatchCard } from './components/LatchCard';
import { InputSwitch } from './components/InputSwitch';
import { ThemeToggle } from './components/ThemeToggle';
import { TruthTableModal } from './components/TruthTableModal';
import { LatchTruthTableModal } from './components/LatchTruthTableModal';
import { GithubIcon } from './components/Icons';

type Theme = 'light' | 'dark';
type View = 'landing' | 'gates' | 'latches';

const GateSimulator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [numberOfInputs, setNumberOfInputs] = useState<number>(2);
  const [inputs, setInputs] = useState<Binary[]>([0, 0, 0, 0, 0]);
  const [activeModalGate, setActiveModalGate] = useState<GateDef | null>(null);

  const handleInputChange = useCallback((index: number, newValue: Binary) => {
    setInputs(currentInputs => {
      const newInputs = [...currentInputs];
      newInputs[index] = newValue;
      return newInputs;
    });
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Inputs</h2>
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-6">
            <span className="font-medium text-gray-700 dark:text-gray-300">Number of Inputs:</span>
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => setNumberOfInputs(num)}
                className={`w-10 h-10 rounded-full font-bold text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-800 ${
                  numberOfInputs === num 
                  ? 'bg-cyan-500 text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-cyan-200 dark:hover:bg-cyan-700'
                }`}
                aria-pressed={numberOfInputs === num}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center gap-x-8 gap-y-4 flex-wrap">
            {inputs.slice(0, numberOfInputs).map((value, index) => (
              <InputSwitch
                key={index}
                label={`Input ${String.fromCharCode(65 + index)}`}
                value={value}
                onChange={(newValue) => handleInputChange(index, newValue)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {GATES.map((gate) => {
            const activeInputs = gate.isUnary
              ? inputs.slice(0, 1)
              : inputs.slice(0, numberOfInputs);
            return (
              <GateCard 
                key={gate.type} 
                gate={gate} 
                inputs={activeInputs}
                onShowTruthTable={() => setActiveModalGate(gate)}
              />
            )
          })}
        </div>
      </div>
      {activeModalGate && (
        <TruthTableModal gate={activeModalGate} onClose={() => setActiveModalGate(null)} numberOfInputs={numberOfInputs} />
      )}
    </>
  );
};

const LatchesSimulator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
   const [activeModalLatch, setActiveModalLatch] = useState<LatchDef | null>(null);
  return (
     <>
      <div className="max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {LATCHES.map((latch) => (
               <LatchCard key={latch.type} latch={latch} onShowTruthTable={() => setActiveModalLatch(latch)} />
            ))}
         </div>
      </div>
      {activeModalLatch && (
        <LatchTruthTableModal latch={activeModalLatch} onClose={() => setActiveModalLatch(null)} />
      )}
    </>
  );
};


const LandingPage: React.FC<{ onSelect: (view: View) => void }> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">Welcome to the DLD Simulator</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose a simulator to start exploring the fundamental building blocks of digital electronics.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <button 
          onClick={() => onSelect('gates')}
          className="bg-cyan-500 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-cyan-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Gate Simulator
        </button>
        <button 
          onClick={() => onSelect('latches')}
          className="bg-teal-500 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-teal-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Latches Simulator
        </button>
      </div>
    </div>
  );
};

export default function App(): React.ReactElement {
  const [theme, setTheme] = useState<Theme>('dark');
  const [view, setView] = useState<View>('landing');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);
  
  const getTitle = () => {
    if (view === 'gates') return 'DLD Gate Simulator';
    if (view === 'latches') return 'DLD Latch Simulator';
    return 'DLD Simulator';
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          {view !== 'landing' && (
            <button onClick={() => setView('landing')} className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">
            {getTitle()}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/google/aistudio-web" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400">
            <GithubIcon className="w-6 h-6" />
          </a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        {view === 'landing' && <LandingPage onSelect={setView} />}
        {view === 'gates' && <GateSimulator onBack={() => setView('landing')} />}
        {view === 'latches' && <LatchesSimulator onBack={() => setView('landing')} />}
      </main>
    </div>
  );
}