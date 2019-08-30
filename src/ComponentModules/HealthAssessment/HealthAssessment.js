import React, { useEffect } from 'react'
import { connect } from "react-redux";
import RiskScores, { AgeOptions } from './RiskScores';
import { PoseGroup } from 'react-pose';
import { Panel } from '../../Components';
import { healthRisksGet } from '../../Actions';

const HealthAssessment = ({ traversalId, healthAssessment, dispatch }) => {
    useEffect(() => { dispatch(healthRisksGet(traversalId, AgeOptions)) }, [traversalId]);
    return (
        <div>
            <h2>Global Health Check Scores</h2>
            <PoseGroup animateOnMount={true}>
                <Panel key="risk">
                    <RiskScores riskSummary={healthAssessment.risks} />
                </Panel>
            </PoseGroup>
        </div>
    )
}

const mapStateToProps = state => ({ healthAssessment: state.healthAssessment });
export default connect(mapStateToProps)(HealthAssessment);