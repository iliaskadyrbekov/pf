import React from 'react';
import { HomeIcon, PlusIcon } from '@heroicons/react/outline';

import { Form } from './components/Form';
import { Button } from '@components/common/Button';
import SpecificationLayout from './SpecificationLayout';

import { AccommodationSpecificationType } from 'src/shared/enums';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { IAccommodationSpecification } from 'src/shared/interfaces';
import { ISpecificationField } from '@components/Modals/AddSpecificationFieldModal/AddSpecificationFieldModal';
import { useAccommodationProductMetaFields } from 'src/graphql/queries/accommodationProductMetaFields';

export interface ISpecificationOption {
  value: AccommodationSpecificationType;
  label: string;
  disabled: boolean;
  Icon: React.FC;
}

interface ISpecificationProps {
  specifications: IAccommodationSpecification[];
  name: string;
  onChange(args: IAccommodationSpecification[]): void;
}

const Specification = ({ specifications = [], name, onChange }: ISpecificationProps) => {
  const { handleOpenModal } = React.useContext(ModalContext);

  const { data } = useAccommodationProductMetaFields();
  const specificationOptions = data?.accommodationProductMetaFields.specification.options;

  const handleMoveRow = React.useCallback(
    (dragIndex, hoverIndex) => {
      const result = Array.from(specifications);
      const [removed] = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, removed);

      const orderedResult = result.map((el, index) => ({ ...el, order: index }));

      onChange(orderedResult);
    },
    [onChange, specifications],
  );

  const handleRemove = React.useCallback(
    (removeIndex: number) => {
      const result = Array.from(specifications);
      result.splice(removeIndex, 1);

      const orderedResult = result.map((el, index) => ({ ...el, order: index }));

      onChange(orderedResult);
    },
    [onChange, specifications],
  );

  const handleCreateSpecificationField = React.useCallback(
    (field: ISpecificationField) => {
      const newSpecificationField: IAccommodationSpecification = {
        type: field.type,
        amount: field.amount,
        order: specifications.length,
      };

      let newSpecificationForm;

      if (!specifications) {
        newSpecificationForm = [newSpecificationField];
      } else {
        newSpecificationForm = [...specifications, newSpecificationField];
      }

      onChange(newSpecificationForm);
    },
    [onChange, specifications],
  );

  if (!specificationOptions) {
    return null;
  }

  const specificationTypes = specifications.map((specification) => specification.type);

  const validSpecifications: ISpecificationOption[] = specificationOptions.map(({ id, label }) => {
    const option = { label, value: id, disabled: false, Icon: HomeIcon };
    return !specificationTypes.includes(id) ? option : { ...option, disabled: true };
  });

  const handleAddItemClick = () => {
    handleOpenModal({
      type: ModalType.ADD_SPECIFICATION_FIELD,
      props: {
        onSave: handleCreateSpecificationField,
        specificationOptions: validSpecifications,
      },
    });
  };

  const orderedFields = [...specifications].sort((a, b) => a.order - b.order);

  return (
    <SpecificationLayout
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
          specifications={orderedFields}
          specificationOptions={validSpecifications}
        />
      }
    />
  );
};

export default Specification;
