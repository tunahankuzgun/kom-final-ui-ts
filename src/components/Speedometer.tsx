import { memo } from "react";
import "./Speedometer.sass";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface SpeedometerProps {
  value: number;
  maxValue: number;
  id: string;
  unit?: string;
}
ChartJS.register(ArcElement, Tooltip, Legend);

export default memo(function Speedometer({
  value,
  maxValue,
  unit,
}: SpeedometerProps) {
  return (
    <div className="Chart">
      <div className="chart-container">
        <Doughnut
          data={{
            datasets: [
              {
                backgroundColor: [
                  value / maxValue >= 0 && value / maxValue < 0.4
                    ? "#44b700"
                    : value / maxValue >= 0.4 && value / maxValue < 0.7
                    ? "#b78f00"
                    : value / maxValue >= 0.7 && value / maxValue < 0.9
                    ? "#de4112"
                    : value / maxValue >= 0.9 && value / maxValue <= 1
                    ? "#de1212"
                    : "#96be25",
                  "#ffffff11",
                ],
                data: [value, maxValue - value],
              },
            ],
          }}
          options={{
            circumference: 180,
            rotation: 270,
            maintainAspectRatio: false,
            responsive: true,
            cutout: "66%",
            borderColor: "#ffffff44",
          }}
        />
      </div>
      <span className="custom-label">
        {value} {unit}
      </span>
    </div>
  );
});
