//needs testing against data

import gql from 'graphql-tag';

const GET_RESEARCH_BY_PROJECT_ID_QUERY = gql`
  query User_research($projectId: String!) {
    researchbyproject(projectId: $projectId) {
      id
      url
      projectId
      created_at
    }
  }
`;

export default GET_RESEARCH_BY_PROJECT_ID_QUERY;
