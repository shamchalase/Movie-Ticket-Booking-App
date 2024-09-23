import moment from 'moment';

// Set information to local storage
export const setLocalStorage = (key, initialValue) => {
  localStorage.setItem(key, JSON.stringify(initialValue));
};

// Retrieve information from local storage
export const getLocalStorage = (key, initialValue) => {
  let reservationValue = JSON.parse(localStorage.getItem(key));

  // Format date string to moment object only for reservation
  if (reservationValue && key === 'reservation') {
    reservationValue = {
      ...reservationValue,
      date: moment(reservationValue.date)
    };
  }
  return reservationValue || initialValue;
};

// Remove information from local storage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
