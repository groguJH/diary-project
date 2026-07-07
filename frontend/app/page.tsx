import styled from "styled-components";

const PageWrapper = styled.main`
  min-height: 100vh;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
`;

const Description = styled.p`
  margin-top: 16px;
  font-size: 18px;
  color: #555;
`;

export default function Home() {
  return (
    <PageWrapper>
      <Title>Diary Project</Title>
      <Description>
        꾸준히 일기를 쓰는 습관을 만드는 다이어리 사이트 🌱
      </Description>
    </PageWrapper>
  );
}
