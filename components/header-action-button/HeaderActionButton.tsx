import { Button, ButtonProps } from '@rneui/themed';
import { forwardRef } from 'react';
import { useStyles } from './HeaderActionButton.styles';

/**
 * The {@link HeaderActionButton} component.
 *
 * @param props The component {@link ButtonProps}.
 * @param ref The component reference.
 * @returns The {@link HeaderActionButton} component.
 */
const HeaderActionButton: React.FC<ButtonProps> = forwardRef((props, ref) => {
  const styles = useStyles(props);

  return (
    <Button
      type="clear"
      {...props}
      ref={ref}
      titleStyle={styles.title}
    />
  );
});

export default HeaderActionButton;
