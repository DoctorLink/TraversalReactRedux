import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import styled from "styled-components";
import { Panel, PanelContainer, HealthReportPanelHeader, PanelContent, PanelBodyText, NavigationButtons, PanelConclusion } from '../../../Components';
import CheckableConclusions from '../CheckableConclusions';
import { HealthAgeDial } from "./HealthAgeDial";

const Centered = styled(PanelBodyText)`
    text-align: center;
`

const HealthAge = ({ traversalId, healthAssessment }) => {

    const { riskSummary, conclusionIds } = healthAssessment;
    const { age, healthAge, minimumHealthAge } = riskSummary;
    const ageReduction = healthAge - minimumHealthAge;

    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="age">
                <Panel>
                    <HealthReportPanelHeader>
                        Your health age report
                    </HealthReportPanelHeader>
                    <PanelContent>
                        <HealthAgeDial age={age} healthAge={healthAge} minimumHealthAge={minimumHealthAge} />
                        <PanelConclusion>
                            {healthAge && <Centered>Your health age is <strong>{healthAge}</strong></Centered>}
                            {ageReduction > 0 &&
                                <Centered>But you could be up to <strong>{ageReduction}</strong> years younger by making the below changes</Centered>}
                            {ageReduction === 0 &&
                                <Centered>Which is the best it can be</Centered>}
                        </PanelConclusion>
                        <CheckableConclusions traversalId={traversalId} checkableConclusions={conclusionIds.riskConclusions} />
                    </PanelContent>
                </Panel>
            </PanelContainer>
            <NavigationButtons key="nav" nextRoute={`/traversal/${traversalId}/risks`} />
        </PoseGroup>
    )
}

const mapStateToProps = state => ({
    healthAssessment: state.healthAssessment
});
export default connect(mapStateToProps)(HealthAge);
