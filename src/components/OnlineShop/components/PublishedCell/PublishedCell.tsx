import React from 'react';

import { VisibilityType } from 'src/shared/enums/VisibilityType';

interface IPublishedCellProps {
  item: {
    id: VisibilityType;
    label: string;
  };
  index: number;
}

const classes = {
  draft: 'px-6 py-4 text-sm leading-tight text-yellow-500',
  visible: 'px-6 py-4 text-sm leading-tight text-green-500',
};

const PublishedCell = ({ item: { id, label }, index }: IPublishedCellProps) => {
  switch (id) {
    case VisibilityType.DRAFT:
      return (
        <td key={index} className={classes.draft}>
          {label}
        </td>
      );
    case VisibilityType.VISIBLE:
      return (
        <td key={index} className={classes.visible}>
          {label}
        </td>
      );
  }
};

export default PublishedCell;
