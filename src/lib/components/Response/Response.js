import styled from 'styled-components'
import baseTheme from '../../Theme/base/index'

const Response = styled.div`
    margin-bottom: ${p=>p.theme.spacing.responseMargin}px;
`

Response.defaultProps = {
    theme: baseTheme 
}

export default Response