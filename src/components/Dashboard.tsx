import { useBusinessStore } from '../store/useBusinessStore';
import { formatCurrency, getCurrentWeek, getMonthName, calculatePercentage } from '../lib/utils';
import { BarChart3, Users, Calendar, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const {
    tasks,
    getMonthlyRevenue,
    getPAIDSBreakdown,
    getTotalStudents,
    revenueTarget,
  } = useBusinessStore();

  const currentWeek = getCurrentWeek();
  const monthlyRevenue = getMonthlyRevenue();
  const paidsBreakdown = getPAIDSBreakdown();
  const totalStudents = getTotalStudents();
  const revenueProgress = calculatePercentage(monthlyRevenue, revenueTarget);

  // Get upcoming tasks (next 3 incomplete tasks)
  const upcomingTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const totalRevenue = Object.values(paidsBreakdown).reduce((sum, val) => sum + val, 0);

  const paidsCards = [
    {
      name: 'Products',
      value: paidsBreakdown.products,
      percentage: calculatePercentage(paidsBreakdown.products, totalRevenue),
      color: 'bg-blue-500',
    },
    {
      name: 'Ads/Affiliates',
      value: paidsBreakdown.ads,
      percentage: calculatePercentage(paidsBreakdown.ads, totalRevenue),
      color: 'bg-green-500',
    },
    {
      name: 'Information',
      value: paidsBreakdown.information,
      percentage: calculatePercentage(paidsBreakdown.information, totalRevenue),
      color: 'bg-purple-500',
    },
    {
      name: 'Deals',
      value: paidsBreakdown.deals,
      percentage: calculatePercentage(paidsBreakdown.deals, totalRevenue),
      color: 'bg-orange-500',
    },
    {
      name: 'Services',
      value: paidsBreakdown.services,
      percentage: calculatePercentage(paidsBreakdown.services, totalRevenue),
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            NOCHILL Business OS
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {getMonthName()} • Week {currentWeek}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">For children's children</p>
        </div>
      </div>

      {/* Revenue Progress Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary-100 text-sm">Monthly Revenue</p>
            <h2 className="text-4xl font-bold">{formatCurrency(monthlyRevenue)}</h2>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Target: {formatCurrency(revenueTarget)}</span>
            <span>{revenueProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(revenueProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* PAIDS Breakdown */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Revenue Streams (PAIDS)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {paidsCards.map((card) => (
            <div
              key={card.name}
              className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${card.color} w-3 h-3 rounded-full`} />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {card.percentage}%
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{card.name}</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(card.value)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {useBusinessStore.getState().products.filter(p => p.status === 'launched').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {upcomingTasks.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Next 3 Tasks
        </h3>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => useBusinessStore.getState().toggleTask(task.id)}
                  className="w-5 h-5 text-primary-600 rounded"
                />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">{task.taskName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Week {task.week} • Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No upcoming tasks. Great work!
          </p>
        )}
      </div>

      {/* Signature */}
      <div className="text-center py-4">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 italic">
          "You understand? Because you understand."
        </p>
      </div>
    </div>
  );
}
