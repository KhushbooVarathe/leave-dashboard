import React, { useState } from "react";
import Chart from "react-apexcharts";
const ApexChart = ({employee}) => {
  // console.log('employee: ', employee);
    const [chartOptions] = useState({
        series: [52.8, 26.8, 20.4],
        colors: ["#1C64F2", "orange", "grey"],
        chart: {
          height: 620,
          type: "pie",
        },
        stroke: {
          colors: ["#ffffff"],
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -25,
            },
          },
        },
        labels: ["Sick", "Casual", "Earned leave"],
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        legend: {
          position: "bottom",
          fontFamily: "Inter, sans-serif",
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value}%`,
          },
        },
        xaxis: {
          labels: {
            formatter: (value) => `${value}%`,
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      });
    
      return (
        <div className="flex justify-center">
        <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 md:p-6 mt-6">
          <div className="flex justify-center items-center w-full mb-4">
            <p className="text-sm font-bold text-center">Leaves</p>
          </div>
          {/* Pie Chart */}
          <div id="pie-chart">
            <Chart options={chartOptions} series={chartOptions.series} type="pie" />
          </div>
        </div>
      </div>
      
      );
    };

export default ApexChart

 


