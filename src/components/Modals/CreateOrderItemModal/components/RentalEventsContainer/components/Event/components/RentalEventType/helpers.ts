// import { IRentalPricingVariation, IRentalProductField } from 'src/shared/interfaces';
//
// export const getVariations = (products: IRentalProductField[]) => {
//   if (!products.length) {
//     return [];
//   }
//   const variationSets = products.map((product) => product.rentalPricing).sort();
//   const [firstSet, ...restSets] = variationSets;
//
//   const similarVariations = firstSet.reduce<IRentalPricingVariation[][][]>((acc, comparedVariation) => {
//     const similarSet = restSets.map((set) =>
//       set.filter(({ duration: { value } }) => value === comparedVariation.duration.value),
//     );
//
//     return [...acc, [...similarSet, [comparedVariation]]];
//   }, []);
//
//   const uniqueVariations = similarVariations.filter((set) => set.every((variation) => variation.length));
//   return uniqueVariations.map((set) => set.flatMap((variation) => variation));
// };

export {};
