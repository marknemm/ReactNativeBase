import { BACKGROUND_COLORS } from '@constants/colors';

/**
 * Gets the background color for the given unique {@link id}.
 *
 * @param id The unique identifier.
 * @returns The background color.
 */
export function getBackgroundColor(id: string): string {
  return BACKGROUND_COLORS[(id?.charCodeAt(0) || 0) % BACKGROUND_COLORS.length];
}
