## Add custom font
Put your fonts under assets\fonts
create `react-native.config.js` file and write code below into it
```
npx react-native link
npx react-native run-android
```

## Add Ionicons icon
```
npm install --save react-native-vector-icons
react-native link react-native-ionicons
```

### Use it in your code
```
import Icon from 'react-native-ionicons'
 
const IconBar = () => (
  <View>
    <Icon name="add" />
    <!-- This is same to the following: -->
    <Icon ios="ios-add" android="md-add" />
  </View>
)
```