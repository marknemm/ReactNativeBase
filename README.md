# React Native Base

A base project meant to be cloned and added onto when developing new React Native (Expo) apps.

Provides a strong foundation for new apps with the following functionality:

- [App theming](https://reactnativeelements.com/docs/customization/themeprovider) using [React Native Elements](https://reactnativeelements.com).
- [Bottom Tabs Navigation](https://reactnavigation.org/docs/bottom-tab-navigator/) with nested [Native Stack Navigation](https://reactnavigation.org/docs/native-stack-navigator).
- [Firebase](https://rnfirebase.io/) backend integration including [Authentication](https://rnfirebase.io/auth/usage), [Cloud Firestore](https://rnfirebase.io/firestore/usage), [Cloud Functions](https://rnfirebase.io/functions/usage), [Cloud Messaging](https://rnfirebase.io/messaging/usage), [Cloud Storage](https://rnfirebase.io/storage/usage), [Crashlytics](https://rnfirebase.io/crashlytics/usage), [Remote Config](https://rnfirebase.io/remote-config/usage), and [Emulator](https://firebase.google.com/docs/emulator-suite).
- [Firebase Authentication](https://rnfirebase.io/auth/usage) and Account Linking using Email/Password, Google, Apple, Facebook, and Anonymous providers with user profile editing and app settings customization support.
- [Key-Value Local Storage](https://www.npmjs.com/package/react-native-mmkv) hooks and utilities.
- [BLE](https://dotintent.github.io/react-native-ble-plx/) device communication.
- [Camera](https://docs.expo.dev/versions/latest/sdk/imagepicker/) and media library utility support.
- [Push Notification](https://firebase.google.com/docs/cloud-messaging) support.
- [Animation](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) hooks and utilities.
- [React Hook Form](https://react-hook-form.com/) integration with added components, hooks, and utilities.
- Various utility components, functions, classes, hooks, and constants.
- Typings definition support for easily referencing types in JSDoc comments.
- ESLint support and adherence.

## Getting Started

You will also need to setup Apps and associated resources on both [Google Play Console](https://play.google.com/console) and [Apple Developer](https://developer.apple.com/account). You may need to reference some of the app resources when configuring your Firebase project in the next step.

You will need to setup a [Firebase](https://console.firebase.google.com/) project with Android and iOS apps. Initialize the **Authentication**, **Firestore Database**, and **Storage** products within the Firebase project. It is recommended that you at least enable and configure the *Email/Password*, *Google*, and *Apple* Sign-in methods in the Authentication module.

**IMPORTANT**: Make sure that **Authentication**, **Firestore Database**, and **Storage** products have all been properly initialized on Firebase before proceeding.

Download the Firebase Android app's [google-services.json](google-services.json) file and the iOS app's [GoogleService-Info.plist](GoogleService-Info.plist) file. Place both files in the root directory of this project.

## Dependency Management

Make sure to perform an `npm install` before doing any development work.

To add additional dependencies, prefer the use of `npx expo install <dependency>` over *`npm install <dependency>`* to ensure versions of dependencies that are compatible with the current **Expo** version are installed. Installed dependencies will be added to the **dependencies** list in [package.json](package.json) like normal.

After adding any dependency that requires the addition of an **Expo Plugin** in [app.json](app.json), run `npm run prebuild` to clean and rebuild the native project directories.

**NEVER** manually modify the generated native project directories.

## Development

First, ensure all dependencies are installed via:

```
npm install
```

Use any of the **scripts** found in [package.json](package.json) to facilitate the development process.

Typically, you will want to start by running the local development [Firebase Emulator](https://firebase.google.com/docs/emulator-suite) via:

```
npm run firebase:emulators
```

This will emulate Firebase's backend services on your local machine. The app should detect that it is being run in `__DEV__` mode and use the `EXPO_PUBLIC_FIREBASE_EMU_*` environmental variables defined in the project [.env](.env) file to reference your local emulator instead of Firebase's production cloud products.

You can override any variables by creating your own [.env.local](.env.local) file, which is excluded from version control. If testing on a separate physical device, add `EXPO_PUBLIC_FIREBASE_EMU_HOST=<LOCAL_IP_ADDRESS>` to it.

Next, it is recommended that your run the following command to run the app.

### Android physical device or emulator:

```
npm run android:local -- --device <OPTIONAL_DEVICE_ID>
```

### iOS physical device or simulator:

```
npm run ios:local -- --device <OPTIONAL_DEVICE_ID>
```

This will perform the following steps:

- Prebuild the [./android](./android) or [./ios](./ios) native app directory if it has not already been generated.
- Load your environment variables in [.env.local](.env.local) as well as the base settings in [.env](.env).
- Launch the app with **Expo Plugins** enabled. *Note* that this is not the **Expo Go** version of the app, and includes additional configuration and native code through **Expo Plugins** listed in [app.json](app.json).

You will be able to choose the device / emulator / simulator to run your app on with the `--device` flag. If you provide the **DEVICE_ID** argument to the flag, then **Expo** will run the app on the specified device. If the `--device` flag is omitted, then the last used emulator or simulator is chosen.
