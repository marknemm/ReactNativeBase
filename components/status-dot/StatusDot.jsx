import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * The {@link StatusDot} component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} [param0.color='gray'] The color of the {@link StatusDot}.
 * @param {number} [param0.size=10] The size of the {@link StatusDot}.
 * @param {Object} [param0.style={}] The additional style of the {@link StatusDot}.
 * @returns {React.JSX.Element} The {@link StatusDot} component.
 */
export default function StatusDot({ color = 'gray', size = 10, style = {} }) {
  const styles = useMemo(() => StyleSheet.create({
    statusDot: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
    },
  }), [color, size]);

  return <View style={[styles.statusDot, style]} />;
}

StatusDot.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
