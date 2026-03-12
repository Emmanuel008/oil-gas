import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { appTheme } from "../../theme";
import { getRandomSinewave } from "../chartUtils";

export default async function init2dFirstChart(rootElement: string | HTMLDivElement) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(rootElement, {
        theme: appTheme.SciChartJsTheme,
    });

    sciChartSurface.xAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(0, 10), isVisible: false })
    );
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(-3, 3), isVisible: false })
    );

    const { dataSeries: ds1 } = getRandomSinewave(wasmContext, 0, 1.5, 0, 500, 5);
    const { dataSeries: ds2 } = getRandomSinewave(wasmContext, 100, 0.8, 1, 500, 8);

    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: ds1,
            stroke: appTheme.ChartsGridStroke1,
            strokeThickness: 1,
        })
    );
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: ds2,
            stroke: appTheme.ChartsGridStroke2,
            strokeThickness: 1,
        })
    );

    return { sciChartSurface };
}
