import { resolvePredicate } from '@util/predicate';
import { useEffect } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

/**
 * Custom hook that animates a numeric value based on a given {@link predicate}.
 *
 * @param {boolean | (() => boolean)} predicate The predicate value or function.
 * @param {number} trueValue The value when the {@link predicate} is `true`.
 * @param {number} falseValue The value when the {@link predicate} is `false`.
 * @param {Types.Animation.AnimationFn} [animationFn=withTiming] The animation {@link Types.Animation.AnimationFn function}.
 * Defaults to {@link withTiming}.
 * @param {any} [config] The animation configuration.
 * @param {Types.Animation.AnimationCallback} [callback] A {@link Types.Animation.AnimationCallback function} called on animation completion.
 * @returns {import('react-native-reanimated').SharedValue<number>} The animated value.
 */
export function useValueAnimation(
  predicate,
  trueValue,
  falseValue,
  animationFn = withTiming,
  config = null,
  callback = null
) {
  const height = useSharedValue(resolvePredicate(predicate) ? trueValue : falseValue);

  useEffect(() => {
    height.value = animationFn(resolvePredicate(predicate) ? trueValue : falseValue, config, callback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationFn, predicate, trueValue, falseValue]);

  return height;
}
