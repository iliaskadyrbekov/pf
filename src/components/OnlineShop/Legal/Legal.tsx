import React from 'react';
import { useRouter } from 'next/router';

import LegalLayout from './LegalLayout';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { BlockLayout } from '@components/common/Block';
import { BarLayout, Tabs } from '@components/common/Tabs';
import { FullTabBarLayout, Tab } from '@components/common/Tab';
import EditorBlock from './components/EditorBlock/EditorBlock';
import { PageActionsPortal } from '@components/common/PageActionsPortal';

import { ShopContext } from 'src/context/ShopContext';
import { LegalType } from 'src/shared/enums/LegalType';
import { MultiLanguageField } from 'src/shared/interfaces';
import { useCreateLegals } from './mutations/createLegals';
import { getDefaultLanguageWithCountry } from 'src/helpers';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';

const tabs = [LegalType.TERMS_OF_USE, LegalType.PRIVACY_POLICY, LegalType.REFUND_POLICY];

const getTabName = (tab: LegalType) => {
  switch (tab) {
    case LegalType.TERMS_OF_USE:
      return 'Terms of use';
    case LegalType.PRIVACY_POLICY:
      return 'Privacy policy';
    case LegalType.REFUND_POLICY:
      return 'Refund policy';
  }
};

const Legal = () => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);

  const defaultText = getDefaultLanguageWithCountry(availableLangs);

  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const [value, setValue] = React.useState({
    [LegalType.TERMS_OF_USE]: shop?.legal?.find((l) => l.type === LegalType.TERMS_OF_USE)?.content || defaultText,
    [LegalType.PRIVACY_POLICY]: shop?.legal?.find((l) => l.type === LegalType.PRIVACY_POLICY)?.content || defaultText,
    [LegalType.REFUND_POLICY]: shop?.legal?.find((l) => l.type === LegalType.REFUND_POLICY)?.content || defaultText,
  });

  const handleChange = (val: MultiLanguageField[]) => {
    setValue({ ...value, [activeTab]: val });
  };

  const handleSave = () => {
    try {
      createLegals({ variables: { shopId: shop?.id, input: value } });
      router.push('/online-shop');
    } catch (e) {
      throw new Error(e as string);
    }
  };

  const { mutate: createLegals, loading } = useCreateLegals();

  return (
    <LegalLayout
      navigation={
        <Tabs value={activeTab} onChange={setActiveTab} Layout={BarLayout}>
          {tabs.map((tab, index) => (
            <Tab key={tab} value={tab} Layout={<FullTabBarLayout index={index} length={tabs.length} />}>
              {getTabName(tab)}
            </Tab>
          ))}
        </Tabs>
      }
      editorBlock={
        <BlockLayout>
          <FormLanguageSwitcherProviderComponent>
            <EditorBlock
              value={value[activeTab]}
              onChange={handleChange}
              title="Additional terms"
              description="You can create your own legal pages, or create them from templates and customize them. The templates aren't legal advice and need to be customized for your shop."
            />
          </FormLanguageSwitcherProviderComponent>
        </BlockLayout>
      }
      actions={
        <PageActionsPortal
          actions={[
            <Button
              icon={loading ? <Spinner /> : null}
              key="1"
              onClick={handleSave}
              variant="contained"
              color="primary"
            >
              Save
            </Button>,
          ]}
        />
      }
    />
  );
};

export default Legal;
