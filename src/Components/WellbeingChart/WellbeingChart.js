import React from 'react';
import styled from "styled-components";
import { WellbeingBars } from './WellbeingBars';
import { XAxis, YAxis } from './Axes';
import { OverallWellbeingLine } from "./OverallWellbeingLine";
import { fontSize, chartWidth, barMaxHeight, barTop, origin } from "./chartSettings";

const StyledSvg = styled.svg`
    font-size: ${fontSize};
    overflow: visible;
    width: 100%;
`

const getY = (percent) => (1 - percent / 100) * barMaxHeight + barTop;

const mapDataPoints = (scores) => {
    const barInterval = chartWidth / scores.length;
    return scores.map((score, index) => ({
        label: score.name,
        value: score.score,
        // These are coordinates in SVG space (relative to top left), not relative to the chart origin.
        x: origin.x + (index + 0.5) * barInterval,
        y: getY(score.score)
    }));
}

const yAxisLabels = [0, 25, 50, 75, 100].map(percent => ({ label: `${percent}%`, y: getY(percent) }));

const WellbeingChart = ({ scores }) => {
    const overallScore = scores.find(s => s.name === "Overall Wellbeing");
    const individualScores = scores.filter(s => s !== overallScore);
    const data = mapDataPoints(individualScores);
    return (
        <StyledSvg viewBox="0 0 100 100">
            <title>Your lifestyle scores</title>
            <WellbeingBars data={data} />
            <XAxis data={data} />
            <YAxis labels={yAxisLabels} />
            {overallScore && <OverallWellbeingLine percent={overallScore.score} y={getY(overallScore.score)} />}
        </StyledSvg>
    )
}

export { WellbeingChart };
