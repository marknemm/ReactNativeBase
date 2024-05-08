import { Button, ButtonProps } from '@rneui/themed';
import { useStyles } from './styles';

/**
 * The {@link HeaderSaveButton} component.
 *
 * @param {import('@rneui/base').ButtonProps} props The component properties.
 * @returns {React.JSX.Element} The {@link HeaderSaveButton} component.
 */
const HeaderSaveButton: React.FC<ButtonProps> = (props) => {
  const styles = useStyles(props);

  return (
    <Button
      title="Save"
      type="clear"
      {...props}
      titleStyle={styles.title}
    />
  );
}

export default HeaderSaveButton;
