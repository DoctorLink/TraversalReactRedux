import React from 'react'
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';
import { Panel, PanelContainer, HealthReportPanelHeader, PanelContent, NavigationButtons } from '../../../Components';
import { additionalConclusionsSelector } from "../../../Selectors/healthAssessment";
import NonCheckableConclusions from "../Conclusions/NonCheckableConclusions";

const AdditionalInfo = ({ traversalId, additionalConclusions }) => {
    return (
        <PoseGroup animateOnMount={true}>
            <PanelContainer key="conclusions">
                <Panel>
                    <HealthReportPanelHeader>Additional Information</HealthReportPanelHeader>
                    <PanelContent>
                        <NonCheckableConclusions conclusions={additionalConclusions} />
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
    additionalConclusions: additionalConclusionsSelector(state),
});
export default connect(mapStateToProps)(AdditionalInfo);
