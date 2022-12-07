import React from 'react';
import { useRouter } from 'next/router';
import { ViewApi } from '@fullcalendar/common';

import CreateRentalEventModalLayout from './CreateRentalEventModalLayout';
import { Tabs, TabsLayout } from '@components/common/Tabs';
import { OneTimeEventForm, RecurringEventForm } from './components';
import { Tab } from '@components/common/Tab';
import { ICreatedOneTimeEvent } from './components/OneTimeEventForm/OneTimeEventForm';
import { ICreatedRentalEvent } from './components/RecurringEventForm/RecurringEventForm';
import { DurationType } from 'src/shared/enums/DurationType';
import { EventType } from 'src/shared/enums/EventType';
import { TWeekday } from 'src/shared/types/Weekday';
import { Button } from '@components/common/Button';
import {
  ICreateRentalOneTimeEventInput,
  useCreateRentalOneTimeEvent,
} from 'src/graphql/mutations/createRentalOneTimeEvent';
import {
  ICreateRentalRecurringEventInput,
  useCreateRentalRecurringEvent,
} from 'src/graphql/mutations/createRentalRecurringEvent';
import { ShopContext } from 'src/context/ShopContext';
import { utcToZonedTime } from 'src/helpers';
import { RentalEventFrequencyType } from 'src/shared/enums';

enum TABS {
  ONE_TIME = 'One time',
  RECURRING = 'Recurring',
}

export interface ICalendarEvent {
  date: Date;
  dateStr: string;
  allDay: boolean;
  dayEl: HTMLElement;
  jsEvent: MouseEvent;
  view: ViewApi;
}

interface IModalProps {
  onClose: () => void;
}

interface ICreateRentalEventModalProps {
  calendarEvent: ICalendarEvent;
}

const CreateRentalEventModal = ({ onClose, calendarEvent }: ICreateRentalEventModalProps & IModalProps) => {
  const router = useRouter();
  const productId = router.query.productId as string;

  const { shop } = React.useContext(ShopContext);

  const tabs = [TABS.ONE_TIME, TABS.RECURRING];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const handleTabClick = React.useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const { mutate: createRentalRecurringEvent } = useCreateRentalRecurringEvent();
  const { mutate: createRentalOneTimeEvent } = useCreateRentalOneTimeEvent();

  const prepareOneTimeEventToCreate = (event: ICreatedOneTimeEvent): ICreateRentalOneTimeEventInput => {
    return { ...event, product: productId };
  };

  const prepareRecurringEventToCreate = (event: ICreatedRentalEvent): ICreateRentalRecurringEventInput => {
    return { ...event, product: productId, tzid: shop?.timezone.id };
  };

  const handleCreateEvent = (event: ICreatedRentalEvent | ICreatedOneTimeEvent) => {
    switch (event.type) {
      case EventType.ONE_TIME: {
        return createRentalOneTimeEvent({ variables: { shopId: shop?.id, input: prepareOneTimeEventToCreate(event) } });
      }
      case EventType.RECURRING: {
        return createRentalRecurringEvent({
          variables: { shopId: shop?.id, input: prepareRecurringEventToCreate(event) },
        });
      }
    }
  };

  const getFormComponent = React.useCallback(
    (activeTab: TABS) => {
      const commonProps = {
        onClose,
        onCreateEvent: handleCreateEvent,
        calendarEvent,
      };

      switch (activeTab) {
        case TABS.ONE_TIME:
          return (
            <OneTimeEventForm
              initialValues={{
                startDate: calendarEvent.date,
                type: EventType.ONE_TIME,
                startTime: null,
                endTime: null,
                quantity: null,
                minPurchaseTime: { type: DurationType.HOURS, value: null },
                maxPurchaseTime: { type: DurationType.HOURS, value: null },
              }}
              actions={({ handleSubmit }) => [
                <Button variant="contained" color="default" key="2" onClick={onClose}>
                  Close
                </Button>,
                <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="3">
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
                type: EventType.RECURRING,
                dtstart: utcToZonedTime(calendarEvent.date, shop?.timezone.id),
                freq: RentalEventFrequencyType.DAILY,
                interval: 1,
                byweekday: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'] as TWeekday[],
                until: undefined,
                untilEnabled: '0',
                quantity: null,
                startTime: null,
                endTime: null,
                minPurchaseTime: { type: DurationType.HOURS, value: null },
                maxPurchaseTime: { type: DurationType.HOURS, value: null },
              }}
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
    <CreateRentalEventModalLayout
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

export default CreateRentalEventModal;
