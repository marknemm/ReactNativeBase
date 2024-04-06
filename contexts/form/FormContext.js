import { createContext } from 'react';

/**
 * A context that provides a form instance.
 *
 * @type {React.Context<import('react-hook-form').UseFormReturn<any>>}
 */
export const FormContext = createContext(null);
