import React from 'react';

import { AmountOrPercentageInput } from '@components/common/AmountOrPercentageInput';

import { useDebounce } from '@hooks/useDebounce';
import { IDiscount } from 'src/shared/interfaces/Discount';
import { DiscountType } from 'src/shared/enums/DiscountType';
import { IOrderItem } from 'src/shared/interfaces/OrderItem';

interface IDiscountCellProps {
  item: IOrderItem;
  setLoading: (id: string) => void;
  setNotLoading: (id: string) => void;
  onChange: (id: string, discount: IDiscount) => Promise<unknown>;
}

const DiscountCell = ({ item, setLoading, setNotLoading, onChange }: IDiscountCellProps) => {
  const didMountRef = React.useRef(false);
  const [discount, setDiscount] = React.useState({
    value: item.orderItem.discount?.value || 0,
    type: item.orderItem.discount?.type || DiscountType.PERCENTAGE,
  });

  const debouncedDiscount = useDebounce(discount, 500);

  const handleDiscountChange = (discount: IDiscount) => {
    setLoading(item.orderItem.id);
    setDiscount(discount);
  };

  React.useEffect(() => {
    if (didMountRef.current) {
      onChange(item.orderItem.id, debouncedDiscount).then(() => {
        setNotLoading(item.orderItem.id);
      });
    } else {
      didMountRef.current = true;
    }
  }, [debouncedDiscount]);

  return (
    <AmountOrPercentageInput
      onChange={handleDiscountChange}
      value={discount}
      maxByAmount={item.orderItem.pricing.price}
    />
  );
};

export default DiscountCell;
