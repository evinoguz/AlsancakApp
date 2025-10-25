import {StyleSheet} from 'react-native';
import {Colors} from '../theme/colors';

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_WHITE,
    paddingHorizontal: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.LIGHT_WHITE,
  },
  searchContainer: {
    backgroundColor: Colors.LIGHT_WHITE,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  loadingDim: {
    opacity: 0.8,
  },
});
export {defaultStyles};
