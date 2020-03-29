import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const HeaderStyle = styled.header`
  background: teal;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin: 0;

  @media only screen and (max-width: 480px) {
    text-align: center;
    width: 100%;
    padding-bottom: 0.5rem;
  }
`;
const TitleLink = css`
  color: white;
  text-decoration: none;
  box-shadow: none;
`;

const ItemLink = css`
  color: white;
  text-decoration: none;
  box-shadow: none;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media only screen and (max-width: 480px) {
    padding: 1rem 0 0 0;
  }
`;

const ItemContainer = styled.ul`
  margin-left: 0;
  margin-bottom: 0;
  font-size: 0;
  vertical-align: middle;

  @media only screen and (max-width: 480px) {
    text-align: center;
    width: 100%;
  }
`;

const Item = styled.li`
  display: inline-block;
  font-size: 1.2rem;
  margin-bottom: 0;
  margin-left: 0;
  padding: 1rem;

  &:hover {
    opacity: 0.7;
  }

  @media only screen and (max-width: 480px) {
    padding-bottom: 0;
  }
`;

const Header = ({ siteTitle }) => (
  <HeaderStyle>
    <Container>
      <Title>
        <Link to="/" css={TitleLink}>
          {siteTitle}
        </Link>
      </Title>
      <ItemContainer>
        <Item>
          <Link to="/profile" css={ItemLink}>
            Profile
          </Link>
        </Item>
        <Item>
          <Link to="/privacy" css={ItemLink}>
            Privacy
          </Link>
        </Item>
        <Item>
          <Link to="/contact" css={ItemLink}>
            Contact
          </Link>
        </Item>
      </ItemContainer>
    </Container>
  </HeaderStyle>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
