This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Assessment App

This project is a small React Native messaging assessment app with contacts, chat navigation, message sending, profile, settings, and block/unblock behavior.

### Tech Stack

- React Native CLI 0.87.1
- TypeScript
- React Navigation
- TanStack React Query
- Zustand
- Axios

### Architecture

Feature code lives under `src/features`, with separate API services, hooks, presentation components, and screens. React Query owns users, messages, profile data, caching, loading states, pagination metadata, and mutations. Zustand stores only the local list of blocked user IDs. The reusable design system in `src/components` provides consistent text, layout, buttons, images, safe areas, and feedback states.

### Setup

```sh
npm install
cp .env.example .env

# iOS
cd ios
pod install
cd ..
npm run ios

# Android
npm run android
```

### API

Set `API_BASE_URL` in `.env` to configure the API host. The example value is
`https://apiur.dev`:

- `GET /api/users`
- `GET /api/posts`
- `POST /api/posts`

The users and posts responses use the `{total, limit, offset, results}` envelope. The app requests the next users page using `offset` and stops when `offset + limit` reaches `total`. Posts support filtering with `userId`, and new messages are sent with the required `title`, `body`, and `userId` fields. The response normalizers also handle simple array and `data` envelopes defensively.

Because there is no authentication/current-user endpoint, profiles are opened
for the selected contact from that contact's avatar. Server posts are displayed
as incoming messages; locally optimistic messages are displayed as outgoing
until the server response is reconciled.

### AI-Assisted Development

AI-assisted tooling was used to support code review, architecture discussion, edge-case identification, and documentation. Core implementation decisions, integration, validation, and testing were reviewed by the developer.
