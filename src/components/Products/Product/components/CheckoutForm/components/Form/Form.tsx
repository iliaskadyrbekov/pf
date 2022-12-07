import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Table } from '@components/common/Table';
import { CheckoutField } from '../CheckoutField';
import { HeadCell } from '../../../Cell';
import SimpleTableLayout from '@components/common/Table/layouts/SimpleTableLayout';
import {
  NameCell,
  OptionsCell,
  OptionsHeadCell,
  PrintOnTicketCell,
  RemoveCell,
  RequiredCell,
  TypeCell,
} from './components';

import { MultiLanguageField } from 'src/shared/interfaces';
import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import { MultiLanguageArrayField } from 'src/shared/interfaces/MultiLanguageArrayField';
import { DNDCell } from '@components/common/Table/components';

interface IField {
  type: CHECKOUT_FORM_FIELD_TYPE;
  name: MultiLanguageField[];
  options?: MultiLanguageField[] | MultiLanguageArrayField[];
  isRequired: boolean;
  shouldBePrinted: boolean;
  order: number;
}

interface IFormProps {
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (index: number) => void;
  items: IField[];
  fieldName: string;
}

const Form = ({ moveRow, onRemove, items, fieldName }: IFormProps) => {
  const tableHeadRow = [
    {
      renderCell: DNDCell,
      renderHeadCell: HeadCell,
    },
    {
      renderCell: ({ item }: { item: IField }) => <TypeCell name={`${fieldName}[${item.order}]`} />,
      renderHeadCell: HeadCell,
      label: 'Type',
    },
    {
      renderCell: ({ item }: { item: IField }) => <NameCell name={`${fieldName}[${item.order}]`} />,
      renderHeadCell: HeadCell,
      label: 'Name',
    },
    {
      renderCell: ({ item }: { item: IField }) => <OptionsCell field={item} name={`${fieldName}[${item.order}]`} />,
      renderHeadCell: OptionsHeadCell,
      label: 'Options',
    },
    {
      renderCell: ({ item }: { item: IField }) => (
        <RequiredCell type={item.type} name={`${fieldName}[${item.order}]`} />
      ),
      renderHeadCell: HeadCell,
      label: 'Required',
    },
    {
      renderCell: ({ item }: { item: IField }) => (
        <PrintOnTicketCell type={item.type} name={`${fieldName}[${item.order}]`} />
      ),
      renderHeadCell: HeadCell,
      label: 'Print on ticket',
    },
    {
      renderCell: ({ index }: { index: number }) => <RemoveCell index={index} onRemove={onRemove} />,
      renderHeadCell: HeadCell,
    },
  ];

  if (!items?.length) {
    return null;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        Layout={SimpleTableLayout}
        renderRow={(item, index, headRow) => (
          <CheckoutField key={`row-${index}`} item={item} index={index} headRow={headRow} moveRow={moveRow} />
        )}
        headRow={tableHeadRow}
        items={items}
      />
    </DndProvider>
  );
};

export default Form;
