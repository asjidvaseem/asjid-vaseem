
export enum PlayerColor {
  RED = 'RED',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
}

export type PieceState = 'yard' | 'active' | 'home';

export interface Piece {
  id: number;
  color: PlayerColor;
  position: number; // -1: yard, 0-50: main track, 51-56: home path, 57: finished
  state: PieceState;
}

export type GameState = 'ROLLING' | 'MOVING' | 'GAME_OVER';

export type GridCell = [number, number];
