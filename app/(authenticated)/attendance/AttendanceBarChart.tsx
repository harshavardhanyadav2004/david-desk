import React, { useEffect, useState } from "react"; // Ensure useState is imported

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Tooltip,
  Legend,
  LineChart, // Import LineChart here
  Line, // Import Line here
  YAxis, // Import YAxis here
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { OptionDropdown } from "./OptionDropdown";

// Dropdown Data
const academicYearData = [
  { value: "2018-2019", label: "2018-2019" },
  { value: "2019-2020", label: "2019-2020" },
  { value: "2020-2021", label: "2020-2021" },
  { value: "2021-2022", label: "2021-2022" },
  { value: "2022-2023", label: "2022-2023" },
  { value: "2023-2024", label: "2023-2024" },
];

const yearOfStudyData = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

// Attendance Data
const chartData = [
  { branch: "CSE", attendance_percentage: 90 },
  { branch: "CSM", attendance_percentage: 85 },
  { branch: "CSD", attendance_percentage: 92 },
  { branch: "CSC", attendance_percentage: 88 },
  { branch: "CSO", attendance_percentage: 91 },
  { branch: "ECE", attendance_percentage: 89 },
  { branch: "EEE", attendance_percentage: 93 },
  { branch: "MEC", attendance_percentage: 65 },
  { branch: "CIVIL", attendance_percentage: 91 },
];

// Threshold Data
const thresholdData = chartData.map((item) => ({
  ...item,
  threshold: 75,
}));

export function AttendanceBarChart() {
  const [selectedYear, setSelectedYear] = useState(academicYearData[0].value);
  const [selectedStudyYear, setSelectedStudyYear] = useState(
    yearOfStudyData[0].value,
  );
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        // "https://david-backend-production.up.railway.app/attendance/branch-summary/",
        "/api/attendance/summary/branch/",
      );
      const data = await response.json();
      setChartData(data.data);
      console.log(data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Bar Chart */}
      <Card className="max-w-lg">
        <CardHeader className="space-y-4">
          <CardTitle>Overall Attendance Percentage by Branch</CardTitle>
          <CardDescription className="grid grid-cols-2">
            <div>
              <Label>Academic Year</Label> <br />
              <OptionDropdown
                data={academicYearData}
                onChange={(value) => setSelectedYear(value)}
              />
            </div>
            <div>
              <Label>Year of Study</Label> <br />
              <OptionDropdown
                data={yearOfStudyData}
                onChange={(value) => setSelectedStudyYear(value)}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            width={400}
            height={300}
            data={chartData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="branch" />
            <Tooltip />
            <Bar
              dataKey="attendance_percentage"
              fill="var(--color-attendance_percentage)"
              radius={[8, 8, 0, 0]}
            >
              <LabelList position="top" fontSize={12} />
            </Bar>
          </BarChart>
        </CardContent>
        <CardFooter />
      </Card>

      {/* Threshold Graph */}
      <Card className="max-w-lg">
        <CardHeader className="space-y-4">
          <CardTitle>Attendance Threshold Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            width={400}
            height={300}
            data={thresholdData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="branch" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="attendance_percentage"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="threshold"
              stroke="#ff0000"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
