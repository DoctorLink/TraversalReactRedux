import React from 'react'
import { connect } from "react-redux";
import { PoseGroup } from 'react-pose';
import { Panel, PanelContainer, NavigationButtons } from '../../../Components';
import { wellnessConclusionsSelector } from "../../../Selectors/healthAssessment";
import CheckableConclusionsPanel from '../Conclusions/CheckableConclusionsPanel';
import WellbeingScores from "./WellbeingScores";

const Wellbeing = ({ traversalId, wellnessConclusions }) => {
    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="chart" float="right">
                <Panel>
                    <WellbeingScores traversalId={traversalId} />
                </Panel>
            </PanelContainer>
            <PanelContainer key="conclusions">
                <CheckableConclusionsPanel traversalId={traversalId} conclusions={wellnessConclusions} />
            </PanelContainer>
            <NavigationButtons
                key="nav"
                previousRoute={`/traversal/${traversalId}/risks`}
                nextRoute={`/traversal/${traversalId}/info`}
            />
        </PoseGroup>
    )
}

const mapStateToProps = state => ({
    wellnessConclusions: wellnessConclusionsSelector(state)
});
export default connect(mapStateToProps)(Wellbeing);
