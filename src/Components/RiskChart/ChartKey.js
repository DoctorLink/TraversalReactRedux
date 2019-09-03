import React, { useContext } from 'react';
import { ChartContext } from "./ChartContext";


const KeyBox = ({x, y, fill}) => {
    const { barHeight } = useContext(ChartContext);
    return <rect x={x} y={y} width={barHeight} height={barHeight} fill={fill} />;
}

const KeyItem = ({x, y, fill, label}) => {
    const { barHeight } = useContext(ChartContext);
    const textY = y + barHeight / 2 + 5;
    return (
        <g>
            <KeyBox x={x} y={y} fill={fill} />
            <text x={x + barHeight + 10} y={textY}>{label}</text>
        </g>
    );
}

export const ChartKey = ({y}) => {
    const { reducedRiskColor, reduceableRiskColor } = useContext(ChartContext);
    return (
        <g>
            <KeyItem x={0} y={y} fill={reducedRiskColor} label="Risks you can't change" />
            <KeyItem x={220} y={y} fill={reduceableRiskColor} label="Risks you can change" />
        </g>
    );
}
