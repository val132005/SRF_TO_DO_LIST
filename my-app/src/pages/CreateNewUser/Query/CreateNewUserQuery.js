import { gql } from '@apollo/client';

export const CREATE_USERR_MUTATION = gql`
  mutation CreateUsers(
    $name_user: String!
    $document_user: bigint!
    $state_user: state_user!
    $password_user: String!
  ) {
    insert_userr_one(
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

export const CREATE_TODOLIST_MUTATION = gql`
  mutation CreateToDoList($id_user: Int!) {
    insert_todolist_one(
      object: {
        id_user: $id_user
      }
    ) {
      id_todolist
      id_user
    }
  }
`;

export const CREATE_PHOTOGALLERY_MUTATION = gql`
  mutation CreatePhotoGallery($id_user: Int!) {
    insert_photogallery_one(
      object: {
        id_user: $id_user
      }
    ) {
      id_photogallery
      id_user
    }
  }
`;
