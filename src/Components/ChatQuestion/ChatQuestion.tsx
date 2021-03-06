import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '../../Theme';
import { motion } from 'framer-motion';

const QuestionContent = styled.div`
  white-space: pre-line;
  max-width: 440px;
  position: relative;
  box-sizing: border-box;
  background-color: rgb(243, 243, 243);
  color: inherit;
  font-size: 16px;
  line-height: 24px;
  border-width: 1px 1px 1px;
  border-style: solid solid none;
  border-color: rgb(200, 205, 215) rgb(200, 205, 215) rgb(200, 205, 215);
  border-image: initial;
  border-bottom: none;
  padding: 16px;
  outline: none;
  animation: 0s ease 0s 1 normal none running none;

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom: 1px solid rgb(200, 205, 215);
  }

  &:only-child {
    display: inline-block;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom: 1px solid rgb(200, 205, 215);
  }

  .e24subtext {
    font-size: 14px;
    line-height: 20px;
    font-style: italic;
  }
`;

interface Props {
  current: boolean;
}

const QuestionWrapper = styled(motion.div)<Props>`
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  transition: width 300ms ease 0s;

  ${QuestionContent} {
    width: ${p => (p.current ? '100%' : 'auto')};
    &:last-child {
      border-bottom-left-radius: ${p => (p.current ? '0' : '6px')};
      border-bottom-right-radius: ${p => (p.current ? '0' : '6px')};
    }
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: rgb(179, 0, 0);
`;

const ChatQuestion = React.forwardRef<any, any>(
  ({ displayText, error, current, children, ...props }, ref) => (
    <QuestionWrapper current={current} ref={ref} {...props}>
      <QuestionContent>
        <span dangerouslySetInnerHTML={{ __html: displayText }}></span>
        {error && <ErrorText>{error.text}</ErrorText>}
        {children}
      </QuestionContent>
    </QuestionWrapper>
  )
);

ChatQuestion.defaultProps = {
  theme: defaultTheme,
};

export default ChatQuestion;
