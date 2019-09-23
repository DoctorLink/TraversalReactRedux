import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import { Panel, PanelContainer, NavigationButtons } from '../../../Components';
import { healthRisksGet } from '../../../Actions';
import RiskExplanations from './RiskExplanations';
import RiskConclusions from './RiskConclusions';
import RiskScores, { AgeOptions } from './RiskScores';

const Risks = ({ traversalId, healthAssessment, conclusions, dispatch }) => {
    const onConclusionsChanged = (ids) => dispatch(healthRisksGet(traversalId, AgeOptions, ids));

    const { conclusionIds } = healthAssessment;

    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="risk" float="right">
                <Panel>
                    <RiskScores />
                </Panel>
            </PanelContainer>
            <PanelContainer key="conclusions">
                <RiskConclusions conclusions={conclusions} checkableConclusions={conclusionIds.riskConclusions} onChange={onConclusionsChanged} />
            </PanelContainer>
            <PanelContainer key="explanations">
                <Panel>
                    <RiskExplanations conclusions={conclusions} />
                </Panel>
            </PanelContainer>
            <NavigationButtons
                key="nav"
                previousRoute={`/traversal/${traversalId}/health-age`}
                nextRoute={`/traversal/${traversalId}/wellbeing`}
            />
        </PoseGroup>
    )
}

const mapStateToProps = state => ({
    healthAssessment: state.healthAssessment,
    conclusions: state.conclusion && state.conclusion.conclusions || []
});
export default connect(mapStateToProps)(Risks);
