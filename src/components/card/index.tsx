import { getClient } from "@/config/client-graphql";
import { DELETE_CONTACT } from "@/graphql/mutations";

import { useState } from "react";
import DeleteButton from "../button-remove";

export default function Card({ contact }: any) {
  return (
    <div className="flex flex-col rounded-2xl shadow-lg pb-8 m-4 lg:mx-8 max-w-sm">
      <h2 className="bg-lime-200 font-semibold text-xl py-4 px-8 mb-4 text-center rounded-t-2xl drop-shadow-lg">
        {contact.nickname}
      </h2>
      <ul className="mx-4">
        <li><strong>Celular:</strong> {contact.phone}</li>
        <li><strong>Email:</strong> {contact.email}</li>
      </ul>
        <DeleteButton contactId={contact.id}  />
    </div>
  );
}
