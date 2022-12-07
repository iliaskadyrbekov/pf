import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Table } from '@components/common';
import { HeadCell, RemoveCell, TypeCell } from './components';
import { FilterSpecificationField } from '../FilterSpecificationField';
import SimpleTableLayout from '@components/common/Table/layouts/SimpleTableLayout';

import { IAccommodationActivitySpecification } from 'src/shared/interfaces';
import { ISpecificationOption } from '@components/Products/Product/AccommodationProduct/components/Specification/Specification';
import { DNDCell } from '@components/common/Table/components';

interface IFormProps {
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (index: number) => void;
  specificationFilter: IAccommodationActivitySpecification[];
  specificationOptions: ISpecificationOption[];
  fieldName: string;
}

const Form = ({ moveRow, onRemove, specificationFilter, fieldName, specificationOptions }: IFormProps) => {
  const tableHeadRow = [
    {
      renderCell: DNDCell,
      renderHeadCell: HeadCell,
    },
    {
      renderCell: ({ item }: { item: IAccommodationActivitySpecification }) => (
        <TypeCell name={`${fieldName}[${item.order}]`} specificationOptions={specificationOptions} />
      ),
      renderHeadCell: HeadCell,
      label: 'Type',
    },
    {
      renderCell: ({ index }: { index: number }) => <RemoveCell index={index} onRemove={onRemove} />,
      renderHeadCell: HeadCell,
    },
  ];

  if (!specificationFilter?.length) {
    return null;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        Layout={SimpleTableLayout}
        renderRow={(item, index, headRow) => (
          <FilterSpecificationField
            key={`row-${index}`}
            item={item}
            index={index}
            headRow={headRow}
            moveRow={moveRow}
          />
        )}
        headRow={tableHeadRow}
        items={specificationFilter}
      />
    </DndProvider>
  );
};

export default Form;
