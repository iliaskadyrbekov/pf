import React from 'react';

import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { MainInfo } from '@components/OnlineShop/CustomPages/components';
import { CRUDLayout, ShopDetails } from '@components/OnlineShop/components';

import { IVisibilityOption } from 'src/shared/interfaces';

interface IPageFormProps {
  actions: React.ReactNode[];
  visibilityOptions?: IVisibilityOption[];
}

const PageForm = ({ actions, visibilityOptions }: IPageFormProps) => {
  return (
    <CRUDLayout
      actions={<PageActionsPortal actions={actions} />}
      mainInfo={<MainInfo />}
      shopDetails={<ShopDetails visibilityOptions={visibilityOptions || []} />}
    />
  );
};

export default PageForm;
