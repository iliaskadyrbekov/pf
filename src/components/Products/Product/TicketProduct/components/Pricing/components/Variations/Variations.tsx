import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Table } from '@components/common/Table';
import { VariationSideover } from './components';
import usePricing from '@hooks/usePricing';
import { Sideover } from '@components/common/Sideover';
import { useFormikContext } from 'formik';
import { Button } from '@components/common/Button';
import VariationsLayout from './VariationsLayout';
import DividedTableLayout from '@components/common/Table/layouts/DividedTableLayout';
import { FormLanguageContext, ILanguage } from 'src/context/FormLanguageContext';
import { IRentalPricingVariation, ITicketPricingVariation, MultiLanguageField } from 'src/shared/interfaces';
import { IDuration } from 'src/shared/interfaces/Duration';
import {
  VariationNameCell,
  PriceCell,
  SettingsCell,
  PricingRow,
} from '@components/Products/Product/RentalProduct/components/Pricing/components/Variations/components';
import { getDefaultLanguageWithCountry } from '../../../../../../../../helpers';
import { DNDCell } from '@components/common/Table/components';

interface IRenderCellProps {
  item: IRentalPricingVariation;
}

export interface IValues {
  name: MultiLanguageField[];
  duration: IDuration;
  price: number | null;
  comparedWithPrice?: number | null;
}

interface IFormikContext {
  product: {
    pricing: [ITicketPricingVariation];
  };
}

const getDefaultItem = (availableLangs: ILanguage[]) => ({
  name: getDefaultLanguageWithCountry(availableLangs),
  price: null,
  comparedWithPrice: null,
});

const Variations = () => {
  const { values, setFieldValue } = useFormikContext<IFormikContext>();
  const variations = values.product.pricing || [];

  const { availableLangs } = React.useContext(FormLanguageContext);

  const { getPrice } = usePricing();
  const [currentVariationIndex, setCurrentVariationIndex] = React.useState<number | undefined>(undefined);

  const [variationDetailsOpen, setVariationDetailsOpen] = React.useState(false);
  const handleVariationDetailsClose = () => {
    setVariationDetailsOpen(false);
  };

  const handleVariationDetailsOpen = (index: number | undefined) => {
    setCurrentVariationIndex(index);
    setVariationDetailsOpen(true);
  };

  const tableHeadRow = [
    {
      renderCell: DNDCell,
    },
    {
      renderCell: ({ item }: IRenderCellProps) => <VariationNameCell name={item.name} />,
      label: 'Variation name',
    },
    {
      renderCell: ({ item }: IRenderCellProps) => <PriceCell price={getPrice(item.comparedWithPrice)} />,
      label: 'Compared with',
    },
    {
      renderCell: ({ item }: IRenderCellProps) => <PriceCell price={getPrice(item.price)} />,
      label: 'price',
    },
    {
      renderCell: ({ index }: { index: number }) => <SettingsCell index={index} onOpen={handleVariationDetailsOpen} />,
    },
  ];

  const handleMoveRow = (dragIndex: number, hoverIndex: number) => {
    const result = Array.from(variations);
    const [removed] = result.splice(dragIndex, 1);
    result.splice(hoverIndex, 0, removed);

    const orderedResult = result.map((el, index) => ({ ...el, order: index }));

    setFieldValue('product.pricing', orderedResult);
  };

  const renderRow = React.useCallback(
    (item, index, headRow) => (
      <PricingRow key={`row-${index}`} item={item} index={index} headRow={headRow} moveRow={handleMoveRow} />
    ),
    [handleMoveRow],
  );

  const currentItem =
    typeof currentVariationIndex === 'number' && variations && variations[currentVariationIndex]
      ? variations[currentVariationIndex]
      : getDefaultItem(availableLangs);

  return (
    <DndProvider backend={HTML5Backend}>
      <VariationsLayout
        variationForm={
          <Sideover isOpen={variationDetailsOpen} onClose={handleVariationDetailsClose}>
            <VariationSideover
              name={currentItem.name}
              price={currentItem.price}
              comparedWithPrice={currentItem.comparedWithPrice}
              index={currentVariationIndex}
              onClose={handleVariationDetailsClose}
            />
          </Sideover>
        }
        table={
          !!variations?.length && (
            <Table Layout={DividedTableLayout} renderRow={renderRow} headRow={tableHeadRow} items={variations} />
          )
        }
        addVariation={
          <Button onClick={() => handleVariationDetailsOpen(undefined)} variant="link" color="primary">
            + Add price
          </Button>
        }
      />
    </DndProvider>
  );
};

export default Variations;
