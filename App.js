import {
  StackNavigator,
} from 'react-navigation';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import SearchItem from './SearchItem';
import MyWeb from './MyWeb';
import Scanner from './Scanner';
const App = StackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Property: { screen: SearchItem},
  MyWeb: { screen: MyWeb},
  Scanner: { screen: Scanner},


});
export default App;
