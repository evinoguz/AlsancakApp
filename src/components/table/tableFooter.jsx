import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formatCurrency} from '../../utils/functions';
import {Colors} from '../../theme/colors';

export const TableFooter = ({totals = {}, labels = []}) => {
  return (
    <View style={styles.footerContainer}>
      {labels.map((item, idx) => (
        <View key={idx} style={[styles.row, styles.diffRow, labels.length === 1 && {paddingVertical: 15}]}>
          <Text selectable style={[styles.cell, styles.leftCell, styles.bold, {flex: 2}]}>
            {item.label}
          </Text>
          <Text selectable style={[styles.cell, styles.bold, styles.numberCell]}>
            {formatCurrency(totals[item.key] ?? 0)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_PRIMARY,
    marginBottom: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingRight: 15,
  },
  cell: {
    flex: 1,
    fontSize: 13,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  leftCell: {
    textAlign: 'left',
  },
  numberCell: {
    fontSize: 12,
    textAlign: 'right',
  },
  bold: {
    fontWeight: '700',
  },
  diffRow: {
    backgroundColor: Colors.LIGHT_PRIMARY,
  },
});
