import gql from 'graphql-tag';

const addStarred = gql`
mutation addStarred($data: addStarredInput!) {
    addStarred(data: $data) {
    id
    userId
    projectId
    count
    created_at
    }
  }

`;

export default addStarred;


