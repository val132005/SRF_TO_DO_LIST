import { gql } from '@apollo/client';

export const CREATE_PHOTO_MUTATION = gql`
  mutation CreatePhoto(
    $content_photo: String!,
    $id_photogallery: Int!
  ) {
    insert_photo_one(
      object: {
        content_photo: $content_photo,
        id_photogallery: $id_photogallery 
      }
    ) {
      content_photo
      id_photogallery
    }
  }
`;