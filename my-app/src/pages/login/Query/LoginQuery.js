import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query Login($document_user: bigint!, $password_user: String!) {
    userr(where: { document_user: { _eq: $document_user }, password_user: { _eq: $password_user } }) {
      id_user
      name_user
      document_user
      password_user  
    }
  }
`;


export const GET_TODOLIST_ID = gql`
  query GetTodoListId($userId: Int!) {
    todolist(where: { id_user: { _eq: $userId } }) {
      id_todolist
    }
  }
`;

export const GET_PHOTOGALLERY_ID = gql`
  query GetPhotogalleryId($userId: Int!) {
    photogallery(where: { id_user: { _eq: $userId } }) {
      id_photogallery
    }
  }
`;





