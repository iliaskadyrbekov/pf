import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { ShopContext } from 'src/context';
import { IUser } from 'src/shared/interfaces';
import { InviteTokenStatusType } from 'src/shared/enums';

export interface IInviteUserToShopVars {
  input: {
    email: string;
    shopId?: string;
  };
}

export interface IInviteUserToShopRes {
  inviteUserToShop: {
    email: string;
    status: InviteTokenStatusType;
    user: IUser;
  };
}

export const INVITE_USER_TO_SHOP = gql`
  mutation InviteUserToShop($input: SendInvationLink!) {
    inviteUserToShop(input: $input) {
      email
      status
      user {
        profile {
          firstName
          lastName
        }
      }
    }
  }
`;

export const useInviteUserToShop = () => {
  const { shop } = React.useContext(ShopContext);

  const [mutate, { data, loading, error }] = useMutation<IInviteUserToShopRes, IInviteUserToShopVars>(
    INVITE_USER_TO_SHOP,
    {
      update(cache, { data }) {
        try {
          cache.modify({
            id: `Shop:${shop?.id}`,
            fields: {
              invitedUsers(existingItems = []) {
                const newItemRef = cache.writeFragment({
                  data: data?.inviteUserToShop,
                  fragment: gql`
                    fragment InvitedUserFields on InvitedUser {
                      email
                      status
                      user {
                        profile {
                          firstName
                          lastName
                        }
                      }
                    }
                  `,
                });

                return [...existingItems, newItemRef];
              },
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    },
  );

  return { mutate, data, loading, error };
};
