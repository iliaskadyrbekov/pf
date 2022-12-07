import { ELinkedPageType } from '../enums/LinkedPageType';
import { IActivity } from './Activity';
import { ICustomPage } from './CustomPage';
import { MultiLanguageField } from './MultiLanguageField';
import { INews } from './News';

export interface IMenuItem {
  id: string;
  name: MultiLanguageField[];
  order: number;
  linkedPages: TLinkedPage[];
}

export interface ILinkedPage {
  type: ELinkedPageType;
}

export interface IActivityLinkedPage extends ILinkedPage {
  type: ELinkedPageType.ACTIVITY;
  activity?: IActivity;
}

export interface INewsLinkedPage extends ILinkedPage {
  type: ELinkedPageType.NEWS;
  news?: INews;
}

export interface ICustomPageLinkedPage extends ILinkedPage {
  type: ELinkedPageType.CUSTOM_PAGE;
  customPage?: ICustomPage;
}

export type TLinkedPage = IActivityLinkedPage | INewsLinkedPage | ICustomPageLinkedPage;
