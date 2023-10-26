// apollo-wrapper.js

"use client"; // Indica que este é um Client Component

import React from 'react';
import { ApolloNextAppProvider, NextSSRInMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr';
import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:3000/graphql", // Substitua pela URL do seu servidor GraphQL
  });

  return new ApolloClient({ // Correção aqui: Use ApolloClient em vez de NextSSRApolloClient
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([ // Correção aqui: Use ApolloLink em vez de SSRMultipartLink
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

