import { createContext } from 'react';
import colors from '../../Theme/base/colors';

export const chartSettings = {
    barInterval: 30,
    barHeight: 15,
    barWidth: "55%",
    barLabelWidth: "40%",
    gridlineLabelHeight: 30,
    reducedRiskColor: colors.green100,
    reduceableRiskColor: colors.orange100,
};

export const ChartContext = createContext(chartSettings);