//needs testing against data

import gql from 'graphql-tag';

const GET_FOLLOWING_BY_ID_QUERY = gql`
  query Followers($id: ID!) {
    following(id: $id) {
      id
      followedId
      followingId
      created_at
    }
  }
`;

export default GET_FOLLOWING_BY_ID_QUERY;
