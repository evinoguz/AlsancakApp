import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Platform, UIManager} from 'react-native';
import {Colors} from '../../theme/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ShimmerPlaceholder = ({style}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={[style, styles.skeletonBase]}>
      <Animated.View
        style={[styles.shimmerOverlay, {transform: [{translateX}]}]}
      />
    </View>
  );
};

export const SkeletonRow = ({columns}) => (
  <View style={styles.row}>
    {columns.map((col, idx) => (
      <ShimmerPlaceholder
        key={idx}
        style={[styles.cell, {flex: col.flex || 1, height: 14}]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  cell: {
    marginHorizontal: 4,
    borderRadius: 4,
  },
  skeletonBase: {
    backgroundColor: Colors.SOFT_GRAY,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 6,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '60%',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
