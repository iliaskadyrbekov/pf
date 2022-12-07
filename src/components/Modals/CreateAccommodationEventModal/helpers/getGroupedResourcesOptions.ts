import { IAreaResource, MultiLanguageField } from 'src/shared/interfaces';

export const getGroupedResourcesOptions = (
  resources: IAreaResource[],
  getMultiLanguageValue: (name: MultiLanguageField[]) => string,
) => {
  const { grouped, notGrouped } = resources.reduce<{
    grouped: Record<string, { label: string; value: string }[]>;
    notGrouped: { label: string; value: string }[];
  }>(
    (acc, { name, id, group }) => {
      if (group) {
        return {
          ...acc,
          grouped: {
            ...acc.grouped,
            [group.name]: [
              ...(acc.grouped[group.name] ? acc.grouped[group.name] : []),
              {
                label: getMultiLanguageValue(name),
                value: id,
              },
            ],
          },
        };
      } else {
        return {
          ...acc,
          notGrouped: [
            ...acc.notGrouped,
            {
              label: getMultiLanguageValue(name),
              value: id,
            },
          ],
        };
      }
    },
    { grouped: {}, notGrouped: [] },
  );

  return [
    ...Object.entries(grouped).map(([key, value]) => ({
      label: key,
      value: value,
    })),
    ...notGrouped,
  ];
};
