/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a Line Chart component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.title - The title of the chart.
 * @param {string} properties.data - Comma-separated data points: "Label|Value,Label2|Value2"
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created Line Chart component.
 */
export function LineChartComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("linechart" directive must be leaf type "::linechart{title="..." data="..."}")',
		]);

	if (!properties.title || !properties.data)
		return h("div", { class: "hidden" }, [
			"Invalid line chart. Required: title and data attributes",
		]);

	const title = properties.title;
	const data = properties.data;
	const chartId = `linechart-${Math.random().toString(36).slice(-6)}`;

	// Parse the data string into points
	const points = data.split(",").map((point) => {
		const [label, value] = point.split("|");
		return {
			label: label.trim(),
			value: Number.parseFloat(value),
		};
	});

	// Calculate chart dimensions and scales
	const width = 600;
	const height = 400;
	const padding = { top: 20, right: 30, bottom: 60, left: 70 };
	const chartWidth = width - padding.left - padding.right;
	const chartHeight = height - padding.top - padding.bottom;

	// Find min and max values for scaling
	const values = points.map((p) => p.value);
	const minValue = Math.min(...values);
	const maxValue = Math.max(...values);
	const valueRange = maxValue - minValue;
	const valuePadding = valueRange * 0.1 || 1; // Add 10% padding or 1 if range is 0
	const adjustedMin = minValue - valuePadding;
	const adjustedMax = maxValue + valuePadding;
	const adjustedRange = adjustedMax - adjustedMin;

	// Calculate positions
	const xStep = chartWidth / (points.length - 1 || 1);
	const chartPoints = points.map((point, index) => ({
		...point,
		x: padding.left + index * xStep,
		y:
			padding.top +
			chartHeight -
			((point.value - adjustedMin) / adjustedRange) * chartHeight,
	}));

	// Create path for the line
	const linePath = chartPoints
		.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
		.join(" ");

	// Create area path (for gradient fill)
	const areaPath =
		linePath +
		` L ${chartPoints[chartPoints.length - 1].x} ${padding.top + chartHeight}` +
		` L ${chartPoints[0].x} ${padding.top + chartHeight} Z`;

	// Generate Y-axis labels (5 ticks)
	const yTicks = [];
	for (let i = 0; i <= 4; i++) {
		const value = adjustedMin + (adjustedRange * i) / 4;
		const y = padding.top + chartHeight - (i * chartHeight) / 4;
		yTicks.push({ value: value.toFixed(2), y });
	}

	// Create SVG elements
	const svgElements = [
		// Gradient definition
		h("defs", [
			h(
				"linearGradient",
				{ id: `gradient-${chartId}`, x1: "0", x2: "0", y1: "0", y2: "1" },
				[
					h("stop", { offset: "0%", class: "chart-gradient-start" }),
					h("stop", { offset: "100%", class: "chart-gradient-end" }),
				],
			),
		]),

		// Grid lines
		...yTicks.map((tick) =>
			h("line", {
				x1: padding.left,
				y1: tick.y,
				x2: padding.left + chartWidth,
				y2: tick.y,
				class: "chart-grid-line",
			}),
		),

		// X-axis
		h("line", {
			x1: padding.left,
			y1: padding.top + chartHeight,
			x2: padding.left + chartWidth,
			y2: padding.top + chartHeight,
			class: "chart-axis",
		}),

		// Y-axis
		h("line", {
			x1: padding.left,
			y1: padding.top,
			x2: padding.left,
			y2: padding.top + chartHeight,
			class: "chart-axis",
		}),

		// Area fill
		h("path", {
			d: areaPath,
			fill: `url(#gradient-${chartId})`,
			class: "chart-area",
		}),

		// Line
		h("path", {
			d: linePath,
			fill: "none",
			class: "chart-line",
		}),

		// Data points
		...chartPoints.map((point, index) =>
			h("g", { class: "chart-point-group" }, [
				h("circle", {
					cx: point.x,
					cy: point.y,
					r: 4,
					class: "chart-point",
					"data-index": index,
					"data-label": point.label,
					"data-value": point.value.toFixed(2),
				}),
				// Invisible larger circle for better hover target
				h("circle", {
					cx: point.x,
					cy: point.y,
					r: 12,
					class: "chart-point-hover",
					"data-index": index,
				}),
			]),
		),

		// Y-axis labels
		...yTicks.map((tick) =>
			h(
				"text",
				{
					x: padding.left - 10,
					y: tick.y + 4,
					class: "chart-label-y",
				},
				tick.value,
			),
		),

		// X-axis labels
		...chartPoints.map((point, index) =>
			h(
				"text",
				{
					x: point.x,
					y: padding.top + chartHeight + 25,
					class: "chart-label-x",
					"data-index": index,
				},
				point.label,
			),
		),

		// Tooltip placeholder
		h(
			"g",
			{
				id: `tooltip-${chartId}`,
				class: "chart-tooltip",
				style: "display: none",
			},
			[
				h("rect", {
					class: "chart-tooltip-bg",
					rx: 4,
					ry: 4,
				}),
				h("text", {
					class: "chart-tooltip-text",
					x: 0,
					y: 0,
				}),
			],
		),
	];

	// Create the complete chart
	return h("div", { class: "line-chart-wrapper" }, [
		h(
			"div",
			{
				class: "line-chart-container",
				id: chartId,
			},
			[
				h("h3", { class: "line-chart-title" }, title),
				h("div", { class: "line-chart-content" }, [
					h(
						"svg",
						{
							class: "line-chart-svg",
							width: width,
							height: height,
							viewBox: `0 0 ${width} ${height}`,
							preserveAspectRatio: "xMidYMid meet",
							"aria-label": `Line chart: ${title}`,
						},
						svgElements,
					),
				]),
			],
		),
		// Add interactive JavaScript
		h(
			"script",
			{ type: "text/javascript" },
			`
			(function() {
				const chartId = '${chartId}';
				const container = document.getElementById(chartId);
				if (!container) return;
				
				const svg = container.querySelector('.line-chart-svg');
				const tooltip = document.getElementById('tooltip-' + chartId);
				const tooltipBg = tooltip.querySelector('.chart-tooltip-bg');
				const tooltipText = tooltip.querySelector('.chart-tooltip-text');
				const points = container.querySelectorAll('.chart-point');
				const hoverPoints = container.querySelectorAll('.chart-point-hover');
				
				// Show tooltip on hover
				hoverPoints.forEach((point, index) => {
					point.addEventListener('mouseenter', (e) => {
						const dataPoint = points[index];
						const label = dataPoint.getAttribute('data-label');
						const value = dataPoint.getAttribute('data-value');
						const cx = parseFloat(dataPoint.getAttribute('cx'));
						const cy = parseFloat(dataPoint.getAttribute('cy'));
						
						// Set tooltip text
						tooltipText.textContent = label + ': ' + value;
						
						// Position tooltip
						const bbox = tooltipText.getBBox();
						const padding = 8;
						const tooltipWidth = bbox.width + padding * 2;
						const tooltipHeight = bbox.height + padding * 2;
						
						let tooltipX = cx - tooltipWidth / 2;
						let tooltipY = cy - tooltipHeight - 15;
						
						// Keep tooltip within bounds
						if (tooltipX < 10) tooltipX = 10;
						if (tooltipX + tooltipWidth > ${width} - 10) tooltipX = ${width} - tooltipWidth - 10;
						if (tooltipY < 10) tooltipY = cy + 15;
						
						tooltipBg.setAttribute('x', tooltipX);
						tooltipBg.setAttribute('y', tooltipY);
						tooltipBg.setAttribute('width', tooltipWidth);
						tooltipBg.setAttribute('height', tooltipHeight);
						
						tooltipText.setAttribute('x', tooltipX + padding);
						tooltipText.setAttribute('y', tooltipY + padding + bbox.height * 0.7);
						
						tooltip.style.display = 'block';
						
						// Highlight point
						dataPoint.style.r = '6';
						dataPoint.style.filter = 'brightness(1.2)';
					});
					
					point.addEventListener('mouseleave', () => {
						tooltip.style.display = 'none';
						points[index].style.r = '4';
						points[index].style.filter = 'none';
					});
				});
			})();
		`,
		),
		// Add CSS styles
		h(
			"style",
			{ type: "text/css" },
			`
			.line-chart-wrapper {
				margin: 2rem 0;
			}
			
			.line-chart-container {
				padding: 1.5rem;
				border-radius: 0.75rem;
				background: var(--card-bg);
				border: 1px solid var(--line-divider);
				transition: all 0.3s ease;
			}
			
			.line-chart-container:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			}
			
			.dark .line-chart-container:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
			}
			
			.line-chart-title {
				text-align: center;
				margin: 0 0 1.5rem 0;
				font-size: 1.25rem;
				font-weight: 600;
				color: var(--primary);
			}
			
			.line-chart-content {
				display: flex;
				justify-content: center;
				overflow-x: auto;
			}
			
			.line-chart-svg {
				min-width: 500px;
			}
			
			.chart-grid-line {
				stroke: var(--line-divider);
				stroke-width: 1;
				opacity: 0.3;
				stroke-dasharray: 2,2;
			}
			
			.chart-axis {
				stroke: var(--deep-text);
				stroke-width: 2;
				opacity: 0.5;
			}
			
			.chart-line {
				stroke: var(--primary);
				stroke-width: 3;
				stroke-linecap: round;
				stroke-linejoin: round;
			}
			
			.chart-area {
				opacity: 0.2;
			}
			
			.chart-gradient-start {
				stop-color: var(--primary);
				stop-opacity: 0.6;
			}
			
			.chart-gradient-end {
				stop-color: var(--primary);
				stop-opacity: 0;
			}
			
			.chart-point {
				fill: var(--primary);
				stroke: var(--card-bg);
				stroke-width: 2;
				transition: all 0.2s ease;
				cursor: pointer;
			}
			
			.chart-point-hover {
				fill: transparent;
				stroke: none;
				cursor: pointer;
			}
			
			.chart-label-x,
			.chart-label-y {
				fill: var(--deep-text);
				font-size: 0.75rem;
				opacity: 0.7;
			}
			
			.chart-label-x {
				text-anchor: end;
			}
			
			.chart-label-y {
				text-anchor: end;
			}
			
			.chart-tooltip-bg {
				fill: var(--float-panel-bg);
				stroke: var(--line-divider);
				stroke-width: 1;
				filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
			}
			
			.chart-tooltip-text {
				fill: var(--deep-text);
				font-size: 0.875rem;
				font-weight: 600;
			}
			
			/* Responsive design */
			@media (max-width: 640px) {
				.line-chart-svg {
					min-width: 100%;
					width: 100%;
				}
				
				.chart-label-x {
					font-size: 0.625rem;
				}
			}
			
			/* Print styles */
			@media print {
				.line-chart-container {
					break-inside: avoid;
					page-break-inside: avoid;
				}
			}
		`,
		),
	]);
}
