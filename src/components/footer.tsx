import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Link } from "gatsby";

const FooterBg = styled.footer`
  background: teal;
`;

const FooterContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem;

  @media only screen and (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Items = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0;

  @media only screen and (max-width: 480px) {
    text-align: center;
    width: 100%;
  }
`;

const AtC = styled.li`
  display: inline-block;
  color: white;
`;

const LinkItem = styled.li`
  display: inline-block;

  &:hover {
    opacity: 0.7;
  }

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const ItemStyle = css`
  color: white;
  text-decoration: none;
  box-shadow: none;
`;

const Footer = () => (
  <FooterBg>
    <FooterContainer>
      <Items>
        <AtC>Copyright © 2019. Makoto Nakano</AtC>
        <LinkItem>
          <Link to={`/allTags`} css={ItemStyle}>
            ALL Tags
          </Link>
        </LinkItem>
      </Items>
    </FooterContainer>
  </FooterBg>
);

export default Footer;
