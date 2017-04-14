import gql from 'graphql-tag';
import * as Fragments from '../fragments';

export const updateUserMutation = (
  {
    id,
    nickname,
    firstName,
    lastName,
    gender,
    role,
    specialities,
    avatar,
    aboutMe,
    email,
    age,
    goals,
    location,
  }
) => ({
  mutation: gql`
  mutation updateUserMutation($input: _UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        ${Fragments.User}
      }
    }
  }`,
  variables: {
    input: {
      id,
      nickname,
      firstName,
      lastName,
      gender,
      role,
      specialities,
      aboutMe,
      email,
      age,
      goals,
      avatar,
      location,
      isRegistered: true,
    },
  },
});

export const addClassToMyClasses = (id, myClasses) => ({
  mutation: gql`
  mutation updateUserMutation($input: _UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        myClasses
      }
    }
  }`,
  variables: {
    input: {
      id,
      myClasses,
    },
  },
});

export const addClassToFavorites = (id, favorites) => ({
  mutation: gql`
  mutation updateUserMutation($input: _UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        favorites
      }
    }
  }`,
  variables: {
    input: {
      id,
      favorites,
    },
  },
});

export const addClassToWatched = (id, watched) => ({
  mutation: gql`
  mutation updateUserMutation($input: _UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        watched
      }
    }
  }`,
  variables: {
    input: {
      id,
      watched,
    },
  },
});

export const addClassToClassesIMade = (id, classesIMade) => ({
  mutation: gql`
  mutation updateUserMutation($input: _UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        classesIMade
      }
    }
  }`,
  variables: {
    input: {
      id,
      classesIMade,
    },
  },
});

export const incrementUsersScore = (id, score) => ({
  mutation: gql`
  mutation updateUserMutation($input: _UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        score
      }
    }
  }`,
  variables: {
    input: {
      id,
      score,
    },
  },
});
