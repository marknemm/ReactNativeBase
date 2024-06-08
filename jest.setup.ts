import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import '@testing-library/react-native/extend-expect';

global.window = {} as any;
global.window = global as any;

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
