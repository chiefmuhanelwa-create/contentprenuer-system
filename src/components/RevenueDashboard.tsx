import { useState } from 'react';
import { useBusinessStore } from '../store/useBusinessStore';
import { formatCurrency, calculateTithe, checkDiversification, formatDate } from '../lib/utils';
import { Plus, X, AlertTriangle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { RevenueStream } from '../types';

interface NewRevenueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NewRevenueModal({ isOpen, onClose }: NewRevenueModalProps) {
  const { addRevenue } = useBusinessStore();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [stream, setStream] = useState<RevenueStream>('products');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    addRevenue({
      userId: 'default-user',
      date: new Date(date),
      stream,
      amount: parseFloat(amount),
      description,
    });

    setAmount('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Add Revenue Entry
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Revenue Stream
            </label>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value as RevenueStream)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="products">Products</option>
              <option value="ads">Ads/Affiliates</option>
              <option value="information">Information (Courses)</option>
              <option value="deals">Deals</option>
              <option value="services">Services</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount (R)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Bronze course sale"
              required
            />
          </div>

          {parseFloat(amount) > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm text-green-800 dark:text-green-300">
                Suggested Tithe (10%): <strong>{formatCurrency(calculateTithe(parseFloat(amount)))}</strong>
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Revenue
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RevenueDashboard() {
  const { revenueEntries, getMonthlyRevenue, getPAIDSBreakdown, revenueTarget } = useBusinessStore();
  const [showNewRevenueModal, setShowNewRevenueModal] = useState(false);

  const monthlyRevenue = getMonthlyRevenue();
  const paidsBreakdown = getPAIDSBreakdown();

  const diversificationCheck = checkDiversification(paidsBreakdown);
  const titheAmount = calculateTithe(monthlyRevenue);

  // Prepare chart data
  const chartData = [
    {
      name: 'Products',
      amount: paidsBreakdown.products,
      fill: '#3b82f6',
    },
    {
      name: 'Ads',
      amount: paidsBreakdown.ads,
      fill: '#10b981',
    },
    {
      name: 'Information',
      amount: paidsBreakdown.information,
      fill: '#8b5cf6',
    },
    {
      name: 'Deals',
      amount: paidsBreakdown.deals,
      fill: '#f59e0b',
    },
    {
      name: 'Services',
      amount: paidsBreakdown.services,
      fill: '#ec4899',
    },
  ];

  // Get recent entries
  const recentEntries = [...revenueEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const streamLabels: Record<RevenueStream, string> = {
    products: 'Products',
    ads: 'Ads/Affiliates',
    information: 'Information',
    deals: 'Deals',
    services: 'Services',
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Revenue Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            PAIDS Framework Tracking
          </p>
        </div>

        <button
          onClick={() => setShowNewRevenueModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Revenue
        </button>
      </div>

      {/* Total Revenue Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-green-100 text-sm">This Month</p>
            <h2 className="text-5xl font-bold">{formatCurrency(monthlyRevenue)}</h2>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="w-10 h-10" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-green-100 text-sm">Target</p>
            <p className="text-2xl font-bold">{formatCurrency(revenueTarget)}</p>
          </div>
          <div>
            <p className="text-green-100 text-sm">Tithe (10%)</p>
            <p className="text-2xl font-bold">{formatCurrency(titheAmount)}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all"
              style={{ width: `${Math.min((monthlyRevenue / revenueTarget) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Diversification Warning */}
      {!diversificationCheck.isHealthy && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                Diversification Warning
              </h3>
              {diversificationCheck.warnings.map((warning, index) => (
                <p key={index} className="text-sm text-yellow-700 dark:text-yellow-400">
                  {warning}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAIDS Breakdown Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Revenue Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Entries */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Recent Entries
        </h3>

        {recentEntries.length > 0 ? (
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded">
                      {streamLabels[entry.stream]}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium mt-1">
                    {entry.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(entry.amount)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tithe: {formatCurrency(calculateTithe(entry.amount))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-600 dark:text-gray-400">
            No revenue entries yet. Add your first entry to get started!
          </p>
        )}
      </div>

      {/* New Revenue Modal */}
      <NewRevenueModal
        isOpen={showNewRevenueModal}
        onClose={() => setShowNewRevenueModal(false)}
      />
    </div>
  );
}
