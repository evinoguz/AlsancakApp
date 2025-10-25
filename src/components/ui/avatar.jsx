import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { getInitialNameSurname } from '../../utils/functions';
import { Colors } from '../../theme/colors';

const Avatar = ({name,surname, bgColor= Colors.PRIMARY}) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text style={styles.text}>{getInitialNameSurname(name, surname)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: Colors.WHITE,
  },
});

export default Avatar;
