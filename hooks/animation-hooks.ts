import type { AnimationFn } from '@interfaces/animation';
import { resolvePredicate, type Predicate } from '@util/predicate';
import { useEffect } from 'react';
import { useSharedValue, withTiming, type AnimationCallback, type SharedValue } from 'react-native-reanimated';

/**
 * Custom hook that animates a numeric value based on a given {@link predicate}.
 *
 * @param predicate The {@link Predicate} value or function.
 * @param trueValue The value when the {@link predicate} is `true`.
 * @param falseValue The value when the {@link predicate} is `false`.
 * @param animationFn The {@link AnimationFn}.
 * Defaults to {@link withTiming}.
 * @param {any} config The animation configuration.
 * @param callback An {@link AnimationCallback} called on animation completion.
 * @returns The animation {@link SharedValue}.
 */
export function useValueAnimation(
  predicate: Predicate,
  trueValue: number,
  falseValue: number,
  animationFn: AnimationFn = withTiming,
  config: any = null,
  callback?: AnimationCallback
): SharedValue<number> {
  const resolvedPredicate = resolvePredicate(predicate);
  const animated = useSharedValue(resolvedPredicate ? trueValue : falseValue);

  useEffect(() => {
    animated.value = animationFn(resolvedPredicate ? trueValue : falseValue, config, callback);
  }, [animated, animationFn, callback, config, falseValue, resolvedPredicate, trueValue]);

  return animated;
}
