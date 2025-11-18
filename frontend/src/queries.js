import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email:$email, password:$password)
  }
`;

export const GET_PRODUCTS = gql`
  query Products($first:Int, $offset:Int, $search:String, $sortField:String, $sortDir:String) {
    products(
      first:$first
      offset:$offset
      filter:{search:$search}
      sort:{field:$sortField, direction:$sortDir}
    ) {
      totalCount
      edges {
        node {
          id
          name
          price
          category { name }
        }
      }
      pageInfo { hasNextPage }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories { id name }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($id:ID!, $qty:Int!) {
    addToCart(input:{ productId:$id, quantity:$qty }) {
      product { id name price }
      quantity
    }
  }
`;

export const GET_CART = gql`
  query {
    meCart {
      product { id name price }
      quantity
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation {
    placeOrder {
      id
      total
      status
    }
  }
`;
