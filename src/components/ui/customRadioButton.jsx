import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../theme/colors';

export const CustomRadioButton = ({items, onSelect, selectedValue, label}) => {
  return (
    <View style={styles.container}>
      <View style={styles.radioGroup}>
        {items.map(item => (
          <Pressable
            key={item.value}
            style={styles.radioButton}
            onPress={() => onSelect(item.value)}>
            <View
              style={[
                styles.radioCircle,
                selectedValue === item.value && styles.selectedRadioCircle,
              ]}>
              {selectedValue === item.value && (
                <View style={styles.selectedRadioDot} />
              )}
            </View>
            <Text selectable style={styles.radioText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SOFT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  selectedRadioCircle: {
    borderColor: Colors.PRIMARY,
  },
  selectedRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
  },
  radioText: {
    fontSize: 12,
    color: Colors.DARK_GRAY,
  },
});
