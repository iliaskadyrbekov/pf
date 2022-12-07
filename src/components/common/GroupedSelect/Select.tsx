import React from 'react';
import { Transition } from '@headlessui/react';

import useClickOutside from '@hooks/useClickOutside';
import {
  Button,
  GroupedOption,
  Label,
  Option,
  Options,
  IconTextOption,
  SelectedOption,
  Placeholder,
  SelectIcon,
} from './components';
import { findSelectedOptions, getOptionValue } from './helpers';
import { Badge } from '../Badge';
import { Tooltip } from '../Tooltip';

type TValueType = string | number;
type TValue = TValueType[];

interface IOption {
  label: string;
  value: TValueType | IOption[];
  Icon?: React.FC<{ className: string }>;
  disabled?: boolean;
}

interface ISelectProps {
  value: TValue;
  options: IOption[];
  onChange: (value: TValue) => void;

  tooltipContent?: string;
  label?: string;
  placeholder?: string;
  renderOption?: (option: IOption) => React.ReactNode;
  renderSelectedOptions?: (options: (IOption | null)[]) => React.ReactNode;
}

const CustomSelect = ({
  onChange,
  options,
  renderOption,
  renderSelectedOptions,
  label,
  tooltipContent,
  placeholder,
  value: selectedItems,
}: ISelectProps) => {
  const [open, setOpen] = React.useState(false);

  const wrapperRef = React.useRef(null);

  const handleOpenToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const hanleChange = (value: TValue) => {
    onChange(value);
  };

  const hanleSelectOptions = (selectedValue: TValue | TValueType) => {
    if (Array.isArray(selectedValue)) {
      const isValueIncluded = selectedValue.every((v) => selectedItems.includes(v));
      const newValue = isValueIncluded
        ? selectedItems.filter((v) => !selectedValue.includes(v))
        : Array.from(new Set([...selectedItems, ...selectedValue]));

      return hanleChange(newValue);
    } else {
      const isValueIncluded = selectedItems.includes(selectedValue);
      const newValue = isValueIncluded
        ? selectedItems.filter((v) => v !== selectedValue)
        : Array.from(new Set([...selectedItems, selectedValue]));

      return hanleChange(newValue);
    }
  };

  const renderOptions = (options: IOption[]): React.ReactNode =>
    options.map((opt) => {
      const { label, value, disabled, Icon } = opt;

      if (Array.isArray(value)) {
        const values = getOptionValue(value);

        return (
          <React.Fragment key={value.toString()}>
            <GroupedOption onClick={hanleSelectOptions} value={values}>
              <IconTextOption
                Icon={Icon}
                label={label}
                disabled={disabled}
                selected={values.every((v) => selectedItems.includes(v))}
              />
            </GroupedOption>
            {renderOptions(value)}
          </React.Fragment>
        );
      }

      return (
        <Option key={value} onClick={hanleSelectOptions} value={value}>
          {renderOption ? (
            renderOption(opt)
          ) : (
            <IconTextOption Icon={Icon} label={label} disabled={disabled} selected={selectedItems.includes(value)} />
          )}
        </Option>
      );
    });

  const getSelectedOptions = (selectedOptions: (IOption | null)[]) => {
    return renderSelectedOptions ? (
      renderSelectedOptions(selectedOptions)
    ) : (
      <SelectedOption>
        {selectedOptions.reduce((acc, opt) => (opt ? `${acc ? `${acc}, ` : ''}${opt.label}` : acc), '')}
      </SelectedOption>
    );
  };

  useClickOutside(wrapperRef, handleClose);

  const selectedOptions = selectedItems.map((v) => findSelectedOptions(options, v));

  return (
    <div className="space-y-1 w-full">
      <div className="flex justify-between mb-1">
        {label && <Label>{label}</Label>}
        {tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
      </div>
      <div ref={wrapperRef} className="relative">
        <Button onClick={handleOpenToggle}>
          {selectedOptions.length ? getSelectedOptions(selectedOptions) : <Placeholder>{placeholder}</Placeholder>}
          <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
            <Badge color="purple" variant="contained">
              {selectedOptions.length}
            </Badge>
          </div>
          <SelectIcon />
        </Button>

        <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Options>{renderOptions(options)}</Options>
        </Transition>
      </div>
    </div>
  );
};

export default CustomSelect;
