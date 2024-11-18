import { gql } from '@apollo/client';

export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem(
    $name_item: String!
    $description_item: String!
    $state_item: state_item!
    $priority_item: priority_item!
    $id_todolist: Int!
  ) {
    insert_item_one(
      object: {
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