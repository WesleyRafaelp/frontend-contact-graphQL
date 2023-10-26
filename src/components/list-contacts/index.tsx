'use client'
import { GET_CONTACTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Card from "../card";
import { getClient } from "@/config/client-graphql";

export default function ListContacts() {
    const { loading, error, data } = useQuery( GET_CONTACTS, {fetchPolicy:'network-only'});


    console.log(data)

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error.message}</p>;

  const items = data.contacts;

  return (
    <div className="items-center xl:flex xl:flex-wrap">
      {items.map((contact: any) => (
        <Card contact={contact} key={contact.id}/>
      ))}
    </div>
  );
}