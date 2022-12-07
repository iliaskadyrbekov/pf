import { DatesSetArg, EventClickArg } from '@fullcalendar/react';
import moment from 'moment-timezone';
import React from 'react';

import { SpinnerIcon } from '@components/Icons';
import { ModalContext, ModalType, ShopContext } from 'src/context';
import { ActivityType } from 'src/shared/enums';
import { Timeline } from '../components/Timeline';
import { parseOrderItems } from './helpers/parseOrderItems';
import { useTicketOrderItemsLazyQuery } from './queries/ticketOrderItems';
import TicketBookingsLayout from './TicketBookingsLayout';

const TicketBookings = () => {
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date } | null>(null);

  const [getTicketOrderItems, { data, loading }] = useTicketOrderItemsLazyQuery();

  React.useEffect(() => {
    if (dateRange) {
      getTicketOrderItems({ variables: { filter: { shopId: shop?.id, date: dateRange }, shopId: shop?.id } });
    }
  }, [dateRange, getTicketOrderItems, shop?.id]);

  const { resources, events } = parseOrderItems(data?.ticketOrderItems);

  const handleDateChange = (date: DatesSetArg) => {
    setDateRange({ from: date.start, to: moment(date.end).subtract(1, 'second').toDate() });
  };

  const handleOpenExcelTicketOrderItemModal = () => {
    handleOpenModal({
      type: ModalType.EXCEL_TICKET_ORDER_ITEMS,
      props: {
        filters: {
          type: ActivityType.TICKET,
          date: dateRange,
        },
      },
    });
  };

  const handleEventClick = ({ event }: EventClickArg) => {
    if (!event.id || !event.start || !event.end) {
      throw new Error('Event should have id, start and end date');
    }

    handleOpenModal({
      type: ModalType.TICKET_BOOKINGS_INFO,
      props: {
        eventId: event.id,
        date: {
          from: event.start,
          to: event.end,
        },
      },
    });
  };

  return (
    <TicketBookingsLayout
      loader={loading ? <SpinnerIcon className="w-12 h-12" /> : null}
      timeline={
        <Timeline
          initialView="resourceTimelineDay"
          timezone={shop?.timezone.id}
          events={events}
          resources={resources}
          onDateChange={handleDateChange}
          slotLabelFormat={{ hour: '2-digit', minute: '2-digit', meridiem: false, hour12: false }}
          resourceAreaHeaderContent="Categories"
          onEventClick={handleEventClick}
          customButtons={{
            downloadExcel: {
              text: 'Download',
              click: handleOpenExcelTicketOrderItemModal,
            },
          }}
          headerToolbar={{
            left: 'title',
            right: 'prev,today,next downloadExcel',
          }}
        />
      }
    />
  );
};

export default TicketBookings;
