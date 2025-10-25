import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../theme/colors';
import {AlertCircle, AlertTriangle} from '../../assets/icons';

const ListEmptyArea = ({error, isColor=null}) => {
  return (
    <View style={[styles.emptyContainer, isColor && {backgroundColor: isColor}]}>
      {error ? (
        <AlertCircle stroke={Colors.RED} width={16} height={16} />
      ) : (
        <AlertTriangle stroke={Colors.GRAY} width={16} height={16} />
      )}
      <Text selectable
        style={[
          styles.emptyText,
          error ? {color: Colors.RED} : {color: Colors.GRAY},
        ]}>
        {error ? 'Veriler alınırken hata oluştu.' : 'Sonuç bulunamadı.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyText: {
    paddingLeft: 5,
    color: Colors.RED,
    fontSize: 12,
  },
});

export default ListEmptyArea;
