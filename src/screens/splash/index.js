import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoadingDots from '../../components/ui/loadingDots';
import { defaultStyles } from '../../styles/defaultStyle';
import { Colors } from '../../theme/colors';

export const Splash = () => {
  return (
    <View style={[styles.container, defaultStyles.loadingDim]}>
      <LoadingDots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SOFT_GRAY,
  },
});
