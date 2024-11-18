import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query Login($document_user: bigint!, $password_user: String!) {
    users(where: { document_user: { _eq: $document_user }, password_user: { _eq: $password_user } }) {
      id_user
      name_user
      document_user
      password_user  
    }
  }
`;
