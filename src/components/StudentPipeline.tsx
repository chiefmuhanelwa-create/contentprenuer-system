import { Users } from 'lucide-react';

export default function StudentPipeline() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Student Pipeline
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your student journey from lead to graduate
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-12 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Student pipeline with funnel visualization and CRM
          </p>
        </div>
      </div>
    </div>
  );
}
