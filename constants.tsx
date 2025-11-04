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
    truthTable: {
      headers: ['Input A', 'Input B', 'Output'],
      rows: [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
    },
  },
  {
    name: 'OR Gate',
    type: GateType.OR,
    logic: (inputs: Binary[]): Binary => inputs.length ? inputs.reduce((a, b) => (a | b) as Binary) as Binary : 0,
    svg: OrGateIcon,
    truthTable: {
      headers: ['Input A', 'Input B', 'Output'],
      rows: [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    },
  },
  {
    name: 'NOT Gate',
    type: GateType.NOT,
    isUnary: true,
    logic: (inputs: Binary[]): Binary => (inputs[0] === 1 ? 0 : 1),
    svg: NotGateIcon,
    truthTable: {
      headers: ['Input A', 'Output'],
      rows: [
        [0, 1],
        [1, 0],
      ],
    },
  },
  {
    name: 'NAND Gate',
    type: GateType.NAND,
    logic: (inputs: Binary[]): Binary => (inputs.length ? (inputs.reduce((a, b) => (a & b) as Binary) ? 0 : 1) : 1),
    svg: NandGateIcon,
    truthTable: {
      headers: ['Input A', 'Input B', 'Output'],
      rows: [
        [0, 0, 1],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
      ],
    },
  },
  {
    name: 'NOR Gate',
    type: GateType.NOR,
    logic: (inputs: Binary[]): Binary => (inputs.length ? (inputs.reduce((a, b) => (a | b) as Binary) ? 0 : 1) : 1),
    svg: NorGateIcon,
    truthTable: {
      headers: ['Input A', 'Input B', 'Output'],
      rows: [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 0],
      ],
    },
  },
  {
    name: 'XOR Gate',
    type: GateType.XOR,
    logic: (inputs: Binary[]): Binary => inputs.length ? inputs.reduce((a, b) => (a ^ b) as Binary) as Binary : 0,
    svg: XorGateIcon,
    truthTable: {
      headers: ['Input A', 'Input B', 'Output'],
      rows: [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
      ],
    },
  },
  {
    name: 'XNOR Gate',
    type: GateType.XNOR,
    logic: (inputs: Binary[]): Binary => (inputs.length ? (inputs.reduce((a, b) => (a ^ b) as Binary) ? 0 : 1) : 1),
    svg: XnorGateIcon,
    truthTable: {
      headers: ['Input A', 'Input B', 'Output'],
      rows: [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
    },
  },
];