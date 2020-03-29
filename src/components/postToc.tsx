import React from "react";
import styled from "@emotion/styled";

const TocContent = styled.div`
  margin-top: 1.5rem;
  background-color: #f7f7f7;
  padding: 1rem 0 1rem 1rem;
`;
const TocTitle = styled.p`
  margin-bottom: 1rem;
  font-size: 1.6rem;
`;

const Toc = styled.div`
  line-height: 1.6rem;
  & ul {
    & li {
      & a {
        color: teal;
        text-decoration: none;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

const PostToc = ({ toc }) => {
  return (
    <TocContent>
      <TocTitle>目次</TocTitle>
      <Toc dangerouslySetInnerHTML={{ __html: toc }} />
    </TocContent>
  );
};

export default PostToc;
