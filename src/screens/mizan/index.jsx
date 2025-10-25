import React, {useMemo, useState} from 'react';
import {Text, View, Linking, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme/colors';
import CustomInput from '../../components/ui/customInput';
import {Search} from '../../assets/icons';
import {formatCurrency, normalizeText} from '../../utils/functions';
import {useGetAllMizanQuery} from '../../store/slices/mizanSlice';
import {defaultStyles} from '../../styles/defaultStyle';
import {width} from '../../utils/constants';
import {ScrollableDataTable} from '../../components/table/scrollableDataTable';
import SumCountArea from '../../components/ui/sumCountArea';
import ListEmptyArea from '../../components/ui/listEmptyArea';

export const Mizan = () => {
  const [search, setSearch] = useState('');
  const {data: mizanAll, isLoading, isFetching, error} = useGetAllMizanQuery();
  const mizanItems = useMemo(() => {
    if (isLoading || isFetching || error) return [];
    return mizanAll || [];
  }, [isLoading, isFetching, error, mizanAll]);

  const filteredItems = useMemo(() => {
    const q = normalizeText(search);
    return mizanItems.filter(item => normalizeText(item.un).includes(q));
  }, [search, mizanItems]);

  const totals = useMemo(() => {
    const sum = filteredItems.reduce(
      (acc, item) => {
        acc.borc += item.borc || 0;
        acc.alacak += item.alacak || 0;
        return acc;
      },
      {borc: 0, alacak: 0},
    );

    return {
      ...sum,
      diff: sum.alacak - sum.borc,
    };
  }, [filteredItems]);

  const COLUMN_WIDTHS = {
    UNVAN_CELL: width * 0.4,
    ALACAK_CELL: width * 0.3,
    BORC_CELL: width * 0.3,
  };
  const columns = [
    {
      label: 'ÜNVAN',
      width: COLUMN_WIDTHS.UNVAN_CELL,
    },
    {
      label: 'ALACAK TUTARI',
      width: COLUMN_WIDTHS.ALACAK_CELL,
    },
    {
      label: 'BORÇ TUTARI',
      width: COLUMN_WIDTHS.BORC_CELL,
    },
  ];
  const labels = [
    {label: 'TP.ALACAK', key: 'first'},
    {label: 'TP.BORC', key: 'second'},
    {label: 'TP.FARK', key: 'diff'},
  ];
  const renderRowCells = item => [
    {
      text: (
        <View style={{width: COLUMN_WIDTHS.UNVAN_CELL}}>
          {/* ÜNVAN */}
          <Text style={{fontSize: 11, color: Colors.BLACK}} numberOfLines={10}>
            {item.un}
          </Text>
          {/* ctel */}
          {item.ctel ? (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item.ctel}`)}>
              <Text style={{fontSize: 12, marginTop: 2, color: Colors.GREEN}}>
                {item.ctel}
              </Text>
            </TouchableOpacity>
          ) : null}
          {/* tel1 */}
          {item.tel1 ? (
            <TouchableOpacity pointerEvents="box-none"
              onPress={() => Linking.openURL(`tel:${item.tel1}`)}>
              <Text style={{fontSize: 12, marginTop: 2, color: Colors.GREEN}}>
                {item.tel1}
              </Text>
            </TouchableOpacity>
          ) : null}
          {/* HNO */}
          <Text style={{fontSize: 11, color: Colors.BLACK}} numberOfLines={10}>
            HNO: {item.hno}
          </Text>
        </View>
      ),
      copyText: item.un,
      width: COLUMN_WIDTHS.UNVAN_CELL,
    },
    {
      text: formatCurrency(item.alacak) || '0',
      width: COLUMN_WIDTHS.ALACAK_CELL,
      isCentered: true,
    },
    {
      text: formatCurrency(item.borc) || '0',
      width: COLUMN_WIDTHS.BORC_CELL,
      isCentered: true,
    },
  ];

  return (
    <View style={defaultStyles.mainContainer}>
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
        totals={{
          first: totals.alacak,
          second: totals.borc,
          diff: totals.diff,
        }}
        labels={labels}
        isLoading={isLoading || isFetching}
        ListEmptyComponent={<ListEmptyArea error={error} />}
        style={{minHeight: 300}}
      />
    </View>
  );
};
