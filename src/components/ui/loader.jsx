import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Colors} from '../../theme/colors'; // kendi tema renk dosyanıza göre güncelleyin

const Loader = ({text = '', color= Colors.SOFT_GRAY}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={color} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    width: 15,
    height: 15,
    paddingLeft: 10,
  },
  text: {
    fontSize: 12,
    color: Colors.GRAY,
  },
});

export default Loader;
