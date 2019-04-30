import React from 'react'
import styled from 'styled-components'

import ErrorText from '../ErrorText'

const QuestionContainer = styled.div`
    display: flex;
`

const DisplayText = styled.div`
    display: inline-block;
    padding: 10px;
    font-family: 'Noto Sans',sans-serif;

    .e24subtext {
        font-size: 14px;
        font-style: italic;
    }
`

const TraversalQuestion = ({ displayText, error, children }) => {
    return (<>
        <QuestionContainer>
            <DisplayText dangerouslySetInnerHTML={{ __html: displayText }} />
            {children}
        </QuestionContainer>
        {error && <ErrorText>{error.text}</ErrorText>}
    </>)
};

export default TraversalQuestion