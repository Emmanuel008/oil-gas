import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { appTheme } from "../../theme";
import { getRandomSinewave } from "../chartUtils";

export default async function init2dThirdChart(rootElement: string | HTMLDivElement) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(rootElement, {
        theme: appTheme.SciChartJsTheme,
    });

    sciChartSurface.xAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(0, 10), isVisible: false })
    );
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(-3, 3), isVisible: false })
    );

    const { dataSeries: ds1 } = getRandomSinewave(wasmContext, 50, 1.0, 0.3, 500, 4);
    const { dataSeries: ds2 } = getRandomSinewave(wasmContext, 0, 0.7, 2.1, 500, 7);
    const { dataSeries: ds3 } = getRandomSinewave(wasmContext, 150, 1.3, 1.5, 500, 3);

    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, { dataSeries: ds1, stroke: appTheme.ChartsGridStroke1, strokeThickness: 1 })
    );
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, { dataSeries: ds2, stroke: appTheme.ChartsGridStroke2, strokeThickness: 1 })
    );
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, { dataSeries: ds3, stroke: appTheme.ChartsGridStroke3, strokeThickness: 1 })
    );

    return { sciChartSurface };
}
