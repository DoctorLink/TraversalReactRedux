import React, { useState } from 'react';
import { PanelHeader, PanelContent, PanelTitle, InlineDropdown, RiskChart } from '../../Components';
import colors from '../../Theme/base/colors';

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
            <PanelHeader color={colors.brand100}>
                <PanelTitle>
                    Your risks before the age of <InlineDropdown options={visibleAgeOptions} value={selectedAge} onChange={onDropdownChange} />
                </PanelTitle>
            </PanelHeader>
            <PanelContent>
                <RiskChart risks={selectedRisks} />
            </PanelContent>
        </>
    )
}

export default RiskScores;