import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" isIndex={false} />
    <h1>404 NOT FOUND</h1>
    <p>お探しのページは見つかりませんでした</p>

    <Link to="/">トップページに戻る</Link>
  </Layout>
);

export default NotFoundPage;
