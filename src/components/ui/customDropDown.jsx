import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {Check, ChevronDown, ChevronUp, Search} from '../../assets/icons';
import {Colors} from '../../theme/colors';
import Loader from '../../components/ui/loader';
import {width} from '../../utils/constants';
import CustomInput from './customInput';
import ListEmptyArea from './listEmptyArea';
import {normalizeText} from '../../utils/functions';

export const CustomDropDown = ({
  label,
  items = [],
  selectedValue,
  onSelect,
  placeholder = 'Seçim yapın',
  searchable = false,
  searchPlaceholder = 'Ara...',
  searchQuery = '',
  setSearchQuery = () => {},
  modalVisible,
  setModalVisible,
  loading = false,
  error,
  touched,
}) => {
  const showError = !!error && (touched || touched === undefined);

  const filteredData = useMemo(() => {
    if (!searchable || !searchQuery) return items;
    return items.filter(item => {
      const label =
        typeof item.label === 'string' ? normalizeText(item.label) : '';
      const subLabel =
        typeof item.subLabel === 'string' ? normalizeText(item.subLabel) : '';
      return (
        label.includes(normalizeText(searchQuery)) ||
        subLabel.includes(normalizeText(searchQuery))
      );
    });
  }, [items, searchQuery, searchable]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.title}>{label}</Text>}

      <Pressable
        style={[styles.dropdown, showError && styles.errorBorder]}
        onPress={() => !loading && setModalVisible(true)}>
        <View style={styles.dropdownInner}>
          <Text
            selectable
            style={[styles.dropdownText, loading && {paddingLeft: 10}]}>
            {loading ? (
              <Loader isCenter={true} />
            ) : selectedValue !== null && selectedValue !== undefined ? (
              items.find(i => i.value === selectedValue)?.label
            ) : (
              placeholder
            )}
          </Text>
          {!loading &&
            (modalVisible ? (
              <ChevronUp
                stroke={error ? Colors.RED : Colors.GRAY}
                width={16}
                height={16}
              />
            ) : (
              <ChevronDown
                stroke={error ? Colors.RED : Colors.GRAY}
                width={16}
                height={16}
              />
            ))}
        </View>
      </Pressable>

      {showError && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        onDismiss={() => setSearchQuery('')}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <View style={styles.modalBox}>
            {searchable && (
              <CustomInput
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                icon={<Search stroke={Colors.GRAY} width={15} height={15} />}
                clearButton={true}
              />
            )}

            {loading ? (
              <Loader />
            ) : (
              <FlatList
                data={filteredData}
                keyExtractor={item => (item?.value ?? Math.random()).toString()}
                renderItem={({item}) => {
                  const isSelected = selectedValue === item.value;
                  return (
                    <Pressable
                      style={styles.item}
                      pointerEvents="box-none"
                      onPress={() => {
                        onSelect(item.value);
                        setModalVisible(false);
                        if (setSearchQuery) setSearchQuery('');
                      }}>
                      <View
                        style={{flex: 1, paddingRight: 8, paddingVertical: 5}}>
                        <Text
                          selectable
                          style={
                            item.subLabel ? styles.label : styles.itemText
                          }>
                          {item.label}
                        </Text>
                        {item.subLabel && (
                          <Text selectable style={styles.subLabel}>{item.subLabel}</Text>
                        )}
                      </View>
                      {isSelected && (
                        <Check stroke={Colors.GREEN} width={20} height={20} />
                      )}
                    </Pressable>
                  );
                }}
                ListEmptyComponent={<ListEmptyArea error={error} />}
                initialNumToRender={20}
                windowSize={20}
                maxToRenderPerBatch={20}
                removeClippedSubviews={true}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingVertical: 6},
  title: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    marginLeft: 5,
    color: Colors.BLACK,
  },
  dropdown: {
    borderWidth: 0.5,
    borderColor: Colors.SOFT_GRAY,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.WHITE,
  },
  dropdownInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {fontSize: 11, color: Colors.GRAY},
  loadingText: {paddingLeft: 10},
  backdrop: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'},
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -width * 0.45}, {translateY: -width * 0.45}],
    width: width * 0.9,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  modalBox: {minHeight: 80, maxHeight: 400, backgroundColor: Colors.WHITE},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.SOFT_GRAY,
  },
  label: {fontSize: 14, fontWeight: 'bold', color: Colors.BLACK, flexShrink: 1},
  subLabel: {fontSize: 10, color: Colors.GRAY, marginTop: 2, flexShrink: 1},
  itemText: {fontSize: 12, color: Colors.DARK_GRAY},
  checkContainer: {width: 24, alignItems: 'center', justifyContent: 'center'},
  searchInput: {
    borderColor: Colors.SOFT_GRAY,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 12,
    fontSize: 14,
    color: Colors.DARK_GRAY,
    backgroundColor: Colors.WHITE,
  },
  errorText: {fontSize: 10, color: Colors.RED, marginTop: 4, marginLeft: 5},
  errorBorder: {borderColor: Colors.RED, borderWidth: 1},
});
