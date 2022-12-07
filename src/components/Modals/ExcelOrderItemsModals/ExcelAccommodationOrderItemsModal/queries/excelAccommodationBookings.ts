import { gql } from '@apollo/client';

export type IExcelAccommodationBookingsRes = {
  excelAccommodationBookings: string;
};

export interface IExcelAccommodationBookingsVars {
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

export const EXCEL_ACCOMMODATION_BOOKINGS = gql`
  query ExcelAccommodationBookings(
    $shopId: ObjectId!
    $filters: ExcelBookingsFiltersInput!
    $language: String!
    $fields: ExcelAccommodationBookingsFields!
  ) {
    excelAccommodationBookings(shopId: $shopId, language: $language, filters: $filters, fields: $fields)
  }
`;
