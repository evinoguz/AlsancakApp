import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Colors} from '../../theme/colors';
import CustomInput from '../../components/ui/customInput';
import {Search} from '../../assets/icons';
import CarikartCard from '../../components/reports/carikartCard';
import {defaultStyles} from '../../styles/defaultStyle';
import {useGetAllCariKartQuery} from '../../store/slices/cariListSlice';
import {normalizeText} from '../../utils/functions';
import SumCountArea from '../../components/ui/sumCountArea';
import ListEmptyArea from '../../components/ui/listEmptyArea';

export const CariList = () => {
  const [search, setSearch] = useState('');
  const {
    data: carikartAll,
    isLoading,
    isFetching,
    error,
  } = useGetAllCariKartQuery();

  const carikartItems = useMemo(() => {
    if (isLoading || isFetching || error) return [];
    return carikartAll || [];
  }, [isLoading, isFetching, error, carikartAll]);

  const filteredItems = useMemo(() => {
    const q = normalizeText(search);
    return carikartItems.filter(item => normalizeText(item.un).includes(q));
  }, [search, carikartItems]);

  const loadingSkeletons = Array.from({length: 5}).map((_, i) => ({
    id: `skeleton-${i}`,
  }));

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

      <View style={defaultStyles.container}>
        <FlatList
          data={isLoading ? loadingSkeletons : filteredItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CarikartCard item={item} isLoading={isLoading} />
          )}
          contentContainerStyle={{paddingBottom: 16}}
          ListEmptyComponent={<ListEmptyArea error={error} />}
          initialNumToRender={20}
          windowSize={20}
          maxToRenderPerBatch={20}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    color: Colors.DARK_GRAY,
    fontSize: 10,
  },
});
