import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Table } from '@components/common/Table';
import { EditLink, VisibilityCell } from '../..';

import { getPricing } from '../helpers';
import { ShopContext } from 'src/context/ShopContext';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { TProduct, ITicketProduct } from 'src/shared/interfaces/Product';
import { DraggableTableRow } from '@components/common/Table/components';
import { useReorderProducts } from '@components/Products/Activity/mutations/reorderProducts.mutation';
import { DNDCell } from '@components/common/Table/components';

interface ITicketActivityTableProps {
  products: TProduct[];
  activityId: string;
}

const TicketActivityTable = ({ products, activityId }: ITicketActivityTableProps) => {
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const [reorderProducts] = useReorderProducts();

  const handleMoveRow = (dragIndex: number, hoverIndex: number) => {
    const result = Array.from(products);
    const [removed] = result.splice(dragIndex, 1);
    result.splice(hoverIndex, 0, removed);

    const orderedResult = result.map((el, index) => ({ id: el.id, order: index }));

    reorderProducts({
      variables: { shopId: shop?.id, input: { activityId, products: orderedResult } },
    });
  };

  const tableHeadRow = [
    {
      renderCell: DNDCell,
      width: '1px',
    },
    {
      label: 'Product',
      accessor: ({ name }: TProduct) => getMultiLanguageValue(name),
    },
    {
      label: 'Price',
      accessor: (product: TProduct) => getPricing((product as ITicketProduct).pricing, shop?.currency.symbolNative),
    },
    { label: 'Inventory', accessor: 'name.ru' },
    { label: 'Campaign', accessor: 'name.ru' },
    { label: 'Published', accessor: 'visibility', renderCell: VisibilityCell },
    {
      label: 'Edit',
      renderCell: EditLink,
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        headRow={tableHeadRow}
        renderRow={(item, index, headRow, emptyValue) => (
          <DraggableTableRow
            key={`row-${index}`}
            item={item}
            index={index}
            headRow={headRow}
            moveRow={handleMoveRow}
            emptyValue={emptyValue}
          />
        )}
        items={products}
        emptyValue="-"
      />
    </DndProvider>
  );
};

export default TicketActivityTable;
