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
}

export enum LatchType {
  SR_NOR = 'SR_NOR',
  GATED_SR_NOR = 'GATED_SR_NOR',
  D = 'D',
}

export interface LatchState {
  q: Binary;
  qNot: Binary;
}

export interface LatchDef {
  name: string;
  type: LatchType;
  description: string;
  inputs: string[];
  logic: (inputs: Record<string, Binary>, currentState: LatchState) => LatchState;
  svg: React.FC<{ className?: string }>;
}