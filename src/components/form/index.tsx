'use client'
import { CREATE_CONTACT } from '@/graphql/mutations';
import { GET_CONTACTS } from '@/graphql/queries';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

function ContactForm() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors }, 
  } = useForm({
    criteriaMode: "all",
  });

  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const onSubmit = async (formResult:any) => {

    try{
      const {data} = await createContact({variables:{
        nickname: formResult.nickname,
        email: formResult.email,
        phone: formResult.phone,
      }, refetchQueries:[GET_CONTACTS]})
      reset()
    }catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="w-fit rounded-2xl shadow-md px-8 pr-2 py-8 lg:mx-8 ">
      <h2 className="sm:text-4xl text-3xl font-semibold my-4 text-left text-themeSecond">Adicione os contatos</h2>
      {/* <p className="max-w-md sm:text-lg text-base font-semibold my-4 text-left text-themeSecond">Mande sua dúvida sobre qualquer assunto e responderemos o mais rápido possível</p> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm bg-themePrimary rounded-lg  md:m-0 mr-4"
      >
        <div className="mb-4">
          <label htmlFor="nickname" className="block text-themeSecond font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="nickname"
            className="w-full p-2 border rounded-md focus:outline-none bg-themeSecond"
            {...register('nickname', { required: 'Nome é obrigatório.' })}
          />
          {errors.name && (
            <p className="text-red-500">{`${errors.name.message}`}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-themeSecond font-bold mb-2">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'E-mail é obrigatório.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'E-mail inválido.',
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none bg-themeSecond"
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-themeSecond font-bold mb-2"
          >
            Telefone (WhatsApp):
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Contato é obrigatório.',
              pattern: {
                value: /\d/,
                message: 'Contato deve conter número.',
              },
              minLength: {
                value: 10,
                message: 'Contato deve ter pelo menos 10 caracteres.',
              },
            }}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="(00) 00000-0000"
                unmask={false}
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                className="w-full p-2 border rounded-md focus:outline-none bg-themeSecond"
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-500">{`${errors.phone.message}`}</p>
          )}
        </div>
        <div className='flex justify-center mt-8'>
          <button
            type="submit"
            className="bg-lime-200 p-2 rounded-md hover:bg-themeSecond hover:opacity-85 py-2 px-6 font-bold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
          >
            Enviar
          </button>
        </div>
      </form>
      {isFormSubmitted ? (
        <p className="text-green-500 font-semibold text-center mb-4">
          Formulário enviado com sucesso!
        </p>
      ) : null}
      {submissionError && (
        <p className="text-red-500 font-semibold text-center mb-4">
          {submissionError}
        </p>
      )}
    </div>
  );
}

export default ContactForm;