import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from "react-share";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

interface postInfo {
  url: string;
  title: string;
}

const Container = styled.div`
  display: flex;

  & > div {
    padding-right: 1rem;
  }
`;

const SNSLink = ({ postInfo }: { postInfo: postInfo }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  );
  const url: string = site.siteMetadata.siteUrl + "posts/" + postInfo.url;

  return (
    <Container>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon title={postInfo.title} size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton title={postInfo.title} via="mabumaburi" url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <a
        href="http://b.hatena.ne.jp/entry/"
        className="hatena-bookmark-button"
        data-hatena-bookmark-layout="vertical-normal"
        data-hatena-bookmark-lang="ja"
        title="このエントリーをはてなブックマークに追加"
      >
        <img
          src="//b.st-hatena.com/images/entry-button/button-only@2x.png"
          alt="このエントリーをはてなブックマークに追加"
          width="20"
          height="20"
          style={{ border: "none" }}
        />
      </a>
    </Container>
  );
};

export default SNSLink;
