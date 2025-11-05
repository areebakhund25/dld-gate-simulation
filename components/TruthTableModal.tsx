import React, { useMemo } from 'react';
import type { GateDef, Binary } from '../types';

interface TruthTableModalProps {
  gate: GateDef;
  numberOfInputs: number;
  onClose: () => void;
}

export const TruthTableModal: React.FC<TruthTableModalProps> = ({ gate, numberOfInputs, onClose }) => {
  const GateIcon = gate.svg;

  const { headers, rows } = useMemo(() => {
    const actualNumberOfInputs = gate.isUnary ? 1 : numberOfInputs;
    
    const newHeaders = Array.from(
      { length: actualNumberOfInputs },
      (_, i) => `Input ${String.fromCharCode(65 + i)}`
    );
    newHeaders.push('Output');

    const newRows: Binary[][] = [];
    const numCombinations = 1 << actualNumberOfInputs;

    for (let i = 0; i < numCombinations; i++) {
      const currentInputs: Binary[] = [];
      for (let j = actualNumberOfInputs - 1; j >= 0; j--) {
        currentInputs.push((i >> j) & 1 ? 1 : 0);
      }
      const output = gate.logic(currentInputs);
      newRows.push([...currentInputs, output]);
    }

    return { headers: newHeaders, rows: newRows };
  }, [gate, numberOfInputs]);


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <GateIcon className="w-12 h-12 text-cyan-500" />
            <h2 className="text-2xl font-bold">{gate.name} - Truth Table</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left table-auto">
              <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className="px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap font-mono text-lg text-center text-gray-800 dark:text-gray-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
