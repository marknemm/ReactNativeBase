import InfoDialog from '@components/info-dialog/InfoDialog';
import { INFO_ICON } from '@constants/icons';
import { Button, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * The {@link InfoButton} component.
 *
 * @param {Object} props The component properties.
 * @param {string} [props.backgroundColor='transparent'] The background color of the info button.
 * @param {string} [props.color='black'] The color of the info button.
 * @param {React.ReactNode} [props.children] The info dialog content.
 * @param {React.ReactNode | string} [props.dialogTitle=''] The title of the info dialog.
 * @param {boolean} [props.disabled=false] Whether the info button is disabled.
 * @param {(event: import('react-native').GestureResponderEvent) => void} [props.onPress=() => {}] The function to call when the info button is pressed.
 * @param {number} [props.size=24] The size of the info button.
 * @param {Object} [props.style={}] The additional style of the info button.
 * @returns {React.JSX.Element} The {@link InfoButton} component.
 */
export default function InfoButton({
  backgroundColor = 'transparent',
  color,
  children,
  dialogTitle = '',
  disabled = false,
  onPress,
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
          ...INFO_ICON,
          color: color ?? theme.colors.black,
          size,
        }}
        onPress={(event) => {
          if (infoDialog) {
            setInfoDialogVisible(true);
          }
          onPress?.(event);
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
