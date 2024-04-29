import { Doc } from './db';
import { TeaserCardStyleProps } from './teaser-card';
import { GestureResponderEvent } from 'react-native';

/**
 * A raw {@link UserDoc} from a remote database.
 */
export interface UserDoc extends Doc {

  /**
   * The user's mailing address.
   */
  address?: Address;

  /**
   * The user's display (full) name.
   */
  displayName?: string;

  /**
   * The user's email address.
   */
  email?: string;

  /**
   * The user's phone number.
   */
  phoneNumber?: string;

  /**
   * The user's photo URL.
   */
  photoURL?: string;

}

/**
 * A mailing {@link Address}.
 */
export interface Address {

  /**
   * The street address.
   */
  street: string;

  /**
   * The apartment or suite number.
   */
  apartmentSuite: string;

  /**
   * The city.
   */
  city: string;

  /**
   * The state.
   */
  state: string;

  /**
   * The ZIP code.
   */
  zip: string;

}
