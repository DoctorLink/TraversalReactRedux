import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import { Panel, PanelContainer, NavigationButtons } from '../../../Components';
import { riskConclusionsSelector } from "../../../Selectors/healthAssessment";
import RiskExplanations from './RiskExplanations';
import CheckableConclusionsPanel from '../Conclusions/CheckableConclusionsPanel';
import RiskScores from './RiskScores';

const Risks = ({ traversalId, riskConclusions }) => {
    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="risk" float="right">
                <Panel>
                    <RiskScores traversalId={traversalId} />
                </Panel>
            </PanelContainer>
            <PanelContainer key="conclusions">
                <CheckableConclusionsPanel traversalId={traversalId} conclusions={riskConclusions} />
            </PanelContainer>
            <PanelContainer key="explanations">
                <Panel>
                    <RiskExplanations />
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
    riskConclusions: riskConclusionsSelector(state),
});
export default connect(mapStateToProps)(Risks);
