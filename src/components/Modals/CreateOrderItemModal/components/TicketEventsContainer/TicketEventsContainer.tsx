import React from 'react';
import { useApollo } from 'src/lib/apolloClient';

import { Calendar, Events } from './components';
import TicketEventsContainerLayout from './TicketEventsContainerLayout';

import {
  IFirstTicketAvailableDatesRes,
  IFirstTicketAvailableDatesVars,
  FIRST_TICKET_AVAILABLE_DATES,
} from 'src/graphql/queries/firstTicketAvailableDates';
import { getInitialDate } from '../../helpers/getInitialDate';

interface ITicketEventsContainerProps {
  activityId: string;
}

const TicketEventsContainer = ({ activityId }: ITicketEventsContainerProps) => {
  const client = useApollo();

  const [currentDate, setCurrentDate] = React.useState<Date>();
  const [currentProductId] = React.useState<null | string>(null);

  const getInitialData = async () => {
    const { data } = await client.query<IFirstTicketAvailableDatesRes, IFirstTicketAvailableDatesVars>({
      query: FIRST_TICKET_AVAILABLE_DATES,
      variables: {
        activityId,
        from: new Date(),
        productsIds: currentProductId ? [currentProductId] : null,
      },
    });

    setCurrentDate(getInitialDate(data.ticketProducts));
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  return (
    <TicketEventsContainerLayout
      datePicker={<Calendar activityId={activityId} date={currentDate} onDayChange={setCurrentDate} />}
      events={<Events activityId={activityId} date={currentDate} productId={currentProductId} />}
    />
  );
};

export default TicketEventsContainer;
