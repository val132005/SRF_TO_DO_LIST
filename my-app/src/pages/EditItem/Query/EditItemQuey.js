import { gql } from '@apollo/client';

export const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $id_item: Int!
    $name_item: String!
    $description_item: String!
    $state_item: state_item!
    $priority_item: priority_item!
    $id_todolist: Int!
  ) {
    update_item_by_pk(
      pk_columns: { id_item: $id_item }
      _set: {
        name_item: $name_item
        description_item: $description_item
        state_item: $state_item
        priority_item: $priority_item
        id_todolist: $id_todolist
      }
    ) {
      id_item
      name_item
      description_item
      state_item
      priority_item
      id_todolist
    }
  }
`;

export const GET_ITEM_BY_ID = gql`
  query GetItemById($id: Int!) {
    item_by_pk(id_item: $id) {
      id_item
      name_item
      description_item
      state_item
      priority_item
    }
  }
`;
