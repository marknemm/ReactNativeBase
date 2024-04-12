import { User } from '@util/user';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

/**
 * The {@link UserProvider} component.
 *
 * @param {Object} param0 The component props.
 * @param {React.ReactNode} param0.children The children components.
 * @param {User} param0.user The {@link User}.
 * @returns {React.JSX.Element} The {@link UserProvider} component.
 */
export default function UserProvider({ children, user }) {
  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  user: PropTypes.object,
};
