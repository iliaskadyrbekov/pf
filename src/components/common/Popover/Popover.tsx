import React from 'react';
import { Popover } from '@headlessui/react';
import { usePopper } from 'react-popper';

import { DefaultLabel } from '../Dropdown/components';
import { classNames } from '@utils/classNames';

export type BasePlacement = 'top' | 'bottom' | 'right' | 'left';
export type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';
export type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';

export type Placement = AutoPlacement | BasePlacement | VariationPlacement;

interface IPopoverProps {
  label?: React.ReactNode;
  renderLabel?: (props: { isOpen: boolean }) => React.ReactNode;
  placement?: Placement;

  buttonClassName?: string;
  panelClassName?: string;

  children: ((props: { close(): void }) => React.ReactNode) | React.ReactNode;
}

const CustomPopover = ({
  label,
  renderLabel,
  children,
  buttonClassName,
  panelClassName,
  placement = 'bottom',
}: IPopoverProps) => {
  const [referenceElement, setReferenceElement] = React.useState<HTMLButtonElement | null>();
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement });

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className={buttonClassName} ref={setReferenceElement}>
            {renderLabel ? renderLabel({ isOpen: open }) : <DefaultLabel>{label}</DefaultLabel>}
          </Popover.Button>

          <Popover.Panel
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className={classNames('absolute z-10', panelClassName)}
          >
            {typeof children === 'function' ? children({ close }) : children}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default CustomPopover;
