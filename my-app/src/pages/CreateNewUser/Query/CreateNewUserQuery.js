import { gql } from '@apollo/client';

export const CREATE_USERS_MUTATION = gql`
  mutation CreateUsers(
    $name_user: String!
    $document_user: String!
    $state_user: state_user!
    $password_user: String!
  ) {
    insert_users_one(
      object: {
        name_user: $name_user
        document_user: $document_user
        state_user: $state_user
        password_user: $password_user
      }
    ) {
      id_user
      name_user
      document_user
      state_user
      password_user
    }
  }
`;