import moment from 'moment-timezone';
import { useRouter } from 'next/router';

import { isNumber } from '@utils/isNumber';

export const parseURL = (): { productId: string | null; date: Date | null } => {
  const router = useRouter();
  const { productId, date } = router.query;

  return {
    productId: !productId ? null : Array.isArray(productId) ? productId[0] : productId,
    date: !date
      ? null
      : Array.isArray(date)
      ? moment(date[0], 'DD-MM-YYYY').toDate()
      : moment(date, 'DD-MM-YYYY').toDate(),
  };
};

interface IGetCounterInitialValueProps {
  availablePlaces?: number;
  alreadyBookedItemsLength: number;
  minPurchase?: number | null;
  maxPurchase?: number | null;
}

export const getCounterInitialValue = ({
  availablePlaces,
  alreadyBookedItemsLength,
  minPurchase,
  maxPurchase,
}: IGetCounterInitialValueProps) => {
  if (availablePlaces) {
    if (maxPurchase && isNumber(maxPurchase) && alreadyBookedItemsLength === maxPurchase) {
      return 0;
    }

    if (minPurchase && isNumber(minPurchase)) {
      if (alreadyBookedItemsLength >= minPurchase) {
        return 1;
      } else if (availablePlaces >= minPurchase) {
        return minPurchase;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  } else {
    return 0;
  }
};

interface IGetLeftPlacesProps {
  availablePlaces?: number;
  alreadyBookedItemsLength: number;
  minPurchase?: number | null;
  maxPurchase?: number | null;
}

export const getMaxPlaces = ({
  availablePlaces,
  maxPurchase,
  minPurchase,
  alreadyBookedItemsLength,
}: IGetLeftPlacesProps) => {
  if (!availablePlaces) {
    return 0;
  }

  if (maxPurchase && isNumber(maxPurchase)) {
    const leftPlacesByMaxPurchase = maxPurchase - alreadyBookedItemsLength;

    const remainder = leftPlacesByMaxPurchase < availablePlaces ? leftPlacesByMaxPurchase : availablePlaces;

    if (minPurchase && isNumber(minPurchase)) {
      return remainder + alreadyBookedItemsLength < minPurchase ? 0 : remainder;
    } else {
      return remainder;
    }
  }

  return availablePlaces;
};
