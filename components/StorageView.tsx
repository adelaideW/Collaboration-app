
import React from 'react';
import { Database, HardDrive, Info } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';
import { STORAGE_STATS } from '../constants';

const StorageView: React.FC = () => {
  const total = 100;
  const used = 73;

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Database className="text-gray-400" />
            Storage Usage
          </h1>
          <p className="text-gray-500 mt-1">Detailed breakdown of your organization's drive storage.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">Available Space</span>
                <span className="text-sm font-bold text-gray-900">{used} GB of {total} GB used</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#7A005D] rounded-full transition-all duration-1000" 
                  style={{ width: `${used}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-1">Custom Apps</div>
                <div className="text-2xl font-bold text-indigo-900">25.4 GB</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Reports</div>
                <div className="text-2xl font-bold text-emerald-900">12.1 GB</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Info size={14} className="text-gray-400" />
              Category Breakdown
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={STORAGE_STATS}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {STORAGE_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {STORAGE_STATS.map(stat => (
                <div key={stat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }}></div>
                    <span className="text-gray-600">{stat.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{stat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-6">Historical Usage (Monthly)</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { month: 'Jan', usage: 40 },
                  { month: 'Feb', usage: 42 },
                  { month: 'Mar', usage: 48 },
                  { month: 'Apr', usage: 55 },
                  { month: 'May', usage: 58 },
                  { month: 'Jun', usage: 62 },
                  { month: 'Jul', usage: 73 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="usage" fill="#7A005D" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageView;
