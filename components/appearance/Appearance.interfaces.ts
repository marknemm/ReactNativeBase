/**
 * The `Appearance` component properties.
 */
export interface AppearanceProps {

  /**
   * The appearance.
   */
  appearance: 'auto' | 'dark' | 'light';

  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;

  /**
   * The function to call when the appearance changes.
   *
   * @param appearance The new appearance.
   */
  onAppearanceChange?: (appearance: 'auto' | 'dark' | 'light') => void;

}
