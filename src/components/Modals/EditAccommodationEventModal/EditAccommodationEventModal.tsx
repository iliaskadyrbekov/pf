import React from 'react';
import { EventClickArg } from '@fullcalendar/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import moment from 'moment-timezone';

import { Button, Dropdown } from '@components/common';
import EditAccommodationEventModalLayout from './EditAccommodationEventModalLayout';

import { ShopContext } from 'src/context';
import { EventType } from 'src/shared/enums';
import {
  useDeleteAccommodationEvent,
  useEditAccommodationOneTimeEvent,
  useEditAccommodationRecurringEvent,
} from './mutations';
import OneTimeEventForm, {
  ICreatedOneTimeEvent,
} from '../CreateAccommodationEventModal/components/OneTimeEventForm/OneTimeEventForm';
import RecurringEventForm, {
  ICreatedRecurringEvent,
} from '../CreateAccommodationEventModal/components/RecurringEventForm/RecurringEventForm';
import { TAccommodationEvent } from 'src/shared/interfaces/AccommodationEvent';
import { utcToZonedTime } from 'src/helpers';

interface IEditAccommodationEventModalProps {
  event: TAccommodationEvent;
  calendarEvent: EventClickArg;
  onClose(): void;
}

enum DELETE_EVENT {
  THIS,
  ALL,
}

const EditAccommodationEventModal = ({ event, calendarEvent, onClose }: IEditAccommodationEventModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { mutate: deleteAccommodationEvent } = useDeleteAccommodationEvent(event.type);
  const { mutate: editAccommodationOneTimeEvent } = useEditAccommodationOneTimeEvent();
  const { mutate: editAccommodationRecurringEvent } = useEditAccommodationRecurringEvent();

  const handleDeleteEvent = async () => {
    await deleteAccommodationEvent({ variables: { shopId: shop?.id, input: { id: event.id } } });
    onClose();
  };

  const handleDeleteRecurringEventDate = async (exdate: Date[] = []) => {
    if (calendarEvent.event.start) {
      await editAccommodationRecurringEvent({
        variables: {
          shopId: shop?.id,
          input: {
            exdate: [
              ...exdate,
              utcToZonedTime(moment(calendarEvent.event.start).startOf('day').toDate(), shop?.timezone.id),
            ],
            id: event.id,
          },
        },
      });
    }
    onClose();
  };

  const handleEditRecurringEvent = async (eventProp: ICreatedRecurringEvent) => {
    const { type, ...restEventProp } = eventProp;
    await editAccommodationRecurringEvent({
      variables: { shopId: shop?.id, input: { ...restEventProp, id: event.id } },
    });
  };

  const handleEditOneTimeEvent = async (eventProp: ICreatedOneTimeEvent) => {
    const { type, ...restEventProp } = eventProp;
    await editAccommodationOneTimeEvent({
      variables: { shopId: shop?.id, input: { ...restEventProp, id: event.id } },
    });
  };

  const getFormByType = (event: TAccommodationEvent) => {
    switch (event.type) {
      case EventType.ONE_TIME:
        return (
          <OneTimeEventForm
            initialValues={{
              type: event.type,
              quantity: event.quantity,
              startDate: event.startDate,
              minPurchase: event.minPurchase,
              maxPurchase: event.maxPurchase,
              minPurchaseTime: event.minPurchaseTime,
              maxPurchaseTime: event.maxPurchaseTime,
              connectedResources: event.connectedResources,
            }}
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
              dtstart: event.dtstart,
              exdate: event.exdate,
              freq: event.freq,
              interval: event.interval,
              byweekday: event.byweekday,
              until: event.until || undefined,
              untilEnabled: !!event.until ? '1' : '0',
              quantity: event.quantity,
              type: event.type,
              minPurchase: event.minPurchase,
              maxPurchase: event.maxPurchase,
              minPurchaseTime: event.minPurchaseTime,
              maxPurchaseTime: event.maxPurchaseTime,
              connectedResources: event.connectedResources,
            }}
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
                      return handleDeleteRecurringEventDate(event.exdate);
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
  return <EditAccommodationEventModalLayout form={getFormByType(event)} />;
};

export default EditAccommodationEventModal;
