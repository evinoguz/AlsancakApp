import React from 'react';
import {View, FlatList, ScrollView, StyleSheet, Text} from 'react-native';
import {Colors} from '../../theme/colors';
import { TableHeader } from './tableHeader';
import { TableRow } from './tableRow';
import { TableFooter } from './tableFooter';
import { SkeletonRow } from './skeletonRow';

export const ScrollableDataTable = ({
  columns,
  data,
  renderRowCells,
  totals,
  labels,
  isLoading,
  ListEmptyComponent,
  showExpandButton,
}) => {
  const calculatedTableWidth = columns.reduce((sum, col) => sum + col.width, 0);

  const skeletonColumns = columns.map(c => ({width: c.width}));

  const footerWidths = {
    alacakWidth: columns[columns.length - 2]?.width || 0,
    borcWidth: columns[columns.length - 1]?.width || 0,
    emptyWidth:
      calculatedTableWidth -
      (columns[columns.length - 2]?.width || 0) -
      (columns[columns.length - 1]?.width || 0),
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={[styles.tableContainer, {width: calculatedTableWidth}]}>
          <TableHeader columns={columns} />
          {/* Gövde */}
          {isLoading ? (
            <View>
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} columns={skeletonColumns} />
              ))}
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{paddingBottom: 1}}
              data={data}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({item, index}) => (
                <TableRow
                  index={index}
                  cells={renderRowCells(item, index)}
                  showExpandButton={showExpandButton}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={ListEmptyComponent}
              initialNumToRender={20} 
              windowSize={20}
              maxToRenderPerBatch={20}
              removeClippedSubviews={true}
            />
          )}
        </View>
      </ScrollView>

      {/* Alt Toplamlar alanı */}
      {totals && !isLoading && (
        <TableFooter
          totals={totals}
          labels={labels}
          widths={footerWidths}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    backgroundColor: Colors.WHITE,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.SOFT_GRAY,
  },
});
