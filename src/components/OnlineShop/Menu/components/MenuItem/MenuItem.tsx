import React from 'react';
import { useFormikContext } from 'formik';
import { TrashIcon } from '@heroicons/react/outline';
import { DotsVerticalIcon } from '@heroicons/react/solid';

import { BlockLayout } from '@components/common/Block';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { LangSwitcher } from '@components/common/LangSwitcher';
import MenuItemLayout from './MenuItemLayout';
import { GroupedSelect } from '@components/common/GroupedSelect';
import { FormField } from '@components/common/FormFields/FormField';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';
import { Spinner } from '@components/common/Spinner';
import { useDnd } from '@hooks/useDnd';
import { DndItemWrapperLayout } from '@components/common/DndItemWrapper';

export interface IOption {
  value: IOption[] | string;
  Icon?: React.FC<{ className: string }>;
  label?: string;
}

export interface IMenuItemFromContainerProps {
  isDirty: boolean;
  onDelete(): void;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  options: IOption[];
}

export interface IMenuItemProps {
  index: number;
}

interface IFormikContext {
  selectedMenuItems: string | number[];
}

const MenuItem = ({ index, options, isDirty, onDelete, moveRow }: IMenuItemProps & IMenuItemFromContainerProps) => {
  const { isSubmitting, handleSubmit } = useFormikContext<IFormikContext>();

  const { preview, dropRef, dragRef, isDragging, isOver } = useDnd<HTMLDivElement, HTMLDivElement>({
    type: 'row',
    index,
    moveFn: moveRow,
  });

  const previewRef = preview(dropRef);

  return (
    <DndItemWrapperLayout isOver={isOver}>
      <BlockLayout previewRef={previewRef} className="pt-6 pb-4">
        <MenuItemLayout
          showDivider={true}
          dragRef={dragRef}
          dragIcon={
            <DotsVerticalIcon className={`${isDragging ? 'cursor-grabbing opacity-50' : 'cursor-grab'} h-5 w-5`} />
          }
          menuName={
            <FormMultiLanguageField
              component={Input}
              id={`menuName-${index}`}
              name="menuName"
              label="Menu name"
              placeholder="Enter menu name"
            />
          }
          langSwitcher={<LangSwitcher />}
          linkedPages={
            <FormField
              component={GroupedSelect}
              name="selectedMenuItems"
              options={options}
              label="Linked pages"
              placeholder="Select pages"
            />
          }
          save={
            isDirty ? (
              <Button disabled={isSubmitting} icon={isSubmitting ? <Spinner /> : null} onClick={() => handleSubmit()}>
                Save
              </Button>
            ) : null
          }
          trash={<TrashIcon onClick={onDelete} className="w-6 h-6" />}
        />
      </BlockLayout>
    </DndItemWrapperLayout>
  );
};

export default MenuItem;
