import { createContext } from 'react';

/**
 * A context that provides the app-wide Backdrop properties.
 *
 * @type {React.Context<Types.Backdrop.BackdropState>}
 */
export const BackdropContext = createContext(null);
