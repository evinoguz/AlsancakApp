import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {performLogout} from '../../store/actions/authActions';
import {width} from '../../utils/constants';
import {Colors} from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';
import {Logout} from '../../assets/icons';
import Avatar from '../../components/ui/avatar';

export const Profile = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth);

  // Tarih formatlama
  const formatDate = dateStr => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('tr-TR');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profil Kartı */}
        <View style={styles.profileCard}>
          <Avatar name={userInfo?.user?.adi} surname={userInfo?.user?.soyadi} />

          <Text selectable style={styles.name}>
            {userInfo?.user?.adi} {userInfo?.user?.soyadi}
          </Text>
          <Text selectable style={styles.username}>
            @{userInfo?.user?.kuladi}
          </Text>
          <Text selectable style={styles.role}>
            {userInfo?.user?.tip} • {userInfo?.user?.yetki}
          </Text>
        </View>

        {/* Ana Bilgiler */}
        <View style={styles.infoWrapper}>
          <Text selectable style={styles.sectionTitle}>
            Ana Bilgiler
          </Text>
          <View style={styles.infoRow}>
            <Text selectable style={styles.label}>
              Şirket Ünvanı:
            </Text>
            <Text selectable style={styles.value}>
              {userInfo?.user?.sirketunv}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text selectable style={styles.label}>
              Kısa Ad:
            </Text>
            <Text selectable style={styles.value}>
              {userInfo?.user?.kisaad}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text selectable style={styles.label}>
              Renk:
            </Text>
            <Text selectable style={styles.value}>
              {userInfo?.user?.renk}
            </Text>
          </View>
          <View style={styles.separator} />
          <Text selectable style={styles.sectionTitle}>
            Ek Bilgiler
          </Text>
          <View style={styles.infoRow}>
            <Text selectable style={styles.label}>
              Hesap Oluşturma:
            </Text>
            <Text selectable style={styles.value}>
              {formatDate(userInfo?.user?.CRDate)}
            </Text>
          </View>
          {/* Logout Butonu */}
          <View style={styles.logoutWrapper}>
            <CustomButton
              title="Çıkış Yap"
              onPress={() => dispatch(performLogout())}
              color={Colors.RED}
              icon={<Logout stroke={Colors.WHITE} width={18} height={18} />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_WHITE,
    alignItems: 'center',
    paddingVertical: 25,
    gap: 20,
  },
  profileCard: {
    width: width * 0.9,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: Colors.LIGHT_WHITE,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.BLACK,
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    marginTop: 3,
  },
  role: {
    fontSize: 15,
    color: Colors.LIGHT_GRAY,
    marginTop: 6,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.PRIMARY,
    marginBottom: 6,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  infoWrapper: {
    width: width,
    backgroundColor: Colors.WHITE,
    paddingBottom: 8,
  },
  infoRow: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    height: 0.8,
    backgroundColor: Colors.SOFT_GRAY,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.BLACK,
  },
  value: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    maxWidth: '60%',
    textAlign: 'right',
  },
  logoutWrapper: {
    width: width * 0.95,
    marginTop: 10,
    alignSelf: 'center',
  },
});
