import { SciChartSurface } from "scichart";
import { RolloverModifier } from "scichart/Charting/ChartModifiers/RolloverModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { NumberRange } from "scichart/Core/NumberRange";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { TSciChart } from "scichart/types/TSciChart";
import { appTheme } from "../theme";

export const setupVerticalChartAxes = (
    sciChartSurface: SciChartSurface,
    wasmContext: TSciChart,
    yAxisId: string
) => {
    const xAxis = new NumericAxis(wasmContext, {
        axisAlignment: EAxisAlignment.Left,
        isVisible: false,
        visibleRange: new NumberRange(0, 100),
    });
    const yAxis = new NumericAxis(wasmContext, {
        id: yAxisId,
        axisAlignment: EAxisAlignment.Bottom,
    });
    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);
};

export const addVerticalChartModifiers = (
    sciChartSurface: SciChartSurface,
    yAxisId: string
) => {
    sciChartSurface.chartModifiers.add(
        new RolloverModifier({
            modifierGroup: "VerticalChartsGroup",
            rolloverLineStroke: appTheme.RolloverLineColor,
        })
    );
    sciChartSurface.chartModifiers.add(
        new ZoomPanModifier({ excludedYAxisIds: [yAxisId] })
    );
};

export const getParsedData = async (filename: string): Promise<number[][]> => {
    try {
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) {
            return generateFallbackData(filename);
        }
        const text = await response.text();
        const lines = text.trim().split("\n");
        return lines.map((line) => line.split(",").map(Number));
    } catch {
        return generateFallbackData(filename);
    }
};

function generateFallbackData(filename: string): number[][] {
    const rows: number[][] = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
        const x = i * 0.5;
        const noise = () => (Math.random() - 0.5) * 0.02;
        if (filename.includes("Density")) {
            rows.push([x, Math.sin(i * 0.1) * 0.08 + noise(), Math.cos(i * 0.1) * 0.08 + noise()]);
        } else if (filename.includes("PoreSpace")) {
            rows.push([x, Math.sin(i * 0.08) * 0.12 + noise(), Math.cos(i * 0.08) * 0.12 + noise()]);
        } else if (filename.includes("Resistivity")) {
            rows.push([x, Math.abs(Math.sin(i * 0.12)) * 0.15 + noise(), Math.abs(Math.cos(i * 0.12)) * 0.15 + noise()]);
        } else if (filename.includes("Shale")) {
            rows.push([x, Math.sin(i * 0.07) * 0.1 + noise(), Math.cos(i * 0.07) * 0.1 + noise()]);
        } else if (filename.includes("Sonic")) {
            rows.push([x, Math.sin(i * 0.15) * 0.09 + noise(), Math.cos(i * 0.15) * 0.09 + noise()]);
        } else {
            rows.push([x, Math.sin(i * 0.1) * 0.1 + noise(), Math.cos(i * 0.1) * 0.1 + noise()]);
        }
    }
    return rows;
}
