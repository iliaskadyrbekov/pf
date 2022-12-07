import React from 'react';

import HeaderLayout from './HeaderLayout';
import { ShopContext } from 'src/context/ShopContext';
import { BellIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';

import { HeaderActionLayout, IndigoLinkLayout } from './components';
import MockedAvatarIcon from '@components/Icons/MockedAvatarIcon';
import { Button } from '@components/common/Button';
import { useCreateInternalOrder } from './mutations/createInternalOrder';
import { SpinnerIcon } from '@components/Icons';
import { useRouter } from 'next/router';

import { getS3FileUrl } from '@utils/getS3FileUrl';

interface IHeaderProps {
  title?: React.ReactNode;
  button?: React.ReactNode;
}

const BeamerIcon = () => (
  <div className="beamerTrigger">
    <BellIcon />
  </div>
);

const Header = ({}: IHeaderProps) => {
  const { shop } = React.useContext(ShopContext);
  const router = useRouter();

  const { mutate: createInternalOrder, loading } = useCreateInternalOrder();

  const handleNewOrderClick = async () => {
    const { data } = await createInternalOrder({ variables: { shopId: shop?.id } });
    const orderId = data?.createInternalOrder.id;

    if (orderId) {
      router.push(`/bookings/orders/${orderId}`);
    }
  };

  return (
    <HeaderLayout
      logo={shop?.logo && <img src={getS3FileUrl(shop.logo)} alt="Logo" />}
      chooseShop={<p className="text-2xl font-semibold leading-loose text-gray-400">{shop?.name}</p>}
      newOrder={
        <Button onClick={handleNewOrderClick} icon={loading ? <SpinnerIcon /> : null} color="primary">
          New order
        </Button>
      }
      actions={[
        // <HeaderActionLayout key="0" icon={<SpeakerphoneIcon />} text="Feedback?" />,
        <HeaderActionLayout key="1" icon={<BeamerIcon />} />,
        // <HeaderActionLayout key="2" icon={<SupportIcon />} />,
        // <HeaderActionLayout key="3" icon={<AnnotationIcon />} />,
        <MockedAvatarIcon key="4" />,
        <IndigoLinkLayout key="5" link={`https://${shop?.domain}`} icon={<ArrowRightIcon />} text="Online shop" />,
      ]}
    />
  );
};

export default Header;
