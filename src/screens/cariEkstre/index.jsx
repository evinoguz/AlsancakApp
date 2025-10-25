import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {Colors} from '../../theme/colors';
import {Search} from '../../assets/icons';
import {defaultStyles} from '../../styles/defaultStyle';
import {formatCurrency, formatDate, normalizeText} from '../../utils/functions';
import {useGetAllCariKartQuery} from '../../store/slices/cariListSlice';
import {CustomDropDown} from '../../components/ui/customDropDown';
import {useGetAllCariEkstreQuery} from '../../store/slices/cariEkstreSlice';
import {height, width} from '../../utils/constants';
import {ScrollableDataTable} from '../../components/table/scrollableDataTable';
import CustomInput from '../../components/ui/customInput';
import SumCountArea from '../../components/ui/sumCountArea';
import ListEmptyArea from '../../components/ui/listEmptyArea';

export const CariEkstre = () => {
  const [searchCariId, setSearchCariId] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCariID, setSelectedCariID] = useState(null);
  const [modalCariList, setModalCariList] = useState(false);

  // Cari listesi çek
  const {
    data: cariList = [],
    isLoading: isCariListLoading,
    isFetching: isCariListFetching,
    error: cariListError,
  } = useGetAllCariKartQuery();

  // Ekstre çek
  const {
    data: cariEkstreAll = [],
    isLoading,
    isFetching,
    error,
  } = useGetAllCariEkstreQuery(
    {id: selectedCariID},
    {skip: !selectedCariID, refetchOnMountOrArgChange: true},
  );

  // Cari listesi hazırla
  const cariListItems = useMemo(() => {
    if (isCariListLoading || isCariListFetching || cariListError) return [];
    return cariList.map(c => ({
      label: `${c.un} - ${c.CRsube ?? ''}`,
      value: c.id,
    }));
  }, [isCariListLoading, isCariListFetching, cariListError, cariList]);

  // Cari arama filtre
  const filteredCariItems = useMemo(() => {
    const q = normalizeText(searchCariId);
    return cariListItems.filter(item =>
      normalizeText(item.label).includes(q),
    );
  }, [searchCariId, cariListItems]);

  // Ekstre listesi hazırla
  const cariEkstreItems = useMemo(() => {
    if (isLoading || isFetching || error) return [];
    return cariEkstreAll;
  }, [isLoading, isFetching, error, cariEkstreAll]);

  // Ekstre arama filtre
  const filteredItems = useMemo(() => {
    const q = normalizeText(search);
    return cariEkstreItems.filter(item =>
      normalizeText(item.aciknot).includes(q),
    );
  }, [search, cariEkstreItems]);

  // Toplam hesap
  const totals = useMemo(() => {
    const sum = filteredItems.reduce(
      (acc, item) => {
        acc.gtut += item.gtut || 0;
        acc.ctut += item.ctut || 0;
        return acc;
      },
      {gtut: 0, ctut: 0},
    );
    return {
      ...sum,
      diff: sum.ctut - sum.gtut,
    };
  }, [filteredItems]);

  // Tablo kolonları
  const COLUMN_WIDTHS = {
    TARIH_CELL: width * 0.3,
    BILGI_CELL: width * 0.4,
    GTUTAR_CELL: width * 0.3,
    CTUTAR_CELL: width * 0.3,
    HARTIP_CELL: width * 0.3,
    FORMTUR_CELL: width * 0.3,
    ACIKLAMA_CELL: width * 0.4,
  };

  const columns = [
    {label: 'TARİH', width: COLUMN_WIDTHS.TARIH_CELL},
    {label: 'BİLGİ', width: COLUMN_WIDTHS.BILGI_CELL},
    {label: 'GİREN TUTAR', width: COLUMN_WIDTHS.GTUTAR_CELL},
    {label: 'ÇIKAN TUTAR', width: COLUMN_WIDTHS.CTUTAR_CELL},
    {label: 'HAR.TIP', width: COLUMN_WIDTHS.HARTIP_CELL},
    {label: 'FORM TÜR', width: COLUMN_WIDTHS.FORMTUR_CELL},
    {label: 'AÇIKLAMA', width: COLUMN_WIDTHS.ACIKLAMA_CELL},
  ];

  const labels = [
    {label: 'GIREN TIP TUTAR', key: 'first'},
    {label: 'ÇIKAN TIP TUTAR', key: 'second'},
    {label: 'BORÇLU', key: 'diff'},
  ];

  const renderRowCells = item => [
    {
      text: formatDate(item.tar) || '',
      width: COLUMN_WIDTHS.TARIH_CELL,
      extraDetail: item,
    },
    {text: item.aciknot || '', width: COLUMN_WIDTHS.BILGI_CELL},
    {text: formatCurrency(item.gtut) || '0', width: COLUMN_WIDTHS.GTUTAR_CELL, isCentered: true},
    {text: formatCurrency(item.ctut) || '0', width: COLUMN_WIDTHS.CTUTAR_CELL, isCentered: true},
    {text: item.hartipi || '', width: COLUMN_WIDTHS.HARTIP_CELL, isCentered: true},
    {text: item.formtur || '', width: COLUMN_WIDTHS.FORMTUR_CELL},
    {text: item.acik || '', width: COLUMN_WIDTHS.ACIKLAMA_CELL},
  ];

  return (
    <View style={defaultStyles.mainContainer}>
      {/* Cari DropDown */}
      <View style={defaultStyles.searchContainer}>
        <CustomDropDown
          label="Cari Kayıt Adı"
          items={filteredCariItems}
          selectedValue={selectedCariID}
          onSelect={val => setSelectedCariID(val)}
          modalVisible={modalCariList}
          setModalVisible={setModalCariList}
          searchable
          searchPlaceholder="Cari ara..."
          searchQuery={searchCariId}
          setSearchQuery={setSearchCariId}
          loading={isCariListLoading}
          error={cariListError}
          placeholder="Cari seçin"
        />
      </View>

      {/* Ekstre Tablosu */}
      {selectedCariID && (
        <View style={[defaultStyles.mainContainer]}>
          <View style={defaultStyles.searchContainer}>
            <CustomInput
              onChangeText={setSearch}
              value={search}
              label=""
              placeholder="Ara"
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
              first: totals.gtut,
              second: totals.ctut,
              diff: totals.diff,
            }}
            labels={labels}
            isLoading={isLoading || isFetching}
            isCentered={true}
            ListEmptyComponent={<ListEmptyArea error={error} />}
            style={{minHeight: height * 0.4}}
            showExpandButton={true}
          />
        </View>
      )}
    </View>
  );
};
