import React from 'react';
import { EventClickArg } from '@fullcalendar/react';
import { DateClickArg } from '@fullcalendar/interaction';

import {
  CreateAccommodationProductModal,
  CreateGiftCardProductModal,
  CreateRentalProductModal,
  CreateTicketProductModal,
} from '@components/Modals/CreateProductModals/components';
import {
  AddOrderModal,
  ConfirmModal,
  ConfirmWithReasonModal,
  CreateActivityModal,
  CreateOrderItemModal,
  CreateRentalCategoryModal,
  CreateTicketEventModal,
  CreateVATModal,
  EditRentalEventModal,
  Modal,
  SendPaymentByEmailModal,
  CreateRentalEventModal,
  AddCheckoutFieldModal,
  EditTicketEventModal,
  EditAccommodationEventModal,
  CreateAccommodationEventModal,
  AddSpecificationFieldModal,
  AddSpecificationFilterFieldModal,
} from '@components/Modals';

import { ActivityType } from 'src/shared/enums';
import { AvailabilityType } from 'src/shared/enums/AvailabilityType';
import { TAccommodationEvent } from 'src/shared/interfaces/AccommodationEvent';
import { IField } from '@components/Modals/AddCheckoutFieldModal/AddCheckoutFieldModal';
import { ExcelTicketOrderItemsModal } from '@components/Modals/ExcelOrderItemsModals/ExcelTicketOrderItemsModal';
import { ICalendarEvent } from '@components/Modals/CreateRentalEventModal/CreateRentalEventModal';
import { ICategory, IEvent, IVAT, TRentalEvent } from 'src/shared/interfaces';
import { ISpecificationField } from '@components/Modals/AddSpecificationFieldModal/AddSpecificationFieldModal';
import { IFilterSpecificationField } from '@components/Modals/AddSpecificationFilterFieldModal/AddSpecificationFilterFieldModal';
import { ISpecificationOption } from '@components/Products/Product/AccommodationProduct/components/Specification/Specification';
import { ExcelAccommodationOrderItemsModal } from '@components/Modals/ExcelOrderItemsModals/ExcelAccommodationOrderItemsModal';
import { CropModal } from '@components/Modals/CropModal';
import { UpdateDepositReopenedOrderModal } from '@components/Modals/UpdateDepositReopenedOrderModal.ts';
import { EditVATModal } from '@components/Modals/EditVATModal';
import {
  TicketBookingsInfoModal,
  RentalBookingsInfoModal,
  AccommodationBookingsInfoModal,
} from '@components/Modals/BookingsInfoModals';
import { AddTeamMemberModal } from '@components/Modals/AddTeamMemberModal';

interface ICropModalProps {
  type: ModalType.CROP;
  props: {
    aspect?: number;
    image: string;
    imageType: string;
    imageName: string;
    onCompleteFile(croppedFile?: File): void;
  };
}

interface ICreateActivityModalProps {
  type: ModalType.ADD_RENTAL_EVENT;
  props: {
    calendarEvent: ICalendarEvent;
  };
}

interface IExcelAccommodationOrderItemsModalProps {
  type: ModalType.EXCEL_ACCOMMODATION_ORDER_ITEMS;
  props: {
    filters: {
      date: {
        from: Date;
        to: Date;
      } | null;
    };
  };
}

interface IExcelTicketOrderItemsModalProps {
  type: ModalType.EXCEL_TICKET_ORDER_ITEMS;
  props: {
    filters: {
      type: ActivityType.TICKET;
      date?: {
        from: Date;
        to: Date;
      } | null;
    };
  };
}

interface IExcelRentalOrderItemsModalProps {
  type: ModalType.EXCEL_RENTAL_ORDER_ITEMS;
  props: {
    filters: {
      type: ActivityType.RENTAL;
      date?: {
        from: Date;
        to: Date;
      } | null;
    };
  };
}

interface ITicketBookingsInfoModalProps {
  type: ModalType.TICKET_BOOKINGS_INFO;
  props: {
    eventId: string;
    date: {
      from: Date;
      to: Date;
    };
  };
}

interface IRentalBookingsInfoModalProps {
  type: ModalType.RENTAL_BOOKINGS_INFO;
  props: {
    eventId: string;
    date: {
      from: Date;
      to: Date;
    };
  };
}

interface IAccommodationBookingsInfoModalProps {
  type: ModalType.ACCOMMODATION_BOOKINGS_INFO;
  props: {
    orderItemId: string;
  };
}

interface ICreateTicketProductModalProps {
  type: ModalType.CREATE_TICKET_PRODUCT;
}

interface ICreateRentalProductModalProps {
  type: ModalType.CREATE_RENTAL_PRODUCT;
}

interface ICreateGiftCardProductModalProps {
  type: ModalType.CREATE_GIFT_CARD_PRODUCT;
}

interface ICreateAccommodationProductModalProps {
  type: ModalType.CREATE_ACCOMMODATION_PRODUCT;
}

interface ICreateRentalCategoryModalProps {
  type: ModalType.CREATE_RENTAL_CATEGORY;
  props: {
    onCreate(category: ICategory): void;
  };
}

interface ICreateVATModalProps {
  type: ModalType.CREATE_VAT;
  props: {
    onCreate(vat?: IVAT): void;
  };
}

interface IEditVATModalProps {
  type: ModalType.EDIT_VAT;
  props: {
    onDelete(): void;
    VAT: {
      id: string;
      value: string;
    };
  };
}

interface IConfirmModalProps {
  type: ModalType.CONFIRM_MODAL;
  props: {
    title: React.ReactNode;
    message: React.ReactNode;
    confirmButtonText?: React.ReactNode;
    onConfirm(): void;
  };
}

interface IConfirmWithReasonModalProps {
  type: ModalType.CONFIRM_WITH_REASON_MODAL;
  props: {
    title: React.ReactNode;
    message: React.ReactNode;
    confirmButtonText?: React.ReactNode;
    onConfirm(reason: string): void;
  };
}

interface IEditRentalEventModalProps {
  type: ModalType.EDIT_RENTAL_EVENT;
  props: {
    event: TRentalEvent;
    calendarEvent: EventClickArg;
  };
}

interface IEditTicketEventModalProps {
  type: ModalType.EDIT_TICKET_EVENT;
  props: {
    event: IEvent;
    calendarEvent: EventClickArg;
    availabilityType: AvailabilityType;
  };
}

interface IAddTicketEventModalProps {
  type: ModalType.ADD_TICKET_EVENT;
  props: {
    calendarEvent: DateClickArg;
    availabilityType: AvailabilityType;
  };
}

interface IAddRentalEventModalProps {
  type: ModalType.CREATE_ACTIVITY;
  props: {
    order: number;
  };
}

interface IEditAccommodationEventModalProps {
  type: ModalType.EDIT_ACCOMMODATION_EVENT;
  props: {
    event: TAccommodationEvent;
    calendarEvent: EventClickArg;
  };
}

interface IAddAccommodationEventModalProps {
  type: ModalType.ADD_ACCOMMODATION_EVENT;
  props: {
    calendarEvent: DateClickArg;
  };
}

interface IAddCheckoutFieldModalProps {
  type: ModalType.ADD_CHECKOUT_FIELD;
  props: {
    onSave(field: IField): void;
    checkoutFields: IField[];
  };
}

interface IAddSpecificationFieldModalProps {
  type: ModalType.ADD_SPECIFICATION_FIELD;
  props: {
    onSave(field: ISpecificationField): void;
    specificationOptions: ISpecificationOption[];
  };
}

interface IAddSpecificationFilterFieldModalProps {
  type: ModalType.ADD_SPECIFICATION_FILTER_FIELD;
  props: {
    onSave(field: IFilterSpecificationField): void;
    specificationOptions: ISpecificationOption[];
  };
}

interface ICreateOrderItemdModalProps {
  type: ModalType.CREATE_ORDER_ITEM;
  props: {
    activityId: string;
    activityType: ActivityType;
  };
}

interface ICheckoutModalProps {
  type: ModalType.CHECKOUT;
  props: {
    orderId: string;
  };
}

interface IAddTeamMemberModalProps {
  type: ModalType.ADD_TEAM_MEMBER;
}

interface ISendPaymentOfferByEmailModalProps {
  type: ModalType.SEND_OFFER_BY_EMAIL;
  props: {
    onCloseWithRedirect(): void;
    email: string;
    companyName?: string;
    phone: string;
    fullName: string;
    amount: number;
    currency: string;
    orderId: string;
    note: string;
    expiresAt?: Date;
    partialPayment?: {
      firstPaymentAmount: number;
      endPaymentDate: Date;
      endPaymentReminderDate: Date;
    };
  };
}

interface IUpdateDepositReopenedOrderModalProps {
  type: ModalType.UPDATE_DEPOSIT_REOPENED_ORDER;
  props: {
    onCloseWithRedirect(): void;
    email: string;
    companyName?: string;
    phone: string;
    fullName: string;
    amount: number;
    currency: string;
    orderId: string;
    note: string;
    expiresAt: Date;
    partialPayment: {
      firstPaymentAmount: number;
      endPaymentDate: Date;
      endPaymentReminderDate: Date;
    };
  };
}

type IModalProps =
  | ICreateActivityModalProps
  | ICreateRentalCategoryModalProps
  | IAddTicketEventModalProps
  | IAddRentalEventModalProps
  | IAddAccommodationEventModalProps
  | IAddTeamMemberModalProps
  | IEditTicketEventModalProps
  | IAddCheckoutFieldModalProps
  | ICreateVATModalProps
  | IConfirmModalProps
  | ICreateTicketProductModalProps
  | ICreateRentalProductModalProps
  | ICreateGiftCardProductModalProps
  | ICreateAccommodationProductModalProps
  | ICreateOrderItemdModalProps
  | ICheckoutModalProps
  | ISendPaymentOfferByEmailModalProps
  | IConfirmWithReasonModalProps
  | IEditRentalEventModalProps
  | IEditAccommodationEventModalProps
  | IAddSpecificationFieldModalProps
  | IExcelRentalOrderItemsModalProps
  | IAddSpecificationFilterFieldModalProps
  | IExcelAccommodationOrderItemsModalProps
  | ICropModalProps
  | IUpdateDepositReopenedOrderModalProps
  | IEditVATModalProps
  | ITicketBookingsInfoModalProps
  | IRentalBookingsInfoModalProps
  | IAccommodationBookingsInfoModalProps
  | IExcelTicketOrderItemsModalProps;

export enum ModalType {
  CREATE_ACTIVITY,
  ADD_TICKET_EVENT,
  ADD_RENTAL_EVENT,
  ADD_TEAM_MEMBER,
  CROP,
  ADD_ACCOMMODATION_EVENT,
  CREATE_TICKET_PRODUCT,
  CREATE_RENTAL_PRODUCT,
  CREATE_RENTAL_CATEGORY,
  CREATE_VAT,
  EDIT_RENTAL_EVENT,
  EDIT_TICKET_EVENT,
  EDIT_ACCOMMODATION_EVENT,
  ADD_CHECKOUT_FIELD,
  ADD_SPECIFICATION_FIELD,
  CONFIRM_MODAL,
  CONFIRM_WITH_REASON_MODAL,
  CREATE_ORDER_ITEM,
  SEND_OFFER_BY_EMAIL,
  UPDATE_DEPOSIT_REOPENED_ORDER,
  CHECKOUT,
  CREATE_GIFT_CARD_PRODUCT,
  CREATE_ACCOMMODATION_PRODUCT,
  EXCEL_TICKET_ORDER_ITEMS,
  EXCEL_RENTAL_ORDER_ITEMS,
  ADD_SPECIFICATION_FILTER_FIELD,
  EXCEL_ACCOMMODATION_ORDER_ITEMS,
  EDIT_VAT,
  TICKET_BOOKINGS_INFO,
  RENTAL_BOOKINGS_INFO,
  ACCOMMODATION_BOOKINGS_INFO,
}

interface IModalProvider {
  handleOpenModal(props: IModalProps): void;
  handleCloseModal(): void;
}

interface IModalProviderProps {
  children: React.ReactNode;
  modalProps?: IModalProps | null;
}

export const ModalContext = React.createContext<IModalProvider>({
  handleOpenModal: ({ type }: IModalProps) => type,
  handleCloseModal: () => {
    return undefined;
  },
});

export const ModalProvider = ({ children, modalProps = null }: IModalProviderProps) => {
  const [modal, setModal] = React.useState<IModalProps | null>(modalProps);

  const handleOpenModal = React.useCallback((props: IModalProps) => {
    setModal(props);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setModal(null);
  }, []);

  const getModalByType = (modal: IModalProps | null) => {
    if (!modal) {
      return null;
    }

    switch (modal.type) {
      case ModalType.CREATE_ACTIVITY:
        return <CreateActivityModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.ADD_TICKET_EVENT:
        return <CreateTicketEventModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.ADD_RENTAL_EVENT:
        return <CreateRentalEventModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.ADD_ACCOMMODATION_EVENT:
        return <CreateAccommodationEventModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.CREATE_RENTAL_CATEGORY:
        return <CreateRentalCategoryModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.EDIT_RENTAL_EVENT:
        return <EditRentalEventModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.EDIT_TICKET_EVENT:
        return <EditTicketEventModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.EDIT_ACCOMMODATION_EVENT:
        return <EditAccommodationEventModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.ADD_TEAM_MEMBER:
        return <AddTeamMemberModal onClose={handleCloseModal} />;
      case ModalType.ADD_CHECKOUT_FIELD:
        return <AddCheckoutFieldModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.ADD_SPECIFICATION_FIELD:
        return <AddSpecificationFieldModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.ADD_SPECIFICATION_FILTER_FIELD:
        return <AddSpecificationFilterFieldModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.CREATE_VAT:
        return <CreateVATModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.EDIT_VAT:
        return <EditVATModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.CONFIRM_MODAL:
        return <ConfirmModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.CONFIRM_WITH_REASON_MODAL:
        return <ConfirmWithReasonModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.CREATE_TICKET_PRODUCT:
        return <CreateTicketProductModal onClose={handleCloseModal} />;
      case ModalType.CREATE_RENTAL_PRODUCT:
        return <CreateRentalProductModal onClose={handleCloseModal} />;
      case ModalType.CREATE_GIFT_CARD_PRODUCT:
        return <CreateGiftCardProductModal onClose={handleCloseModal} />;
      case ModalType.CREATE_ACCOMMODATION_PRODUCT:
        return <CreateAccommodationProductModal onClose={handleCloseModal} />;
      case ModalType.CREATE_ORDER_ITEM:
        return <CreateOrderItemModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.CHECKOUT:
        return <AddOrderModal {...modal.props} onClose={handleCloseModal} />;
      case ModalType.SEND_OFFER_BY_EMAIL:
        return <SendPaymentByEmailModal onClose={handleCloseModal} {...modal.props} />;
      case ModalType.UPDATE_DEPOSIT_REOPENED_ORDER:
        return <UpdateDepositReopenedOrderModal onClose={handleCloseModal} {...modal.props} />;
      case ModalType.EXCEL_RENTAL_ORDER_ITEMS:
        return <ExcelTicketOrderItemsModal onClose={handleCloseModal} {...modal.props} />;
      case ModalType.EXCEL_TICKET_ORDER_ITEMS:
        return <ExcelTicketOrderItemsModal onClose={handleCloseModal} {...modal.props} />;
      case ModalType.EXCEL_ACCOMMODATION_ORDER_ITEMS:
        return <ExcelAccommodationOrderItemsModal onClose={handleCloseModal} {...modal.props} />;
      case ModalType.CROP:
        return <CropModal onClose={handleCloseModal} {...modal.props} />;
      case ModalType.TICKET_BOOKINGS_INFO:
        return <TicketBookingsInfoModal onClose={handleCloseModal} {...modal.props} />;
      case ModalType.RENTAL_BOOKINGS_INFO:
        return <RentalBookingsInfoModal onClose={handleCloseModal} {...modal.props} />;
      case ModalType.ACCOMMODATION_BOOKINGS_INFO:
        return <AccommodationBookingsInfoModal onClose={handleCloseModal} {...modal.props} />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ handleOpenModal, handleCloseModal }}>
      <Modal isOpen={!!modal}>{getModalByType(modal)}</Modal>
      {children}
    </ModalContext.Provider>
  );
};
