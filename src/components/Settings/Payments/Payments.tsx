import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { Button } from '@components/common/Button';
import { Dropdown } from '@components/common/Dropdown';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { Table } from '@components/common/Table';
import { BadgesLayout, CellLayout } from '@components/common/Table/components';
import { SpinnerIcon } from '@components/Icons';
import { ShopContext } from 'src/context/ShopContext';
import { EPaymentProviders } from 'src/shared/interfaces/Shop';
import { useConnectShopWithTestStripe } from './mutations/connectShopWithTestStripe';
import { useConnectShopWithLiveStripe } from './mutations/connectShopWithLiveStripe';

import { ButtonCell } from './components';
import PaymentsLayout from './PaymentsLayout';
import {
  GET_STRIPE_ACCOUNT_LINK,
  IGetStripeAccountLink,
  IGetStripeAccountLinkVars,
} from './mutations/getStripeAccountLink';
import { EChargesEnabled, EPaymentStatus, parseShopPayment } from './helpers';
import { Toggle } from '@components/common/Toggle';
import { EStripeMode } from 'src/shared/enums/StripeMode';
import { Tooltip } from '@components/common/Tooltip';
import { STRIPE_MODE_TOOLTIP_CONTENT } from '@components/common/Tooltip/constants';
import { ModalContext, ModalType } from 'src/context/ModalContext';

const Payments = () => {
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);
  const router = useRouter();

  const { mutate: connectShopWithTestStripe, loading } = useConnectShopWithTestStripe();
  const { mutate: connectShopWithLiveStripe } = useConnectShopWithLiveStripe();

  const [getStripeAccountLink, { loading: isNewLinkLoading }] = useMutation<
    IGetStripeAccountLink,
    IGetStripeAccountLinkVars
  >(GET_STRIPE_ACCOUNT_LINK);

  const dropdownItems = [
    { value: EPaymentProviders.STRIPE, label: 'Connect with stripe', disabled: !!shop?.payment?.stripe },
  ];

  const handleDropdownItemClick = React.useCallback(
    async (value: EPaymentProviders) => {
      switch (value) {
        case EPaymentProviders.STRIPE: {
          const url = `https://${shop?.domain}/admin${router.pathname}`; // TODO refreshUrl and returnUrl on backend

          const { data } = await connectShopWithTestStripe({
            variables: { shopId: shop?.id, refreshUrl: url, returnUrl: url },
          });

          if (data) {
            router.push(data.connectShopWithTestStripe);
          }
        }
      }
    },
    [shop],
  );

  const handleContinueOnboarding = React.useCallback(async () => {
    const url = `https://${shop?.domain}/admin${router.pathname}`;

    const { data } = await getStripeAccountLink({
      variables: { shopId: shop?.id, refreshUrl: url, returnUrl: url },
    });

    if (data) {
      router.push(data.getStripeAccountLink);
    }
  }, [shop]);

  const valueByStripeMode = (stripeMode: EStripeMode) => {
    const keyByMode = {
      [EStripeMode.TEST]: false,
      [EStripeMode.LIVE]: true,
    };

    const result = keyByMode[stripeMode];

    return result || keyByMode[EStripeMode.TEST];
  };

  const labelByStripeMode = (stripeMode: EStripeMode) => {
    const keyByMode = {
      [EStripeMode.TEST]: (
        <span className="text-xs font-bold leading-none text-yellow-600">
          Test Mode <Tooltip>{STRIPE_MODE_TOOLTIP_CONTENT}</Tooltip>
        </span>
      ),
      [EStripeMode.LIVE]: <span className="text-xs font-bold leading-none text-green-600">Live Mode</span>,
    };

    const result = keyByMode[stripeMode];

    return result || keyByMode[EStripeMode.TEST];
  };

  const handleGoLive = async () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        onConfirm: async () => {
          const url = `https://${shop?.domain}/admin${router.pathname}`;

          const { data } = await connectShopWithLiveStripe({
            variables: { shopId: shop?.id, refreshUrl: url, returnUrl: url },
          });

          if (data) {
            router.push(data.connectShopWithLiveStripe);
          }
        },
        confirmButtonText: 'Connect to Live mode',
        title: 'Are you sure you want to go live?',
        message:
          'Going live means to receive real transactions, the test data will be automatically deleted when you continue.',
      },
    });
  };

  const tableHeadRow = [
    { label: 'Business Name', accessor: 'name' },
    { label: 'Provider', accessor: 'provider' },
    {
      label: 'Payments',
      accessor: 'chargesEnabled',
      // eslint-disable-next-line react/display-name
      renderCell: ({ item, index }: { item: string; index: number }) =>
        item ? (
          <BadgesLayout key={index} color={item === EChargesEnabled.ENABLED ? 'green' : 'yellow'}>
            {item}
            {item === EChargesEnabled.DISABLED ? <p>Please go to Stripe to activate payment</p> : null}
          </BadgesLayout>
        ) : (
          <td />
        ),
    },
    {
      label: 'Set up',
      accessor: 'status',
      // eslint-disable-next-line react/display-name
      renderCell: ({ item, index }: { item: string; index: number }) =>
        item ? (
          <BadgesLayout key={index} color={item === EPaymentStatus.COMPLETED ? 'green' : 'yellow'}>
            {item}
          </BadgesLayout>
        ) : (
          <td />
        ),
    },
    {
      // renderIf: (value: { status?: EPaymentStatus }) => value.status === EPaymentStatus.COMPLETED,
      label: 'Charging',
      // eslint-disable-next-line react/display-name
      renderCell: (value: { item: { mode: EStripeMode } }) => (
        <CellLayout>
          <Toggle
            onChange={handleGoLive}
            value={valueByStripeMode(value.item.mode)}
            withIcon={true}
            label={labelByStripeMode(value.item.mode)}
            disabled={value.item.mode === EStripeMode.LIVE}
          />
        </CellLayout>
      ),
    },
    {
      label: '',
      // eslint-disable-next-line react/display-name
      renderCell: ({ item }: { item: { accountId: string; status: EPaymentStatus } }) =>
        item.status === EPaymentStatus.INCOMPLETE ? (
          <ButtonCell className="text-right pr-4" id={item.accountId} onClick={handleContinueOnboarding}>
            {isNewLinkLoading && <SpinnerIcon className="w-5 mr-2" />}
            Continue onboarding
          </ButtonCell>
        ) : (
          <td />
        ),
    },
    // {
    //   label: '',
    //   accessor: 'accountId',
    //   // eslint-disable-next-line react/display-name
    //   renderCell: ({ item }: { item: string }) => (
    //     <ButtonCell className="text-center" id={item} onClick={handlePaymentProviderRemove}>
    //       Delete
    //     </ButtonCell>
    //   ),
    // },
  ];

  const items = parseShopPayment(shop?.payment);

  return (
    <PaymentsLayout
      table={<Table headRow={tableHeadRow} items={items} emptyValue="-" />}
      actions={
        <PageActionsPortal
          actions={[
            <Dropdown
              key={2}
              items={dropdownItems}
              onItemClick={handleDropdownItemClick}
              renderLabel={() => (
                <Button icon={loading ? <SpinnerIcon /> : null} variant="contained" color="primary">
                  Add payment
                </Button>
              )}
            />,
          ]}
        />
      }
    />
  );
};

export default Payments;
