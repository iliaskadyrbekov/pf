import React from 'react';
import CardLayout from './CardLayout';

interface ICardProps {
  date: string;
  title: string;
  count: string | number;
  secondDate: string;
  prevCount: string | number;
}

const Card = ({ date, title, count, prevCount, secondDate }: ICardProps) => {
  return <CardLayout date={date} title={title} count={count} secondDate={secondDate} prevCount={prevCount} />;
};

export default Card;
