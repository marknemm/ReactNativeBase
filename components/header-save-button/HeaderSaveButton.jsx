import { Button } from '@rneui/themed';
import { useStyles } from './styles';

/**
 * The {@link HeaderSaveButton} component.
 *
 * @param {import('@rneui/base').ButtonProps} props The component properties.
 * @returns {React.JSX.Element} The {@link HeaderSaveButton} component.
 */
export default function HeaderSaveButton(props) {
  const styles = useStyles(props);

  return (
    <Button
      title="Save"
      titleStyle={styles.title}
      type="clear"
      {...props}
    />
  );
}
