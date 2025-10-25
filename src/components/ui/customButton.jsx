import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {Colors} from '../../theme/colors';
import {adjustColorOpacity} from '../../utils/functions';
import Loader from './loader';

const CustomButton = props => {
  const {
    title,
    color = Colors.GREEN,
    icon,
    style,
    textStyle,
    disabled = false,
    isWidth = true,
    selected = true,
    loading=false
  } = props;

  const backgroundColorOpacity = disabled
    ? adjustColorOpacity(color, 0.5)
    : color;
  const backgroundColor = selected ? backgroundColorOpacity : Colors.WHITE;
  const textColor = selected ? Colors.WHITE : color;
  return (
    <Pressable
      {...props}
      style={[
        styles.container,
        {
          backgroundColor,
          width: isWidth ? '100%' : undefined,
          alignSelf: isWidth ? 'stretch' : 'flex-start',
          paddingHorizontal: isWidth ? 0 : 10,
          borderWidth: 1,
          borderColor: color,
        },
        style,
      ]}>
      <View style={styles.row}>
        {loading ? (
          <Loader color={Colors.WHITE} size="small" />
        ) : (
          <>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={[styles.title, {color: textColor}, textStyle]}>
              {title}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.WHITE,
  },
});

export default CustomButton;
