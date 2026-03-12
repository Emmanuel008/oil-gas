import { SciChartSurface } from "scichart";
import { LegendModifier } from "scichart/Charting/ChartModifiers/LegendModifier";
import { XyyDataSeries } from "scichart/Charting/Model/XyyDataSeries";
import { FastBandRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastBandRenderableSeries";
import { ELegendPlacement, ELegendOrientation, TLegendItem } from "scichart/Charting/Visuals/Legend/SciChartLegendBase";
import { NumberRange } from "scichart/Core/NumberRange";
import { Thickness } from "scichart/Core/Thickness";
import { setupVerticalChartAxes, addVerticalChartModifiers, getParsedData } from "../vChartUtils";
import { appTheme } from "../../theme";

export const drawDensityChart = async (rootElement: string | HTMLDivElement) => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(rootElement, {
        theme: appTheme.SciChartJsTheme,
        padding: Thickness.fromNumber(0),
        id: "densityChart",
    });

    const yAxisId = "y-axis-id";
    setupVerticalChartAxes(sciChartSurface, wasmContext, yAxisId);
    addVerticalChartModifiers(sciChartSurface, yAxisId);

    sciChartSurface.yAxes.get(0).visibleRange = new NumberRange(-0.2, 0.2);

    const dataSeries = new XyyDataSeries(wasmContext, { dataIsSortedInX: true, containsNaN: false });

    const data = await getParsedData("Density.csv");
    data.forEach((dataRow) => {
        dataSeries.append(dataRow[0], dataRow[1], dataRow[2]);
    });

    const bandSeries = new FastBandRenderableSeries(wasmContext, {
        dataSeries,
        strokeThickness: 0,
        stroke: appTheme.DensityStrokeY,
        strokeY1: appTheme.DensityStrokeY1,
        fill: appTheme.DensityFillY,
        fillY1: appTheme.DensityFillY1,
    });

    bandSeries.rolloverModifierProps.tooltipColor = appTheme.RolloverTooltipFill;
    bandSeries.rolloverModifierProps.tooltipTextColor = appTheme.RolloverTooltipText;
    bandSeries.rolloverModifierProps.markerColor = appTheme.RolloverTooltipFill;
    bandSeries.rolloverModifierProps1.tooltipColor = appTheme.RolloverTooltipFill;
    bandSeries.rolloverModifierProps1.tooltipTextColor = appTheme.RolloverTooltipText;
    bandSeries.rolloverModifierProps1.markerColor = appTheme.RolloverTooltipFill;

    sciChartSurface.renderableSeries.add(bandSeries);

    const legendModifier = new LegendModifier({ placementDivId: `density-legend` });
    legendModifier.sciChartLegend.getLegendHTML = generateDensityLegend;
    sciChartSurface.chartModifiers.add(legendModifier);

    return { sciChartSurface };
};

const generateDensityLegend = (
    placement: ELegendPlacement,
    textColor: string,
    backgroundColor: string,
    margin: Thickness,
    orientation: ELegendOrientation,
    showCheckboxes: boolean,
    showSeriesMarkers: boolean,
    items: TLegendItem[]
): string => {
    return `
    <div class="chart-legend">
        <div class="legend-color-item" style="height: 30px; color: ${appTheme.LegendTextColor}">
            <div class="color-label" style="background-color: ${appTheme.DensityBackgroundOne};"></div>
            <div class="color-label" style="background-color: ${appTheme.DensityBackgroundTwo};"></div>
        </div>
        <span class="scichart__legend-line" style="border-top: 2px solid ${appTheme.DensityLegendSeparator}"></span>
        <div class="legend-text-item" style="color: ${appTheme.LegendTextColor}">
            <span>${-0.2}</span>
            <span>${"DENSITY"}</span>
            <span>${0.2}</span>
        </div>
    </div>
    `;
};
