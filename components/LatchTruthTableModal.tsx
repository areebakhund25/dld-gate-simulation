import React, { useMemo } from 'react';
import type { LatchDef, Binary, LatchState } from '../types';

interface LatchTruthTableModalProps {
  latch: LatchDef;
  onClose: () => void;
}

type Row = (Binary | string)[];

export const LatchTruthTableModal: React.FC<LatchTruthTableModalProps> = ({ latch, onClose }) => {
  const LatchIcon = latch.svg;

  const { headers, rows } = useMemo(() => {
    const getOutputAndComment = (currentState: LatchState, nextState: LatchState): [string, string] => {
      if (nextState.q === 0 && nextState.qNot === 0) return ['?', 'Invalid'];
      if (nextState.q === currentState.q) return [nextState.q.toString(), 'Hold'];
      if (nextState.q === 1) return ['1', 'Set'];
      return ['0', 'Reset'];
    };

    const newHeaders = [...latch.inputs, 'Q(t)', 'Q(t+1)', 'Comment'];
    const newRows: Row[] = [];
    const numInputs = latch.inputs.length;
    const numCombinations = 1 << numInputs;

    for (let i = 0; i < numCombinations; i++) {
      const currentInputs: Record<string, Binary> = {};
      const currentInputRow: Binary[] = [];
      for (let j = numInputs - 1; j >= 0; j--) {
        const bit = (i >> j) & 1 ? 1 : 0;
        currentInputs[latch.inputs[numInputs - 1 - j]] = bit;
        currentInputRow.push(bit);
      }

      // Calculate for Q(t) = 0
      const initialState0: LatchState = { q: 0, qNot: 1 };
      const nextState0 = latch.logic(currentInputs, initialState0);
      newRows.push([...currentInputRow, 0, ...getOutputAndComment(initialState0, nextState0)]);
      
      // Calculate for Q(t) = 1
      const initialState1: LatchState = { q: 1, qNot: 0 };
      const nextState1 = latch.logic(currentInputs, initialState1);
      newRows.push([...currentInputRow, 1, ...getOutputAndComment(initialState1, nextState1)]);
    }

    return { headers: newHeaders, rows: newRows };
  }, [latch]);


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <LatchIcon className="w-12 h-12 text-teal-500" />
            <h2 className="text-2xl font-bold">{latch.name} - Characteristic Table</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto max-h-[60vh]">
            <table className="w-full text-left table-auto">
              <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 z-10">
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
                      <td key={cellIndex} className={`px-6 py-4 whitespace-nowrap font-mono text-lg text-center ${
                        cell === '?' ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'
                      }`}>
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