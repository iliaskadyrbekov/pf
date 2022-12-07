import React from 'react';
import { ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/react/outline';

import { Popover, Table, Toggle } from '@components/common';
import { FormLanguageContext, ModalContext, ShopContext } from 'src/context';
import { getBuyerNameFromCheckoutForm } from 'src/helpers/getBuyerNameFromCheckoutForm';
import { ITicketOrderItem } from 'src/shared/interfaces';
import { CellLayout, CheckoutFormCell, CollapsableTableRow, BuyerCell } from '@components/common/Table/components';
import { OrderInfoCell } from '../../../components';
import WithoutOverflowTalbeLayout from '@components/common/Table/layouts/WithoutOverflowTableLayout';
import { createOrPush } from '@utils/createOrPush';
import { useRegisterTickerOrderItem } from './mutations/registerTicketOrderItem';
import { classNames } from '@utils/classNames';
import { DescriptionList, DescriptionListItem, DescriptionListItems } from '@components/common/DescriptionList';

interface IAttendeesProps {
  orderItems: ITicketOrderItem[];
}

const Attendees = ({ orderItems }: IAttendeesProps) => {
  const { handleCloseModal } = React.useContext(ModalContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);
  const { shop } = React.useContext(ShopContext);

  const { mutate: registerTicketOrderItem } = useRegisterTickerOrderItem();

  const handleToggle = (id: string, isRegistered: boolean) => {
    registerTicketOrderItem({ variables: { id, isRegistered } });
  };

  const handleRenderExpandedContent = (items: ITicketOrderItem[]) => {
    return items.map((item, index) => (
      <tr key={index}>
        <CellLayout />
        <BuyerCell
          index={index}
          item={{
            buyerName: getBuyerNameFromCheckoutForm(item.checkoutForm) || item.order.buyer?.fullName,
            pricingName: getMultiLanguageValue(item.pricing.name),
          }}
        />
        <CellLayout>
          {item.pricing.price}
          {item.order.payment?.[0]?.currency.symbolNative ?? shop?.currency.symbolNative}
        </CellLayout>
        <CheckoutFormCell item={item} />
        <CellLayout>1</CellLayout>
        <OrderInfoCell
          onClick={handleCloseModal}
          index={index}
          item={{
            shortId: item.order.shortId,
            id: item.order.id,
            note: item.order.note,
          }}
        />
        <CellLayout>
          <Popover
            renderLabel={() => <DotsHorizontalIcon className="h-4 w-4" />}
            panelClassName="w-max"
            placement="bottom"
          >
            <DescriptionList className="shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <DescriptionListItems>
                <DescriptionListItem colSpan={{ default: 'col-span-2' }} label="Res id" item={item.shortId} />
                <DescriptionListItem
                  colSpan={{ default: 'col-span-2' }}
                  label="Register"
                  item={<Toggle value={item.isRegistered} onChange={() => handleToggle(item.id, !item.isRegistered)} />}
                />
              </DescriptionListItems>
            </DescriptionList>
          </Popover>
        </CellLayout>
      </tr>
    ));
  };

  const tableHeadRow = [
    {
      renderCell: ({ props: { isOpenExpander } }: { props: { isOpenExpander: boolean } }) => (
        <CellLayout className="w-8">
          <ChevronRightIcon className={classNames('h-5 w-5 mx-auto', isOpenExpander && 'rotate-90')} />
        </CellLayout>
      ),
    },
    {
      label: 'NAME',
      renderCell: () => <CellLayout />,
    },
    {
      label: 'PRICE',
      renderCell: () => <CellLayout />,
    },
    {
      label: 'CHECKOUT FORM',
      renderCell: () => <CellLayout />,
    },
    {
      label: 'ITEMS',
      renderCell: ({ item }: { item: ITicketOrderItem[] }) => <CellLayout>{item.length}</CellLayout>,
    },
    {
      label: 'ORDER ID',
      accessor: (orderItem: ITicketOrderItem[]) => ({
        shortId: orderItem[0].order.shortId,
        id: orderItem[0].order.id,
        note: orderItem[0].order.note,
      }),
      renderCell: ({ item, index }: { item: { shortId: string; id: string; note?: string }; index: number }) => (
        <OrderInfoCell item={item} index={index} onClick={handleCloseModal} />
      ),
    },
    {
      renderCell: () => <CellLayout />,
    },
  ];

  const groupedByOrderOrderItems = orderItems.reduce<Record<string, ITicketOrderItem[]>>(
    (acc, cur) => createOrPush(acc, cur.order.id, cur),
    {},
  );

  const items = Object.values(groupedByOrderOrderItems);

  return (
    <Table
      Layout={WithoutOverflowTalbeLayout}
      headRow={tableHeadRow}
      items={items}
      renderRow={(orderItems, index, headRow) => (
        <CollapsableTableRow
          headRow={headRow}
          items={orderItems}
          renderContent={handleRenderExpandedContent}
          key={index}
        />
      )}
    />
  );
};

export default Attendees;
