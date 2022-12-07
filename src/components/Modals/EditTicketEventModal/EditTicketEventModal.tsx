import React from 'react';
import { EventClickArg } from '@fullcalendar/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { Button } from '@components/common/Button';
import { Dropdown } from '@components/common/Dropdown';
import { utcToZonedTime } from 'src/helpers';
import { ShopContext } from 'src/context/ShopContext';
import { EventType } from 'src/shared/enums/EventType';
import { IEvent, TEvent } from 'src/shared/interfaces/TicketEvent';
import { OneTimeEventForm, RecurringEventForm } from '../CreateTicketEventModal/components';
import { ICreatedOneTimeEvent } from '../CreateTicketEventModal/components/OneTimeEventForm/OneTimeEventForm';
import { ICreatedRecurringEvent } from '../CreateTicketEventModal/components/RecurringEventForm/RecurringEventForm';
import EditTicketEventModalLayout from './EditTicketEventModalLayout';
import { useDeleteEvent } from './mutations/deleteEvent';
import { IEditOneTimeEventInput, useEditOneTimeEvent } from './mutations/editOneTimeEvent';
import { IEditRecurringEventInput, useEditRecurringEvent } from './mutations/editRecurringEvent';
import { AvailabilityType } from 'src/shared/enums/AvailabilityType';

interface IEditTicketEventModalProps {
  event: IEvent;
  calendarEvent: EventClickArg;
  availabilityType: AvailabilityType;
  onClose(): void;
}

enum DELETE_EVENT {
  THIS,
  ALL,
}

const EditTicketEventModal = ({ event, calendarEvent, onClose, availabilityType }: IEditTicketEventModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { mutate: deleteEvent } = useDeleteEvent();
  const { mutate: editRecurringEvent } = useEditRecurringEvent();
  const { mutate: editOneTimeEvent } = useEditOneTimeEvent();

  const handleDeleteEvent = async () => {
    await deleteEvent({ variables: { shopId: shop?.id, input: { id: event.event.id } } });
    onClose();
  };

  const handleDeleteRecurringEventDate = async (exdate: Date[] = [], tzid?: string) => {
    if (calendarEvent.event.start) {
      await editRecurringEvent({
        variables: {
          shopId: shop?.id,
          input: {
            exdate: [...exdate, utcToZonedTime(calendarEvent.event.start, tzid)],
            id: event.event.id,
          },
        },
      });
    }
    onClose();
  };

  const prepareRecurringEventToEdit = (eventProp: ICreatedRecurringEvent): IEditRecurringEventInput => {
    return { ...eventProp, id: event.event.id };
  };

  const prepareOneTimeEventToEdit = (eventProp: ICreatedOneTimeEvent): IEditOneTimeEventInput => {
    return { ...eventProp, id: event.event.id };
  };

  const handleEditRecurringEvent = async (eventProp: ICreatedRecurringEvent) => {
    await editRecurringEvent({ variables: { shopId: shop?.id, input: prepareRecurringEventToEdit(eventProp) } });
  };

  const handleEditOneTimeEvent = async (eventProp: ICreatedOneTimeEvent) => {
    await editOneTimeEvent({ variables: { shopId: shop?.id, input: prepareOneTimeEventToEdit(eventProp) } });
  };

  const getFormByType = (event: TEvent) => {
    switch (event.type) {
      case EventType.ONE_TIME:
        return (
          <OneTimeEventForm
            initialValues={{
              allDay: event.allDay,
              startDate: event.startDate,
              type: event.type,
              quantity: event.quantity,
              minPurchase: event.minPurchase,
              maxPurchase: event.maxPurchase,
              minPurchaseTime: event.minPurchaseTime,
              maxPurchaseTime: event.maxPurchaseTime,
              connectedResources: event.connectedResources,
            }}
            availabilityType={availabilityType}
            actions={({ handleSubmit }) => [
              <Button color="delete" key="1" onClick={handleDeleteEvent}>
                Delete
              </Button>,
              <Button variant="contained" color="default" key="2" onClick={onClose}>
                Close
              </Button>,
              <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="3">
                Save
              </Button>,
            ]}
            onCreateEvent={handleEditOneTimeEvent}
            onClose={onClose}
          />
        );
      case EventType.RECURRING:
        return (
          <RecurringEventForm
            initialValues={{
              allDay: event.allDay,
              dtstart: event.dtstart,
              freq: event.freq,
              interval: event.interval,
              byweekday: event.byweekday,
              until: event.until,
              untilEnabled: !!event.until ? '1' : '0',
              quantity: event.quantity,
              type: event.type,
              minPurchase: event.minPurchase,
              maxPurchase: event.maxPurchase,
              minPurchaseTime: event.minPurchaseTime,
              maxPurchaseTime: event.maxPurchaseTime,
              connectedResources: event.connectedResources,
            }}
            availabilityType={availabilityType}
            actions={({ handleSubmit }) => [
              <Dropdown
                key="5"
                renderLabel={() => (
                  <Button
                    color="delete"
                    rightElement={<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />}
                  >
                    Delete recurring event
                  </Button>
                )}
                onItemClick={(value: DELETE_EVENT) => {
                  switch (value) {
                    case DELETE_EVENT.THIS:
                      return handleDeleteRecurringEventDate(event.exdate, event.tzid);
                    case DELETE_EVENT.ALL:
                      return handleDeleteEvent();
                  }
                }}
                items={[
                  { label: 'Delete this event', value: DELETE_EVENT.THIS },
                  { label: 'Delete all events', value: DELETE_EVENT.ALL },
                ]}
              />,
              <Button variant="contained" color="default" key="3" onClick={onClose}>
                Close
              </Button>,
              <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="4">
                Save
              </Button>,
            ]}
            onCreateEvent={handleEditRecurringEvent}
            onClose={onClose}
          />
        );
    }
  };
  return <EditTicketEventModalLayout form={getFormByType(event.event)} />;
};

export default EditTicketEventModal;
