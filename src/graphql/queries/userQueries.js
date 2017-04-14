import gql from 'graphql-tag';
import * as Fragments from '../fragments';

export const getUserQuery = (id) => ({
  query: gql`
    query getUserQuery($id: ID!){
      getUser (id: $id){
        ${Fragments.User}
      }
    }`,
  variables: {
    id,
  },
});
