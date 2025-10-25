import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {useGetAllCheckBookTakastakiQuery} from '../../store/slices/checkBookSlice';
import {Colors} from '../../theme/colors';
import {width} from '../../utils/constants';
import {defaultStyles} from '../../styles/defaultStyle';
import CustomInput from '../ui/customInput';
import {Search} from '../../assets/icons';
import {ScrollableDataTable} from '../table/scrollableDataTable';
import {formatCurrency, formatDate, normalizeText} from '../../utils/functions';
import SumCountArea from '../ui/sumCountArea';
import ListEmptyArea from '../ui/listEmptyArea';

const CheckBookTakastaki = () => {
  const [search, setSearch] = useState('');

  const {
    data: checkBookTakastakiAll,
    isLoading,
    isFetching,
    error,
  } = useGetAllCheckBookTakastakiQuery();

  const checkBookTakastakiItems = useMemo(() => {
    if (isLoading || isFetching || error) return [];
    return checkBookTakastakiAll || [];
  }, [isLoading, isFetching, error, checkBookTakastakiAll]);

  const filteredItems = useMemo(() => {
    const q = normalizeText(search);
    return checkBookTakastakiItems.filter(item =>
      normalizeText(item.avkayit).includes(q),
    );
  }, [search, checkBookTakastakiItems]);

  const totals = useMemo(() => {
    return filteredItems.reduce(
      (acc, item) => {
        acc.cgtut += item.cgtut || 0;
        return acc;
      },
      {cgtut: 0},
    );
  }, [filteredItems]);

  const COLUMN_WIDTHS = {
    TARIH_CELL: width * 0.3,
    AVKAYIT_CELL: width * 0.4,
    CGTUT_CELL: width * 0.3,
    CNOSU_CELL: width * 0.3,
    CVADETAR_CELL: width * 0.3,
    CBANKA_CELL: width * 0.4,
    CVERTAR_CELL: width * 0.3,
    VKAYIT_CELL: width * 0.3,
  };
  const columns = [
    {
      label: 'TARİH',
      width: COLUMN_WIDTHS.TARIH_CELL,
    },
    {
      label: 'ÜNVAN',
      width: COLUMN_WIDTHS.AVKAYIT_CELL,
    },
    {
      label: 'CG.TUTARI',
      width: COLUMN_WIDTHS.CGTUT_CELL,
    },
    {
      label: 'C.NOSU',
      width: COLUMN_WIDTHS.CNOSU_CELL,
    },
    {
      label: 'C.VADE TARİHİ',
      width: COLUMN_WIDTHS.CVADETAR_CELL,
    },
    {
      label: 'C.BANKA',
      width: COLUMN_WIDTHS.CBANKA_CELL,
    },
    {
      label: 'C.VER TARIHI',
      width: COLUMN_WIDTHS.CVERTAR_CELL,
    },
    {
      label: 'V.KAYIT TARİHİ',
      width: COLUMN_WIDTHS.VKAYIT_CELL,
    },
  ];

  const labels = [{label: 'CG.TUTAR', key: 'first'}];

  const renderRowCells = item => [
    {
      text: formatDate(item.tar) || '',
      width: COLUMN_WIDTHS.TARIH_CELL,
    },
    {
      text: item.avkayit || '',
      width: COLUMN_WIDTHS.AVKAYIT_CELL,
    },
    {
      text: formatCurrency(item.cgtut) || '0',
      width: COLUMN_WIDTHS.CGTUT_CELL,
      isCentered: true,
    },
    {
      text: item.cnosu || '',
      width: COLUMN_WIDTHS.CNOSU_CELL,
      isCentered: true,
    },
    {
      text: formatDate(item.cvadetar) || '',
      width: COLUMN_WIDTHS.CVADETAR_CELL,
      isCentered: true,
    },
    {
      text: item.cbanka || '',
      width: COLUMN_WIDTHS.CBANKA_CELL,
    },
    {
      text: formatDate(item.cvertar) || '',
      width: COLUMN_WIDTHS.CVERTAR_CELL,
      isCentered: true,
    },
    {
      text: item.vkayit || '',
      width: COLUMN_WIDTHS.VKAYIT_CELL,
    },
  ];

  return (
    <>
      <View style={defaultStyles.searchContainer}>
        <CustomInput
          onChangeText={setSearch}
          value={search}
          label=""
          placeholder="Ünvan ara"
          icon={<Search stroke={Colors.GRAY} width={15} height={15} />}
          clearButton={true}
        />
      </View>
      {/* Kayıt sayısı */}
      <SumCountArea items={filteredItems.length} />

      <ScrollableDataTable
        columns={columns}
        data={filteredItems}
        renderRowCells={renderRowCells}
        totals={{first: totals.cgtut}}
        labels={labels}
        isLoading={isLoading || isFetching}
        ListEmptyComponent={<ListEmptyArea error={error} />}
        style={{minHeight: 300}}
      />
    </>
  );
};
export default CheckBookTakastaki;
