import React, { useContext } from 'react';
import colors from '../../Theme/base/colors';
import { ChartContext } from "./ChartContext";

const GridLine = ({ percent, length }) => {
    const { barLabelWidth, barWidth, gridlineLabelHeight } = useContext(ChartContext);
    const x = barLabelWidth + percent / 100 * barWidth;
    return (
        <g>
            <text x={x + 5} y={gridlineLabelHeight / 2} textAnchor="middle">{percent}%</text>
            <line x1={x} y1={gridlineLabelHeight} x2={x} y2={length + gridlineLabelHeight} stroke={colors.grey300} strokeWidth="1" strokeDasharray="1 2" />
        </g>
    );
}

export { GridLine }