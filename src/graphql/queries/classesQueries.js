import gql from 'graphql-tag';
import { NUMBER_OF_FETCHED_CLASSES } from '../../variables';
import * as Fragments from '../fragments';

const yesterday = new Date().getTime() - (24 * 60 * 60 * 1000);

export const getClassesQuery = (page) => ({
  query: gql`
  query ($input: _SearchByQueryInput!){
    viewer {
      searchClasssByQuery(input: $input) {
        hits {
          ${Fragments.Class}
          objectID
        }
      }
    }
  }`,
  variables: {
    input: {
      query: '-',
      // filters: `beginsDate>${yesterday}`, // Here is a place to set filter for new classes #newclasses
      hitsPerPage: NUMBER_OF_FETCHED_CLASSES,
      page,
    },
  },
});

export const getClassesbyIdsQuery = (ids) => ({
  query: gql`
  query ($input: _SearchByIdsInput!){
    viewer {
      searchClasssByIds(input: $input) {
        results {
          ${Fragments.Class}
          objectID
        }
      }
    }
  }`,
  variables: {
    input: {
      ids,
    },
  },
});

export const getClassesIGiveQuery = (id) => ({
  query: gql`
  query ($id: ID!) {
    getUser(id: $id) {
      classesIGive {
        edges {
          node {
            id
            ${Fragments.Class}
          }
        }
      }
    }
  }`,
  variables: {
    id,
  },
});
