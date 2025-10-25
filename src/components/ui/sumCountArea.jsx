import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {formatNumber} from '../../utils/functions';
import {Colors} from '../../theme/colors';

const SumCountArea = ({items = 0}) => {
  // items <= 0 ise bileşen null döner, hiçbir şey render edilmez.
  if (items <= 0) {
    return null;
  }

  return (
    <Text style={styles.lengthText} selectable>
      {/* Formatlanmış adet sayısını kalın stil ile göster */}
      <Text style={styles.lengthTextBold}>{formatNumber(items)}</Text>
      
      {/* Devamı normal stilde */}
      <Text> adet kayıt bulundu.</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  lengthText: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: Colors.DARK_GRAY,
    fontSize: 10,
  },
  lengthTextBold: {
    fontSize: 11, 
    fontWeight: '700',
  },
});

export default SumCountArea;