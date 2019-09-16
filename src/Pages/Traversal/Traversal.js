import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../Actions'
import TraversalComponent from '../../ComponentModules/Traversal'
import Conclusions from '../../ComponentModules/Conclusions';

const Traversal = ({ traversal, match, dispatch }) => {
    const { id } = match.params;
    useEffect(() => { dispatch(actions.traversalContinue(id)) }, [id]);

    if (!traversal) {
        return null;
    }

    if (traversal.nodeIds.length === 0) {
        return <Conclusions traversalId={id} assessmentType={traversal.assessmentType} />
    }

    return (<TraversalComponent
        traversal={traversal}
        next={traversal => dispatch(actions.traversalNext(traversal))}
        previous={traversalId => dispatch(actions.traversalPrevious(traversalId))}
        showSummary={traversalId => dispatch(actions.traversalSummaryGet(traversalId))}
        showExplanation={explanation => dispatch(actions.populateModal(explanation))} />
    )
}

const mapStateToProps = state => ({ traversal: state.traversal, conclusion: state.conclusion })

export default connect(mapStateToProps)(Traversal)