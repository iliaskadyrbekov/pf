import React from 'react';
import { useRouter } from 'next/router';
import { ViewApi } from '@fullcalendar/common';

import CreateTicketEventModalLayout from './CreateTicketEventModalLayout';
import { Tabs, TabsLayout } from '@components/common/Tabs';
import { OneTimeEventForm, RecurringEventForm } from './components';
import { Tab } from '@components/common/Tab';
import { Button } from '@components/common/Button';
import { DurationType } from 'src/shared/enums/DurationType';
import { TWeekday } from 'src/shared/types/Weekday';
import { EventFrequencyType } from 'src/shared/enums/EventFrequencyType';
import { EventType } from 'src/shared/enums/EventType';
import { ShopContext } from 'src/context/ShopContext';
import { ICreatedOneTimeEvent } from './components/OneTimeEventForm/OneTimeEventForm';
import { ICreateOneTimeEventInput, useCreateOneTimeEvent } from './mutations/createOneTimeEvent';
import { ICreateRecurringEventInput, useCreateRecurringEvent } from './mutations/createRecurringEvent';
import { ICreatedRecurringEvent } from './components/RecurringEventForm/RecurringEventForm';
import { IConnectedAvailabilityResource } from 'src/shared/interfaces/ConnectedAvailabilityResource';
import { utcToZonedTime } from 'src/helpers';
import { AvailabilityType } from 'src/shared/enums/AvailabilityType';

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

interface ICreateTicketEventModalProps {
  onClose: () => void;
  calendarEvent: ICalendarEvent;
  availabilityType: AvailabilityType;
}

const CreateTicketEventModal = ({ onClose, calendarEvent, availabilityType }: ICreateTicketEventModalProps) => {
  const router = useRouter();
  const productId = router.query.productId as string;

  const { shop } = React.useContext(ShopContext);

  const tabs = [TABS.ONE_TIME, TABS.RECURRING];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const handleTabClick = React.useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const { mutate: createRecurringEvent } = useCreateRecurringEvent();
  const { mutate: createOneTimeEvent } = useCreateOneTimeEvent();

  const prepareOneTimeEventToCreate = (event: ICreatedOneTimeEvent): ICreateOneTimeEventInput => {
    return { ...event, product: productId };
  };

  const prepareRecurringEventToCreate = (event: ICreatedRecurringEvent): ICreateRecurringEventInput => {
    return { ...event, product: productId, tzid: shop?.timezone.id };
  };

  const handleCreateEvent = (event: ICreatedRecurringEvent | ICreatedOneTimeEvent) => {
    switch (event.type) {
      case EventType.ONE_TIME: {
        return createOneTimeEvent({ variables: { shopId: shop?.id, input: prepareOneTimeEventToCreate(event) } });
      }
      case EventType.RECURRING: {
        return createRecurringEvent({
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
                allDay: calendarEvent.allDay,
                startDate: calendarEvent.date,
                type: EventType.ONE_TIME,
                quantity: null,
                minPurchase: null,
                maxPurchase: null,
                minPurchaseTime: { type: DurationType.HOURS, value: null },
                maxPurchaseTime: { type: DurationType.HOURS, value: null },
                connectedResources: [] as IConnectedAvailabilityResource[],
              }}
              availabilityType={availabilityType}
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
                allDay: calendarEvent.allDay,
                dtstart: utcToZonedTime(calendarEvent.date, shop?.timezone.id),
                freq: EventFrequencyType.DAY,
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
                connectedResources: [] as IConnectedAvailabilityResource[],
              }}
              availabilityType={availabilityType}
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
    <CreateTicketEventModalLayout
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

export default CreateTicketEventModal;
