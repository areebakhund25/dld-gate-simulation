import React, { useState, useEffect, useCallback } from 'react';
import type { LatchDef, Binary, LatchState } from '../types';
import { InputSwitch } from './InputSwitch';

interface LatchCardProps {
  latch: LatchDef;
  onShowTruthTable: () => void;
}

const SignalValue: React.FC<{ value: Binary | '?' }> = ({ value }) => {
  const isInvalid = value === '?';
  const colorClass = isInvalid 
    ? 'text-red-500'
    : value === 1 ? 'text-cyan-500 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400';
  return <span className={`font-mono font-bold text-2xl transition-colors duration-300 ${colorClass}`}>{value}</span>;
};

export const LatchCard: React.FC<LatchCardProps> = ({ latch, onShowTruthTable }) => {
  const [inputs, setInputs] = useState<Record<string, Binary>>(() => {
    const initialInputs: Record<string, Binary> = {};
    latch.inputs.forEach(inputName => {
      initialInputs[inputName] = 0;
    });
    return initialInputs;
  });

  const [state, setState] = useState<LatchState>({ q: 0, qNot: 1 });

  useEffect(() => {
    const nextState = latch.logic(inputs, state);
    if (nextState.q !== state.q || nextState.qNot !== state.qNot) {
      setState(nextState);
    }
  }, [inputs, state, latch]);

  const handleInputChange = useCallback((name: string, value: Binary) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  const LatchIcon = latch.svg;
  const isInvalidState = state.q === state.qNot;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-6">
        <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">{latch.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 h-10">{latch.description}</p>
        
        <div className="flex justify-center mb-6">
            <LatchIcon className="w-32 h-24 text-gray-700 dark:text-gray-300"/>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold mb-2 text-center">Inputs</h4>
                <div className="flex flex-col items-center gap-y-4">
                    {latch.inputs.map(inputName => (
                        <InputSwitch
                            key={inputName}
                            label={inputName}
                            value={inputs[inputName]}
                            onChange={(newValue) => handleInputChange(inputName, newValue)}
                        />
                    ))}
                </div>
            </div>
             <div>
                <h4 className="font-semibold mb-2 text-center">Outputs</h4>
                <div className="flex flex-col items-center justify-around bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 h-full">
                    <div className="text-center">
                        <div className="font-semibold text-lg mb-1">Q</div>
                        <SignalValue value={isInvalidState ? '?' : state.q} />
                    </div>
                    <div className="text-center">
                        <div className="font-semibold text-lg mb-1">Q'</div>
                        <SignalValue value={isInvalidState ? '?' : state.qNot} />
                    </div>
                    {isInvalidState && <div className="text-xs text-red-500 mt-2">Invalid State</div>}
                </div>
            </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 flex justify-end items-center mt-auto">
        <button
          onClick={onShowTruthTable}
          title={"Show characteristic table"}
          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-offset-gray-800 transition-colors duration-200"
        >
          Characteristic Table
        </button>
      </div>
    </div>
  );
};