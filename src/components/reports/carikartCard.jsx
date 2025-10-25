import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Animated,
  Linking,
} from 'react-native';
import {Colors} from '../../theme/colors';
import {width} from '../../utils/constants';
import {Map, PhoneCall} from '../../assets/icons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ShimmerPlaceholder = ({style}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={[style, styles.skeletonBase]}>
      <Animated.View
        style={[styles.shimmerOverlay, {transform: [{translateX}]}]}
      />
    </View>
  );
};

const CarikartCard = ({item, isLoading}) => {
  const prevLoading = useRef(isLoading);

  useEffect(() => {
    if (prevLoading.current !== isLoading) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      prevLoading.current = isLoading;
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ShimmerPlaceholder style={styles.skeletonTitle} />
        </View>
        <View style={styles.skeletonRow}>
          <ShimmerPlaceholder style={styles.skeletonLabel} />
          <ShimmerPlaceholder style={styles.skeletonValue} />
        </View>
        <View style={styles.skeletonRow}>
          <ShimmerPlaceholder style={styles.skeletonLabel} />
          <ShimmerPlaceholder style={styles.skeletonValue} />
        </View>
      </View>
    );
  }

  // Telefondan arama
  const handleCall = phoneNumber => {
    if (!phoneNumber) return;
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      console.warn('Telefon açılırken hata:', err),
    );
  };

  // Adresi arama
  const handleOpenAddress = address => {
    if (!address) return;

    const query = encodeURIComponent(address);
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${query}`,
      android: `geo:0,0?q=${query}`,
    });

    Linking.openURL(url).catch(err =>
      console.warn('Haritalar açılırken hata:', err),
    );
  };

  return (
    <View style={styles.card} activeOpacity={0.85} >
      <View style={styles.cardHeader}>
        <Text selectable style={styles.cariUnvanText}>Cari Ünvanı: </Text>
        <Text selectable style={styles.un}>{item.un}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.ltRow}>
            <Map stroke={Colors.DARK_GRAY} width={12} height={12} />
            <Text selectable style={styles.label}>Adres:</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleOpenAddress(item.adres)}
            style={styles.link}>
            <Text selectable style={styles.text}>
              {item.adres}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.ltRow}>
            <PhoneCall stroke={Colors.DARK_GRAY} width={12} height={12} />
            <Text selectable style={styles.label}>Tel:</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleCall(item.ctel)}
            style={styles.link}>
            <Text selectable style={[styles.text, {color: Colors.GREEN}]}>{item.ctel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    alignItems: 'flex-start',
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.SOFT_GRAY,
    paddingBottom: 10,
    marginBottom: 10,
  },
  cardBody: {
    marginTop: 5,
  },
  un: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.BLACK,
    flex: 1,
    flexWrap: 'wrap',
  },
  cariUnvanText: {
    fontSize: 12,
    color: Colors.GRAY,
    marginRight: 5,
    flexShrink: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.GRAY,
    width: 60,
  },
  text: {
    fontWeight: '500',
    fontSize: 12,
    color: Colors.BLACK,
    flex: 1,
    flexWrap: 'wrap',
  },
  ltRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  link: {
    flex: 1,
  },

  // Skeleton Styles
  skeletonBase: {
    backgroundColor: Colors.SOFT_GRAY,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 6,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '60%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
  },
  skeletonTitle: {
    width: 200,
    height: 18,
    borderRadius: 6,
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skeletonLabel: {
    width: 60,
    height: 14,
    borderRadius: 4,
  },
  skeletonValue: {
    width: 100,
    height: 14,
    borderRadius: 4,
  },
});

export default CarikartCard;
