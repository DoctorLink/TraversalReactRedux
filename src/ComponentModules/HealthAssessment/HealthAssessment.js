import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { healthRisksGet, traversalConclusionGet, hraConclusionsGet } from '../../Actions';
import { AgeOptions } from './Risks/RiskScores';
import Risks from './Risks/Risks';

const HealthAssessment = ({ traversalId, dispatch }) => {
    useEffect(() => {
        dispatch(healthRisksGet(traversalId, AgeOptions, []));
        dispatch(traversalConclusionGet(traversalId));
    }, [traversalId]);

    useEffect(() => { dispatch(hraConclusionsGet() )}, []);

    return (
        <div>
            <h2>Global Health Check Scores</h2>
            <Risks traversalId={traversalId} />
        </div>
    )
}

export default connect()(HealthAssessment);
