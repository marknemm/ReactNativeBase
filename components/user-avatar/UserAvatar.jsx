/* eslint-disable react/jsx-props-no-spreading */
import { Avatar } from '@rneui/themed';
import { User } from '@util/user';
import PropTypes from 'prop-types';

/**
 * The UserAvatar component.
 *
 * @param {import('@rneui/base').AvatarProps & { user: User }} props The component props.
 * @returns {React.JSX.Element} The UserAvatar component.
 */
export default function UserAvatar(props)  {
  const { user } = props;
  const icon = !(user?.photoURL || user?.initials)
    ? { name: 'user', type: 'font-awesome' }
    : null;

  const source = user?.photoURL
    ? { uri: user.photoURL }
    : null;

  return (
    <Avatar
      containerStyle={{ backgroundColor: 'green' }}
      icon={icon}
      rounded
      size="medium"
      source={source}
      title={user?.initials}
      {...props}
    />
  );
}

UserAvatar.propTypes = {
  user: PropTypes.instanceOf(User),
};
