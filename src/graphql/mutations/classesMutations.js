import gql from 'graphql-tag';

export const createLocationMutation = ({ city, place, street }) => ({
  mutation: gql`
  mutation createLocationEntry($input: _CreateLocationEntryInput!) {
    createLocationEntry(input: $input) {
      changedLocationEntry {
        id
      }
    }
  }`,
  variables: {
    input: {
      city,
      place,
      street,
    },
  },
});

/* eslint-disable object-property-newline */
export const createClassMutation = (
  {
    beginsDate, capacity, currency,
    endsDate, goal, interval,
    language, level, price,
    recurring, title, type,
    locationId, ownerId, image,
    opentokSessionId, description, coordignates,
  }) => ({
    mutation: gql`
    mutation createClass($input: _CreateClassInput!) {
      createClass(input: $input) {
        changedClass {
          id
        }
      }
    }`,
    variables: {
      input: {
        beginsDate, capacity, currency,
        endsDate, goal, interval, image,
        language, level, price, ownerId,
        recurring, title, type, locationId,
        opentokSessionId, description, coordignates,
      },
    },
  }
);
/* eslint-enable */

export const createCommentMutation = (text, classId, ownerId) => ({
  mutation: gql`
  mutation createComment($input: _CreateCommentInput!) {
    createComment(input: $input) {
      changedComment {
        id
        text
        owner {
          nickname
          avatar
        }
        class {
          id
        }
      }
    }
  }`,
  variables: {
    input: {
      text,
      classId,
      ownerId,
    },
  },
});

export const rateClassMutation = (classId, rating) => ({
  mutation: gql`
  mutation createRating($input: _CreateRatingInput!) {
    createRating(input: $input) {
      changedRating  {
        id
        rating
        class {
          id
        }
      }
    }
  }`,
  variables: {
    input: {
      rating,
      classId,
    },
  },
});

export const incrementSignedMutation = (id, signed) => ({
  mutation: gql`
  mutation updateClass($input: _UpdateClassInput!) {
    updateClass(input: $input) {
      changedClass {
        id
        signed
      }
    }
  }`,
  variables: {
    input: {
      id,
      signed,
    },
  },
});

export const addArchiveUrlMutation = (id, archiveUrl) => ({
  mutation: gql`
  mutation updateClass($input: _UpdateClassInput!) {
    updateClass(input: $input) {
      changedClass {
        id
        archiveUrl
      }
    }
  }`,
  variables: {
    input: {
      id,
      archiveUrl,
    },
  },
});
