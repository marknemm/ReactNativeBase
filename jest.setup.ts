import '@testing-library/react-native/extend-expect';
import { View } from 'react-native';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

global.window = {} as any;
global.window = global as any;

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.spyOn(View.prototype, 'measureInWindow').mockImplementation((cb) => {
  cb(0, 0, 360, 580);
});
