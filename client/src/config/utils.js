export const isValidEmail = email => {
  const filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  return String(email).search(filter) != -1;
};

export const checkSecurePass = isSecure => {
  const data = {
    icEye: isSecure ? 'eye-slash' : 'eye',
    securePass: !isSecure,
  };

  return data;
};

export const getTimeDiffMin = date => {
  const today = new Date();
  const diff = date.getTime() - today.getTime();

  return Math.round(diff / 60000);
};

export const getTimeDiffSec = date => {
  const today = new Date();
  const diff = date.getTime() - today.getTime();

  return Math.round(diff / 1000);
};
