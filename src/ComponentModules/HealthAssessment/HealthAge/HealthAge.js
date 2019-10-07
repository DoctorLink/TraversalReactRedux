import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import styled from "styled-components";
import { Panel, PanelContainer, HealthReportPanelHeader, PanelContent, PanelBodyText, PanelConclusion, UpdateWhenVisible } from '../../../Components';
import { riskConclusionsSelector } from "../../../Selectors/healthAssessment";
import CheckableConclusions from '../Conclusions/CheckableConclusions';
import { useRiskSummary } from "../Hooks";
import { HealthAgeDial } from "./HealthAgeDial";

const Centered = styled(PanelBodyText)`
    text-align: center;
`

const HealthAge = ({ traversalId, riskConclusions }) => {
    const riskSummary = useRiskSummary(traversalId);
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
                        <UpdateWhenVisible offset={{top: -20}}>
                            <HealthAgeDial age={age} healthAge={healthAge} minimumHealthAge={minimumHealthAge} />
                        </UpdateWhenVisible>
                        <PanelConclusion>
                            {healthAge && <Centered>Your health age is <strong>{healthAge}</strong></Centered>}
                            {ageReduction > 0 &&
                                <Centered>But you could be up to <strong>{ageReduction}</strong> years younger by making the below changes</Centered>}
                            {ageReduction === 0 &&
                                <Centered>Which is the best it can be</Centered>}
                        </PanelConclusion>
                        <CheckableConclusions traversalId={traversalId} conclusions={riskConclusions} />
                    </PanelContent>
                </Panel>
            </PanelContainer>
        </PoseGroup>
    )
}

const mapStateToProps = state => ({
    riskConclusions: riskConclusionsSelector(state),
});
export default connect(mapStateToProps)(HealthAge);
