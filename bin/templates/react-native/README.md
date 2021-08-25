<p align="center">
  <a href="https://reactnative.dev/">
    <img src="https://hieubeo0.github.io/static-file/react-native-guide/react-native.png" height="128">
    <h1 align="center">React Native</h1>
  </a>
</p>

## First start

```bash
$ npm run eject

$ npm run pod-install (for ios)
```

## Environment Setup [Here](https://github.com/hieubeo0/static-file/blob/master/react-native-guide/environment-setups.md#environment-setups)

## Commands

- Run Android

```bash
# Run debug
$ npm run android:debug-develop

$ npm run android:debug-staging

$ npm run android:debug-product

# Run release
$ npm run android:release-develop

$ npm run android:release-staging

$ npm run android:release-product
```

- Build Android

```bash
$ npm run build:apk-develop

$ npm run build:apk-staging

$ npm run build:apk-product

# Build *.aab file for release
$ npm run build:aab-product
```

## Note

- For iOS I recommend that we should run application with Xcode and change Bundle Identifier match with each environment.
