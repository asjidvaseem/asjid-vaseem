
import React from 'react';
import { PlayerColor } from '../types';
import { PLAYER_CONFIG } from '../constants';

interface WinnerModalProps {
  winner: PlayerColor | null;
  onRestart: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onRestart }) => {
  if (!winner) return null;

  const playerConfig = PLAYER_CONFIG[winner];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className={`relative p-8 rounded-2xl shadow-2xl text-center text-white ${playerConfig.darkColor} border-4 ${playerConfig.baseColor} border-opacity-50`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-7xl">🏆</div>
        <h2 className="text-4xl font-bold mt-8 mb-2">Congratulations!</h2>
        <p className={`text-3xl font-bold mb-8 ${playerConfig.baseColor} rounded-lg px-4 py-2`}>
          Player {winner} Wins!
        </p>
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-white text-slate-800 font-bold text-lg rounded-lg hover:bg-slate-200 transition-colors duration-200 transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
