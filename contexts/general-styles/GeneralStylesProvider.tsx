import { useTheme } from '@rneui/themed';
import { createGeneralStyles, type GeneralStyles } from '@styles/general-styles';
import { useMemo, type PropsWithChildren } from 'react';
import { GeneralStylesContext } from './GeneralStylesContext';

/**
 * Provides the {@link GeneralStyles} for the application.
 * The {@link GeneralStyles} are based on the current theme, and will update with the theme.
 *
 * @param props The component {@link PropsWithChildren}.
 * @returns The {@link GeneralStylesProvider} component.
 */
const GeneralStylesProvider: React.FC<PropsWithChildren> = ({ children }) => {
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

export default GeneralStylesProvider;
