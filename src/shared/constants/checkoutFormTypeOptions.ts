import {
  UserIcon,
  HashtagIcon,
  CalendarIcon,
  CursorClickIcon,
  QuestionMarkCircleIcon,
  AdjustmentsIcon,
  ViewListIcon,
} from '@heroicons/react/outline';

import { CHECKOUT_FORM_FIELD_TYPE } from '../enums/CheckoutFormFieldType';

export const CHECKOUT_FORM_TYPE_OPTIONS = [
  {
    Icon: UserIcon,
    label: 'Name',
    value: CHECKOUT_FORM_FIELD_TYPE.NAME,
  },
  {
    Icon: HashtagIcon,
    label: 'Number',
    value: CHECKOUT_FORM_FIELD_TYPE.NUMBER,
  },
  {
    Icon: CalendarIcon,
    label: 'Calendar',
    value: CHECKOUT_FORM_FIELD_TYPE.CALENDAR,
  },
  {
    Icon: CursorClickIcon,
    label: 'Terms checkbox',
    value: CHECKOUT_FORM_FIELD_TYPE.TERMS_CHECKBOX,
  },
  {
    Icon: QuestionMarkCircleIcon,
    label: 'Extra information',
    value: CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO,
  },
  {
    Icon: AdjustmentsIcon,
    label: 'Options to select',
    value: CHECKOUT_FORM_FIELD_TYPE.OPTIONS,
  },
  {
    Icon: ViewListIcon,
    label: 'Free text',
    value: CHECKOUT_FORM_FIELD_TYPE.FREE_TEXT,
  },
];
