/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a simple HTML/CSS chart component.
 */
export function HtmlChartComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("htmlchart" directive must be leaf type)',
		]);

	if (!properties.title || !properties.data)
		return h("div", { class: "hidden" }, [
			'Invalid HTML chart. Required: title and data attributes',
		]);

	const title = properties.title;
	const data = properties.data;
	const chartId = `chart-${Math.random().toString(36).slice(-6)}`;

	// Parse the data
	const dataPoints = data.split(',').map(point => {
		const [label, value] = point.split('|');
		return { label: label.trim(), value: parseFloat(value) };
	});

	// Create chart using HTML/CSS
	return h('div', { class: 'html-chart-wrapper' }, [
		h('div', { 
			class: 'html-chart-container',
			id: chartId 
		}, [
			h('h3', { class: 'html-chart-title' }, title),
			h('div', { class: 'html-chart-content' }, [
				h('div', { class: 'chart-area' }, [
					// Y-axis labels
					h('div', { class: 'y-axis' }, [
						h('div', { class: 'y-label' }, '$234'),
						h('div', { class: 'y-label' }, '$232'),
						h('div', { class: 'y-label' }, '$230'),
						h('div', { class: 'y-label' }, '$228')
					]),
					// Chart plot area
					h('div', { class: 'plot-area' }, [
						// Data points
						h('div', { 
							class: 'data-point point-1',
							'data-value': '$233.83'
						}),
						h('div', { 
							class: 'data-point point-2',
							'data-value': '$232.85'
						}),
						h('div', { 
							class: 'data-point point-3',
							'data-value': '$229.85'
						}),
						h('div', { 
							class: 'data-point point-4',
							'data-value': '$233.97'
						}),
						// Connecting lines
						h('div', { class: 'line line-1' }),
						h('div', { class: 'line line-2' }),
						h('div', { class: 'line line-3' })
					]),
					// X-axis labels
					h('div', { class: 'x-axis' }, [
						h('div', { class: 'x-label' }, 'Sep 9'),
						h('div', { class: 'x-label' }, 'Sep 10'),
						h('div', { class: 'x-label' }, 'Sep 11'),
						h('div', { class: 'x-label' }, 'Sep 12')
					])
				])
			])
		]),
		// Add CSS styles
		h('style', { type: 'text/css' }, `
			.html-chart-wrapper {
				margin: 2rem 0;
			}
			
			.html-chart-container {
				padding: 1.5rem;
				border-radius: 0.75rem;
				background: var(--card-bg);
				border: 1px solid var(--line-divider);
				transition: all 0.3s ease;
			}
			
			.html-chart-container:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			}
			
			.dark .html-chart-container:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
			}
			
			.html-chart-title {
				text-align: center;
				margin: 0 0 1.5rem 0;
				font-size: 1.25rem;
				font-weight: 600;
				color: var(--primary);
			}
			
			.html-chart-content {
				display: flex;
				justify-content: center;
			}
			
			.chart-area {
				position: relative;
				width: 500px;
				height: 300px;
				border: 2px solid var(--line-divider);
				border-radius: 8px;
				background: var(--card-bg);
			}
			
			.y-axis {
				position: absolute;
				left: -50px;
				top: 0;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 20px 0;
			}
			
			.y-label {
				font-size: 12px;
				color: var(--deep-text);
				text-align: right;
				line-height: 1;
			}
			
			.x-axis {
				position: absolute;
				bottom: -40px;
				left: 0;
				width: 100%;
				display: flex;
				justify-content: space-around;
				padding: 0 50px;
			}
			
			.x-label {
				font-size: 12px;
				color: var(--deep-text);
				text-align: center;
			}
			
			.plot-area {
				position: relative;
				width: 100%;
				height: 100%;
				padding: 20px;
			}
			
			.data-point {
				position: absolute;
				width: 12px;
				height: 12px;
				background: #dc2626;
				border: 2px solid white;
				border-radius: 50%;
				cursor: pointer;
				transition: all 0.2s ease;
				z-index: 2;
			}
			
			.data-point:hover {
				transform: scale(1.2);
				box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
			}
			
			.data-point:hover::after {
				content: attr(data-value);
				position: absolute;
				bottom: 20px;
				left: 50%;
				transform: translateX(-50%);
				background: rgba(0, 0, 0, 0.8);
				color: white;
				padding: 4px 8px;
				border-radius: 4px;
				font-size: 11px;
				white-space: nowrap;
				z-index: 10;
			}
			
			/* Position data points - Apple stock trend */
			.point-1 { left: 15%; top: 20%; }  /* Sep 9: $233.83 */
			.point-2 { left: 35%; top: 30%; }  /* Sep 10: $232.85 */
			.point-3 { left: 55%; top: 70%; }  /* Sep 11: $229.85 (big drop) */
			.point-4 { left: 75%; top: 25%; }  /* Sep 12: $233.97 */
			
			.line {
				position: absolute;
				background: #dc2626;
				height: 3px;
				transform-origin: left center;
				z-index: 1;
			}
			
			/* Connect the dots with lines */
			.line-1 {
				left: 15%;
				top: 20%;
				width: 22%;
				transform: rotate(8deg);
			}
			
			.line-2 {
				left: 35%;
				top: 30%;
				width: 25%;
				transform: rotate(35deg);
			}
			
			.line-3 {
				left: 55%;
				top: 70%;
				width: 25%;
				transform: rotate(-40deg);
			}
			
			@media (max-width: 640px) {
				.chart-area {
					width: 100%;
					max-width: 400px;
				}
			}
		`)
	]);
}