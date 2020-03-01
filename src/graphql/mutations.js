import gql from 'graphql-tag';

export const ADD_SONG = gql`
  mutation AddSong($song: SongCreateInput!) {
    createSong(data: $song) {
      id
      name
      artist
      lyrics
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: SongWhereUniqueInput!) {
    deleteSong(where: $id) {
      id
    }
  }
`;
