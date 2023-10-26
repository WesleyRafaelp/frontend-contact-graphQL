import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
query allContacts{
  contacts {
    id nickname email phone
  }
}
`
export const GET_ONE_CONTACTS= gql`
query oneContact ($id: Int){
  contact(id: id){
    id nickname phone email
  }
}
`