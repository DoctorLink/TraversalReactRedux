import React, { useContext } from 'react';
import colors from '../../Theme/base/colors';
import { ChartContext } from "./ChartContext";

const GridLine = ({ percent, length }) => {
    const { barWidth, gridlineLabelHeight } = useContext(ChartContext);
    const x = percent / 100 * barWidth;
    return (
        <g>
            <text x={x + 5} y={gridlineLabelHeight / 2} textAnchor="middle">{percent}%</text>
            <line x1={x} y1={gridlineLabelHeight} x2={x} y2={length + gridlineLabelHeight} stroke={colors.grey300} strokeWidth="1" strokeDasharray="1 2" />
        </g>
    );
}

const GridLines = ({x, y, lineLength}) => {
    return (
        <svg x={x} y={y} overflow="visible">
            {[0, 25, 50, 75, 100].map(pc => <GridLine key={pc} percent={pc} length={lineLength} />)}
        </svg>
    );
}

export { GridLines }