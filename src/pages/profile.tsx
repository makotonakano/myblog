import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ImgByPath from "../components/ImgByPath";
import styled from "@emotion/styled";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faTwitterSquare
} from "@fortawesome/free-brands-svg-icons";

const flex = `
display: -webkit-flex;
display: -moz-flex;
display: -ms-flex;
display: -o-flex;
display: flex;
`;

const Flex = styled.section`
  ${flex}
`;

const Title = styled.h1`
  font-size: 30px;
`;

const PImg = styled.div`
  height: 200px;
  width: 200px;
`;

const Label = styled.label`
  margin-right: 10px;
`;
const Text = styled.p`
  margin-bottom: 10px;
`;

const SnsLink = styled.a`
  margin-right: 10px;
`;

const H2 = styled.h2`
  margin-bottom: 20px;
`;

const H3 = styled.h3`
  margin-bottom: 0;
`;
const Section = styled.section`
  margin-top: 25px;
`;
const ProfilePage = () => (
  <Layout>
    <SEO
      title="中野's workspace"
      keywords={[`gatsby`, `programming`]}
      isIndex={false}
    />
    <Title>プロフィール</Title>
    <PImg>
      <ImgByPath filename="profile/profile.jpg" />
    </PImg>
    <div>
      <SnsLink href="https://github.com/makotonakano">
        <FontAwesomeIcon size="3x" color="#333" icon={faGithubSquare} />
      </SnsLink>

      <SnsLink href="https://twitter.com/up_pff">
        <FontAwesomeIcon size="3x" color="#3eaded" icon={faTwitterSquare} />
      </SnsLink>
    </div>
    <Section>
      <Flex>
        <Label htmlFor="name">名前</Label>
        <Text className="name">中野 誠</Text>
      </Flex>
      <Flex>
        <Label htmlFor="job">職業</Label>
        <Text className="job">システムエンジニア</Text>
      </Flex>
      <Flex>
        <Label htmlFor="age">年齢</Label>
        <Text className="age">25歳</Text>
      </Flex>
      <Flex>
        <Label htmlFor="zayu">座右の銘</Label>
        <Text className="zayu">一所懸命</Text>
      </Flex>
    </Section>

    <Section>
      {/* <h2>経歴</h2>
      <Text>ほげほげ</Text> */}
      <H2>経験のあるもの</H2>
      {/* <H3>フロント</H3>
      Html5/CSS3/JavaScript/JQuery/TypeScript/React/Gatsby */}
      <H3>サーバサイド</H3>
      <Text>node.js/PHP(Laravel)/Java/Swift/Elixir(Phoenix)</Text>
      <H3>インフラ</H3>
      <Text>
        {" "}
        Jenkins/AWS(EC2,S3,Route53,RDS,CloudFront,CodeBuild,CloudWatch)
      </Text>
      <H3>ツール</H3>
      <Text> Git/Slack/ChatWork/JIRA/Confluence/Backlog</Text>
    </Section>
    <Section>
      <H2>趣味</H2>
      <Text>映画鑑賞</Text>
      <Text>写真撮影</Text>
      <Text>読書</Text>
      <Text>認知科学のお勉強</Text>
      <H2>このサイトの目的</H2>
      <Text>
        このサイトは日々学んだことをアウトプット出来ていないなあと感じたため作成しました。
        <br />
        プログラミングや読書の他に、日常生活を送る中で感じたことなどゆるゆると書いていこうかと思ってます。
        <br />
        なお、このサイトは趣味の一環でGatsbyJsで作成しました。
      </Text>
    </Section>
  </Layout>
);

export default ProfilePage;
