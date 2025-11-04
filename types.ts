import type React from 'react';

export enum GateType {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  NAND = 'NAND',
  NOR = 'NOR',
  XOR = 'XOR',
  XNOR = 'XNOR',
}

export type Binary = 0 | 1;

export interface GateDef {
  name: string;
  type: GateType;
  logic: (inputs: Binary[]) => Binary;
  isUnary?: boolean;
  svg: React.FC<{ className?: string }>;
  truthTable: { 
    headers: string[];
    rows: (Binary | string)[][];
  };
}