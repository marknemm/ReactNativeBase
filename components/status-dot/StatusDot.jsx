import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * The {@link StatusDot} component.
 *
 * @param {Object} props The component properties.
 * @param {string} [props.color='gray'] The color of the {@link StatusDot}.
 * @param {number} [props.size=10] The size of the {@link StatusDot}.
 * @param {Object} [props.style={}] The additional style of the {@link StatusDot}.
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
