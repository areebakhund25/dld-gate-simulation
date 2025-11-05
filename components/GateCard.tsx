import React, { useMemo } from 'react';
import type { GateDef, Binary } from '../types';

interface GateCardProps {
  gate: GateDef;
  inputs: Binary[];
  onShowTruthTable: () => void;
}

const SignalLine: React.FC<{ value: Binary, className?: string }> = ({ value, className = '' }) => {
  const colorClass = value === 1 ? 'bg-cyan-500' : 'bg-gray-400 dark:bg-gray-600';
  return <div className={`h-1 rounded-full transition-colors duration-300 ${colorClass} ${className}`}></div>;
};

const SignalValue: React.FC<{ value: Binary }> = ({ value }) => {
  const colorClass = value === 1 ? 'text-cyan-500 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400';
  return <span className={`font-mono font-bold text-2xl transition-colors duration-300 ${colorClass}`}>{value}</span>;
};


export const GateCard: React.FC<GateCardProps> = ({ gate, inputs, onShowTruthTable }) => {
  const output = useMemo(() => gate.logic(inputs), [gate, inputs]);

  const GateIcon = gate.svg;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-6 flex-grow flex items-center">
        <div className="flex items-center justify-between h-full w-full">
          {/* Inputs */}
          <div className="flex flex-col justify-around">
            {inputs.map((value, index) => (
              <div key={index} className="flex items-center space-x-2 my-1 h-8">
                <span className="font-semibold text-lg w-5 text-center">{String.fromCharCode(65 + index)}</span>
                <SignalValue value={value} />
              </div>
            ))}
          </div>
          
          {/* Lines to Gate */}
          <div className="flex-grow flex flex-col justify-around mx-2">
             {inputs.map((value, index) => (
                <SignalLine key={index} value={value} />
             ))}
          </div>
          
          {/* Gate Icon */}
          <div className="flex-shrink-0">
            <GateIcon className="w-24 h-24 text-gray-700 dark:text-gray-300"/>
          </div>

          {/* Line from Gate */}
          <div className="flex-grow ml-2">
              <SignalLine value={output} />
          </div>
          
          {/* Output */}
          <div className="w-16 text-center">
            <div className="font-semibold text-lg mb-1">Q</div>
            <SignalValue value={output} />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{gate.name}</h3>
        <button
          onClick={onShowTruthTable}
          title={"Show truth table"}
          className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:focus:ring-offset-gray-800 transition-colors duration-200"
        >
          Truth Table
        </button>
      </div>
    </div>
  );
};
