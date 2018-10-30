import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function DateTime({ startDate, finishDate }) {
  const startDay = moment(startDate).format('D');
  const startTime = moment(startDate).format('HH:mm');
  const startMonth = moment(startDate).format('MMMM');
  const finishDay = moment(finishDate).format('D');
  const finishTime = moment(finishDate).format('HH:mm');
  const finishMonth = moment(finishDate).format('MMMM');

  let dateTime = '';

  if (startTime !== '00:00') {
    dateTime += `${startTime} `;
  }

  if (finishTime !== '00:00') {
    dateTime += `- ${finishTime} `;
  }

  if (startMonth !== finishMonth) {
    dateTime += `${moment(startDate).format('D MMMM')} - ${moment(finishDate).format('D MMMM')}`;
  } else if (startDay !== finishDay) {
    dateTime += `${startDay} - ${moment(finishDate).format('D MMMM')}`;
  } else {
    dateTime += `${moment(startDate).format('D MMMM')}`;
  }

  return <div>{dateTime}</div>;
}

DateTime.propTypes = {
  startDate: PropTypes.string.isRequired,
  finishDate: PropTypes.string.isRequired,
};
