import React from 'react';
import {View, FlatList, ScrollView, StyleSheet} from 'react-native';
import {Colors} from '../../theme/colors';
import { TableHeader } from './tableHeader';
import { SkeletonRow } from './skeletonRow';
import { TableRow } from './tableRow';

export const DetailDataTable = ({
  columns,
  data,
  renderRowCells,
  isLoading,
  ListEmptyComponent,
  showExpandButton
}) => {
  const calculatedTableWidth = columns.reduce((sum, col) => sum + col.width, 0);

  const skeletonColumns = columns.map(c => ({width: c.width}));

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={[styles.tableContainer, {width: calculatedTableWidth}]}>
          <TableHeader columns={columns} isColor={false}/>
          {/* Gövde */}
          {isLoading ? (
            <View style={{backgroundColor: Colors.YELLOW}}>
              {[...Array(1)].map((_, i) => (
                <SkeletonRow key={i} columns={skeletonColumns} />
              ))}
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({item, index}) => (
                <TableRow
                  index={index}
                  cells={renderRowCells(item, index)}
                  showExpandButton={showExpandButton} 
                  isColor={false}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={ListEmptyComponent}
              windowSize={20}
              maxToRenderPerBatch={20}
              removeClippedSubviews={true}
            />
          )}
        </View>
      </ScrollView>
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
