import React, { useContext } from 'react';
import styled from "styled-components";
import { LabelledRiskBar } from "./RiskBar";
import { ChartContext, chartSettings } from "./ChartContext";
import { ChartKey } from "./ChartKey";
import { GridLine } from "./GridLine";

const SVG = styled.svg`
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
        <SVG width={svgWidth} height={svgHeight} ariaLabelledby="title">
            <title id="title">Your health risks</title>
            {[0, 25, 50, 75, 100].map(pc => <GridLine key={pc} percent={pc} length={chartHeight} />)}
            {risks.map((risk, i) => <LabelledRiskBar key={risk.name} risk={risk} index={i} />)}
            <ChartKey y={keyTop} />
        </SVG>
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