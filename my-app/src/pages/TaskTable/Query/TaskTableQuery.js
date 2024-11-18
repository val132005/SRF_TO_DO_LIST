import { gql } from '@apollo/client';

export const GET_TODOLIST_ID = gql`
  query GetTodoListId($userId: Int!) {
    users(where: { id_user: { _eq: $userId } }) {
      id_todolist
    }
  }
`;

export const GET_ITEMS = gql`
  query GetItems($id_todolist: Int!) {
    item(where: { id_todolist: { _eq: $id_todolist } }) {
      id_item
      name_item
      description_item
      state_item
      priority_item 
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($id_item: Int!) {
    delete_item_by_pk(id_item: $id_item) {
      id_item
      name_item
    }
  }
`;