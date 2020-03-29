/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, meta, keywords, title, lang, isIndex }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  if (title === site.siteMetadata.title) {
  }
  const titleTemplate =
    title === site.siteMetadata.title
      ? title
      : `%s | ${site.siteMetadata.title}`;

  const metaData: {
    name: string;
    content: string;
  }[] = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      name: `og:title`,
      content: title
    },
    {
      name: `og:description`,
      content: metaDescription
    },
    {
      name: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: metaDescription
    },
    {
      name: "google-site-verification",
      content: "gr3ncYJc-z7yrcQFHpqsnlpJUgTDk3J0K2t-Ywb90Bo"
    }
  ];

  if (!isIndex) {
    metaData.push({
      name: `robots`,
      content: `noindex`
    });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={titleTemplate}
      meta={metaData
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `)
              }
            : []
        )
        .concat(meta)}
    >
      <script
        async
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      {/* <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-7607948023862713",
          enable_page_level_ads: true
          });`}
      </script> */}
      <script
        type="application/javascript"
        src="//b.st-hatena.com/js/bookmark_button.js"
      />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  keywords: [],
  description: ``,
  isIndex: true
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  isIndex: PropTypes.bool
};

export default SEO;
