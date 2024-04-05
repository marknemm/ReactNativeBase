import InfoDialog from '@components/info-dialog/InfoDialog';
import { Button, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * The info button component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} [param0.backgroundColor='transparent'] The background color of the info button.
 * @param {string} [param0.color='black'] The color of the info button.
 * @param {React.ReactNode} [param0.children] The info dialog content.
 * @param {string} [param0.dialogTitle=''] The title of the info dialog.
 * @param {boolean} [param0.disabled=false] Whether the info button is disabled.
 * @param {(event: import('react-native').GestureResponderEvent) => void} [param0.onPress=() => {}] The function to call when the info button is pressed.
 * @param {number} [param0.size=24] The size of the info button.
 * @param {Object} [param0.style={}] The additional style of the info button.
 * @returns {React.JSX.Element} The info button component.
 */
export default function InfoButton({
  backgroundColor = 'transparent',
  color,
  children,
  dialogTitle = '',
  disabled = false,
  onPress = () => {},
  size = 24,
  style = {},
}) {
  const { theme } = useTheme();
  const [infoDialogVisible, setInfoDialogVisible] = useState(false);

  const infoDialog = children && (
    <InfoDialog
      isVisible={infoDialogVisible}
      onClose={() => setInfoDialogVisible(false)}
      title={dialogTitle}
    >
      { children }
    </InfoDialog>
  );

  return (
    <>
      <Button
        buttonStyle={style}
        color={backgroundColor}
        disabled={disabled}
        icon={{
          name: 'info',
          type: 'material',
          color: color ?? theme.colors.black,
          size,
        }}
        onPress={(event) => {
          if (infoDialog) {
            setInfoDialogVisible(true);
          }
          onPress(event);
        }}
        radius={size}
      />

      { infoDialog }
    </>
  );
}

InfoButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  dialogTitle: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  size: PropTypes.number,
};
