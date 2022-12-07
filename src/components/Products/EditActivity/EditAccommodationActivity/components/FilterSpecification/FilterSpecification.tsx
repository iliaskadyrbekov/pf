import React from 'react';
import { HomeIcon, PlusIcon } from '@heroicons/react/outline';

import { Form } from './components/Form';
import { Button } from '@components/common/Button';
import FilterSpecificationLayout from './FilterSpecificationLayout';

import { ModalContext, ModalType } from 'src/context/ModalContext';
import { IAccommodationActivitySpecification } from 'src/shared/interfaces';
import { ISpecificationOption } from '@components/Products/Product/AccommodationProduct/components/Specification/Specification';
import { useAccommodationProductMetaFields } from 'src/graphql/queries/accommodationProductMetaFields';

interface IFilterSpecificationProps {
  name: string;
  specificationFilter?: IAccommodationActivitySpecification[];
  onChange(args: IAccommodationActivitySpecification[]): void;
}

const FilterSpecification = ({ specificationFilter = [], name, onChange }: IFilterSpecificationProps) => {
  const { handleOpenModal } = React.useContext(ModalContext);

  const { data } = useAccommodationProductMetaFields();
  const specificationOptions = data?.accommodationProductMetaFields.specification.options;

  const handleMoveRow = React.useCallback(
    (dragIndex, hoverIndex) => {
      const result = Array.from(specificationFilter);
      const [removed] = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, removed);

      const orderedResult = result.map((el, index) => ({ ...el, order: index }));

      onChange(orderedResult);
    },
    [onChange, specificationFilter],
  );

  const handleRemove = React.useCallback(
    (removeIndex: number) => {
      const result = Array.from(specificationFilter);
      result.splice(removeIndex, 1);

      const orderedResult = result.map((el, index) => ({ ...el, order: index }));

      onChange(orderedResult);
    },
    [onChange, specificationFilter],
  );

  const handleCreateSpecificationField = React.useCallback(
    (field: IAccommodationActivitySpecification) => {
      const newSpecificationField: IAccommodationActivitySpecification = {
        type: field.type,
        order: specificationFilter.length,
      };

      let newSpecificationForm;

      if (!specificationFilter) {
        newSpecificationForm = [newSpecificationField];
      } else {
        newSpecificationForm = [...specificationFilter, newSpecificationField];
      }

      onChange(newSpecificationForm);
    },
    [onChange, specificationFilter],
  );

  if (!specificationOptions) {
    return null;
  }

  const specificationTypes = specificationFilter.map((specification) => specification.type);

  const validSpecifications: ISpecificationOption[] = specificationOptions.map(({ id, label }) => {
    const option = { label, value: id, disabled: false, Icon: HomeIcon };
    return !specificationTypes.includes(id) ? option : { ...option, disabled: true };
  });

  const handleAddItemClick = () => {
    handleOpenModal({
      type: ModalType.ADD_SPECIFICATION_FILTER_FIELD,
      props: {
        onSave: handleCreateSpecificationField,
        specificationOptions: validSpecifications,
      },
    });
  };

  const orderedFields = [...specificationFilter].sort((a, b) => a.order - b.order);

  return (
    <FilterSpecificationLayout
      addButton={
        <Button variant="link" color="primary" icon={<PlusIcon />} onClick={handleAddItemClick}>
          Add item
        </Button>
      }
      form={
        <Form
          onRemove={handleRemove}
          fieldName={name}
          moveRow={handleMoveRow}
          specificationFilter={orderedFields}
          specificationOptions={validSpecifications}
        />
      }
    />
  );
};

export default FilterSpecification;
