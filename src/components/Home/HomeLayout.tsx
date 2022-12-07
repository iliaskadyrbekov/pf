import React from 'react';

interface IHomeLayoutProps {
  cards: React.ReactNode[] | null;
  tasks: React.ReactNode[];
  recommended: React.ReactNode;
}

const classes = {
  wrapper: 'pt-4 w-full bg-gray-50 overflow-auto',
  container: 'flex justify-center',
  contentWrapper: 'grid grid-cols-3 auto-rows-auto gap-6 pb-12 mx-11',
  cardsWrapper: 'col-span-3 grid grid-cols-3 gap-5 auto-rows-min',
  cardWrapper: 'col-span-3 auto-rows-min',
  getStartedWrapper: 'col-span-2 grid gap-3',
  recommendedWrapper: 'col-span-1',
};

const HomeLayout = ({ tasks, recommended, cards }: IHomeLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.contentWrapper}>
          <div className={classes.cardsWrapper}>{cards}</div>
          <div className={classes.getStartedWrapper}>{tasks}</div>
          <div className={classes.recommendedWrapper}>{recommended}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
