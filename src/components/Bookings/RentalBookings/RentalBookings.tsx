import { DatesSetArg, EventClickArg } from '@fullcalendar/react';
import moment from 'moment-timezone';
import React from 'react';

import { SpinnerIcon } from '@components/Icons';
import { ModalContext, ModalType, ShopContext } from 'src/context';
import { ActivityType } from 'src/shared/enums';
import { Timeline } from '../components/Timeline';
import { parseOrderItems } from './helpers/parseOrderItems';
import { useRentalOrderItemsLazyQuery } from './queries/rentalOrderItems';
import RentalBookingsLayout from './RentalBookingsLayout';

const RentalBookings = () => {
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date } | null>(null);

  const [getRentalOrderItems, { data, loading }] = useRentalOrderItemsLazyQuery();

  React.useEffect(() => {
    if (dateRange) {
      getRentalOrderItems({ variables: { filter: { shopId: shop?.id, date: dateRange }, shopId: shop?.id } });
    }
  }, [dateRange, getRentalOrderItems, shop?.id]);

  const { resources, events } = parseOrderItems(data?.rentalOrderItems);

  const handleDateChange = (date: DatesSetArg) => {
    setDateRange({ from: date.start, to: moment(date.end).subtract(1, 'second').toDate() });
  };

  const handleOpenExcelRentalOrderItemModal = () => {
    handleOpenModal({
      type: ModalType.EXCEL_RENTAL_ORDER_ITEMS,
      props: {
        filters: {
          type: ActivityType.RENTAL,
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
      type: ModalType.RENTAL_BOOKINGS_INFO,
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
    <RentalBookingsLayout
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
              click: handleOpenExcelRentalOrderItemModal,
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

export default RentalBookings;
