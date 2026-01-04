import { Lightbulb } from 'lucide-react';

export default function DecisionFramework() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Decision Frameworks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Opportunity filter, pricing calculator, and time allocation
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-12 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <Lightbulb className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Decision frameworks to guide your business choices
          </p>
        </div>
      </div>
    </div>
  );
}
