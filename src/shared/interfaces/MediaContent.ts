import { MultiLanguageField } from './MultiLanguageField';

export enum MediaContentType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
}

export type TContentMedia = IImageContent | ITextContent | IVideoContent;

export interface IMediaContent {
  order: number;
  type: MediaContentType;
}

export interface IImageContent extends IMediaContent {
  url: string;
}

export interface ITextContent extends IMediaContent {
  text: MultiLanguageField[];
}

export interface IVideoContent extends IMediaContent {
  url: string;
}
