import colors from '../../Theme/base/colors';

export const fontSize = "0.25rem";

export const axisColor = colors.grey250;

export const barWidth = 4;
export const barMaxHeight = 60;
export const barColor = colors.green100;

const linecapRadius = barWidth / 2;

export const chartWidth = 70;
export const chartHeight = barMaxHeight + linecapRadius;
export const chartTop = 10;

export const origin = {
    x: 10,
    y: chartTop + chartHeight
}

export const barTop = chartTop + linecapRadius;
export const chartRight = origin.x + chartWidth;