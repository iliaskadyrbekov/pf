import {
  CubeIcon,
  DocumentDuplicateIcon as DocumentDuplicateIconSolid,
  NewspaperIcon as NewspaperIconSolid,
} from '@heroicons/react/solid';
import {
  DocumentDuplicateIcon as DocumentDuplicateIconOutline,
  NewspaperIcon as NewspaperIconOutline,
} from '@heroicons/react/outline';

import { ILanguage } from 'src/context';
import { ActivityType } from 'src/shared/enums/ActivityType';
import { ELinkedPageType } from 'src/shared/enums/LinkedPageType';
import { MultiLanguageField } from 'src/shared/interfaces';
import { ICustomPage } from 'src/shared/interfaces/CustomPage';
import { INews } from 'src/shared/interfaces/News';
import { getIconByType, getMultiLangFieldValue } from 'src/helpers';

interface IActivity {
  type: ActivityType;
  name: MultiLanguageField[];
  id: string;
}

interface IHelpers {
  lang: ILanguage;
  availableLangs: ILanguage[];
}

interface IGetOptionsProps {
  helpers: IHelpers;
  activities: IActivity[];
  news: INews[];
  customPages: ICustomPage[];
}

const getActivitiesOptions = (activities: IActivity[], { lang, availableLangs }: IHelpers) => {
  return activities?.length
    ? [
        {
          label: 'Products',
          Icon: CubeIcon,
          name: [],
          type: ELinkedPageType.ACTIVITY,
          value: activities.map(({ name, id, type }) => ({
            name,
            label: getMultiLangFieldValue(lang, name, availableLangs),
            value: id,
            Icon: getIconByType(type),
            type: ELinkedPageType.ACTIVITY,
          })),
        },
      ]
    : [];
};

const getCustomPagesOptions = (customPages: ICustomPage[], { lang, availableLangs }: IHelpers) => {
  return customPages?.length
    ? [
        {
          label: 'Pages',
          Icon: DocumentDuplicateIconSolid,
          name: [],
          type: ELinkedPageType.CUSTOM_PAGE,
          value: customPages.map(({ name, id }) => ({
            name,
            label: getMultiLangFieldValue(lang, name, availableLangs),
            value: id,
            Icon: DocumentDuplicateIconOutline,
            type: ELinkedPageType.CUSTOM_PAGE,
          })),
        },
      ]
    : [];
};

const getNewsOptions = (news: INews[], { lang, availableLangs }: IHelpers) => {
  return news?.length
    ? [
        {
          label: 'News',
          Icon: NewspaperIconSolid,
          name: [],
          type: ELinkedPageType.NEWS,
          value: news.map(({ name, id }) => ({
            name,
            label: getMultiLangFieldValue(lang, name, availableLangs),
            value: id,
            Icon: NewspaperIconOutline,
            type: ELinkedPageType.NEWS,
          })),
        },
      ]
    : [];
};

export const getOptions = ({ helpers, activities, news, customPages }: IGetOptionsProps) => {
  return [
    ...getActivitiesOptions(activities, helpers),
    ...getNewsOptions(news, helpers),
    ...getCustomPagesOptions(customPages, helpers),
  ];
};
