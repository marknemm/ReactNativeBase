import { GeneralStylesContext } from '@contexts/general-styles/GeneralStylesContext';
import GeneralStylesProvider from '@contexts/general-styles/GeneralStylesProvider';
import { useThemeGenerator } from '@hooks/theme-hooks';
import { ThemeProvider } from '@rneui/themed';
import { genTheme } from '@styles/theme';
import { renderHook } from '@testing-library/react-native';
import { useContext } from 'react';

describe('<GeneralStylesProvider />', () => {
  describe('Create', () => {
    it('Creates new GeneralStyles', () => {
      const theme = renderHook(() =>
        useThemeGenerator((scheme, dimensions) =>
          genTheme(scheme, dimensions)
        )
      ).result.current;

      const generalStyles = renderHook(
        () => useContext(GeneralStylesContext),
        {
          wrapper: ({ children }) => (
            <ThemeProvider theme={theme}>
              <GeneralStylesProvider>
                { children }
              </GeneralStylesProvider>
            </ThemeProvider>
          ),
        }
      ).result.current;

      expect(generalStyles).toBeTruthy();
    });
  });
});
