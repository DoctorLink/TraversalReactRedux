import React from 'react';
import styled from "styled-components";
import { barLabelWidth, barWidth, barHeight, barInterval, reducedRiskColor, reduceableRiskColor } from "./chartSettings";

const StyledRect = styled.rect`
    transition: width 0.5s, x 0.5s
`

const RiskBar = ({ risk, y }) => {
    if (isNaN(+risk.current)) {
        return null;
    }
    const { reduced, current } = risk;
    const reduceable = current - reduced;
    const reducedWidth = `${reduced.toFixed(1)}%`
    const reduceableWidth = `${reduceable.toFixed(1)}%`
    return (
        <svg x={barLabelWidth} y={y} width={barWidth}>
            <title>Current: {current}%, reduced: {reduced}%</title>
            <StyledRect fill={reducedRiskColor} width={reducedWidth} height={barHeight} x={0} />
            {reduceable > 0 &&
                <StyledRect fill={reduceableRiskColor} width={reduceableWidth} height={barHeight} x={reducedWidth} />}
        </svg>
    )
}

const LabelledRiskBar = ({ risk, index }) => {
    const padding = (barInterval - barHeight) / 2;
    const y = index * barInterval + padding;
    return (
        <g>
            <text width="30%" x={0} y={y + barHeight / 2 + 5}>{risk.name}</text>
            <RiskBar risk={risk} y={y} />
        </g>
    )
}

export const RiskBars = ({risks, x, y}) => {
    return (
        <svg x={x} y={y}>
            {risks.map((risk, i) => <LabelledRiskBar key={risk.name} risk={risk} index={i} />)}
        </svg>
    )
}