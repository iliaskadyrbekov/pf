import { Formik } from 'formik';
import React from 'react';

import { findSelectedOptions } from '@components/common/GroupedSelect/helpers';
import { useDeleteMenuItem } from '@components/OnlineShop/Menu/mutations/deleteMenuItem';
import { useEditMenuItem } from '@components/OnlineShop/Menu/mutations/editMenuItem';
import { FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { ShopContext } from 'src/context/ShopContext';
import { MultiLanguageField } from 'src/shared/interfaces';
import { ELinkedPageType } from 'src/shared/enums/LinkedPageType';
import { MenuItem } from '../MenuItem';

interface IContainerOption {
  value: IContainerOption[] | string;
  Icon?: React.FC<{ className: string }>;
  label?: string;
  type: ELinkedPageType;
  name: MultiLanguageField[];
}

interface IMenuItemContainerProps {
  id: string;
  menuName: MultiLanguageField[];
  selectedMenuItems: string[];
  index: number;
  options: IContainerOption[];
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const MenuItemContainer = ({ id, menuName, selectedMenuItems, index, options, moveRow }: IMenuItemContainerProps) => {
  const { shop } = React.useContext(ShopContext);

  const { mutate: editMenuItem } = useEditMenuItem();
  const { mutate: deleteMenuItem } = useDeleteMenuItem();

  const handleRemoveOrderItem = () => {
    deleteMenuItem({ variables: { shopId: shop?.id, id } });
  };

  const isMenuItemDirty = (name: MultiLanguageField[], selectedItems: string[]) => {
    return !(
      name.length === menuName.length &&
      name.every(({ lang, value }) => menuName.find((n) => n.lang === lang)?.value === value) &&
      selectedItems.length === selectedMenuItems.length &&
      selectedItems.every((i) => selectedMenuItems.includes(i))
    );
  };

  return (
    <Formik
      initialValues={{ menuName, selectedMenuItems }}
      onSubmit={async (values, { setSubmitting }) => {
        const { menuName, selectedMenuItems } = values;

        const selectedOptions = selectedMenuItems.map((v) => findSelectedOptions(options, v));
        const linkedPages = selectedOptions
          .filter((opt): opt is IContainerOption => !!opt)
          .reduce<{ activities: string[]; customPages: string[]; news: string[] }>(
            (acc, { value, type }) => {
              if (type === ELinkedPageType.ACTIVITY) {
                acc.activities.push(value as string);
              }

              if (type === ELinkedPageType.NEWS) {
                acc.news.push(value as string);
              }

              if (type === ELinkedPageType.CUSTOM_PAGE) {
                acc.customPages.push(value as string);
              }

              return acc;
            },
            { activities: [], customPages: [], news: [] },
          );

        await editMenuItem({
          variables: {
            id,
            shopId: shop?.id,
            menuItem: {
              name: menuName,
              linkedPages,
            },
          },
        });

        setSubmitting(false);
      }}
    >
      {({ values: { menuName, selectedMenuItems } }) => (
        <FormLanguageSwitcherProviderComponent>
          <MenuItem
            index={index}
            options={options}
            onDelete={handleRemoveOrderItem}
            isDirty={isMenuItemDirty(menuName, selectedMenuItems)}
            moveRow={moveRow}
          />
        </FormLanguageSwitcherProviderComponent>
      )}
    </Formik>
  );
};

export default MenuItemContainer;
