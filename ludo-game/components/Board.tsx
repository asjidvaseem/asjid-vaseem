
import React from 'react';
import type { Piece, GridCell } from '../types';
import { PlayerColor } from '../types';
import { PLAYER_CONFIG, PATHS, START_INDICES, SAFE_SPOT_INDICES } from '../constants';
import PieceComponent from './Piece';

interface BoardProps {
  pieces: Piece[];
  onPieceClick: (pieceId: number) => void;
  movablePieceIds: number[];
}

const StarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);


const Board: React.FC<BoardProps> = ({ pieces, onPieceClick, movablePieceIds }) => {
  const GRID_SIZE = 15;

  const renderPiecesForCell = (row: number, col: number) => {
    const piecesOnCell: Piece[] = [];

    // Check yard pieces
    Object.values(PlayerColor).forEach(color => {
      const yardCoords = PLAYER_CONFIG[color].homeYardCoords;
      const yardPieces = pieces.filter(p => p.color === color && p.state === 'yard');
      yardCoords.forEach((coord, i) => {
        if (coord[0] === row && coord[1] === col && yardPieces[i]) {
          piecesOnCell.push(yardPieces[i]);
        }
      });
    });

    // Check active/home pieces
    const activePieces = pieces.filter(p => p.state === 'active' || p.state === 'home');
    activePieces.forEach(p => {
      if (p.position >= 0) {
        const pieceCoord = PATHS[p.color][p.position];
        if (pieceCoord[0] === row && pieceCoord[1] === col) {
          piecesOnCell.push(p);
        }
      }
    });

    if (piecesOnCell.length === 0) return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center p-1">
          {piecesOnCell.map((p, index) => (
             <div key={p.id} className={`${piecesOnCell.length > 1 ? 'relative' : ''}`} style={{ transform: `translateX(${index * -5}px)`}}>
                <PieceComponent
                piece={p}
                isMovable={movablePieceIds.includes(p.id)}
                onClick={() => onPieceClick(p.id)}
                />
             </div>
          ))}
      </div>
    );
  };
  
  const getCellBgColor = (row: number, col: number): string => {
    // Center home
    if (row > 5 && row < 9 && col > 5 && col < 9) return 'bg-slate-700';

    for (const color of Object.values(PlayerColor)) {
      // Home Yards
      if ( (row < 6 && col < 6 && color === PlayerColor.RED) ||
           (row < 6 && col > 8 && color === PlayerColor.GREEN) ||
           (row > 8 && col > 8 && color === PlayerColor.YELLOW) ||
           (row > 8 && col < 6 && color === PlayerColor.BLUE) ) {
        return PLAYER_CONFIG[color].baseColor;
      }
    
      // Home Paths
      const homePath = PATHS[color].slice(51, 56);
      if(homePath.some(c => c[0] === row && c[1] === col)){
        return PLAYER_CONFIG[color].baseColor;
      }
    }
    
    // Path cells
    const allPathCoords = Object.values(PATHS).flat();
    if(allPathCoords.some(c => c[0] === row && c[1] === col)) {
        return 'bg-slate-200';
    }

    return 'bg-slate-600';
  };

  const isStartCell = (row: number, col: number): PlayerColor | null => {
    for (const color of Object.values(PlayerColor)) {
      const startCoord = PATHS[color][START_INDICES[color]];
      if(startCoord[0] === row && startCoord[1] === col) return color;
    }
    return null;
  }

  const isSafeSpot = (row: number, col: number): boolean => {
    for (const color of Object.values(PlayerColor)) {
       for(const index of SAFE_SPOT_INDICES) {
         const pathCoord = PATHS[color][index];
         if(pathCoord && pathCoord[0] === row && pathCoord[1] === col) return true;
       }
    }
    return false;
  }

  return (
    <div className="grid grid-cols-15 grid-rows-15 w-[90vw] h-[90vw] md:w-[70vh] md:h-[70vh] max-w-[750px] max-h-[750px] p-2 bg-slate-900 rounded-lg shadow-2xl border-4 border-slate-700">
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
        const row = Math.floor(i / GRID_SIZE);
        const col = i % GRID_SIZE;
        const bgColor = getCellBgColor(row, col);
        const startColor = isStartCell(row, col);
        const safeSpot = isSafeSpot(row, col);

        let cellClasses = `relative border border-slate-500/30 ${bgColor}`;

        if (startColor) {
          cellClasses = `relative border-4 ${'border-' + PLAYER_CONFIG[startColor].baseColor.split('-')[1] + '-500'} ${bgColor}`;
        }
        
        // Final home bases
        const homeTriangleClasses = (r: number, c: number) => {
          if(r===7 && c===7) {
            if ( (row > 5 && row < 9 && col > 5 && col < 9) ) {
              let borderClass = '';
              if (row === 6) borderClass += ' border-t-red-500';
              if (row === 8) borderClass += ' border-b-blue-500';
              if (col === 6) borderClass += ' border-l-yellow-400';
              if (col === 8) borderClass += ' border-r-green-500';
              return `w-0 h-0 border-[calc(var(--cell-size)/2)] border-transparent ${borderClass}`;
            }
          }
          return '';
        }
        
        if (row > 5 && row < 9 && col > 5 && col < 9) {
            return (
                <div key={i} className="flex items-center justify-center bg-slate-900">
                    <div className={homeTriangleClasses(row,col)}></div>
                </div>
            )
        }

        return (
          <div key={i} className={cellClasses}>
            {safeSpot && !startColor && <StarIcon className="absolute inset-0 m-auto w-1/2 h-1/2 text-slate-500/70" />}
            {renderPiecesForCell(row, col)}
          </div>
        );
      })}
       <style>{`
          .grid-cols-15 { grid-template-columns: repeat(15, minmax(0, 1fr)); }
          .grid-rows-15 { grid-template-rows: repeat(15, minmax(0, 1fr)); }
          .border-red-500 { border-color: #ef4444; }
          .border-green-500 { border-color: #22c55e; }
          .border-yellow-400 { border-color: #facc15; }
          .border-blue-500 { border-color: #3b82f6; }
          .border-t-red-500 { border-top-color: #ef4444; }
          .border-b-blue-500 { border-bottom-color: #3b82f6; }
          .border-l-yellow-400 { border-left-color: #facc15; }
          .border-r-green-500 { border-right-color: #22c55e; }
        `}</style>
    </div>
  );
};

export default Board;
