import React, { useState, useEffect, useCallback } from 'react';
import { GATES } from './constants';
import type { Binary, GateDef } from './types';
import { GateCard } from './components/GateCard';
import { InputSwitch } from './components/InputSwitch';
import { ThemeToggle } from './components/ThemeToggle';
import { TruthTableModal } from './components/TruthTableModal';
import { GithubIcon } from './components/Icons';

type Theme = 'light' | 'dark';

export default function App(): React.ReactElement {
  const [numberOfInputs, setNumberOfInputs] = useState<number>(2);
  const [inputs, setInputs] = useState<Binary[]>([0, 0, 0, 0, 0]);
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeModalGate, setActiveModalGate] = useState<GateDef | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleInputChange = useCallback((index: number, newValue: Binary) => {
    setInputs(currentInputs => {
      const newInputs = [...currentInputs];
      newInputs[index] = newValue;
      return newInputs;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const openModal = useCallback((gate: GateDef) => {
    setActiveModalGate(gate);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalGate(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">
          DLD Gate Simulator
        </h1>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400">
            <GithubIcon className="w-6 h-6" />
          </a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
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
                  onShowTruthTable={() => openModal(gate)}
                />
              )
            })}
          </div>
        </div>
      </main>
      
      {activeModalGate && (
        <TruthTableModal gate={activeModalGate} onClose={closeModal} numberOfInputs={numberOfInputs} />
      )}
    </div>
  );
}