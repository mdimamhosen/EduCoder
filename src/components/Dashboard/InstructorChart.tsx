import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students");

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.studentsEnrolled.length), // Use the length of studentsEnrolled array
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map(
          (course) => course.price * course.studentsEnrolled.length
        ), // Calculate income based on price and number of enrolled students
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-gray-800 p-6">
      <div className="flex flex-col lg:flex-row items-center gap-3">
        <p className="text-xl font-bold text-gray-100">Visualize</p>
        <div className="space-x-4  font-semibold">
          {/* Button to switch to the "students" chart */}
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
              currChart === "students"
                ? "bg-gray-900 text-yellow-400"
                : "text-yellow-400"
            }`}
          >
            Students
          </button>
          {/* Button to switch to the "income" chart */}
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
              currChart === "income"
                ? "bg-yellow-400 text-gray-900"
                : "text-yellow-400"
            }`}
          >
            Income
          </button>
        </div>
      </div>
      <div className=" flex justify-center items-center mx-auto aspect-square  w-[70%] h-[70%]   ">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
