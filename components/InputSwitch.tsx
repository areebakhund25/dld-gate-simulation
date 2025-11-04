
import React from 'react';
import type { Binary } from '../types';

interface InputSwitchProps {
  label: string;
  value: Binary;
  onChange: (newValue: Binary) => void;
}

export const InputSwitch: React.FC<InputSwitchProps> = ({ label, value, onChange }) => {
  const isChecked = value === 1;

  const handleToggle = () => {
    onChange(isChecked ? 0 : 1);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <div className="flex items-center space-x-4">
        <span className={`font-mono text-2xl font-bold ${!isChecked ? 'text-cyan-500' : 'text-gray-400 dark:text-gray-500'}`}>0</span>
        <button
          role="switch"
          aria-checked={isChecked}
          onClick={handleToggle}
          className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-800 ${
            isChecked ? 'bg-cyan-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ${
              isChecked ? 'translate-x-9' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`font-mono text-2xl font-bold ${isChecked ? 'text-cyan-500' : 'text-gray-400 dark:text-gray-500'}`}>1</span>
      </div>
    </div>
  );
};
