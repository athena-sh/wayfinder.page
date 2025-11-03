/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a Bar Chart component with proper dark/light theme support.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.title - The title of the chart.
 * @param {string} properties.data - Comma-separated data: "Label|Value|Color,Label2|Value2|Color2"
 * @param {string} [properties.xlabel] - X-axis label (optional).
 * @param {string} [properties.ylabel] - Y-axis label (optional).
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created Bar Chart component.
 */
export function BarChartComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("bar" directive must be leaf type "::bar{title="..." data="..."}")',
		]);

	if (!properties.title || !properties.data)
		return h("div", { class: "hidden" }, [
			"Invalid bar chart. Required: title and data attributes",
		]);

	const title = properties.title;
	const data = properties.data;
	const xlabel = properties.xlabel || "";
	const ylabel = properties.ylabel || "";
	const chartId = `bar-${Math.random().toString(36).slice(-6)}`;

	// Parse the data string into bars
	const bars = data.split(",").map((bar) => {
		const parts = bar.split("|");
		const label = parts[0].trim();
		const value = Number.parseFloat(parts[1]);
		const color = parts[2] ? parts[2].trim() : "#3b82f6";
		return { label, value, color };
	});

	// Calculate chart dimensions and scaling
	const chartWidth = 500;
	const chartHeight = 350;
	const padding = { top: 20, right: 20, bottom: 80, left: 60 };
	const graphWidth = chartWidth - padding.left - padding.right;
	const graphHeight = chartHeight - padding.top - padding.bottom;

	// Find min and max values for scaling
	const values = bars.map((d) => d.value);
	const minValue = Math.min(0, Math.min(...values));
	const maxValue = Math.max(...values);
	const valueRange = maxValue - minValue;
	const padding_y = valueRange * 0.1; // Add 10% padding to y-axis

	// Create scaling functions
	const barWidth = (graphWidth / bars.length) * 0.8; // 80% width for bars, 20% for spacing
	const barSpacing = (graphWidth / bars.length) * 0.2;
	const xScale = (index) =>
		padding.left + index * (barWidth + barSpacing) + barSpacing / 2;
	const yScale = (value) =>
		chartHeight -
		padding.bottom -
		((value - minValue + padding_y) / (valueRange + 2 * padding_y)) *
			graphHeight;
	const baselineY = yScale(Math.max(0, minValue));

	// Create bars
	const barElements = bars.map((bar, index) => {
		const x = xScale(index);
		const y = Math.min(yScale(bar.value), baselineY);
		const height = Math.abs(yScale(bar.value) - baselineY);

		return h("g", { class: "bar-group" }, [
			h("rect", {
				x: x,
				y: y,
				width: barWidth,
				height: height,
				fill: bar.color,
				class: "bar-rect",
				"data-label": bar.label,
				"data-value": bar.value,
				"data-bar-index": index,
			}),
			h(
				"text",
				{
					x: x + barWidth / 2,
					y: y - 5,
					"text-anchor": "middle",
					class: "bar-value-label",
					"data-bar-index": index,
				},
				bar.value.toString(),
			),
		]);
	});

	// Create x-axis labels
	const xAxisLabels = bars.map((bar, index) => {
		const x = xScale(index) + barWidth / 2;
		return h(
			"text",
			{
				x: x,
				y: chartHeight - padding.bottom + 20,
				"text-anchor": "middle",
				class: "bar-axis-label",
			},
			bar.label,
		);
	});

	// Create y-axis ticks and labels
	const yTicks = [];
	const numTicks = 5;
	for (let i = 0; i <= numTicks; i++) {
		const value =
			minValue - padding_y + (i / numTicks) * (valueRange + 2 * padding_y);
		const y = yScale(value);

		// Grid line
		yTicks.push(
			h("line", {
				x1: padding.left,
				y1: y,
				x2: padding.left + graphWidth,
				y2: y,
				class: "bar-grid-line",
			}),
		);

		// Format value as $XK for thousands
		const formattedValue =
			value >= 1000 || value <= -1000
				? `$${Math.round(value / 1000)}K`
				: `$${Math.round(value)}`;

		// Y-axis label
		yTicks.push(
			h(
				"text",
				{
					x: padding.left - 10,
					y: y + 4,
					"text-anchor": "end",
					class: "bar-axis-label",
				},
				formattedValue,
			),
		);
	}

	// Create the complete chart
	return h("div", { class: "bar-chart-wrapper" }, [
		h(
			"div",
			{
				class: "bar-chart-container",
				id: chartId,
			},
			[
				h("h3", { class: "bar-chart-title" }, title),
				h("div", { class: "bar-chart-content" }, [
					h(
						"svg",
						{
							class: "bar-chart-svg",
							width: chartWidth.toString(),
							height: chartHeight.toString(),
							viewBox: `0 0 ${chartWidth} ${chartHeight}`,
							"aria-label": `Bar chart: ${title}`,
						},
						[
							// Grid lines
							...yTicks,
							// X-axis
							h("line", {
								x1: padding.left,
								y1: chartHeight - padding.bottom,
								x2: padding.left + graphWidth,
								y2: chartHeight - padding.bottom,
								class: "bar-axis",
							}),
							// Y-axis
							h("line", {
								x1: padding.left,
								y1: padding.top,
								x2: padding.left,
								y2: chartHeight - padding.bottom,
								class: "bar-axis",
							}),
							// Bars
							...barElements,
							// X-axis labels
							...xAxisLabels,
							// Axis labels
							ylabel
								? h(
										"text",
										{
											x: 10,
											y: chartHeight / 2,
											"text-anchor": "middle",
											transform: `rotate(-90, 10, ${chartHeight / 2})`,
											class: "bar-axis-title",
										},
										ylabel,
									)
								: null,
							xlabel
								? h(
										"text",
										{
											x: chartWidth / 2,
											y: chartHeight - 10,
											"text-anchor": "middle",
											class: "bar-axis-title",
										},
										xlabel,
									)
								: null,
						].filter(Boolean),
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
				
				const barRects = container.querySelectorAll('.bar-rect');
				const valueLabels = container.querySelectorAll('.bar-value-label');
				
				// Add hover interactions
				function highlightBar(index, isHover) {
					barRects.forEach((bar, i) => {
						if (i === index) {
							bar.style.filter = isHover ? 'brightness(1.15)' : 'none';
							bar.style.transform = isHover ? 'scaleY(1.02)' : 'scaleY(1)';
						} else {
							bar.style.opacity = isHover ? '0.7' : '1';
						}
					});
					
					valueLabels.forEach((label, i) => {
						if (i === index) {
							label.style.opacity = isHover ? '1' : '0';
							label.style.fontWeight = isHover ? 'bold' : 'normal';
						}
					});
				}
				
				// Add event listeners to bars
				barRects.forEach((bar, index) => {
					bar.addEventListener('mouseenter', () => highlightBar(index, true));
					bar.addEventListener('mouseleave', () => highlightBar(index, false));
				});
			})();
		`,
		),
		// Add CSS styles
		h(
			"style",
			{ type: "text/css" },
			`
			.bar-chart-wrapper {
				margin: 2rem 0;
			}
			
			.bar-chart-container {
				padding: 1.5rem;
				border-radius: 0.75rem;
				background: var(--card-bg);
				border: 1px solid var(--line-divider);
				transition: all 0.3s ease;
			}
			
			.bar-chart-container:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			}
			
			.dark .bar-chart-container:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
			}
			
			.bar-chart-title {
				text-align: center;
				margin: 0 0 1.5rem 0;
				font-size: 1.25rem;
				font-weight: 600;
				color: var(--primary);
			}
			
			.bar-chart-content {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.bar-chart-svg {
				filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
			}
			
			.dark .bar-chart-svg {
				filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
			}
			
			.bar-rect {
				cursor: pointer;
				transition: all 0.3s ease;
				transform-origin: bottom;
			}
			
			.bar-rect:hover {
				filter: brightness(1.15);
			}
			
			.bar-value-label {
				font-size: 0.75rem;
				font-weight: 500;
				fill: var(--deep-text);
				opacity: 0;
				transition: all 0.2s ease;
				pointer-events: none;
			}
			
			.bar-axis {
				stroke: var(--line-divider);
				stroke-width: 1;
			}
			
			.bar-grid-line {
				stroke: var(--line-divider);
				stroke-width: 0.5;
				opacity: 0.5;
			}
			
			.bar-axis-label {
				font-size: 0.75rem;
				fill: var(--deep-text);
			}
			
			.bar-axis-title {
				font-size: 0.875rem;
				font-weight: 600;
				fill: var(--primary);
			}
			
			/* Responsive design */
			@media (max-width: 640px) {
				.bar-chart-svg {
					width: 100%;
					height: auto;
				}
			}
			
			/* Print styles */
			@media print {
				.bar-chart-container {
					break-inside: avoid;
					page-break-inside: avoid;
				}
			}
		`,
		),
	]);
}
