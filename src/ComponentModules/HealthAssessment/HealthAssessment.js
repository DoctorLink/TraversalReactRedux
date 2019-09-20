import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom'
import { healthRisksGet, traversalConclusionGet, hraConclusionsGet } from '../../Actions';
import { AgeOptions } from './Risks/RiskScores';
import Risks from './Risks/Risks';
import HealthAge from './HealthAge/HealthAge';

const HealthAssessment = ({ traversalId, dispatch }) => {
    useEffect(() => {
        dispatch(healthRisksGet(traversalId, AgeOptions, []));
        dispatch(traversalConclusionGet(traversalId));
    }, [traversalId]);

    useEffect(() => { dispatch(hraConclusionsGet()) }, []);

    const basePath = `/traversal/${traversalId}`;
    return (
        <div>
            <h2>Global Health Check Scores</h2>
            <Switch>
                <Route path={`${basePath}/health-age`} render={() => <HealthAge traversalId={traversalId} />} />
                <Route path={`${basePath}/risks`} render={() => <Risks traversalId={traversalId} />} />
                <Route render={() => <Redirect to={`${basePath}/health-age`} />} />
            </Switch>
        </div>
    )
}

export default connect()(HealthAssessment);
