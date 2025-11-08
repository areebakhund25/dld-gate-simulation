import React from 'react';
import type { GateDef, Binary, LatchDef, LatchState } from './types';
import { GateType, LatchType } from './types';
import { AndGateIcon, OrGateIcon, NotGateIcon, NandGateIcon, NorGateIcon, XorGateIcon, XnorGateIcon, SRLatchIcon, GatedSRLatchIcon, DLatchIcon } from './components/Icons';

export const GATES: GateDef[] = [
  {
    name: 'AND Gate',
    type: GateType.AND,
    logic: (inputs: Binary[]): Binary => inputs.length ? inputs.reduce((a, b) => (a & b) as Binary) as Binary : 0,
    svg: AndGateIcon,
  },
  {
    name: 'OR Gate',
    type: GateType.OR,
    logic: (inputs: Binary[]): Binary => inputs.length ? inputs.reduce((a, b) => (a | b) as Binary) as Binary : 0,
    svg: OrGateIcon,
  },
  {
    name: 'NOT Gate',
    type: GateType.NOT,
    isUnary: true,
    logic: (inputs: Binary[]): Binary => (inputs[0] === 1 ? 0 : 1),
    svg: NotGateIcon,
  },
  {
    name: 'NAND Gate',
    type: GateType.NAND,
    logic: (inputs: Binary[]): Binary => (inputs.length ? (inputs.reduce((a, b) => (a & b) as Binary) ? 0 : 1) : 1),
    svg: NandGateIcon,
  },
  {
    name: 'NOR Gate',
    type: GateType.NOR,
    logic: (inputs: Binary[]): Binary => (inputs.length ? (inputs.reduce((a, b) => (a | b) as Binary) ? 0 : 1) : 1),
    svg: NorGateIcon,
  },
  {
    name: 'XOR Gate',
    type: GateType.XOR,
    logic: (inputs: Binary[]): Binary => inputs.length ? inputs.reduce((a, b) => (a ^ b) as Binary) as Binary : 0,
    svg: XorGateIcon,
  },
  {
    name: 'XNOR Gate',
    type: GateType.XNOR,
    logic: (inputs: Binary[]): Binary => (inputs.length ? (inputs.reduce((a, b) => (a ^ b) as Binary) ? 0 : 1) : 1),
    svg: XnorGateIcon,
  },
];

export const LATCHES: LatchDef[] = [
  {
    name: 'SR Latch (NOR)',
    type: LatchType.SR_NOR,
    description: 'Basic latch. S=1 sets Q to 1, R=1 resets Q to 0. S=1 and R=1 is an invalid state.',
    inputs: ['S', 'R'],
    logic: (inputs: Record<string, Binary>, currentState: LatchState): LatchState => {
      const { S, R } = inputs;
      if (S === 1 && R === 1) return { q: 0, qNot: 0 }; // Invalid state for NOR latch
      if (S === 1) return { q: 1, qNot: 0 }; // Set
      if (R === 1) return { q: 0, qNot: 1 }; // Reset
      return currentState; // Hold
    },
    svg: SRLatchIcon,
  },
  {
    name: 'Gated SR Latch',
    type: LatchType.GATED_SR_NOR,
    description: 'An SR latch with an Enable input. State changes only when E=1.',
    inputs: ['S', 'R', 'E'],
    logic: (inputs: Record<string, Binary>, currentState: LatchState): LatchState => {
      const { S, R, E } = inputs;
      if (E === 0) return currentState; // Hold when disabled
      if (S === 1 && R === 1) return { q: 0, qNot: 0 }; // Invalid state
      if (S === 1) return { q: 1, qNot: 0 }; // Set
      if (R === 1) return { q: 0, qNot: 1 }; // Reset
      return currentState; // Hold when enabled but S=0, R=0
    },
    svg: GatedSRLatchIcon,
  },
  {
    name: 'D Latch',
    type: LatchType.D,
    description: 'Data latch. When E=1, output Q follows input D. When E=0, output holds its value.',
    inputs: ['D', 'E'],
    logic: (inputs: Record<string, Binary>, currentState: LatchState): LatchState => {
      const { D, E } = inputs;
      if (E === 0) return currentState; // Hold
      if (D === 1) return { q: 1, qNot: 0 };
      return { q: 0, qNot: 1 };
    },
    svg: DLatchIcon,
  },
];