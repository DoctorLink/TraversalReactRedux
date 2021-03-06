import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HiddenSubmit = styled.input.attrs<any>({
  type: 'submit',
  tabIndex: '-1',
})`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
`;

const Form = styled(motion.form)`
  padding: 0;
  margin: 0;
  border: 0;
  border-top: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  max-width: 440px;
`;

const ChatForm = React.forwardRef<any, any>(
  ({ renderSubmit, disableSubmit, ...props }, ref) => (
    <Form ref={ref} {...props}>
      {renderSubmit && <HiddenSubmit disabled={disableSubmit} />}
      {props.children}
    </Form>
  )
);

export default ChatForm;
