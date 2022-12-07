import React from 'react';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { MultiLanguageField } from 'src/shared/interfaces';

interface IProductCellProps {
  item: {
    name: MultiLanguageField[];
    activityName: MultiLanguageField[];
  };
  index: number;
}

const classes = {
  wrapper: 'px-6 py-4 flex flex-col',
  productName: 'text-sm font-medium leading-tight text-gray-900',
  activityName: 'text-sm leading-tight text-gray-500',
};

const ProductCell = ({ item, index }: IProductCellProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);
  return (
    <td className={classes.wrapper} key={index}>
      <p className={classes.productName}>{getMultiLanguageValue(item.name)}</p>
      <p className={classes.activityName}>{getMultiLanguageValue(item.activityName)}</p>
    </td>
  );
};

export default ProductCell;
