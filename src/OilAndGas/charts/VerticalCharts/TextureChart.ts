import { SciChartSurface } from "scichart";
import { LegendModifier } from "scichart/Charting/ChartModifiers/LegendModifier";
import { XyyDataSeries } from "scichart/Charting/Model/XyyDataSeries";
import { FastBandRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastBandRenderableSeries";
import { ELegendPlacement, ELegendOrientation, TLegendItem } from "scichart/Charting/Visuals/Legend/SciChartLegendBase";
import { NumberRange } from "scichart/Core/NumberRange";
import { Thickness } from "scichart/Core/Thickness";
import { setupVerticalChartAxes, addVerticalChartModifiers, getParsedData } from "../vChartUtils";
import { appTheme } from "../../theme";

export const drawTextureChart = async (rootElement: string | HTMLDivElement) => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(rootElement, {
        theme: appTheme.SciChartJsTheme,
        padding: Thickness.fromNumber(0),
        id: "textureChart",
    });

    const yAxisId = "y-axis-id";
    setupVerticalChartAxes(sciChartSurface, wasmContext, yAxisId);
    addVerticalChartModifiers(sciChartSurface, yAxisId);

    sciChartSurface.yAxes.get(0).visibleRange = new NumberRange(-0.2, 0.2);

    const dataSeries = new XyyDataSeries(wasmContext, { dataIsSortedInX: true, containsNaN: false });

    const data = await getParsedData("Texture.csv");
    data.forEach((dataRow) => {
        dataSeries.append(dataRow[0], dataRow[1], dataRow[2]);
    });

    const bandSeries = new FastBandRenderableSeries(wasmContext, {
        dataSeries,
        strokeThickness: 0,
        stroke: appTheme.TextureStroke,
        strokeY1: appTheme.TextureStroke,
        fill: appTheme.TextureFill,
        fillY1: appTheme.TextureFill,
    });

    sciChartSurface.renderableSeries.add(bandSeries);

    const legendModifier = new LegendModifier({ placementDivId: `texture-legend` });
    legendModifier.sciChartLegend.getLegendHTML = generateTextureLegend;
    sciChartSurface.chartModifiers.add(legendModifier);

    return { sciChartSurface };
};

const generateTextureLegend = (
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
        <div class="legend-color-item" style="height: 30px;">
            <div class="color-label" style="background-color: ${appTheme.TextureStroke};"></div>
        </div>
        <span class="scichart__legend-line" style="border-top: 2px solid #555"></span>
        <div class="legend-text-item" style="color: ${appTheme.LegendTextColor}">
            <span>${-0.2}</span>
            <span>TEXTURE</span>
            <span>${0.2}</span>
        </div>
    </div>
    `;
};
