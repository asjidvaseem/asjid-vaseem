
import type { GridCell } from './types';
import { PlayerColor } from './types';


export const PLAYER_COLORS: PlayerColor[] = [PlayerColor.RED, PlayerColor.GREEN, PlayerColor.YELLOW, PlayerColor.BLUE];

export const PLAYER_CONFIG = {
  [PlayerColor.RED]: {
    baseColor: 'bg-red-500',
    lightColor: 'bg-red-300',
    darkColor: 'bg-red-700',
    homeYardCoords: [[1,1], [1,4], [4,1], [4,4]] as GridCell[],
  },
  [PlayerColor.GREEN]: {
    baseColor: 'bg-green-500',
    lightColor: 'bg-green-300',
    darkColor: 'bg-green-700',
    homeYardCoords: [[1,10], [1,13], [4,10], [4,13]] as GridCell[],
  },
  [PlayerColor.YELLOW]: {
    baseColor: 'bg-yellow-400',
    lightColor: 'bg-yellow-200',
    darkColor: 'bg-yellow-600',
    homeYardCoords: [[10,10], [10,13], [13,10], [13,13]] as GridCell[],
  },
  [PlayerColor.BLUE]: {
    baseColor: 'bg-blue-500',
    lightColor: 'bg-blue-300',
    darkColor: 'bg-blue-700',
    homeYardCoords: [[10,1], [10,4], [13,1], [13,4]] as GridCell[],
  },
};

const RED_PATH: GridCell[] = [
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
  [0, 7],
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
  [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
  [7, 14],
  [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
  [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
  [14, 7],
  [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  [7, 0],
  [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6] // Home stretch + final spot
];

const GREEN_PATH: GridCell[] = [
  [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
  [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
  [7, 14],
  [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
  [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
  [14, 7],
  [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  [7, 0],
  [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
  [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7] // Home stretch
];

const YELLOW_PATH: GridCell[] = [
  [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
  [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
  [14, 7],
  [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  [7, 0],
  [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
  [0, 7],
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
  [7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8] // Home stretch
];

const BLUE_PATH: GridCell[] = [
  [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  [7, 0],
  [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
  [0, 7],
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
  [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
  [13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7] // Home stretch
];

export const PATHS: Record<PlayerColor, GridCell[]> = {
  [PlayerColor.RED]: RED_PATH,
  [PlayerColor.GREEN]: GREEN_PATH,
  [PlayerColor.YELLOW]: YELLOW_PATH,
  [PlayerColor.BLUE]: BLUE_PATH,
};

// Logical position on the track, NOT grid coordinates
export const START_INDICES: Record<PlayerColor, number> = {
  [PlayerColor.RED]: 0,
  [PlayerColor.GREEN]: 13,
  [PlayerColor.YELLOW]: 26,
  [PlayerColor.BLUE]: 39,
};

export const SAFE_SPOT_INDICES: number[] = [0, 8, 13, 21, 26, 34, 39, 47];
