import client from '../config/apolloClient';
import { gql } from '@apollo/client';
import { LOGIN_MUTATION } from './Mutations';



// Función para realizar el login
export const login = async (username, password) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { username, password },
    });

    return data.login; // Retornar los datos del login (token y usuario)
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Credenciales incorrectas');
  }
};
