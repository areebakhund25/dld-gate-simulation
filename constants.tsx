import React from 'react';
import type { GateDef, Binary } from './types';
import { GateType } from './types';
import { AndGateIcon, OrGateIcon, NotGateIcon, NandGateIcon, NorGateIcon, XorGateIcon, XnorGateIcon } from './components/Icons';

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
