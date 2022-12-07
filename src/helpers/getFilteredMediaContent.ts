import {
  IImageContent,
  ITextContent,
  IVideoContent,
  MediaContentType,
  TContentMedia,
} from 'src/shared/interfaces/MediaContent';

export const getFilteredMediaContent = (content: TContentMedia[]) => {
  const textContent = content.filter(({ type }) => type === MediaContentType.TEXT) as ITextContent[];
  const videoContent = content.filter(({ type }) => type === MediaContentType.VIDEO) as IVideoContent[];
  const imageContent = content.filter(({ type }) => type === MediaContentType.IMAGE) as IImageContent[];

  return {
    imageContent,
    textContent,
    videoContent,
  };
};
