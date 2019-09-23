import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import styled from "styled-components";
import { Panel, PanelContainer, HealthReportPanelHeader, PanelContent, PanelBodyText, NavigationButtons } from '../../../Components';
import { healthRisksGet } from '../../../Actions';
import CheckableConclusions from '../CheckableConclusions';
import { AgeOptions } from '../Risks/RiskScores';
import { HealthAgeDial } from "./HealthAgeDial";

const Centered = styled(PanelBodyText)`
    text-align: center;
`

const HealthAge = ({ traversalId, healthAssessment, conclusions, dispatch }) => {

    const { riskSummary, conclusionIds } = healthAssessment;
    const { age, healthAge, minimumHealthAge } = riskSummary;
    const ageReduction = healthAge - minimumHealthAge;
    const onConclusionsChanged = (ids) => dispatch(healthRisksGet(traversalId, AgeOptions, ids));

    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="age">
                <Panel>
                    <HealthReportPanelHeader>
                        Your health age report
                    </HealthReportPanelHeader>
                    <PanelContent>
                        <HealthAgeDial age={age} healthAge={healthAge} minimumHealthAge={minimumHealthAge} />
                        {healthAge && <Centered>Your health age is <strong>{healthAge}</strong></Centered>}
                        {ageReduction > 0 &&
                            <Centered>But you could be up to <strong>{ageReduction}</strong> years younger by making the below changes</Centered>}
                        {ageReduction == 0 &&
                        <Centered>Which is the best it can be</Centered>}

                        <CheckableConclusions conclusions={conclusions} checkableConclusions={conclusionIds.riskConclusions} onChange={onConclusionsChanged} />
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
