import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
} from 'react-native';
import {Colors} from '../../theme/colors';
import {Eye, EyeOff, Close} from '../../assets/icons';

const CustomInput = props => {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    isPassword = false,
    error,
    touched,
    style,
    icon,
    editable = true,
    showModalOnPress = false,
    onPress,
    success = false,
    clearButton = false,
    isAutoFilled = false, // 🔹 yeni prop
    ...restProps
  } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const glowAnim = useRef(new Animated.Value(0)).current;

  // 🔹 Fade-in animasyonu (isAutoFilled aktifse)
  useEffect(() => {
    if (isAutoFilled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }
  }, [isAutoFilled]);

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#b7f5d4', '#e6fff1'], // yeşilimsi parlama
  });

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(prev => !prev);
  }, []);

  const handleClear = useCallback(() => {
    onChangeText && onChangeText('');
  }, [onChangeText]);

  const showError = !!error && (touched || touched === undefined);

  const renderRightIcon = () => {
    if (!isPassword) return null;
    const Icon = passwordVisible ? Eye : EyeOff;
    return (
      <Pressable onPress={togglePasswordVisibility} style={styles.icon}>
        <Icon
          stroke={showError ? Colors.RED : Colors.BLACK}
          width={20}
          height={20}
        />
      </Pressable>
    );
  };

  const renderLeftIcon = () => {
    if (!icon) return null;
    return <View style={styles.leftIcon}>{icon}</View>;
  };

  const renderClearButton = () => {
    if (!clearButton || !value) return null;
    return (
      <Pressable onPress={handleClear} style={styles.clearIcon}>
        <Close stroke={Colors.GRAY} width={20} height={20} />
      </Pressable>
    );
  };

  const inputContent = (
    <TextInput
      style={[
        styles.input,
        !editable && styles.disabledInput,
        isAutoFilled && styles.autoFilledInput,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={isPassword && !passwordVisible}
      placeholderTextColor={Colors.GRAY}
      editable={editable && !showModalOnPress}
      pointerEvents={showModalOnPress ? 'none' : 'auto'}
      {...restProps}
    />
  );

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        isAutoFilled && {shadowColor: glowColor, shadowOpacity: 0.6, shadowRadius: 6},
      ]}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <Pressable
        onPress={showModalOnPress ? onPress : undefined}
        style={[
          styles.inputWrapper,
          showError && styles.errorBorder,
          success && !showError && styles.successBorder,
          !editable && styles.disabledInput,
          isAutoFilled && { borderColor: Colors.PRIMARY, backgroundColor: Colors.LIGHT_PRIMARY },
        ]}>
        {renderLeftIcon()}
        {inputContent}
        {renderRightIcon()}
        {renderClearButton()}
      </Pressable>
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.BLACK,
    marginLeft: 5,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  autoFillTag: {
    fontSize: 10,
    color: Colors.GREEN,
    marginLeft: 6,
    fontStyle: 'italic',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: Colors.SOFT_GRAY,
    borderRadius: 10,
    paddingHorizontal: 9,
    backgroundColor: Colors.WHITE,
  },
  leftIcon: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 12,
    backgroundColor: Colors.WHITE,
    color: Colors.BLACK,
  },
  autoFilledInput: {
    backgroundColor: Colors.LIGHT_PRIMARY,
  },
  disabledInput: {
    backgroundColor: Colors.SOFT_GRAY,
  },
  icon: {
    position: 'absolute',
    paddingHorizontal: 15,
    justifyContent: 'center',
    right: 0,
    top: 0,
    bottom: 0,
  },
  clearIcon: {
    position: 'absolute',
    paddingHorizontal: 15,
    justifyContent: 'center',
    right: 0,
    top: 0,
    bottom: 0,
  },
  errorText: {
    fontSize: 13,
    color: Colors.RED,
    marginVertical: 1,
    marginTop: 4,
    marginLeft: 5,
  },
  errorBorder: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.RED,
  },
  successBorder: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.GREEN,
  },
});

export default CustomInput;
