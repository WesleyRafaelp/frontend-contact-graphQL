'use client'
import { getClient } from "@/config/client-graphql";
import { DELETE_CONTACT } from "@/graphql/mutations";
import { GET_CONTACTS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";

// interface DeleteButtonProps {
//   contactId: string;
// }

export default function DeleteButton ({ contactId }: any) {
    const [deleteContact, { loading, error }] = useMutation(DELETE_CONTACT);

    // Função para lidar com o clique no botão
    const handleDeleteClick = async () => {
      try {
        const { data } = await deleteContact({ variables: { id: contactId }, refetchQueries:[GET_CONTACTS] });
        console.log(data); // Aqui você pode lidar com a resposta da mutação
      } catch (err) {
        console.error('Erro ao excluir contato:', err, error);
      }
    };

  return (
    <button onClick={handleDeleteClick} className="bg-lime-200 p-2 rounded-md hover:opacity-85 py-2 px-6 font-bold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 mx-4 mt-4">Excluir</button>
  );
};
