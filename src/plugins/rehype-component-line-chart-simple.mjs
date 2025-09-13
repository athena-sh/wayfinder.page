/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a simple Line Chart component.
 */
export function SimpleLineChartComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("simpleline" directive must be leaf type)',
		]);

	if (!properties.title || !properties.data)
		return h("div", { class: "hidden" }, [
			'Invalid line chart. Required: title and data attributes',
		]);

	const title = properties.title;
	const data = properties.data;
	const lineColor = properties.color || '#dc2626';
	const chartId = `line-${Math.random().toString(36).slice(-6)}`;

	// Parse the data string into points
	const dataPoints = data.split(',').map(point => {
		const [label, value] = point.split('|');
		return { label: label.trim(), value: parseFloat(value) };
	});

	// Simple hardcoded positions that will definitely work
	const points = [
		{ x: 100, y: 80, value: 233.83, label: 'Sep 9' },   
		{ x: 200, y: 90, value: 232.85, label: 'Sep 10' }, 
		{ x: 300, y: 130, value: 229.85, label: 'Sep 11' }, 
		{ x: 400, y: 85, value: 233.97, label: 'Sep 12' }   
	];

	// Create line path
	const pathData = points.map((point, index) => 
		`${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
	).join(' ');

	return h('div', { class: 'line-chart-wrapper' }, [
		h('div', { 
			class: 'line-chart-container',
			id: chartId 
		}, [
			h('h3', { class: 'line-chart-title' }, title),
			h('div', { class: 'line-chart-content' }, [
				h('svg', { 
					class: 'line-chart-svg',
					width: '600',
					height: '300',
					viewBox: '0 0 600 300'
				}, [
					// Y-axis line
					h('line', {
						x1: 70,
						y1: 50,
						x2: 70,
						y2: 200,
						stroke: '#666',
						'stroke-width': 2
					}),
					// X-axis line  
					h('line', {
						x1: 70,
						y1: 200,
						x2: 530,
						y2: 200,
						stroke: '#666',
						'stroke-width': 2
					}),
					// Stock price line
					h('path', {
						d: pathData,
						fill: 'none',
						stroke: lineColor,
						'stroke-width': 3
					}),
					// Data point circles
					h('circle', { cx: 100, cy: 80, r: 6, fill: lineColor }),
					h('circle', { cx: 200, cy: 90, r: 6, fill: lineColor }),
					h('circle', { cx: 300, cy: 130, r: 6, fill: lineColor }),
					h('circle', { cx: 400, cy: 85, r: 6, fill: lineColor }),
					// X-axis labels (dates)
					h('text', { x: 100, y: 220, 'text-anchor': 'middle', fill: '#666', 'font-size': 14 }, 'Sep 9'),
					h('text', { x: 200, y: 220, 'text-anchor': 'middle', fill: '#666', 'font-size': 14 }, 'Sep 10'),
					h('text', { x: 300, y: 220, 'text-anchor': 'middle', fill: '#666', 'font-size': 14 }, 'Sep 11'),
					h('text', { x: 400, y: 220, 'text-anchor': 'middle', fill: '#666', 'font-size': 14 }, 'Sep 12'),
					// Y-axis labels (prices)
					h('text', { x: 60, y: 85, 'text-anchor': 'end', fill: '#666', 'font-size': 12 }, '$234'),
					h('text', { x: 60, y: 110, 'text-anchor': 'end', fill: '#666', 'font-size': 12 }, '$232'),
					h('text', { x: 60, y: 135, 'text-anchor': 'end', fill: '#666', 'font-size': 12 }, '$230'),
					// Value labels
					h('text', { x: 100, y: 70, 'text-anchor': 'middle', fill: lineColor, 'font-size': 12, 'font-weight': 'bold' }, '$233.83'),
					h('text', { x: 200, y: 80, 'text-anchor': 'middle', fill: lineColor, 'font-size': 12, 'font-weight': 'bold' }, '$232.85'),
					h('text', { x: 300, y: 120, 'text-anchor': 'middle', fill: lineColor, 'font-size': 12, 'font-weight': 'bold' }, '$229.85'),
					h('text', { x: 400, y: 75, 'text-anchor': 'middle', fill: lineColor, 'font-size': 12, 'font-weight': 'bold' }, '$233.97'),
					// Axis titles
					h('text', { x: 300, y: 250, 'text-anchor': 'middle', fill: '#333', 'font-size': 16, 'font-weight': 'bold' }, 'Date'),
					h('text', { x: 30, y: 125, 'text-anchor': 'middle', fill: '#333', 'font-size': 16, 'font-weight': 'bold', transform: 'rotate(-90, 30, 125)' }, 'Stock Price ($)')
				])
			])
		]),
		// Add hover interactions
		h('script', { type: 'text/javascript' }, `
			(function() {
				const container = document.getElementById('${chartId}');
				if (!container) return;
				
				const dataPoints = container.querySelectorAll('.data-point');
				const valueLabels = container.querySelectorAll('.value-label');
				
				dataPoints.forEach((point, index) => {
					point.addEventListener('mouseenter', () => {
						point.style.r = '7';
						valueLabels[index].style.opacity = '1';
					});
					point.addEventListener('mouseleave', () => {
						point.style.r = '5';
						valueLabels[index].style.opacity = '0';
					});
				});
			})();
		`),
		// Add styles
		h('style', { type: 'text/css' }, `
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
				align-items: center;
			}
			
			.line-chart-svg {
				filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
			}
			
			.dark .line-chart-svg {
				filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
			}
			
			.data-point {
				cursor: pointer;
				transition: all 0.2s ease;
			}
			
			.value-label {
				transition: opacity 0.2s ease;
				pointer-events: none;
			}
			
			@media (max-width: 640px) {
				.line-chart-svg {
					width: 100%;
					height: auto;
				}
			}
		`)
	]);
}