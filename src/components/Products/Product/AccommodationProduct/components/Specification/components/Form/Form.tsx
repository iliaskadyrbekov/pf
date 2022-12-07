import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Table } from '@components/common/Table';
import { SpecificationField } from '../SpecificationField';
import { AmountCell, RemoveCell, TypeCell } from './components';
import { HeadCell } from '@components/Products/Product/components';
import SimpleTableLayout from '@components/common/Table/layouts/SimpleTableLayout';

import { ISpecificationOption } from '../../Specification';
import { IAccommodationSpecification } from 'src/shared/interfaces';
import { DNDCell } from '@components/common/Table/components';

interface IFormProps {
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (index: number) => void;
  specifications: IAccommodationSpecification[];
  specificationOptions: ISpecificationOption[];
  fieldName: string;
}

const Form = ({ moveRow, onRemove, specifications, fieldName, specificationOptions }: IFormProps) => {
  const tableHeadRow = [
    {
      renderCell: DNDCell,
      renderHeadCell: HeadCell,
    },
    {
      renderCell: ({ item }: { item: IAccommodationSpecification }) => (
        <TypeCell name={`${fieldName}[${item.order}]`} specificationOptions={specificationOptions} />
      ),
      renderHeadCell: HeadCell,
      label: 'Type',
    },
    {
      renderCell: ({ item }: { item: IAccommodationSpecification }) => (
        <AmountCell name={`${fieldName}[${item.order}]`} />
      ),
      renderHeadCell: HeadCell,
      label: 'Amount',
    },
    {
      renderCell: ({ index }: { index: number }) => <RemoveCell index={index} onRemove={onRemove} />,
      renderHeadCell: HeadCell,
    },
  ];

  if (!specifications?.length) {
    return null;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        Layout={SimpleTableLayout}
        renderRow={(item, index, headRow) => (
          <SpecificationField key={`row-${index}`} item={item} index={index} headRow={headRow} moveRow={moveRow} />
        )}
        headRow={tableHeadRow}
        items={specifications}
      />
    </DndProvider>
  );
};

export default Form;
