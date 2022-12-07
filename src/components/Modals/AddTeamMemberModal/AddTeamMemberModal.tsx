import React from 'react';
import { Formik } from 'formik';
import { UsersIcon } from '@heroicons/react/outline';

import { IconWithTextLayout } from 'src/layouts';
import { Button, FormField, Input } from '@components/common';
import AddTeamMemberModalLayout from './AddTeamMemberModalLayout';

import { ShopContext } from 'src/context';
import { handleValidate } from './helpers';
import { useInviteUserToShop } from './mutations';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';

interface IAddTeamMemberModalProps {
  onClose: () => void;
}

export interface IAddMember {
  email: string;
}

const AddTeamMemberModal = ({ onClose }: IAddTeamMemberModalProps) => {
  const { shop } = React.useContext(ShopContext);
  const { mutate: inviteUserToShop } = useInviteUserToShop();

  const handleSendInvitation = React.useCallback((field: IAddMember) => {
    const input = { input: { ...field, shopId: shop?.id } };

    inviteUserToShop({ variables: input });
  }, []);

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values, { setStatus }) => {
        try {
          handleValidate(values);
        } catch (errors) {
          setStatus(errors);
          return;
        }

        try {
          onClose();
          handleSendInvitation(values);
        } catch (err) {
          getValidationErrors(err as IGraphqlError);
        }
      }}
    >
      {({ handleSubmit }) => (
        <AddTeamMemberModalLayout
          title={<IconWithTextLayout text="Add Team Member" icon={<UsersIcon />} />}
          email={<FormField name="email" placeholder="Enter an email" component={Input} />}
          closeButton={
            <Button variant="contained" color="default" key="1" onClick={onClose}>
              Close
            </Button>
          }
          addUserButton={
            <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="2">
              Send invite
            </Button>
          }
        />
      )}
    </Formik>
  );
};

export default AddTeamMemberModal;
