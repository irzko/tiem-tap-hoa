"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useSWR, { Fetcher } from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 19, 3, 5, 2, 3, 4],
      borderColor: "rgb(255, 99, 132)",
      // cubicInterpolationMode: "monotone",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const fetcher: Fetcher<IOrder[], string> = (url) =>
  fetch(url).then((r) => r.json());

export default function Page() {
  const { data: report } = useSWR<IOrder[], string>(`/api/orders`, fetcher);
  return (
    <div className="relative">
      <Line options={options} data={data} />
    </div>
  );
}
