import React from 'react';

interface IconProps {
  className?: string;
}

export const AndGateIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10 V 70 H 50 A 30 30 0 0 0 50 10 Z" />
    <line x1="0" y1="25" x2="20" y2="25" />
    <line x1="0" y1="55" x2="20" y2="55" />
    <line x1="80" y1="40" x2="100" y2="40" />
  </svg>
);

export const OrGateIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 10 Q 40 40, 10 70" />
    <path d="M10 10 C 50 15, 80 25, 90 40 C 80 55, 50 65, 10 70" />
    <line x1="0" y1="20" x2="12" y2="20" />
    <line x1="0" y1="60" x2="12" y2="60" />
    <line x1="90" y1="40" x2="100" y2="40" />
  </svg>
);

export const NotGateIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10 L 80 40 L 20 70 Z" />
    <circle cx="86" cy="40" r="6" />
    <line x1="0" y1="40" x2="20" y2="40" />
    <line x1="92" y1="40" x2="100" y2="40" />
  </svg>
);

export const NandGateIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10 V 70 H 50 A 30 30 0 0 0 50 10 Z" />
    <circle cx="86" cy="40" r="6" />
    <line x1="0" y1="25" x2="20" y2="25" />
    <line x1="0" y1="55" x2="20" y2="55" />
    <line x1="92" y1="40" x2="100" y2="40" />
  </svg>
);

export const NorGateIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 10 Q 40 40, 10 70" />
    <path d="M10 10 C 50 15, 70 25, 80 40 C 70 55, 50 65, 10 70" />
    <circle cx="86" cy="40" r="6" />
    <line x1="0" y1="20" x2="12" y2="20" />
    <line x1="0" y1="60" x2="12" y2="60" />
    <line x1="92" y1="40" x2="100" y2="40" />
  </svg>
);

export const XorGateIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 10 Q 45 40, 15 70" />
    <path d="M22 10 Q 52 40, 22 70" />
    <path d="M22 10 C 62 15, 87 25, 95 40 C 87 55, 62 65, 22 70" />
    <line x1="0" y1="20" x2="24" y2="20" />
    <line x1="0" y1="60" x2="24" y2="60" />
    <line x1="95" y1="40" x2="100" y2="40" />
  </svg>
);

export const XnorGateIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 10 Q 45 40, 15 70" />
    <path d="M22 10 Q 52 40, 22 70" />
    <path d="M22 10 C 62 15, 80 25, 88 40 C 80 55, 62 65, 22 70" />
    <circle cx="94" cy="40" r="6" />
    <line x1="0" y1="20" x2="24" y2="20" />
    <line x1="0" y1="60" x2="24" y2="60" />
    <line x1="100" y1="40" x2="100" y2="40" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
);

export const GithubIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
);

export const SRLatchIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <rect x="25" y="10" width="50" height="60" />
    <line x1="0" y1="25" x2="25" y2="25" />
    <line x1="0" y1="55" x2="25" y2="55" />
    <line x1="75" y1="25" x2="100" y2="25" />
    <line x1="75" y1="55" x2="100" y2="55" />
    <text x="15" y="22" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">S</text>
    <text x="15" y="52" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">R</text>
    <text x="85" y="22" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">Q</text>
    <text x="85" y="52" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">Q'</text>
  </svg>
);

export const GatedSRLatchIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <rect x="25" y="10" width="50" height="60" />
    <line x1="0" y1="20" x2="25" y2="20" />
    <line x1="0" y1="60" x2="25" y2="60" />
    <line x1="0" y1="40" x2="25" y2="40" />
    <line x1="75" y1="25" x2="100" y2="25" />
    <line x1="75" y1="55" x2="100" y2="55" />
    <text x="15" y="17" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">S</text>
    <text x="15" y="37" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">E</text>
    <text x="15" y="57" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">R</text>
    <text x="85" y="22" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">Q</text>
    <text x="85" y="52" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">Q'</text>
  </svg>
);

export const DLatchIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <rect x="25" y="10" width="50" height="60" />
    <line x1="0" y1="25" x2="25" y2="25" />
    <line x1="0" y1="55" x2="25" y2="55" />
    <line x1="75" y1="25" x2="100" y2="25" />
    <line x1="75" y1="55" x2="100" y2="55" />
    <text x="15" y="22" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">D</text>
    <text x="15" y="52" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">E</text>
    <text x="85" y="22" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">Q</text>
    <text x="85" y="52" fontSize="10" fill="currentColor" stroke="none" dominantBaseline="middle" textAnchor="middle">Q'</text>
  </svg>
);