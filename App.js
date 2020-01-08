import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import IndexScreen from './src/screens/IndexScreen';
import CreateScreen from './src/screens/CreateScreen';
import HostScreen from './src/screens/HostScreen';
import JoinScreen from './src/screens/JoinScreen';
import GameScreen from './src/screens/GameScreen';
import NameScreen from './src/screens/NameScreen';


const navigator = createStackNavigator({
  Index: IndexScreen,
  Create: CreateScreen,
  Host: HostScreen,
  Join: JoinScreen,
  Game: GameScreen,
  Name: NameScreen
}, {
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    title: "Mini Secret Agent"
  }
})

export default createAppContainer(navigator)