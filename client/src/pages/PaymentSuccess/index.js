import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import axios from '../../axios';
import MovieTicket from '../../components/MovieTicket';
import Modal from '../../components/Modal';

import classes from './PaymentSuccess.module.css';

function PaymentSuccess() {
  const [reservation, setReservation] = useState();
  const [showModal, setShowModal] = useState({
    status: false,
    type: '',
    subject: '',
    message: ''
  });

  const { t } = useTranslation();

  // Extract sessionId from url
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');

  useEffect(() => {
    const getReservation = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `/reservation/${sessionId}`
        });
        setReservation({
          ...response.data.reservation,
          date: moment(response.data.reservation.date)
        });
      } catch {
        setShowModal({
          status: true,
          type: 'close',
          subject: 'error',
          message: 'something_wrong'
        });
      }
    };
    getReservation();
  }, []);

  return (
    <div className={classes.container}>
      {reservation && (
        <div className={classes.message}>
          <h4>
            {t('hi')}
            <span>{` ${reservation.name}`}</span>
          </h4>
          <p>{t('payment_success')}</p>
          <p>{t('thanks_RED_Cinemas')}</p>
        </div>
      )}
      <div className={classes.movie_ticket}>
        {reservation && <MovieTicket reservation={reservation} />}
      </div>
      <div className={classes.close_button}>
        <Link to="/">
          <button className={classes.checkout_button} type="button">
            {t('close')}
          </button>
        </Link>
      </div>
      {showModal.status && (
        <Modal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default PaymentSuccess;
