import gql from 'graphql-tag';

export const GET_SONGS = gql`
  query albums($artist: String) {
    songs(where: { artist: $artist }) {
      name
      id
      artist
      lyrics
    }
  }
`;

export const GET_USER = gql`
  query {
    currentUser {
      id
      firstName
      lastName
      email
    }
  }
`;
