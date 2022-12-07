import { TPricingVariation } from 'src/shared/interfaces';

export const getPricing = (pricing: TPricingVariation[], symbolNative?: string) => {
  const { from, to } = pricing.reduce<{ from?: number; to?: number }>(
    (acc, { price }) => {
      const { from, to } = acc;

      if (from && to) {
        if (price < from) {
          return { ...acc, from: price };
        }
        if (price > to) {
          return { ...acc, to: price };
        }

        return acc;
      }

      return { from: price, to: price };
    },
    { from: undefined, to: undefined },
  );

  return from === to ? `${from} ${symbolNative}` : `${from} ${symbolNative} - ${to} ${symbolNative}`;
};
