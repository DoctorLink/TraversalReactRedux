import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import { Panel, PanelContainer, HealthReportPanelHeader, PanelContent, NavigationButtons } from '../../../Components';
import NonCheckableConclusions from "../Conclusions/NonCheckableConclusions";

const AdditionalInfo = ({ traversalId, healthAssessment, conclusions }) => {
    const { conclusionIds } = healthAssessment;

    const nonCheckableConclusions = conclusions.filter(c => !c.silent
        && conclusionIds.riskConclusions.indexOf(c.assetId) === -1
        && conclusionIds.wellnessConclusions.indexOf(c.assetId) === -1);

    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="conclusions">
                <Panel>
                    <HealthReportPanelHeader>Additional Information</HealthReportPanelHeader>
                    <PanelContent>
                        <NonCheckableConclusions conclusions={nonCheckableConclusions} />
                    </PanelContent>
                </Panel>
            </PanelContainer>
            <NavigationButtons
                key="nav"
                previousRoute={`/traversal/${traversalId}/wellbeing`}
            />
        </PoseGroup>
    )
}

const mapStateToProps = state => ({
    healthAssessment: state.healthAssessment,
    conclusions: state.conclusion && state.conclusion.conclusions || []
});
export default connect(mapStateToProps)(AdditionalInfo);
