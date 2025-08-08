
import React, { useState, useEffect } from 'react';
import type { GameState } from '../types';
import { PlayerColor } from '../types';
import Dice from './Dice';
import { PLAYER_CONFIG } from '../constants';

interface GameControlsProps {
  currentPlayer: PlayerColor;
  gameState: GameState;
  diceValue: number | null;
  onRollDice: () => void;
  onRestart: () => void;
  message: string;
}

const GameControls: React.FC<GameControlsProps> = ({
  currentPlayer,
  gameState,
  diceValue,
  onRollDice,
  onRestart,
  message,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  
  const handleRoll = () => {
    if (gameState === 'ROLLING') {
      setIsRolling(true);
      onRollDice();
      setTimeout(() => setIsRolling(false), 1000);
    }
  };

  const playerConfig = PLAYER_CONFIG[currentPlayer];

  return (
    <div className="w-full lg:w-80 lg:ml-8 mt-8 lg:mt-0 p-6 bg-slate-700 rounded-2xl shadow-xl flex flex-col items-center justify-between h-auto lg:h-[70vh] lg:max-h-[750px]">
      <div className="text-center w-full">
        <h1 className="text-4xl font-bold text-white mb-2">Ludo Game</h1>
        <p className="text-lg text-slate-300 mb-6">A classic reborn</p>

        <div className="mb-6 p-4 rounded-lg bg-slate-800 w-full">
            <h2 className="text-xl font-semibold mb-2">Current Turn</h2>
            <div className={`flex items-center justify-center p-3 rounded-md text-white font-bold text-lg shadow-inner ${playerConfig.baseColor}`}>
                Player {currentPlayer}
            </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <Dice value={diceValue} onRoll={handleRoll} rolling={isRolling} />
        <button
          onClick={handleRoll}
          disabled={gameState !== 'ROLLING' || isRolling}
          className={`
            mt-6 px-8 py-3 rounded-lg text-white font-bold text-xl transition-all duration-200
            w-48
            ${gameState !== 'ROLLING' || isRolling
              ? 'bg-gray-500 cursor-not-allowed'
              : `${playerConfig.baseColor} hover:${playerConfig.darkColor} transform hover:scale-105 shadow-lg`
            }
          `}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
      
      <div className="w-full text-center mt-6">
        <div className="h-16 p-4 bg-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-slate-200 italic">{message}</p>
        </div>
        <button
          onClick={onRestart}
          className="mt-6 w-full px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition-colors duration-200"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;
