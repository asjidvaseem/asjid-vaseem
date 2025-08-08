
import React, { useState, useCallback, useMemo } from 'react';
import type { Piece, GameState } from './types';
import { PlayerColor } from './types';
import { PLAYER_COLORS, START_INDICES, PATHS, SAFE_SPOT_INDICES } from './constants';
import Board from './components/Board';
import GameControls from './components/GameControls';
import WinnerModal from './components/WinnerModal';

const getInitialPieces = (): Piece[] => {
  const pieces: Piece[] = [];
  PLAYER_COLORS.forEach((color, playerIndex) => {
    for (let i = 0; i < 4; i++) {
      pieces.push({
        id: playerIndex * 4 + i,
        color: color,
        position: -1,
        state: 'yard',
      });
    }
  });
  return pieces;
};

const App: React.FC = () => {
  const [pieces, setPieces] = useState<Piece[]>(getInitialPieces);
  const [gameState, setGameState] = useState<GameState>('ROLLING');
  const [currentPlayer, setCurrentPlayer] = useState<PlayerColor>(PlayerColor.RED);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [winner, setWinner] = useState<PlayerColor | null>(null);
  const [message, setMessage] = useState<string>('Welcome to Ludo! Red player starts.');

  const getNextPlayer = useCallback((player: PlayerColor) => {
    const currentIndex = PLAYER_COLORS.indexOf(player);
    return PLAYER_COLORS[(currentIndex + 1) % PLAYER_COLORS.length];
  }, []);

  const movablePieces = useMemo(() => {
    if (gameState !== 'MOVING' || !diceValue) return [];
    
    return pieces.filter(p => {
      if (p.color !== currentPlayer) return false;
      if (p.state === 'home') return false;
      if (p.state === 'yard' && diceValue === 6) return true;
      if (p.state === 'active' && p.position + diceValue <= 56) return true;
      return false;
    }).map(p => p.id);
  }, [pieces, currentPlayer, gameState, diceValue]);

  const handleRollDice = useCallback(() => {
    if (gameState !== 'ROLLING') return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);
    setMessage(`${currentPlayer} rolled a ${roll}!`);

    const hasYardPieces = pieces.some(p => p.color === currentPlayer && p.state === 'yard');
    const hasActivePieces = pieces.some(p => p.color === currentPlayer && p.state === 'active' && (p.position + roll <= 56));

    if (roll === 6) {
        if (hasYardPieces || hasActivePieces) {
             setGameState('MOVING');
        } else {
            // Reroll is implicit as player stays the same
            setMessage(`${currentPlayer} rolled a 6 but has no moves. Roll again!`);
        }
    } else {
        if (hasActivePieces) {
            setGameState('MOVING');
        } else {
            setMessage(`${currentPlayer} has no possible moves. Next player.`);
            setTimeout(() => {
              setCurrentPlayer(getNextPlayer(currentPlayer));
              setDiceValue(null);
            }, 1500);
        }
    }
  }, [gameState, pieces, currentPlayer, getNextPlayer]);

  const handlePieceClick = useCallback((pieceId: number) => {
    if (gameState !== 'MOVING' || !diceValue || !movablePieces.includes(pieceId)) return;

    let bonusTurn = false;
    const newPieces = pieces.map(p => ({ ...p }));
    const pieceToMove = newPieces.find(p => p.id === pieceId)!;
    
    // Move piece from yard
    if (pieceToMove.state === 'yard' && diceValue === 6) {
      pieceToMove.state = 'active';
      pieceToMove.position = START_INDICES[pieceToMove.color];
      bonusTurn = true; // Getting out of yard gives another turn
    } else if (pieceToMove.state === 'active') {
      const newPosition = pieceToMove.position + diceValue;
      pieceToMove.position = newPosition;

      if (newPosition === 56) {
        pieceToMove.state = 'home';
        bonusTurn = true; // Reaching home gives another turn
      }
      
      if (newPosition < 51 && !SAFE_SPOT_INDICES.includes(newPosition)) {
          const targetPathCoord = PATHS[pieceToMove.color][newPosition];
          const opponentPiecesAtTarget = newPieces.filter(p => 
              p.color !== pieceToMove.color && 
              p.state === 'active' && 
              PATHS[p.color][p.position][0] === targetPathCoord[0] &&
              PATHS[p.color][p.position][1] === targetPathCoord[1]
          );

          if(opponentPiecesAtTarget.length === 1) {
              const capturedPiece = opponentPiecesAtTarget[0];
              capturedPiece.state = 'yard';
              capturedPiece.position = -1;
              setMessage(`💥 ${pieceToMove.color} captured ${capturedPiece.color}'s piece!`);
              bonusTurn = true;
          }
      }
    }
    
    setPieces(newPieces);

    // Check for win
    const currentPlayerPieces = newPieces.filter(p => p.color === currentPlayer);
    if (currentPlayerPieces.every(p => p.state === 'home')) {
      setWinner(currentPlayer);
      setGameState('GAME_OVER');
      setMessage(`🎉 ${currentPlayer} wins the game!`);
      return;
    }

    if (diceValue === 6 || bonusTurn) {
        setGameState('ROLLING');
        setDiceValue(null);
        setMessage(`${currentPlayer} gets another turn!`);
    } else {
        setGameState('ROLLING');
        setDiceValue(null);
        const nextPlayer = getNextPlayer(currentPlayer);
        setCurrentPlayer(nextPlayer);
        setMessage(`${nextPlayer}'s turn to roll.`);
    }
  }, [gameState, diceValue, pieces, movablePieces, currentPlayer, getNextPlayer]);


  const handleRestart = useCallback(() => {
    setPieces(getInitialPieces());
    setGameState('ROLLING');
    setCurrentPlayer(PlayerColor.RED);
    setDiceValue(null);
    setWinner(null);
    setMessage('New game started! Red player begins.');
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-slate-800 p-4 font-sans">
      <div className="relative">
        <Board pieces={pieces} onPieceClick={handlePieceClick} movablePieceIds={movablePieces} />
      </div>
      <GameControls
        currentPlayer={currentPlayer}
        gameState={gameState}
        diceValue={diceValue}
        onRollDice={handleRollDice}
        onRestart={handleRestart}
        message={message}
      />
      {winner && <WinnerModal winner={winner} onRestart={handleRestart} />}
    </div>
  );
};

export default App;
