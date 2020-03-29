import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const Title = styled.h1`
  font-size: 30px;
`;

const Description = styled.p`
  margin-bottom: 0;
  line-height: 1.6rem;
`;
const Container = styled.section`
  margin-top: 2rem;
`;

const InputDiv = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
`;

const TextCSS = css`
  width: 100%;
  height: 2rem;
  border: 1.5px solid #ddd;
  outline: 0;
  border-radius: 5px;
  padding-left: 0.5rem;
  font-size: 16px;
`;

const TextAreaCss = css`
  resize: none;
  width: 100%;
  height: 15rem;
  border: 1.5px solid #ddd;
  outline: 0;
  border-radius: 5px;
  padding-left: 0.5rem;
  font-size: 16px;
`;
const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  background-color: teal;
  color: white;
  font-weight: bold;
  padding: 0.5rem;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
    transform: translateY(-1px);
  }
`;

const ContactPage = () => (
  <Layout>
    <SEO
      title="中野's workspace"
      keywords={[`contact`, `お問い合わせ`]}
      isIndex={false}
    />
    <Title>お問い合わせ</Title>

    <Description>当ブログをご利用頂き、ありがとうございます。</Description>
    <Description>
      連絡したいこと・問い合わせしたいことがございましたら、下記よりお気軽にお問い合わせください。
    </Description>

    <Container>
      <form name="contact" method="post" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <InputDiv>
          <Label>お名前</Label>
          <input type="text" placeholder="姓 名" css={TextCSS} required />
        </InputDiv>
        <InputDiv>
          <Label>メールアドレス</Label>
          <input
            type="email"
            placeholder="○○＠○○.co.jp"
            css={TextCSS}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label>お問い合わせ内容</Label>
          <textarea
            name="message"
            id="message"
            cols={50}
            rows={10}
            css={TextAreaCss}
            required
          />
        </InputDiv>
        <Button>送信</Button>
      </form>
    </Container>
  </Layout>
);

export default ContactPage;
