import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../theme/colors';

export const TableHeader = ({columns, isColor = true}) => {
  return (
    <View
      style={[
        styles.container,
        isColor
          ? {backgroundColor: Colors.PRIMARY}
          : {backgroundColor: Colors.YELLOW},
      ]}>
      {columns.map((col, idx) => (
        <View key={idx} style={[styles.cell, {width: col.width}]}>
          <Text selectable
            style={[styles.label, isColor && {color: Colors.WHITE}]}
            numberOfLines={1}>
            {col.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.SOFT_GRAY,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
  leftText: {
    textAlign: 'center',
  },
});
