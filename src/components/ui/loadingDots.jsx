import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Text} from 'react-native';
import {Colors} from '../../theme/colors';

const LoadingDots = () => {
  const animValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animations = animValues.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 150), // Her noktaya delay veriyoruz sırayla animasyon için
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ),
    );
    animations.forEach(anim => anim.start());

    return () => animations.forEach(anim => anim.stop());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {animValues.map((anim, i) => {
          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.6],
          });
          const opacity = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  transform: [{scale}],
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 8,
  },
});

export default LoadingDots;
