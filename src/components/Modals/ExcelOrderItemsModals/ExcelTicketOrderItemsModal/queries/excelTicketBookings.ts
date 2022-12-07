import { gql } from '@apollo/client';

export type IExcelTicketBookingsRes = {
  excelTicketBookings: string;
};

export interface IExcelTicketBookingsVars {
  shopId?: string;
  language?: string;
  filters: {
    activity: string;
    date: {
      from: Date;
      to: Date;
    };
  };
  fields: {
    reservationId?: boolean;
    dateTime?: boolean;
    assignedName?: boolean;
    productName?: boolean;
    paymentStatus?: boolean;
    formFields?: boolean;
  };
}

export const EXCEL_TICKET_BOOKINGS = gql`
  query ExcelTicketBookings(
    $shopId: ObjectId!
    $filters: ExcelBookingsFiltersInput!
    $language: String!
    $fields: ExcelTicketBookingsFields!
  ) {
    excelTicketBookings(shopId: $shopId, language: $language, filters: $filters, fields: $fields)
  }
`;
