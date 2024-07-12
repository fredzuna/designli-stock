import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IStockData } from '../interfaces/IStockData';

interface StockChartProps {
  data?: { [key: string]: IStockData[] }; // Make the data prop optional
}

const StockChart: React.FC<StockChartProps> = ({ data = {} }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(data).map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey="price"
            data={data[key]}
            name={key}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
