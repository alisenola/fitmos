import gql from 'graphql-tag';
import * as Fragments from '../fragments';
import { NUMBER_OF_FETCHED_CLASSES } from '../../variables';

export const searchClassesQuery = ({ query, filters, page }) => ({
  query: gql`
  query ($input: _SearchByQueryInput!){
    viewer {
      searchClasssByQuery(input: $input) {
        hits {
          beginsDate
          capacity
          currency
          endsDate
          goal
          interval
          language
          level
          location {
            city
            street
            place
          }
          image
          owner {
            avatar
            nickname
          }
          price
          recurring
          signed
          title
          objectID
          opentokSessionId
          description
          comments {
            edges {
              node {
                id
                text
                owner {
                  avatar
                  nickname
                }
              }
            }
          }
        }
      }
    }
  }`,
  variables: {
    input: {
      query,
      filters,
      hitsPerPage: NUMBER_OF_FETCHED_CLASSES,
      page,
    },
  },
});

export const searchClassesByLocationQuery = (location) => ({
  query: gql`
  query ($location: _GeoLocationInput!){
    viewer {
      getNearestClasssByCoordignates(location: $location) {
        node {
          ${Fragments.Class}
        }
      }
    }
  }`,
  variables: {
    location,
  },
});
