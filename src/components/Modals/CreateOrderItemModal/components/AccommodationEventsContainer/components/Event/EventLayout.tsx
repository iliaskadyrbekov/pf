import React from 'react';

interface IEventLayoutProps {
  name: string;
  specifications: React.ReactNode | null;
  media?: string;
  footer: React.ReactNode;
}

const classes = {
  wrapper: 'bg-white rounded-lg p-3 sm:p-4 w-full',
  image:
    'h-[6rem] sm:h-[8rem] xl:h-[10rem] 2xl:h-[13.125rem] w-full max-w-[8rem] sm:max-w-[10rem] xl:max-w-[12rem] 2xl:max-w-[17.5rem] rounded-md object-center object-cover',
  content: 'flex flex-col justify-between w-full ml-2 sm:ml-3',
  container: 'flex',
  name: 'line-camp-2 text-lg sm:text-xl 2xl:text-2xl font-medium text-gray-800',
  specifications: 'flex flex-wrap mt-1 space-x-1 max-h-[4.5rem] truncate',
  desktopFooter: 'hidden xl:block',
  mobileFooter: 'block xl:hidden',
};

const customStyles = {
  boxShadow: { boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)' },
};

const EventLayout = ({ name, media, specifications, footer }: IEventLayoutProps) => {
  return (
    <div className={classes.wrapper} style={customStyles.boxShadow}>
      <div className={classes.container}>
        {media && <img src={media} className={classes.image} alt={name} />}
        <div className={classes.content}>
          <div>
            <h4 className={classes.name}>{name}</h4>
            {specifications && <ul className={classes.specifications}>{specifications}</ul>}
          </div>
          <div className={classes.desktopFooter}>{footer}</div>
        </div>
      </div>
      <div className={classes.mobileFooter}>{footer}</div>
    </div>
  );
};

export default EventLayout;
