import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../theme/colors';
import {Minus, Plus} from '../../assets/icons';
import {useGetCariDetailByIdQuery} from '../../store/slices/cariEkstreSlice';
import {DetailTableView} from './detailTableView';
import ListEmptyArea from '../ui/listEmptyArea';

export const TableRow = ({
  cells,
  index,
  showExpandButton = false,
  isColor = true,
}) => {
  const [selectedFisID, setSelectedFisID] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const rowBackground = index % 2 === 0 ? Colors.WHITE : Colors.LIGHT_WHITE;
  const hartipi = cells[0]?.extraDetail?.hartipi;
  const fisid = cells[0]?.extraDetail?.fisid;

  const {
    data: cariEkstreDetail = [],
    isLoading,
    isFetching,
    error,
  } = useGetCariDetailByIdQuery(
    {id: selectedFisID},
    {skip: !selectedFisID, refetchOnMountOrArgChange: true},
  );

  const handleToggleExpand = () => {
    if (hartipi !== 'fisfatura') return;
    if (!isExpanded) setSelectedFisID(fisid);
    setIsExpanded(prev => !prev);
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          isColor
            ? {backgroundColor: rowBackground}
            : {backgroundColor: Colors.YELLOW},
        ]}>
        {cells.map((cell, idx) => (
          <View
            key={idx}
            style={[
              showExpandButton ? styles.btncell : styles.cell,
              {width: cell.width},
              cell.isCentered && styles.centeredCell,
            ]}>
            {idx === 0 && showExpandButton ? (
              <View style={styles.dateWithButton}>
                <Pressable
                  onPress={handleToggleExpand}
                  disabled={hartipi !== 'fisfatura'}
                  hitSlop={10} // 👈 tıklanabilir alanı her yönden 10px genişletir
                  style={({pressed}) => [
                    styles.plusButtonWrapper, // 👈 daha geniş alan
                    pressed && {opacity: 0.8}, // 👌 basılı efekti
                  ]}>
                  <View
                    style={[
                      styles.plusButton,
                      hartipi !== 'fisfatura' && styles.plusButtonDisabled,
                    ]}>
                    {isExpanded ? (
                      <Minus stroke={Colors.WHITE} width={12} height={12} />
                    ) : (
                      <Plus stroke={Colors.WHITE} width={12} height={12} />
                    )}
                  </View>
                </Pressable>
                <Text
                  style={[styles.text, {color: cell.color || Colors.BLACK}]}>
                  {cell.text}
                </Text>
              </View>
            ) : (
              <Text style={[styles.text, {color: cell.color || Colors.BLACK}]}>
                {cell.text}
              </Text>
            )}
          </View>
        ))}
      </View>

      {/* Detay Tablosu */}
      {showExpandButton && isExpanded && hartipi === 'fisfatura' && (
        <DetailTableView
          cariEkstreDetail={cariEkstreDetail}
          isLoading={isLoading || isFetching}
          ListEmptyComponent={
            <ListEmptyArea error={error} isColor={Colors.YELLOW} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  btncell: {
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  centeredCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 13,
  },
  centerText: {
    textAlign: 'center',
  },
  dateWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  plusButtonWrapper: {
    paddingVertical: 10,
    borderRadius: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonDisabled: {
    backgroundColor: Colors.PRIMARY_DISABLED,
  },
});
