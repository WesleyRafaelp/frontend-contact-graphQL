import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
mutation createCont ($nickname: String!, $phone: String!, $email: String!) {
  createContact(createContactInput: {
    nickname: $nickname,
    phone: $phone,
	email: $email,
  }){
    id nickname
  }
}
`
export const UPDATE_CONTACT= gql`
mutation updateContact ($nickname: String, $phone: String, $email: String) {
  updateContact(updateContactInput: {
    nickname: $nickname,
    phone: $phone,
	  email: $email,
  })
}
`
export const DELETE_CONTACT= gql`
mutation deleteContact ($id: Int!) {
  removeContact(id: $id )
}
`