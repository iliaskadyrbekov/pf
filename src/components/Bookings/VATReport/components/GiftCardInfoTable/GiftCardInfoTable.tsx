import React from 'react';

import { Table } from '@components/common';
import { IVATReportGiftCardInfo } from 'src/shared/interfaces';
import { NumberCell } from '../NumberCell';
import { GiftCardInfoCell } from '../GiftCardInfoCell';

interface IGiftCardInfoTableProps {
  giftCardCollectedInfo: IVATReportGiftCardInfo[];
  giftCardRedeemedInfo: IVATReportGiftCardInfo[];
}

enum GiftCardInfoType {
  REDEEMED,
  COLLECTED,
}

interface IGiftCardInfoExtended extends IVATReportGiftCardInfo {
  type: GiftCardInfoType;
}

const giftCardType = {
  [GiftCardInfoType.COLLECTED]: 'Collected',
  [GiftCardInfoType.REDEEMED]: 'Redeemed',
};

const GiftCardInfoTable = ({ giftCardCollectedInfo, giftCardRedeemedInfo }: IGiftCardInfoTableProps) => {
  const tableHeadRow = [
    {
      label: 'CREDIT',
      accessor: (item: IGiftCardInfoExtended) => ({
        name: 'Gift card',
        caption: giftCardType[item.type],
      }),
      renderCell: GiftCardInfoCell,
    },
    {
      label: 'AMOUNT',
      accessor: (item: IGiftCardInfoExtended) => `${item.currency} ${item.value.toFixed(2)}`,
      renderCell: NumberCell,
    },
  ];

  const items: IGiftCardInfoExtended[] = [
    ...giftCardCollectedInfo.map((el) => ({ ...el, type: GiftCardInfoType.COLLECTED })),
    ...giftCardRedeemedInfo.map((el) => ({ ...el, type: GiftCardInfoType.REDEEMED })),
  ];

  return <Table headRow={tableHeadRow} items={items} />;
};

export default GiftCardInfoTable;
