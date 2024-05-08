import { useTheme } from '@rneui/themed';
import { createGeneralStyles, GeneralStyles } from '@styles/general-styles';
import { useMemo } from 'react';
import { GeneralStylesContext } from './GeneralStylesContext';

/**
 * Provides the {@link GeneralStyles} for the application.
 * The {@link GeneralStyles} are based on the current theme, and will update with the theme.
 *
 * @param props The component {@link Props}.
 * @returns The {@link GeneralStylesProvider} component.
 */
const GeneralStylesProvider: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  const generalStyles = useMemo(() =>
    createGeneralStyles(theme),
  [theme]);

  return (
    <GeneralStylesContext.Provider value={generalStyles}>
      { children }
    </GeneralStylesContext.Provider>
  );
};

/**
 * The {@link GeneralStylesProvider} component properties.
 */
interface Props {

  /**
   * The children components.
   */
  children: React.ReactNode;

}

export default GeneralStylesProvider;
