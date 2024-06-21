import { useValueAnimation } from '@hooks/animation-hooks';
import { renderHook } from '@testing-library/react-native';

describe('animation-hooks', () => {
  describe('useValueAnimation', () => {
    it('should resolve animation value to true value', () => {
      const animated = renderHook(
        () => useValueAnimation(true, 1, 0)
      ).result.current;

      expect(animated.value).toBe(1);
    });

    it('should resolve animation value to false value', () => {
      const animated = renderHook(
        () => useValueAnimation(false, 1, 0)
      ).result.current;

      expect(animated.value).toBe(0);
    });
  });
});
