import { gql } from '@apollo/client';

export const GET_PHOTOGALLERY_ID = gql`
  query GetPhotogalleryId($userId: Int!) {
    photogallery(where: { id_user: { _eq: $userId } }) {
      id_photogallery
    }
  }
`;


export const GET_PHOTOS = gql`
  query GetPhotos($id_photogallery: Int!) {
    photo(where: { id_photogallery: { _eq: $id_photogallery } }) {
      id_photo
      content_photo
    }
  }
`;