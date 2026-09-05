module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((@react-navigation|@react-native|react-native|react-native-screens|react-native-safe-area-context)/))',
  ],
};
