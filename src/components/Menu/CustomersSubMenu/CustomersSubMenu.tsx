import React from 'react';
import { useRouter } from 'next/router';
import { CalendarIcon } from '@heroicons/react/outline';

import CustomersSubMenuLayout from './CustomersSubMenuLayout';
import { SubMenuGroupLayout, SubMenuItemLayout } from '../Menu/components';

const CustomersSubMenu = () => {
  const router = useRouter();

  return (
    <CustomersSubMenuLayout>
      <SubMenuGroupLayout>
        <SubMenuItemLayout
          icon={<CalendarIcon />}
          name="Overview"
          link="/customers"
          isActive={router.pathname === '/customers'}
        />
      </SubMenuGroupLayout>
    </CustomersSubMenuLayout>
  );
};

export default CustomersSubMenu;
