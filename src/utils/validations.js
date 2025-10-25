const validateLoginForm = form => {
  const errs = {};
  if (!form.kuladi) {
    errs.kuladi = 'Kullanıcı adı zorunlu';
  }
  if (!form.kulsifre) {
    errs.kulsifre = 'Şifre zorunlu';
  }
  return errs;
};

export {validateLoginForm};
