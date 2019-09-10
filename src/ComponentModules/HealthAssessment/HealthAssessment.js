import React, { useEffect } from 'react'
import { PoseGroup } from 'react-pose';
import { connect } from "react-redux";
import { healthRisksGet, traversalConclusionGet, populateModal } from '../../Actions';
import { Panel, PanelContainer } from '../../Components';
import CheckableConclusions from './CheckableConclusions';
import RiskScores, { AgeOptions } from './RiskScores';

const HealthAssessment = ({ traversalId, healthAssessment, conclusions, dispatch }) => {
    const getRisks = (checkedConclusions) => dispatch(healthRisksGet(traversalId, AgeOptions, checkedConclusions));
    useEffect(() => {
        getRisks([]);
        dispatch(traversalConclusionGet(traversalId));
    }, [traversalId]);

    const onConclusionsChanged = (ids) => getRisks(ids);
    const showExplanation = explanation => dispatch(populateModal(explanation));

    const { riskSummary } = healthAssessment;

    return (
        <div>
            <h2>Global Health Check Scores</h2>
            <PoseGroup animateOnMount={true}>
                <PanelContainer key="risk" float="right">
                    <Panel>
                        <RiskScores riskSummary={riskSummary} />
                    </Panel>
                </PanelContainer>
                <PanelContainer key="conclusions">
                    <Panel>
                        <CheckableConclusions riskSummary={riskSummary} conclusions={conclusions} onChange={onConclusionsChanged} showExplanation={showExplanation} />
                    </Panel>
                </PanelContainer>
            </PoseGroup>
        </div>
    )
}

const mapStateToProps = state => ({
    healthAssessment: state.healthAssessment,
    conclusions: state.conclusion && state.conclusion.conclusions || []
});
export default connect(mapStateToProps)(HealthAssessment);