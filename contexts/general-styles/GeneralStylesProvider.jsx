import { useTheme } from '@rneui/themed';
import { createGeneralStyles } from '@styles/general-styles';
import { useMemo } from 'react';
import { GeneralStylesContext } from './GeneralStylesContext';

/**
 * The {@link GeneralStylesProvider} component.
 *
 * @param {Object} props The component properties.
 * @param {React.ReactNode} props.children The children components.
 * @returns {React.JSX.Element} The {@link GeneralStylesProvider} component.
 */
export default function GeneralStylesProvider({ children }) {
  const { theme } = useTheme();
  const generalStyles = useMemo(() =>
    createGeneralStyles(theme),
  [theme]);

  return (
    <GeneralStylesContext.Provider value={generalStyles}>
      { children }
    </GeneralStylesContext.Provider>
  );
}
