import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import { Panel, PanelContainer, HealthReportPanelHeader, PanelContent, PanelBodyText, NavigationButtons } from '../../../Components';
import { HealthAgeDial } from "./HealthAgeDial";
import styled from "styled-components";

const CenteredBodyText = styled(PanelBodyText)`
    text-align: center;
`

const HealthAge = ({ traversalId, healthAssessment }) => {

    const { riskSummary } = healthAssessment;
    const { age, healthAge, minimumHealthAge } = riskSummary;

    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="age">
                <Panel>
                    <HealthReportPanelHeader>
                        Your health age report
                    </HealthReportPanelHeader>
                    <PanelContent>
                        <HealthAgeDial age={age} healthAge={healthAge} minimumHealthAge={minimumHealthAge} />
                        {healthAge && (
                            <>
                                <CenteredBodyText>Your health age is <strong>{healthAge}</strong></CenteredBodyText>
                                <CenteredBodyText>But you could be up to <strong>{healthAge - minimumHealthAge}</strong> years younger by making the below changes</CenteredBodyText>
                            </>
                        )}
                    </PanelContent>
                </Panel>
            </PanelContainer>
            <NavigationButtons key="nav" nextRoute={`/traversal/${traversalId}/risks`} />
        </PoseGroup>
    )
}

const mapStateToProps = state => ({
    healthAssessment: state.healthAssessment,
    conclusions: state.conclusion && state.conclusion.conclusions || []
});
export default connect(mapStateToProps)(HealthAge);
