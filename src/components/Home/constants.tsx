import React from 'react';
import Link from 'next/link';
import { Button } from '@components/common/Button';
import { CubeIcon, ShoppingCartIcon, CreditCardIcon } from '@heroicons/react/outline';
import { RecommendedTitleLayout, Recommended } from './components';

export const TASKS = [
  {
    icon: <CubeIcon width="24" height="24" />,
    iconText: 'Products',
    title: 'Create your first activity and product',
    description: 'Add the products or services you offer to make them visible and possible to buy at your online shop.',
    button: (
      <Link href="/products">
        <a>
          <Button className="w-36" color="primary">
            Go to products
          </Button>
        </a>
      </Link>
    ),
  },
  {
    icon: <ShoppingCartIcon width="24" height="24" />,
    iconText: 'Shop',
    title: 'Set preferences to your online shop',
    description:
      'Add image to your frontpage and adjust font types and sizes to your preference. Add legel information and create pages.',
    button: (
      <Link href="/online-shop/preferences">
        <a>
          <Button className="w-36" color="primary">
            Go to shop
          </Button>
        </a>
      </Link>
    ),
  },
  {
    icon: <CreditCardIcon width="24" height="24" />,
    iconText: 'Payment',
    title: 'Connect to Stripe',
    description: 'Connect your shop to our third party payment provider Stripe to accept payments on your shop.',
    button: (
      <Link href="/settings/payments">
        <a>
          <Button className="w-36" color="primary">
            Go to payments
          </Button>
        </a>
      </Link>
    ),
  },
];

export const RECOMMENDED = [
  {
    title: <RecommendedTitleLayout title="Set Tax Rate" caption="About 5 minutes" />,
    content: <Recommended button={<Button color="primary">Go to shop</Button>} />,
  },
  {
    title: <RecommendedTitleLayout title="Set your prefered language" caption="About 1 minute" />,
    content: <Recommended button={<Button color="primary">Go to shop</Button>} />,
  },
  {
    title: <RecommendedTitleLayout title="Complete General settings" caption="About 5 minutes" />,
    content: (
      <Recommended
        button={
          <Link href="/settings/general">
            <a>
              <Button color="primary">Go to shop</Button>
            </a>
          </Link>
        }
      />
    ),
  },
];
