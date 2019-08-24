# Harbour React Native Runner

Allows you to run facebook instant games api in a webview inside a
react-native application.

# Usage

Make sure to include `"react-native-webview": "^6.9.0"` in your package.json.

In your react-native project:

```js
import HarbourWebView from 'harbour-react-native-runner';

const _harbourRef = React.createRef();

const App = () => {
  return (
    <HarbourWebView
      ref={_harbourRef}
      style={StyleSheet.absoluteFill}
      onPlayer={_onPlayer}
      onLeaderboardList={_onLeaderboardList}
    />
  );
};

function _onLeaderboardList() {

}
function _onPlayer() {

}

```

In your facebook instant game:

Script include `dist/harbour-react-native-runner.min.js`.
It provides a window.FBInstant that is compliant with the facebook
instant games api.

-----
