import gql from 'graphql-tag';

export const USERS_FIELDS = gql`
  fragment UsersFields on Shop {
    invitedUsers {
      email
      status
      user {
        profile {
          firstName
          lastName
          avatar
        }
      }
    }
    users {
      shopRole
      user {
        email
        profile {
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;
