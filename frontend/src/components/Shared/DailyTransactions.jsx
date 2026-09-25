import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const getLast30Days = () => {
  const dates = [];
  for (let i = 0; i < 30; i++) {
    const date = dayjs().subtract(i, 'day').format("YYYY-MM-DD");
    dates.unshift(date); // add to beginning for ascending order
  }
  return dates;
};

const DailyTransactionChart = ({ transactions = [] }) => {
  const dailyTotals = {};

  transactions && transactions.forEach((txn) => {
    const dateStr = dayjs(txn.date?.$date || txn.date).format("YYYY-MM-DD");
    if (!dailyTotals[dateStr]) {
      dailyTotals[dateStr] = 0;
    }
    dailyTotals[dateStr] += Number(txn.amount);
  });

  const last30Days = getLast30Days();
  const chartData = last30Days.map((date) => ({
    date,
    total: dailyTotals[date] || 0,
  }));

  return (
    <Card title="📆 Daily Transaction Summary (Last 30 Days)" className="rounded-2xl shadow-md">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DailyTransactionChart;
