import React from 'react';
import styled from 'styled-components';

const Rectangle = styled.div`
  height: 24px;
  width: 100%;
  background: linear-gradient(
    270deg,
    #24a31b 0%,
    #b6ef17 25%,
    #ffcc00 50%,
    #ff6400 75%,
    #e50707 100%
  );
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (min-width: 800px) {
    border-radius: 0 0 8px 8px;
  }
`;

const Text = styled.div`
  font-size: 0.75rem;
  color: #ffffff;
  align-self: center;
`;

const LeftText = styled(Text)`
  padding-left: 2%;
`;

const RightText = styled(Text)`
  padding-right: 2%;
`;

const DialBar: React.FC = () => {
  return (
    <Rectangle>
      <LeftText>Unhealthy </LeftText>
      <RightText>Healthy</RightText>
    </Rectangle>
  );
};

export { DialBar };
