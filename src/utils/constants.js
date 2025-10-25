import {Alert, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const showAlert = (title, message) => {
  Alert.alert(title, message);
};

export {width, height, showAlert};
