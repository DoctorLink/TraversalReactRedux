import React, { useContext } from 'react';
import { ChartContext } from "./ChartContext";

const RiskBar = ({ risk, y }) => {
    const { barWidth, barHeight, barLabelWidth, reducedRiskColor, reduceableRiskColor } = useContext(ChartContext);
    if (isNaN(+risk.current)) {
        return null;
    }
    const { reduced, current } = risk;
    const reduceable = current - reduced;
    const reducedWidth = reduced * barWidth / 100;
    const reduceableWidth = reduceable * barWidth / 100;
    return (
        <g>
            <title>Current: {current}%, reduced: {reduced}%</title>
            <rect fill={reducedRiskColor} width={reducedWidth} height={barHeight} x={barLabelWidth} y={y} />
            {reduceableWidth > 0 && <rect fill={reduceableRiskColor} width={reduceableWidth} height={barHeight} x={barLabelWidth + reducedWidth} y={y} />}
        </g>
    )
}

export const LabelledRiskBar = ({ risk, index }) => {
    const { gridlineLabelHeight, barInterval, barHeight, barLabelWidth } = useContext(ChartContext);
    const padding = (barInterval - barHeight) / 2;
    const y = gridlineLabelHeight + index * barInterval + padding;
    return (
        <g>
            <text x={0} y={y + barHeight / 2 + 5}>{risk.name}</text>
            <RiskBar risk={risk} x={barLabelWidth} y={y} />
        </g>
    )
}
