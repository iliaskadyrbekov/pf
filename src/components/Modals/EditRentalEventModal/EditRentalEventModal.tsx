import { Button } from '@components/common/Button';
import { Dropdown } from '@components/common/Dropdown';
import { EventClickArg } from '@fullcalendar/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React from 'react';

import { utcToZonedTime } from 'src/helpers';
import { ShopContext } from 'src/context/ShopContext';
import { EventType } from 'src/shared/enums/EventType';
import { TRentalEvent } from 'src/shared/interfaces/RentalEvent';
import { OneTimeEventForm, RecurringEventForm } from '../CreateRentalEventModal/components';
import { ICreatedOneTimeEvent } from '../CreateRentalEventModal/components/OneTimeEventForm/OneTimeEventForm';
import { ICreatedRentalEvent } from '../CreateRentalEventModal/components/RecurringEventForm/RecurringEventForm';
import EditRentalEventModalLayout from './EditRentalEventModalLayout';
import { useDeleteRentalEvent } from './mutations/deleteRentalEvent';
import { useEditRentalOneTimeEvent } from './mutations/editRentalOneTimeEvent';
import { useEditRentalRecurringEvent } from './mutations/editRentalRecurringEvent';

interface IEditRentalEventModalProps {
  event: TRentalEvent;
  calendarEvent: EventClickArg;
  onClose(): void;
}

enum DELETE_EVENT {
  THIS,
  ALL,
}

const EditRentalEventModal = ({ event, calendarEvent, onClose }: IEditRentalEventModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { mutate: deleteRentalEvent } = useDeleteRentalEvent(event.type);
  const { mutate: editRentalRecurringEvent } = useEditRentalRecurringEvent();
  const { mutate: editRentalOneTimeEvent } = useEditRentalOneTimeEvent();

  const handleDeleteEvent = async () => {
    await deleteRentalEvent({ variables: { shopId: shop?.id, input: { id: event.id } } });
    onClose();
  };

  const handleDeleteRecurringEventDate = async (exdate: Date[] = [], tzid?: string) => {
    if (calendarEvent.event.start) {
      await editRentalRecurringEvent({
        variables: {
          shopId: shop?.id,
          input: { exdate: [...exdate, utcToZonedTime(calendarEvent.event.start, tzid)], id: event.id },
        },
      });
    }
    onClose();
  };

  const handleEditRecurringEvent = async (eventProp: ICreatedRentalEvent) => {
    await editRentalRecurringEvent({ variables: { shopId: shop?.id, input: { ...eventProp, id: event.id } } });
  };

  const handleEditOneTimeEvent = async (eventProp: ICreatedOneTimeEvent) => {
    await editRentalOneTimeEvent({ variables: { shopId: shop?.id, input: { ...eventProp, id: event.id } } });
  };

  const getFormByType = (event: TRentalEvent) => {
    switch (event.type) {
      case EventType.ONE_TIME:
        return (
          <OneTimeEventForm
            initialValues={{
              startDate: event.startDate,
              type: event.type,
              startTime: event.startTime,
              endTime: event.endTime,
              quantity: event.quantity,
              minPurchaseTime: event.minPurchaseTime,
              maxPurchaseTime: event.maxPurchaseTime,
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
              freq: event.freq,
              interval: event.interval,
              byweekday: event.byweekday,
              until: event.until,
              untilEnabled: !!event.until ? '1' : '0',
              type: event.type,
              startTime: event.startTime,
              endTime: event.endTime,
              quantity: event.quantity,
              minPurchaseTime: event.minPurchaseTime,
              maxPurchaseTime: event.maxPurchaseTime,
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
  return <EditRentalEventModalLayout form={getFormByType(event)} />;
};

export default EditRentalEventModal;
