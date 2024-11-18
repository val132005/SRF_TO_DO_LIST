const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Si usas bcrypt para el hashing de contraseñas
const User = require('./models/User'); // Asegúrate de importar tu modelo de usuario

// Define el esquema de GraphQL
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
  }
`;

const resolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      // Buscar al usuario en la base de datos
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Contraseña incorrecta');
      }

      // Generar el token JWT
      const token = jwt.sign({ userId: user.id }, 'SECRETO', { expiresIn: '1h' });

      return {
        token,
        user,
      };
    },
  },
};

// Configuración del servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Servidor listo en ${url}`);
});
