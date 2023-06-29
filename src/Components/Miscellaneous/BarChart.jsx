import React, { useEffect, useState } from "react";

import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2"; // Import Bar component from react-chartjs-2 library
import { Box } from "@chakra-ui/react"; // Import Box component from Chakra UI library
import axios from "axios"; // Import axios for making HTTP requests
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  // Generates a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // State to store chart data
  const [chartData, setChartData] = useState("");

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from API endpoint
      const response = await axios.get(
        "https://sore-puce-magpie-sari.cyclic.app/api/status/chart"
      );

      // Destructure response data
      const { str, fin, qlt, man, sto, hr } = response.data;
      // console.log(response.data);

      const data = {
        // Set labels for the chart
        labels: ["STR", "FIN", "QLT", "MAN", "STO", "HR"],
        datasets: [
          {
            type: "bar",
            label: "Total",
            // Set data for the "Total" dataset
            data: [
              str.total,
              fin.total,
              qlt.total,
              man.total,
              sto.total,
              hr.total,
            ],
            borderWidth: 0.5,
            // Set random background color
            backgroundColor: getRandomColor(),
          },
          {
            type: "bar",
            // Set data for the "Closed" dataset
            label: "Closed",
            data: [
              str.closed,
              fin.closed,
              qlt.closed,
              man.closed,
              sto.closed,
              hr.closed,
            ],
            borderWidth: 0.5,
            // Set random background color
            backgroundColor: getRandomColor(),
          },
        ],
      };

      // Update the chart data state
      setChartData(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  let options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Box
        w="100%"
        p={2}
        borderRadius="5px"
        boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        h="auto"
      >
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </Box>
    </>
  );
};

export default BarChart;
