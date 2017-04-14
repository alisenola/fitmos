import gql from 'graphql-tag';
import * as Fragments from '../fragments';

export const loginUserWithDigitsMutation = (apiUrl, credentials) => ({
  mutation: gql`
  mutation loginUserWithDigits($input: _LoginUserWithDigitsInput!) {
    loginUserWithDigits(input: $input) {
      user {
        ${Fragments.User}
        myClasses
        favorites
        watched
        isRegistered
      }
      id_token
    }
  }`,
  variables: {
    input: {
      X_Auth_Service_Provider: apiUrl,
      X_Verify_Credentials_Authorization: credentials,
    },
  },
});
