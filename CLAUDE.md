# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Castly is a React Native 0.83 mobile app (iOS & Android) for talent/casting management. Built with TypeScript, React Navigation v7, Redux Toolkit + RTK Query, and Reanimated 4.

## Common Commands

```bash
# Development
yarn start                    # Start Metro bundler
yarn ios                      # Run on iOS simulator
yarn android                  # Run on Android emulator

# After pulling or changing native deps
cd ios && bundle exec pod install && cd ..

# Linting & Testing
yarn lint                     # ESLint
yarn test                     # Jest (minimal test suite)

# Clean builds
cd android && ./gradlew clean && cd ..
cd ios && xcodebuild clean -workspace Castly.xcworkspace -scheme Castly && cd ..
```

Requires Node >= 20.

## Architecture

### Source Layout (`src/`)

- **screens/** — Screen components organized by feature (e.g., `home/`, `auth/`, `chat/`, `kyc/`)
- **components/** — Reusable UI components organized by feature domain
- **navigation/** — React Navigation setup: `RootNavigator` → `MainNavigator` → tab-based `AppFlow` with custom animated bottom tabs
- **redux/** — Redux Toolkit store with slices (`user`, `userData`, `application`, `forgotPassword`, `onboarding`) and RTK Query APIs
- **services/** — RTK Query API definitions with endpoints for auth, profile, applications, notifications
- **utils/** — Colors, responsive sizing (`correctSize`, `fontSize`), formatters, helpers
- **assets/** — Images, custom fonts, Lottie animations

### State Management

Redux Toolkit store with Redux Persist (AsyncStorage). RTK Query handles all API calls with a custom `baseQueryWithReauth` that auto-refreshes tokens on 401 responses.

Key slices: `user` (auth tokens), `userData` (profile completion), `application` (job counts).

### API Layer

- Base URL: `https://uat-api.castly.co/v1` (UAT environment)
- Auth: Bearer token with automatic refresh token rotation
- RTK Query APIs: `signupApi`, `authApi`, `profileApi`, `applicationApi`, `notificationsApi`
- Custom base query in `services/` handles reauth flow

### Navigation

React Navigation v7 with native-stack and bottom-tabs. Initial route determined by access token presence. Custom animated tab bar with Reanimated spring animations. Hardware back button handled with double-tap-to-exit on Android.

### Styling

- StyleSheet-based styling (no CSS-in-JS library)
- Color palette in `utils/colors.ts` — primary brand color is yellow (#F7FF36)
- Responsive sizing via `correctSize()` and `fontSize()` utilities with tablet detection
- Custom fonts loaded via `react-native.config.js`
- Animations: Reanimated + Moti

### Environment

- `.env` file with `react-native-dotenv` babel plugin
- Import env vars via `@env` module alias
- Google Sign-In configured via `GOOGLE_CLIENT_ID`

### Platform Config

- **iOS**: CocoaPods, Xcode workspace (`Castly.xcworkspace`)
- **Android**: Gradle/Kotlin, New Architecture enabled, Hermes engine, namespace `com.castly`
- SVG support via `react-native-svg-transformer` in Metro config

### Code Style

- Prettier: single quotes, trailing commas (`all`), no arrow parens
- ESLint: `@react-native` config
- TypeScript with `@react-native/typescript-config` base
