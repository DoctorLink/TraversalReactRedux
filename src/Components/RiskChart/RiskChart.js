import React, { useContext } from 'react';
import styled from "styled-components";
import { RiskBars } from "./RiskBars";
import { ChartContext, chartSettings } from "./ChartContext";
import { ChartKey } from "./ChartKey";
import { GridLines } from "./GridLines";

const StyledSvg = styled.svg`
    font-size: 0.8rem;
`

const RiskChart = ({ risks }) => {
    const { barInterval, gridlineLabelHeight, barLabelWidth, barWidth } = useContext(ChartContext);
    const chartHeight = risks.length * barInterval;
    const keyHeight = barInterval;
    const keyTop = gridlineLabelHeight + chartHeight + 20;
    const svgHeight = keyTop + keyHeight;
    const svgWidth = barLabelWidth + barWidth + 20;
    return (
        <StyledSvg width={svgWidth} height={svgHeight}>
            <title>Your health risks</title>
            <GridLines x={barLabelWidth} y={0} lineLength={chartHeight} />
            <RiskBars risks={risks} x={0} y={gridlineLabelHeight} />
            <ChartKey x={0} y={keyTop} />
        </StyledSvg>
    )
}

export default ({ risks }) => {
    // Using the context API allows us to change settings dynamically if required (e.g. responding to screen width).
    // We're not actually doing so as yet.
    return (
        <ChartContext.Provider value={chartSettings}>
            <RiskChart risks={risks} />
        </ChartContext.Provider>
    )
};