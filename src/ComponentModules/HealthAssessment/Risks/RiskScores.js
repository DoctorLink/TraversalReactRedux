import React, { useState } from 'react';
import { connect } from "react-redux";
import { HealthReportPanelHeader, PanelContent, InlineDropdown, RiskChart } from '../../../Components';

export const AgeOptions = [50, 60, 70, 80, 90, 100, 110];

const RiskScores = ({ riskSummary }) => {
    if (!riskSummary) return null;

    const { age, risks } = riskSummary;
    const visibleAgeOptions = AgeOptions.filter(option => option > age);
    const [selectedAge, setSelectedAge] = useState(90);
    const selectedTimescale = selectedAge - age;
    const selectedRisks = risks.filter(risk => risk.time === selectedTimescale);
    const onDropdownChange = e => setSelectedAge(e.target.value);
    return (
        <>
            <HealthReportPanelHeader>
                Your risks before the age of <InlineDropdown options={visibleAgeOptions} value={selectedAge} onChange={onDropdownChange} />
            </HealthReportPanelHeader>
            <PanelContent>
                <RiskChart risks={selectedRisks} />
            </PanelContent>
        </>
    )
}

const mapStateToProps = state => ({ riskSummary: state.healthAssessment.riskSummary });
export default connect(mapStateToProps)(RiskScores);