/*
 import React from 'react';
 import { InformationCircleIcon } from '@heroicons/react/outline';
 import { Formik } from 'formik';

 import { Button } from '@components/common';
 import { IconWithTextLayout } from 'src/layouts';
 import { ProductSelect, StartTimeSelect } from './components';
 import { ProductLayout } from '../..';

 import useShop from '@hooks/useShop';
 import { LanguageContext } from 'src/context';
 import { getVariations } from './helpers';
 import { getS3FileUrl } from '@utils/getS3FileUrl';
 import { IRentalProductField } from 'src/shared/interfaces/Product';

 interface IGroupEventProps {
   products: IRentalProductField[];
 }

 const GroupEvent = ({ products }: IGroupEventProps) => {
   const shop = useShop();

   if (!shop) {
     return null;
   }

   const { getMultiLanguageValue } = React.useContext(LanguageContext);

   const variations = getVariations(products);
   const rentalEvents = products.map((product) => product.events.find((event) => event.availableDays.length));

   const productSelectItems = products.reduce(
     (acc, { name, events }) => [...acc, { name: getMultiLanguageValue(name), minimumCount: 0, leftPlaces: 0 }],
     [],
   );

   const { media, category } = products[0];

   return (
     <Formik
       initialValues={{}}
       onSubmit={async (values) => {
       }}
       enableReinitialize
     >
       {({ handleSubmit }) => (
         <ProductLayout
           name={category ? getMultiLanguageValue(category.name) : ''}
           image={getS3FileUrl(media)}
           comparedWithPrice={'10'}
           price={'10'}
           infoIcon={<InformationCircleIcon />}
           productSelect={<ProductSelect productItems={productSelectItems} />}
           variationSelect={
             <></>
             // <FormField
             //   name="variationId"
             //   component={VariationSelect}
             //   onChange={handleVariationChange}
             //   variations={variations}
             // />
           }
           startTimeSelect={<StartTimeSelect name="date" availableDates={[]} />}
           button={
             <Button disabled={false} className="font-inter lg:font-roboto" onClick={() => handleSubmit()}>
               <IconWithTextLayout text="Buy ticket" />
             </Button>
           }
         />
       )}
     </Formik>
   );
 };

 export default GroupEvent;
*/

export {};
