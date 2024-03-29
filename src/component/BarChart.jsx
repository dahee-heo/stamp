import React, { useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'    
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { styled } from '../config/stitches.config';

const options = {
	elements: {
		point: {
			radius: 0, // 점 제거
		},
	},
	legend: {
		display: true,
		labels: {
			// legend options reference https://www.chartjs.org/docs/latest/configuration/legend.html#legend-label-configuration
			boxWidth: 10,
			boxHeight: 50000000, // fontSize에 비례함
			fontSize: 11,
			fontColor: '#263238',
			generateLabels: function (chart) {
				// Legend Item Interface - https://www.chartjs.org/docs/latest/configuration/legend.html#legend-item-interface
				const labels = Chart.defaults.global.legend.labels.generateLabels(chart);
				return labels.map(property => {
					return { ...property, fillStyle: property.strokeStyle };
				});
			},
		},
		position: 'bottom', // label를 넣어주지 않으면 position이 먹히지 않음
		// align: 'start',
	},
	scale: {
		ticks: { beginAtZero: true, display: false, max: 3, min: 0, stepSize: 1 }, //maxTicksLimit data 최대값의 2배
		pointLabels: {
			fontSize: 12, // radar 차트 fontsize
			fontColor: '#607D8B',
			// fontStyle: "bold",
			// padding: 100, // x3.5에서 사용가능 지금 2.9.4인데 3위 이상에서는 ie11 작동 안함
		},
	},
	tooltips: {
		enabled: false, // 툴팁 제거
		mode: 'nearest',
		position: 'average',
		intersect: false,
	},
};

const pligins = [
	{
		beforeInit: function (chart) {
			chart.legend.afterFit = function () {
				chart.legend.options.labels.padding = 20;
				// chart.height += 30;
			};
		},
	},
];

const ChartStyled = styled('div', {
	backgroundColor: "$backgroundGray",
	padding: '30px 0 20px',
	marginBottom: "20px",
})

export const BarChart = () => {
  const [chartData, setChartData] = useState({
		labels: ['의무보험 보장', ['내자산', '  보장'], '고객배상 보장', ['간접손해', '보장']],
		datasets: [
			{
				label: '내가게',
				data: [3, 1, 3, 2],
				backgroundColor: 'rgba(142, 202, 206, 1)',
				borderColor: 'rgb(0, 156, 242)',
				borderWidth: 1.5,
			},
			{
				label: '캐롯추천',
				data: [3, 3, 3, 3],
				backgroundColor: 'rgba(243, 229, 185, 1)',
				borderColor: 'rgb(255, 183, 0)',
				borderWidth: 1.5,
			},
		],
	});

  return (
    <ChartStyled>
			<Bar width={180} data={chartData} options={options} plugins={pligins} />
		</ChartStyled>
  )
}
