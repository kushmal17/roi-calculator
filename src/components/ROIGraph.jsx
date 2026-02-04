import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ROIGraph = ({ invested, gain }) => {
  const investment = Number(invested);
  const profit = gain > 0 ? gain : 0;
  const loss = gain < 0 ? Math.abs(gain) : 0;

  const data = {
    labels: gain >= 0 ? ["Invested", "Profit"] : ["Invested", "Loss"],
    datasets: [
      {
        data: gain >= 0
          ? [investment, profit]
          : [investment, loss],
        backgroundColor: gain >= 0
          ? ["#2d78d4", "#8bc34a"]
          : ["#2d78d4", "#e53935"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,   // allows custom size
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="pie-wrapper">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ROIGraph;
