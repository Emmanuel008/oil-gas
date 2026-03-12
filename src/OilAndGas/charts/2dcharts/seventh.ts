import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { FastMountainRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastMountainRenderableSeries";
import { appTheme } from "../../theme";
import { getRandomSinewave } from "../chartUtils";

export default async function init2dSeventhChart(rootElement: string | HTMLDivElement) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(rootElement, {
        theme: appTheme.SciChartJsTheme,
    });

    sciChartSurface.xAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(0, 10), isVisible: false })
    );
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(-3, 3), isVisible: false })
    );

    const { dataSeries: ds1 } = getRandomSinewave(wasmContext, 0, 1.2, 0, 500, 7);
    const { dataSeries: ds2 } = getRandomSinewave(wasmContext, 0, 0.9, 1.0, 500, 5);
    const { dataSeries: ds3 } = getRandomSinewave(wasmContext, 0, 0.6, 2.0, 500, 3);

    sciChartSurface.renderableSeries.add(
        new FastMountainRenderableSeries(wasmContext, {
            dataSeries: ds1, stroke: appTheme.ChartsGridStroke1,
            fill: appTheme.ChartsGridFill1, strokeThickness: 1,
        })
    );
    sciChartSurface.renderableSeries.add(
        new FastMountainRenderableSeries(wasmContext, {
            dataSeries: ds2, stroke: appTheme.ChartsGridStroke2,
            fill: appTheme.ChartsGridFill2, strokeThickness: 1,
        })
    );
    sciChartSurface.renderableSeries.add(
        new FastMountainRenderableSeries(wasmContext, {
            dataSeries: ds3, stroke: appTheme.ChartsGridStroke3,
            fill: appTheme.ChartsGridFill3, strokeThickness: 1,
        })
    );

    return { sciChartSurface };
}
