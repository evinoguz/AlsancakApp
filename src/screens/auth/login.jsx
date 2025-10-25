import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {defaultStyles} from '../../styles/defaultStyle';
import CustomInput from '../../components/ui/customInput';
import CustomButton from '../../components/ui/customButton';
import {Lock, Login, User} from '../../assets/icons';
import {Colors} from '../../theme/colors';
import {height, showAlert, width} from '../../utils/constants';
import {useLoginMutation} from '../../store/slices/usersApiSlice';
import LoadingOverlay from '../../components/ui/loadingOverlay';
import {validateLoginForm} from '../../utils/validations';
import {useDispatch, useSelector} from 'react-redux';
import {saveCredentials} from '../../store/actions/authActions';
export const LoginScreen = () => {
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const {kulAdi} = useSelector(state => state.auth);
  const [form, setForm] = useState({
    kuladi: '',
    kulsifre: '',
  });
  const [isAutoFilled, setIsAutoFilled] = useState(!!kulAdi);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (kulAdi) {
      setForm(prev => ({...prev, kuladi: kulAdi}));
      setIsAutoFilled(true);
    }
  }, [kulAdi]);

  const handleSubmit = async () => {
    const errs = validateLoginForm(form);
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      const res = await login({
        kuladi: form.kuladi,
        kulsifre: form.kulsifre,
      }).unwrap();

      if (!res.success) {
        showAlert('Bilgi', res.message || 'Giriş başarısız.');
        return;
      }
      dispatch(saveCredentials(res));
    } catch (err) {
      showAlert('Bilgi', err?.data?.message || 'Sunucuya erişilemedi');
    }
  };

  return (
    <View
      style={[
        defaultStyles.container,
        styles.container,
        isLoading && defaultStyles.loadingDim,
      ]}>
      <LoadingOverlay visible={isLoading} />
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Image
              source={require('../../assets/images/logosancak.webp')}
              style={styles.img}
              resizeMode="contain"
            />
            <Text style={styles.header}>Hoşgeldiniz</Text>
            <Text style={styles.headerSub}>Giriş Yapınız</Text>
            <CustomInput
              onChangeText={value => {
                setForm({...form, kuladi: value});
                if (isAutoFilled) setIsAutoFilled(false);
              }}
              value={form.kuladi}
              label="Kullanıcı Adı"
              placeholder="Kullanıcı adınızı giriniz."
              icon={<User stroke={Colors.GRAY} width={15} height={15} />}
              error={formErrors.kuladi}
              isAutoFilled={isAutoFilled}
            />
            <CustomInput
              isPassword
              onChangeText={value => setForm({...form, kulsifre: value})}
              value={form.kulsifre}
              label="Şifre"
              placeholder="Şifrenizi giriniz."
              icon={<Lock stroke={Colors.GRAY} width={15} height={15} />}
              error={formErrors.kulsifre}
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={handleSubmit}
                title="Giriş Yap"
                color={Colors.PRIMARY}
                icon={<Login stroke={Colors.WHITE} width={18} height={18} />}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.BLACK,
  },
  headerSub: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
    color: Colors.GRAY,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width * 0.4,
    height: 120,
    flex: 1,
    alignSelf: 'center',
    marginVertical: 25,
  },
  form: {
    width: width * 0.9,
    maxHeight: height * 0.9,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
