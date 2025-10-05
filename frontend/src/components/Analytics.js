import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const mockData = [
  { name: 'Jan', value: 400, progress: 240, tasks: 50 },
  { name: 'Feb', value: 300, progress: 139, tasks: 35 },
  { name: 'Mar', value: 200, progress: 980, tasks: 70 },
  { name: 'Apr', value: 278, progress: 390, tasks: 45 },
  { name: 'May', value: 189, progress: 480, tasks: 60 },
  { name: 'Jun', value: 239, progress: 380, tasks: 80 },
  { name: 'Jul', value: 349, progress: 430, tasks: 65 }
];

const Analytics = () => {
  return (
    <div className="analytics-grid">
      <div className="chart-card">
        <h3 className="chart-title">Project Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="progress" 
              stroke="#8884d8" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Active Tasks</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="tasks" 
              fill="#60a5fa" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Performance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#22c55e" 
              dot={{ stroke: '#22c55e', strokeWidth: 2, fill: '#fff', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;