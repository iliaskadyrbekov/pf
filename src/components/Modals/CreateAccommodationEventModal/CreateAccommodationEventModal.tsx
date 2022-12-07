import React from 'react';
import { useRouter } from 'next/router';
import { ViewApi } from '@fullcalendar/common';

import { Button, Tab, Tabs, TabsLayout } from '@components/common';
import CreateAccommodationEventModalLayout from './CreateAccommodationEventModalLayout';
import RecurringEventForm, { ICreatedRecurringEvent } from './components/RecurringEventForm/RecurringEventForm';
import OneTimeEventForm, { ICreatedOneTimeEvent } from './components/OneTimeEventForm/OneTimeEventForm';

import { ShopContext } from 'src/context';
import { utcToZonedTime } from 'src/helpers';
import { TWeekday } from 'src/shared/types/Weekday';
import { IConnectedAreaResource } from 'src/shared/interfaces/ConnectedAreaResource';
import { AccommodationEventFrequencyType, DurationType, EventType } from 'src/shared/enums';
import {
  ICreateAccommodationOneTimeEventInput,
  ICreateAccommodationRecurringEventInput,
  useCreateAccommodationOneTimeEvent,
  useCreateAccommodationRecurringEvent,
} from '@components/Modals/CreateAccommodationEventModal/mutations';

enum TABS {
  ONE_TIME = 'One time',
  RECURRING = 'Recurring',
}

interface ICalendarEvent {
  date: Date;
  dateStr: string;
  allDay: boolean;
  dayEl: HTMLElement;
  jsEvent: MouseEvent;
  view: ViewApi;
}

interface ICreateAccommodationEventModalProps {
  onClose: () => void;
  calendarEvent: ICalendarEvent;
}

const CreateAccommodationEventModal = ({ onClose, calendarEvent }: ICreateAccommodationEventModalProps) => {
  const router = useRouter();
  const productId = router.query.productId as string;

  const { shop } = React.useContext(ShopContext);

  const tabs = [TABS.ONE_TIME, TABS.RECURRING];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const handleTabClick = React.useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const { mutate: createAccommodationOneTimeEvent } = useCreateAccommodationOneTimeEvent();
  const { mutate: createAccommodationRecurringEvent } = useCreateAccommodationRecurringEvent();

  const prepareOneTimeEventToCreate = (event: ICreatedOneTimeEvent): ICreateAccommodationOneTimeEventInput => {
    const { type, ...eventWithoutType } = event;
    return { ...eventWithoutType, product: productId };
  };

  const prepareRecurringEventToCreate = (event: ICreatedRecurringEvent): ICreateAccommodationRecurringEventInput => {
    const { type, ...eventWithoutType } = event;
    return { ...eventWithoutType, product: productId };
  };

  const handleCreateEvent = (event: ICreatedRecurringEvent | ICreatedOneTimeEvent) => {
    switch (event.type) {
      case EventType.ONE_TIME: {
        return createAccommodationOneTimeEvent({
          variables: { shopId: shop?.id, input: prepareOneTimeEventToCreate(event) },
        });
      }
      case EventType.RECURRING: {
        return createAccommodationRecurringEvent({
          variables: {
            shopId: shop?.id,
            input: prepareRecurringEventToCreate(event),
          },
        });
      }
    }
  };

  const getFormComponent = React.useCallback(
    (activeTab: TABS) => {
      const commonProps = {
        onClose,
      };

      switch (activeTab) {
        case TABS.ONE_TIME:
          return (
            <OneTimeEventForm
              initialValues={{
                startDate: calendarEvent.date,
                type: EventType.ONE_TIME,
                quantity: null,
                minPurchase: null,
                maxPurchase: null,
                minPurchaseTime: { type: DurationType.HOURS, value: null },
                maxPurchaseTime: { type: DurationType.HOURS, value: null },
                connectedResources: [] as IConnectedAreaResource[],
              }}
              onCreateEvent={handleCreateEvent}
              actions={({ handleSubmit }) => [
                <Button variant="contained" color="default" key="1" onClick={onClose}>
                  Close
                </Button>,
                <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="2">
                  Save
                </Button>,
              ]}
              {...commonProps}
            />
          );
        case TABS.RECURRING:
          return (
            <RecurringEventForm
              initialValues={{
                dtstart: utcToZonedTime(calendarEvent.date, shop?.timezone.id),
                freq: AccommodationEventFrequencyType.DAILY,
                interval: 1,
                byweekday: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'] as TWeekday[],
                until: undefined,
                untilEnabled: '0',
                quantity: null,
                type: EventType.RECURRING,
                minPurchase: null,
                maxPurchase: null,
                minPurchaseTime: { type: DurationType.HOURS, value: null },
                maxPurchaseTime: { type: DurationType.HOURS, value: null },
                connectedResources: [] as IConnectedAreaResource[],
              }}
              onCreateEvent={handleCreateEvent}
              actions={({ handleSubmit }) => [
                <Button variant="contained" color="default" key="1" onClick={onClose}>
                  Close
                </Button>,
                <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="2">
                  Save
                </Button>,
              ]}
              {...commonProps}
            />
          );
      }
    },
    [calendarEvent],
  );

  return (
    <CreateAccommodationEventModalLayout
      navigation={
        <Tabs value={activeTab} onChange={handleTabClick} Layout={<TabsLayout className="space-x-8" />}>
          {tabs.map((tab) => (
            <Tab key={tab} value={tab}>
              {tab}
            </Tab>
          ))}
        </Tabs>
      }
      form={getFormComponent(activeTab)}
    />
  );
};

export default CreateAccommodationEventModal;
