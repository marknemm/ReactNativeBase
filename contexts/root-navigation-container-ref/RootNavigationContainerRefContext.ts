import { RootNavigationContainerRef } from '@interfaces/navigation';
import { createContext } from 'react';

/**
 * A context that provides the {@link RootNavigationContainerRef}.
 */
export const RootNavigationContainerRefContext: React.Context<RootNavigationContainerRef> = createContext(undefined);
