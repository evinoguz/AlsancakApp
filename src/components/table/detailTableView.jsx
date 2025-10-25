// components/mizan/DetailTableView.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../theme/colors';
import {DetailDataTable} from './detailDataTable';
import {width} from '../../utils/constants';
import {formatCurrency} from '../../utils/functions';

export const DetailTableView = ({
  cariEkstreDetail,
  isLoading,
  ListEmptyComponent,
}) => {
  const COLUMN_WIDTHS = {
    STOKID_CELL: width * 0.2,
    MIKTAR_CELL: width * 0.2,
    NETFIYAT_CELL: width * 0.2,
    NETTUTAR_CELL: width * 0.2,
    TUR_CELL: width * 0.2,
  };

  const columns = [
    {label: 'STOK ADI', width: COLUMN_WIDTHS.STOKID_CELL},
    {label: 'MIKTAR', width: COLUMN_WIDTHS.MIKTAR_CELL},
    {label: 'NET FIYAT', width: COLUMN_WIDTHS.NETFIYAT_CELL},
    {label: 'NET TUTAR', width: COLUMN_WIDTHS.NETTUTAR_CELL},
    {label: 'TUR', width: COLUMN_WIDTHS.TUR_CELL},
  ];

  const renderRowCells = item => [
    {
      text: item.stokid || '',
      width: COLUMN_WIDTHS.STOKID_CELL,
      isCentered: true,
    },
    {
      text: item.miktar || '0',
      width: COLUMN_WIDTHS.MIKTAR_CELL,
      isCentered: true,
    },
    {
      text: formatCurrency(item.netfiyat) || '0',
      width: COLUMN_WIDTHS.NETFIYAT_CELL,
      isCentered: true,
    },
    {
      text: formatCurrency(item.nettutar) || '0',
      width: COLUMN_WIDTHS.NETTUTAR_CELL,
      isCentered: true,
    },
    {text: item.tur || '', width: COLUMN_WIDTHS.TUR_CELL, isCentered: true},
  ];

  return (
    <View style={styles.detailContainer}>
      <DetailDataTable
        columns={columns}
        data={cariEkstreDetail}
        renderRowCells={renderRowCells}
        isLoading={isLoading}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: Colors.YELLOW,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.SOFT_GRAY,
  },
});
