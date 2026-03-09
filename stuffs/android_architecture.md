# How the Android App Runs React Native Code

It can be confusing that all your business logic is inside the `src/` folder (written in JavaScript/React), yet the result is a native Android `.apk` app. Here is a breakdown of how the architecture works and how the Android code "finds" your JavaScript code.

## 1. The Entry Point: [index.js](file:///d:/projects/demo/AI/BuilderApp/index.js)

If you look at the root of your `BuilderApp` directory, you will see a file called [index.js](file:///d:/projects/demo/AI/BuilderApp/index.js) (or sometimes `.expo/index.js` if managed directly by Expo). This file contains a single very important line:

```javascript
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App); 
```
Alternatively, in a bare React Native app, it looks like:
```javascript
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('BuilderApp', () => App);
```

This is the bridge! This tells the native application: *"When you boot up, look for the JavaScript component named [App](file:///d:/projects/demo/AI/BuilderApp/App.js#13-28) and render it."* The [App.js](file:///d:/projects/demo/AI/BuilderApp/App.js) file then imports everything from your `src/` folder (screens, navigation, etc).

## 2. The Native Android Folder (`android/`)

When you ran `npx expo prebuild`, Expo generated the `android/` folder. This folder is a complete, standard Android Studio (Java/Kotlin) project. 

Inside `android/app/src/main/java/com/anonymous/BuilderApp/MainApplication.kt` (or `.java`), there is actual Android code that initializes the React Native framework.

### How Java loads your JavaScript:
1. The user taps the app icon on their phone.
2. Android OS launches `MainActivity.kt`.
3. `MainActivity` tells the `ReactActivityDelegate` to start.
4. The React Native framework (written in C++ and Java) spins up a background JavaScript engine (like Hermes or JSC).
5. The engine loads a massive file called the **"JS Bundle"**.
6. The engine executes the [index.js](file:///d:/projects/demo/AI/BuilderApp/index.js) file mentioned above, which kicks off your [App.js](file:///d:/projects/demo/AI/BuilderApp/App.js) and all the screens in the `src/` folder.

## 3. What is the JS Bundle?

When you run `npx expo run:android` or `npm start`:
- A tool called **Metro Bundler** starts running (this is the local server you see running in your terminal).
- Metro looks at [index.js](file:///d:/projects/demo/AI/BuilderApp/index.js), sees it imports [App.js](file:///d:/projects/demo/AI/BuilderApp/App.js), and sees [App.js](file:///d:/projects/demo/AI/BuilderApp/App.js) imports files from `src/screens` and `src/components`.
- It takes **all** of these JavaScript files, compiles them, and combines them into one single massive file (the bundle).
- It opens a websocket connection to the running Android app and streams this bundle to the device.

When you build a production `.apk` using EAS (`eas build -p android`), Metro runs once, creates the bundle, and literally embeds that giant text file directly into the `.apk` assets folder so it works offline.

## Summary Flow
**Android OS** -> **MainActivity (Java)** -> **React Native Engine (C++)** -> **JS Engine (Hermes)** -> **[index.js](file:///d:/projects/demo/AI/BuilderApp/index.js)** -> **[App.js](file:///d:/projects/demo/AI/BuilderApp/App.js)** -> **`src/` folder (Your Code)**
