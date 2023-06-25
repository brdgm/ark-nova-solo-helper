import PlayerColor from '@/services/enum/PlayerColor';

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function(playerColor: PlayerColor) : string {
  switch (playerColor) {
    case PlayerColor.BLUE:
      return "#0776ba"
    case PlayerColor.RED:
      return "#e51e25"
    case PlayerColor.YELLOW:
      return "#ebd717"
    case PlayerColor.BLACK:
      return "#262520";
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
