import { AnimationFn } from '@interfaces/animation';
import { Predicate, resolvePredicate } from '@util/predicate';
import { useEffect } from 'react';
import { AnimationCallback, SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';

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
): SharedValue<number>
{
  const height = useSharedValue(resolvePredicate(predicate) ? trueValue : falseValue);

  useEffect(() => {
    height.value = animationFn(resolvePredicate(predicate) ? trueValue : falseValue, config, callback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationFn, predicate, trueValue, falseValue]);

  return height;
}
