import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { FastMountainRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastMountainRenderableSeries";
import { appTheme } from "../../theme";
import { getRandomSinewave } from "../chartUtils";

export default async function init2dSecondChart(rootElement: string | HTMLDivElement) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(rootElement, {
        theme: appTheme.SciChartJsTheme,
    });

    sciChartSurface.xAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(0, 10), isVisible: false })
    );
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(-3, 3), isVisible: false })
    );

    const { dataSeries } = getRandomSinewave(wasmContext, 0, 1.2, 0.5, 500, 6);

    sciChartSurface.renderableSeries.add(
        new FastMountainRenderableSeries(wasmContext, {
            dataSeries,
            stroke: appTheme.ChartsGridStroke3,
            fill: appTheme.ChartsGridFill3,
            strokeThickness: 1,
        })
    );

    return { sciChartSurface };
}
