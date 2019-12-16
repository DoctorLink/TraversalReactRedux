import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import styled from "styled-components";
import { Panel, PanelContainer, HealthReportPanelHeader, PanelContent, PanelBodyText, PanelConclusion, UpdateWhenVisible } from '../../../Components';
import { replaceLineBreaks } from '../../../Helpers';
import { healthAgeConclusionsSelector, healthAgeExplanationSelector } from "../../../Selectors/healthAssessment";
import CheckableConclusions from '../Conclusions/CheckableConclusions';
import { useHealthAge } from "../Hooks";
import { HealthAgeDial } from "./HealthAgeDial";

const Centered = styled(PanelBodyText)`
    text-align: center;
`

const HealthAge = ({ traversalId, healthAgeConclusions, explanation }) => {
    const { age, healthAge, minimumHealthAge } = useHealthAge(traversalId);
    const ageReduction = healthAge - minimumHealthAge;

    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="age">
                <Panel>
                    <HealthReportPanelHeader>Your health age report</HealthReportPanelHeader>
                    <PanelContent>
                        <UpdateWhenVisible offset={{ top: -20 }}>
                            <HealthAgeDial age={age} healthAge={healthAge} minimumHealthAge={minimumHealthAge} />
                        </UpdateWhenVisible>
                        <PanelConclusion>
                            {healthAge && <Centered>Your health age is <strong>{healthAge}</strong></Centered>}
                            {ageReduction > 0 &&
                                <Centered>But you could be up to <strong>{ageReduction}</strong> years younger by making the below changes</Centered>}
                            {ageReduction === 0 &&
                                <Centered>Which is the best it can be</Centered>}
                        </PanelConclusion>
                        <CheckableConclusions traversalId={traversalId} conclusions={healthAgeConclusions} />
                    </PanelContent>
                </Panel>
            </PanelContainer>
            {explanation && (
                <PanelContainer key="explanation">
                    <Panel>
                        <HealthReportPanelHeader>Your health age explained</HealthReportPanelHeader>
                        <PanelContent>
                            <div dangerouslySetInnerHTML={{ __html: replaceLineBreaks(explanation) }} />
                        </PanelContent>
                    </Panel>
                </PanelContainer>
            )}
        </PoseGroup>
    )
}

const mapStateToProps = state => ({
    healthAgeConclusions: healthAgeConclusionsSelector(state),
    explanation: healthAgeExplanationSelector(state),
});
export default connect(mapStateToProps)(HealthAge);
