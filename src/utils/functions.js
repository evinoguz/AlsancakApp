// Tarihleri karşılaştırmak için sadece YYYY-MM-DD
const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0];
  // return '2025-11-27';
};

const getInitialNameSurname = (name, surname) => {
  const nameInitial = name?.[0]?.toUpperCase();
  const surnameInitial = surname?.[0]?.charAt(0)?.toUpperCase();
  return nameInitial + surnameInitial;
};

const formatCurrency = (value = 0) => {
  if (isNaN(value)) return '0,00 ₺';
  return `${value.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}₺`;
};

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

const formatNumber = num => {
  if (num == null) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const normalizeText = (str = '') =>
  str
    .normalize('NFD') // Unicode normalizasyonu
    .replace(/\p{Diacritic}/gu, '') // aksanları (ş,ç,ö vs) temizler
    .replace(/ı/g, 'i') // özel Türkçe karakterleri dönüştür
    .replace(/İ/g, 'i')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'u')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'g')
    .toLowerCase()
    .trim();

export {
  getTodayDateString,
  getInitialNameSurname,
  formatCurrency,
  formatDate,
  formatNumber,
  normalizeText,
};
