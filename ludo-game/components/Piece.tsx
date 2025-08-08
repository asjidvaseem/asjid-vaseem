
import React from 'react';
import type { Piece } from '../types';
import { PLAYER_CONFIG } from '../constants';

interface PieceProps {
  piece: Piece;
  isMovable: boolean;
  onClick: () => void;
}

const PieceComponent: React.FC<PieceProps> = ({ piece, isMovable, onClick }) => {
  const config = PLAYER_CONFIG[piece.color];
  const pieceClasses = `
    w-full h-full rounded-full flex items-center justify-center
    border-4 border-slate-900/50 
    ${config.baseColor} 
    cursor-pointer
    transition-all duration-300
    shadow-lg
    ${isMovable ? 'animate-pulse scale-110 ring-4 ring-white' : ''}
  `;

  return (
    <div className={pieceClasses} onClick={onClick}>
       <div className={`w-3/5 h-3/5 rounded-full ${config.lightColor} opacity-70`}></div>
    </div>
  );
};

export default PieceComponent;
