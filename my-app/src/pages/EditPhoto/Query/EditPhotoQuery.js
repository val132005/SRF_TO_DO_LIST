import { gql } from '@apollo/client';

export const UPDATE_PHOTO = gql`
  mutation UpdatePhoto(
    $id_photo: Int!
    $content_photo: String!
    $id_photogallery: Int!
  ) {
    update_photo_by_pk(
      pk_columns: { id_photo: $id_photo }
      _set: {
        content_photo: $content_photo
        id_photogallery: $id_photogallery
      }
    ) {
      id_photo
      content_photo
      id_photogallery
    }
  }
`;

export const GET_PHOTO_BY_ID = gql`
  query GetPhotoById($id: Int!) {
    photo_by_pk(id_photo: $id) {
      id_photo
      content_photo
      id_photogallery
    }
  }
`;
