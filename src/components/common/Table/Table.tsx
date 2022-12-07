import React from 'react';

import { CellLayout, HeadCellLayout } from './components';
import { getCellValue } from './helpers';
import TalbeLayout from './TableLayout';

export type TAccessor<T> = (item: T) => unknown;

interface ILayoutProps {
  headRow: React.ReactNode[];
  rows: React.ReactNode[];
}

interface IRenderHeadCellProps<T, Props> {
  item: IHeadRow<T, Props>;
  index: number;
}
interface IRenderCellProps<Props> {
  item: any;
  index: number;
  props: Props;
  emptyValue?: string;
}

export interface IHeadRow<T, Props> {
  accessor?: TAccessor<T> | string;
  width?: string | number;
  label?: string;
  renderIf?: (value: T) => boolean;
  renderCell?: ({ item, index, props, emptyValue }: IRenderCellProps<Props>) => React.ReactNode;
  renderHeadCell?: ({ item, index: number }: IRenderHeadCellProps<T, Props>) => React.ReactNode;
  props?: Props;
}

interface ITableProps<T, Props> {
  headRow: IHeadRow<T, Props>[];
  items: T[];
  Layout?: (props: ILayoutProps) => JSX.Element;
  emptyValue?: string;
  renderHeadCell?: (head: IHeadRow<T, Props>, index: number) => React.ReactNode;
  renderRow?: (item: T, index: number, headRow: IHeadRow<T, Props>[], emptyValue?: string) => React.ReactNode;
  Footer?: React.ReactNode;
}

interface IDefaultTableCellProps<T> {
  item: T;
  accessor: TAccessor<T> | string | undefined;
  index: number;
  emptyValue?: string;
}

export const DefaultTableCell = <T,>({ item, accessor, index, emptyValue }: IDefaultTableCellProps<T>) => (
  <CellLayout key={`cell-${index}`}>{getCellValue(item, accessor, emptyValue)}</CellLayout>
);

interface IDefaultTableHeadCellProps<T, Props> {
  item: IHeadRow<T, Props>;
  index: number;
}

export const DefaultTableHeadCell = <T, Props>({ item, index }: IDefaultTableHeadCellProps<T, Props>) => (
  <HeadCellLayout key={`head-cell-${index}`} style={item.width ? { width: item.width } : {}}>
    {item.label}
  </HeadCellLayout>
);

const Table = <T, Props>({
  headRow,
  items,
  Layout,
  emptyValue,
  renderHeadCell,
  renderRow,
  Footer,
}: ITableProps<T, any>) => {
  const renderDefaultRow = (item: T, index: number) => (
    <tr key={index}>
      {headRow.reduce<React.ReactNode[]>(
        (acc, { accessor, renderCell, renderIf, props }, index) =>
          !renderIf || renderIf(item)
            ? renderCell
              ? [...acc, renderCell({ item: getCellValue(item, accessor, emptyValue), index, props, emptyValue })]
              : [...acc, renderDefaultCell(item, accessor, index)]
            : acc,
        [],
      )}
    </tr>
  );

  const renderDefaultCell = (item: T, accessor: TAccessor<T> | string | undefined, index: number) => (
    <DefaultTableCell item={item} accessor={accessor} index={index} emptyValue={emptyValue} />
  );

  const renderDefaultHeadCell = (item: IHeadRow<T, Props>, index: number) =>
    item.renderHeadCell ? item.renderHeadCell({ item, index }) : <DefaultTableHeadCell item={item} index={index} />;

  const HeadRow = headRow.map(renderHeadCell || renderDefaultHeadCell);
  const Rows = items.map(renderRow ? (item, index) => renderRow(item, index, headRow, emptyValue) : renderDefaultRow);

  const layoutProps = {
    headRow: HeadRow,
    rows: Rows,
    footer: Footer,
  };

  const LayoutComponent = Layout ? <Layout {...layoutProps} /> : <TalbeLayout {...layoutProps} />;

  return LayoutComponent;
};

export default Table;
