import React from 'react'
import { Panel, HealthReportPanelHeader, PanelContent } from '../../../Components';
import CheckableConclusions from '../CheckableConclusions';

const RiskConclusions = ({ conclusions, checkableConclusions, onChange }) => (
    <Panel>
        <HealthReportPanelHeader>
            See the impact of making the following changes to your lifestyle
            </HealthReportPanelHeader>
        <PanelContent>
            <CheckableConclusions conclusions={conclusions} checkableConclusions={checkableConclusions} onChange={onChange} />
        </PanelContent>
    </Panel>
)

export default RiskConclusions;
