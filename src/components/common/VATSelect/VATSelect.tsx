import React from 'react';

import { ModalContext, ModalType } from 'src/context';
import { IVAT } from 'src/shared/interfaces';
import Select, { ISelectProps } from '../Select/Select';
import { NewVATOption } from './components/NewVATOption';
import { VATOption } from './components/VATOption';

type TValue = string | null | undefined;

interface IVATSelectProps extends Omit<ISelectProps<TValue>, 'options'> {
  options: IVAT[];
}

const VATSelect = ({ onChange, options, ...restProps }: IVATSelectProps) => {
  const { handleOpenModal } = React.useContext(ModalContext);

  const handleVATValueSelect = (id: TValue) => {
    if (!id) {
      handleOpenModal({
        type: ModalType.CREATE_VAT,
        props: {
          onCreate: (vat: IVAT) => {
            onChange(vat.id);
          },
        },
      });
    } else {
      onChange(id);
    }
  };

  const handleEditClick = (selectedId: TValue) => {
    const vat = options.find(({ id }) => id === selectedId);

    if (!vat || !vat.id) {
      return;
    }

    handleOpenModal({
      type: ModalType.EDIT_VAT,
      props: {
        onDelete: () => {
          onChange(undefined);
        },
        VAT: {
          id: vat.id,
          value: `${vat.value}`,
        },
      },
    });
  };

  return (
    <Select<TValue>
      onChange={handleVATValueSelect}
      options={[
        ...options.map(({ id, value }) => ({
          value: id,
          label: `${value}%`,
        })),
        { value: null, label: '+ New VAT' },
      ]}
      renderOption={(opt) =>
        opt.value ? (
          <VATOption
            {...opt}
            onEdit={(e) => {
              e.stopPropagation();
              handleEditClick(opt.value);
            }}
          />
        ) : (
          <NewVATOption {...opt} />
        )
      }
      {...restProps}
    />
  );
};

export default VATSelect;
