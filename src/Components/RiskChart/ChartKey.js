import React, { useContext } from 'react';
import { ChartContext } from "./ChartContext";

const KeyItem = ({x, fill, label}) => {
    const boxSize = useContext(ChartContext).barHeight;
    const textX = boxSize + 10;
    const textY = boxSize / 2 + 5;
    return (
        <svg x={x}>
            <rect width={boxSize} height={boxSize} fill={fill} />
            <text x={textX} y={textY}>{label}</text>
        </svg>
    );
}

export const ChartKey = ({x, y}) => {
    const { reducedRiskColor, reduceableRiskColor } = useContext(ChartContext);
    return (
        <svg x={x} y={y}>
            <KeyItem x={0} fill={reducedRiskColor} label="Risks you can't change" />
            <KeyItem x={220} fill={reduceableRiskColor} label="Risks you can change" />
        </svg>
    );
}
