import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface MotivationData {
  id: number;
  date: string;
  motivation: number;
  title: string;
}

const MotivationGraph: React.FC = () => {
  const [data, setData] = useState<MotivationData[]>([]);
  const [filteredData, setFilteredData] = useState<MotivationData[]>([]);
  const [filter, setFilter] = useState({ age: '', startDate: '', endDate: '', minMotivation: '', maxMotivation: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/motivation');
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const applyFilter = () => {
    let filtered = data;
    if (filter.age) {
      filtered = filtered.filter(item => item.age === parseInt(filter.age));
    }
    if (filter.startDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(filter.startDate));
    }
    if (filter.endDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(filter.endDate));
    }
    if (filter.minMotivation) {
      filtered = filtered.filter(item => item.motivation >= parseInt(filter.minMotivation));
    }
    if (filter.maxMotivation) {
      filtered = filtered.filter(item => item.motivation <= parseInt(filter.maxMotivation));
    }
    setFilteredData(filtered);
  };

  const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: { payload: MotivationData }[]; label: string }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-4 border rounded shadow">
                <p>日付: {data.date}</p>
                <p>モチベーション: {data.motivation}%</p>
                <p>題名: {data.title}</p>
                <Link href={`/form/${data.id}`}>
                    <a className="text-blue-500 hover:underline">詳細を見る</a>
                </Link>
            </div>
        );
    }
    return null;
};

  return (
    <div className="space-y-8">
      <div className="flex space-x-4">
        <input
          type="number"
          name="age"
          placeholder="年齢"
          value={filter.age}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          value={filter.startDate}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={filter.endDate}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded"
        />
        <input
          type="number"
          name="minMotivation"
          placeholder="最小モチベーション"
          value={filter.minMotivation}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded"
        />
        <input
          type="number"
          name="maxMotivation"
          placeholder="最大モチベーション"
          value={filter.maxMotivation}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded"
        />
        <button onClick={applyFilter} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          フィルター適用
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <XAxis dataKey="date" />
          <YAxis domain={[-100, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="motivation" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">投稿一覧</h2>
        {filteredData.map(item => (
          <div key={item.id} className="border p-4 rounded">
            <h3 className="font-bold">{item.title}</h3>
            <p>日付: {item.date}</p>
            <p>モチベーション: {item.motivation}%</p>
            <Link href={`/form/${item.id}`}>
              <a className="text-blue-500 hover:underline">詳細を見る</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationGraph;