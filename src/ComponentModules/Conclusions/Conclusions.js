import React from 'react'
import { connect } from 'react-redux'
import SymptomReport from '../../ComponentModules/SymptomReport'
import ConclusionList from './ConclusionList';

const Conclusions = ({ traversalId, assessmentType }) => {
    switch (assessmentType) {
        case 1:
            return <SymptomReport traversalId={traversalId} />;
        default:
            return <ConclusionList traversalId={traversalId} />;
    }
}

const mapStateToProps = state => ({ conclusion: state.conclusion });
export default connect(mapStateToProps)(Conclusions)