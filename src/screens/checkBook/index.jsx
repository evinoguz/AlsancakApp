import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {CustomRadioButton} from '../../components/ui/customRadioButton';

import CheckBookKasadaki from '../../components/reports/checkBookKasadaki';
import CheckBookTakastaki from '../../components/reports/checkBookTakastaki';
import {defaultStyles} from '../../styles/defaultStyle';

export const CheckBook = () => {
  const [selectedIslemTip, setSelectedIslemTip] = useState('kasadaki');
  const islemTipItems = [
    {label: 'Kasadaki', value: 'kasadaki'},
    {label: 'Takastaki', value: 'takastaki'},
  ];

  return (
    <SafeAreaView style={defaultStyles.mainContainer}>
      <CustomRadioButton
        items={islemTipItems}
        onSelect={val => setSelectedIslemTip(val)}
        selectedValue={selectedIslemTip}
      />
      {selectedIslemTip === 'kasadaki' ? (
        <CheckBookKasadaki />
      ) : (
        <CheckBookTakastaki />
      )}
    </SafeAreaView>
  );
};
