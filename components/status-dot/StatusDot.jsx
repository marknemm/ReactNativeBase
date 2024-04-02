import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

/**
 * The status dot component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} [param0.color='gray'] The color of the status dot.
 * @param {number} [param0.size=10] The size of the status dot.
 * @param {Object} [param0.style={}] The additional style of the status dot.
 * @returns {React.JSX.Element} The status dot component.
 */
export default function StatusDot({ color = 'gray', size = 10, style = {} }) {
  const styles = StyleSheet.create({
    statusDot: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
    },
  });

  return <View style={[styles.statusDot, style]} />;
}

StatusDot.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
