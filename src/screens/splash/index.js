import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import LoadingDots from '../../components/ui/loadingDots';
import {defaultStyles} from '../../styles/defaultStyle';
import {Colors} from '../../theme/colors';

export const Splash = () => {
  return (
    <SafeAreaView style={[styles.container, defaultStyles.loadingDim]}>
      <LoadingDots />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SOFT_GRAY,
  },
});
