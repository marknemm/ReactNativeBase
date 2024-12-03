import type { GeneralStyles } from '@interfaces/styles';
import { createContext } from 'react';

/**
 * A context that provides the {@link GeneralStyles}.
 */
export const GeneralStylesContext: React.Context<GeneralStyles> = createContext(undefined);
