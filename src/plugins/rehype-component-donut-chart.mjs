/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a Donut Chart component with proper dark/light theme support.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.title - The title of the chart.
 * @param {string} properties.data - Comma-separated segments: "Label|Value|Color,Label2|Value2|Color2"
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created Donut Chart component.
 */
export function DonutChartComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("donut" directive must be leaf type "::donut{title="..." data="..."}")',
		]);

	if (!properties.title || !properties.data)
		return h("div", { class: "hidden" }, [
			'Invalid donut chart. Required: title and data attributes',
		]);

	const title = properties.title;
	const data = properties.data;
	const chartId = `donut-${Math.random().toString(36).slice(-6)}`;

	// Parse the data string into segments
	const segments = data.split(',').map(segment => {
		const [label, value, color] = segment.split('|');
		return { label: label.trim(), value: parseFloat(value), color: color.trim() };
	});

	// Calculate total for percentages
	const total = segments.reduce((sum, seg) => sum + seg.value, 0);
	
	// Create SVG paths for donut chart
	let currentAngle = -Math.PI / 2; // Start from top
	const radius = 80;
	const innerRadius = 50;
	const centerX = 100;
	const centerY = 100;

	const paths = segments.map((segment, index) => {
		const percentage = (segment.value / total) * 100;
		const angle = (segment.value / total) * 2 * Math.PI;
		
		const startAngle = currentAngle;
		const endAngle = currentAngle + angle;
		
		const x1 = centerX + radius * Math.cos(startAngle);
		const y1 = centerY + radius * Math.sin(startAngle);
		const x2 = centerX + radius * Math.cos(endAngle);
		const y2 = centerY + radius * Math.sin(endAngle);
		
		const x3 = centerX + innerRadius * Math.cos(endAngle);
		const y3 = centerY + innerRadius * Math.sin(endAngle);
		const x4 = centerX + innerRadius * Math.cos(startAngle);
		const y4 = centerY + innerRadius * Math.sin(startAngle);
		
		const largeArcFlag = angle > Math.PI ? 1 : 0;
		
		const pathData = [
			`M ${x1} ${y1}`,
			`A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
			`L ${x3} ${y3}`,
			`A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
			'Z'
		].join(' ');
		
		currentAngle += angle;
		
		return h('g', { class: 'donut-segment-group' }, [
			h('path', {
				d: pathData,
				fill: segment.color,
				class: 'donut-segment',
				'data-label': segment.label,
				'data-value': percentage.toFixed(1) + '%',
				'data-segment-index': index
			})
		]);
	});

	// Create legend items
	const legendItems = segments.map((segment, index) => {
		const percentage = ((segment.value / total) * 100).toFixed(1);
		return h('div', { 
			class: 'donut-legend-item',
			'data-segment-index': index
		}, [
			h('div', { 
				class: 'donut-legend-color',
				style: `background-color: ${segment.color}`
			}),
			h('span', { 
				class: 'donut-legend-label'
			}, `${segment.label} (${percentage}%)`)
		]);
	});

	// Create the complete chart
	return h('div', { class: 'donut-chart-wrapper' }, [
		h('div', { 
			class: 'donut-chart-container',
			id: chartId 
		}, [
			h('h3', { class: 'donut-chart-title' }, title),
			h('div', { class: 'donut-chart-content' }, [
				h('svg', { 
					class: 'donut-chart-svg',
					width: '200',
					height: '200',
					viewBox: '0 0 200 200',
					'aria-label': `Donut chart: ${title}`
				}, paths),
				h('div', { class: 'donut-legend' }, legendItems)
			])
		]),
		// Add interactive JavaScript
		h('script', { type: 'text/javascript' }, `
			(function() {
				const chartId = '${chartId}';
				const container = document.getElementById(chartId);
				if (!container) return;
				
				const segments = container.querySelectorAll('.donut-segment');
				const legendItems = container.querySelectorAll('.donut-legend-item');
				
				// Add hover interactions
				function highlightSegment(index, isHover) {
					segments.forEach((seg, i) => {
						if (i === index) {
							seg.style.opacity = isHover ? '0.8' : '1';
							seg.style.filter = isHover ? 'brightness(1.15)' : 'none';
						} else {
							seg.style.opacity = isHover ? '0.5' : '1';
						}
					});
					
					legendItems.forEach((item, i) => {
						if (i === index) {
							item.classList.toggle('donut-legend-item-active', isHover);
						}
					});
				}
				
				// Add event listeners to segments
				segments.forEach((segment, index) => {
					segment.addEventListener('mouseenter', () => highlightSegment(index, true));
					segment.addEventListener('mouseleave', () => highlightSegment(index, false));
				});
				
				// Add event listeners to legend items
				legendItems.forEach((item, index) => {
					item.addEventListener('mouseenter', () => highlightSegment(index, true));
					item.addEventListener('mouseleave', () => highlightSegment(index, false));
				});
			})();
		`),
		// Add CSS styles using Tailwind-compatible approach
		h('style', { type: 'text/css' }, `
			.donut-chart-wrapper {
				margin: 2rem 0;
			}
			
			.donut-chart-container {
				padding: 1.5rem;
				border-radius: 0.75rem;
				background: var(--card-bg);
				border: 1px solid var(--line-divider);
				transition: all 0.3s ease;
			}
			
			.donut-chart-container:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			}
			
			.dark .donut-chart-container:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
			}
			
			.donut-chart-title {
				text-align: center;
				margin: 0 0 1.5rem 0;
				font-size: 1.25rem;
				font-weight: 600;
				color: var(--primary);
			}
			
			.donut-chart-content {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 2rem;
				flex-wrap: wrap;
			}
			
			.donut-chart-svg {
				flex-shrink: 0;
				filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
			}
			
			.dark .donut-chart-svg {
				filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
			}
			
			.donut-segment {
				transition: all 0.3s ease;
				cursor: pointer;
				stroke: var(--card-bg);
				stroke-width: 0.5;
			}
			
			.donut-legend {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				min-width: 200px;
			}
			
			.donut-legend-item {
				display: flex;
				align-items: center;
				gap: 0.75rem;
				padding: 0.5rem 0.75rem;
				border-radius: 0.375rem;
				transition: all 0.2s ease;
				cursor: pointer;
				background: transparent;
			}
			
			.donut-legend-item:hover,
			.donut-legend-item-active {
				background: var(--btn-plain-bg-hover);
			}
			
			.donut-legend-color {
				width: 1rem;
				height: 1rem;
				border-radius: 0.25rem;
				flex-shrink: 0;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
				transition: transform 0.2s ease;
			}
			
			.donut-legend-item:hover .donut-legend-color,
			.donut-legend-item-active .donut-legend-color {
				transform: scale(1.1);
			}
			
			.donut-legend-label {
				font-size: 0.875rem;
				color: var(--deep-text);
				line-height: 1.5;
				transition: color 0.2s ease;
			}
			
			.dark .donut-legend-label {
				color: var(--deep-text);
			}
			
			/* Responsive design */
			@media (max-width: 640px) {
				.donut-chart-content {
					flex-direction: column;
					gap: 1.5rem;
				}
				
				.donut-legend {
					min-width: auto;
					width: 100%;
				}
				
				.donut-chart-svg {
					width: 160px;
					height: 160px;
				}
			}
			
			/* Print styles */
			@media print {
				.donut-chart-container {
					break-inside: avoid;
					page-break-inside: avoid;
				}
			}
		`)
	]);
}