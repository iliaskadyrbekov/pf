import { DatesSetArg, EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/react';
import moment from 'moment-timezone';
import React from 'react';

import { ModalContext, ModalType, ShopContext } from 'src/context';
import { Timeline } from '../components/Timeline';
import { parseOrderItems } from './helpers/parseOrderItems';
import { useAccommodationOrderItemsLazyQuery } from './queries/accommodationOrderItems';
import AccommodationBookingsLayout from './AccommodationBookingsLayout';
import { useAreaResourcesQuery } from 'src/graphql/queries/areaResources';
import { useChangeAccommodationOrderItemResource } from './mutations/changeAccommodationOrderItemResource';
import { EventDragStartArg, EventDragStopArg } from '@fullcalendar/interaction';
import { getTimelineEventId } from './helpers/getTimelineEventId';
import { EventContent } from './components';
import { SpinnerIcon } from '@components/Icons';

const AccommodationBookings = () => {
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date } | null>(null);

  const [getAccommodationOrderItems, { data: accommodationOrderItemsData, loading }] =
    useAccommodationOrderItemsLazyQuery();
  const { data: areaResourcesData } = useAreaResourcesQuery({ shopId: shop?.id });
  const { mutate: changeAccommodationOrderItemResource } = useChangeAccommodationOrderItemResource();

  React.useEffect(() => {
    if (dateRange) {
      getAccommodationOrderItems({ variables: { filter: { shopId: shop?.id, date: dateRange }, shopId: shop?.id } });
    }
  }, [dateRange, getAccommodationOrderItems, shop?.id]);

  const { resources, events } = parseOrderItems(
    accommodationOrderItemsData?.accommodationOrderItems,
    areaResourcesData?.areaResources,
  );

  const handleDateChange = (date: DatesSetArg) => {
    setDateRange({ from: date.start, to: moment(date.end).subtract(1, 'second').toDate() });
  };

  const handleOpenExcelAccommodationOrderItemModal = () => {
    handleOpenModal({
      type: ModalType.EXCEL_ACCOMMODATION_ORDER_ITEMS,
      props: {
        filters: {
          date: dateRange,
        },
      },
    });
  };

  const handleEventClick = ({ event }: EventClickArg) => {
    if (!event.id) {
      throw new Error('Event should have id');
    }

    handleOpenModal({
      type: ModalType.ACCOMMODATION_BOOKINGS_INFO,
      props: {
        orderItemId: event.id,
      },
    });
  };

  const handleDragStart = ({ event, view }: EventDragStartArg) => {
    const resourcesToHighlight = event.extendedProps.constraint.resourceIds as string[];

    resourcesToHighlight.forEach((res) => {
      view.calendar.addEvent({
        id: getTimelineEventId(res),
        start: event.start || new Date(),
        end: event.end || new Date(),
        resourceIds: [res],
        overlap: true,
        display: 'background',
        color: 'green',
      });
    });
  };

  const handleDragStop = ({ event, view }: EventDragStopArg) => {
    const resourcesToHighlight = event.extendedProps.constraint.resourceIds as string[];

    resourcesToHighlight.forEach((id) => view.calendar.getEventById(getTimelineEventId(id))?.remove());
  };

  const handleChangeResources = async (orderItemId: string, newResourceId: string, revert: () => void) => {
    try {
      await changeAccommodationOrderItemResource({
        variables: { shopId: shop?.id, input: { id: orderItemId, resourceId: newResourceId } },
      });
    } catch (err) {
      revert();
      throw err;
    }
  };

  const handleDrop = ({ event, newResource, revert }: EventDropArg) => {
    if (!newResource?.id || !event.id) {
      throw new Error('Resource id or event id is not defined');
    }

    handleChangeResources(event.id, newResource.id, revert);
  };

  const handleRenderEventContent = (eventContent: EventContentArg) => <EventContent eventInfo={eventContent} />;

  return (
    <AccommodationBookingsLayout
      loader={loading ? <SpinnerIcon className="w-12 h-12" /> : null}
      timeline={
        <Timeline
          initialView="resourceTimelineMonth"
          timezone={shop?.timezone.id}
          events={events}
          resources={resources}
          onDateChange={handleDateChange}
          slotLabelFormat={{ weekday: 'short', day: 'numeric' }}
          resourceAreaHeaderContent="Categories"
          onEventClick={handleEventClick}
          eventResourceEditable={true}
          eventDragStart={handleDragStart}
          eventDragStop={handleDragStop}
          eventDrop={handleDrop}
          renderEventContent={handleRenderEventContent}
          slotDuration={{
            hours: 24,
          }}
          customButtons={{
            downloadExcel: {
              text: 'Download',
              click: handleOpenExcelAccommodationOrderItemModal,
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

export default AccommodationBookings;
