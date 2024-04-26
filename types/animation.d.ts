import { AnimatableValue, AnimationCallback, WithTimingConfig } from 'react-native-reanimated';

export * from 'react-native-reanimated';

/**
 * Animation function type.
 *
 * @template T The type of the animated value.
 * @param toValue The value to animate to.
 * @param config The animation configuration.
 * @param callback The callback to call when the animation is completed.
 * @returns The animated value.
 */
export type AnimationFn<T = AnimatableValue> = <T extends AnimatableValue>(toValue: T, config?: any, callback?: AnimationCallback) => T;
