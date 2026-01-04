import { useState } from 'react';
import { useBusinessStore } from '../store/useBusinessStore';
import { ChevronDown, ChevronRight, Plus, Calendar, X } from 'lucide-react';
import { formatDate, calculatePercentage } from '../lib/utils';

// Pre-populated tasks for the 90-day sprint
const DEFAULT_SPRINT_TASKS = {
  1: [
    'Open Notion workspace',
    'Purchase/renew domain',
    'Set up ConvertKit',
    'Create PAIDS Assessment',
    'Set up Teachable',
    'Community setup',
    'Financial systems',
  ],
  2: [
    'Complete product ladder design',
    'Define Bronze product outline',
    'Set up payment processing',
    'Create initial email sequence',
    'Brand identity finalization',
  ],
  3: [
    'Begin Bronze product creation',
    'Film first 3 content pieces',
    'Set up social media profiles',
    'Create lead magnet',
    'Launch email list building',
  ],
  4: [
    'Complete Bronze product',
    'Create sales page',
    'Set up automation workflows',
    'Begin soft launch preparation',
    'Test all systems',
  ],
  5: [
    'Soft launch Bronze product',
    'Daily content creation routine',
    'Engage with audience daily',
    'Gather feedback from first customers',
    'Iterate on product based on feedback',
  ],
  6: [
    'Silver product planning',
    'Scale content production',
    'Begin affiliate partnerships',
    'Optimize conversion funnel',
    'Financial review and adjustments',
  ],
  7: [
    'Create Silver product outline',
    'Implement feedback systems',
    'Expand content to new platform',
    'Build community engagement',
    'Student success tracking',
  ],
  8: [
    'Silver product creation',
    'Advanced marketing strategies',
    'Partnership development',
    'Revenue stream diversification',
    'Mid-sprint review',
  ],
  9: [
    'Complete Silver product',
    'Launch preparation',
    'Sales sequence creation',
    'Testimonial collection',
    'Scaling systems review',
  ],
  10: [
    'Launch Silver product',
    'Gold product ideation',
    'Team building exploration',
    'Advanced automation setup',
    'Revenue optimization',
  ],
  11: [
    'Gold product planning',
    'Mastermind community design',
    'Premium offering development',
    'Strategic partnerships',
    'Year 1 planning',
  ],
  12: [
    'Sprint completion review',
    'Celebrate wins',
    'Document lessons learned',
    'Plan next 90 days',
    'Student success celebration',
  ],
};

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  week: number;
}

function NewTaskModal({ isOpen, onClose, week }: NewTaskModalProps) {
  const { addTask } = useBusinessStore();
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !dueDate) return;

    addTask({
      userId: 'default-user',
      week,
      taskName,
      completed: false,
      dueDate: new Date(dueDate),
      notes,
    });

    setTaskName('');
    setDueDate('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Add Task - Week {week}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Task
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

export default function SprintTracker() {
  const { tasks, toggleTask, deleteTask, addTask } = useBusinessStore();
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [filter, setFilter] = useState<'all' | 'incomplete' | 'this-week'>('all');

  // Initialize default tasks if none exist
  const initializeDefaultTasks = (week: number) => {
    const defaultTasks = DEFAULT_SPRINT_TASKS[week as keyof typeof DEFAULT_SPRINT_TASKS];
    if (defaultTasks) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() + (week - 1) * 7);

      defaultTasks.forEach((taskName, index) => {
        const dueDate = new Date(weekStart);
        dueDate.setDate(dueDate.getDate() + index);

        addTask({
          userId: 'default-user',
          week,
          taskName,
          completed: false,
          dueDate,
          notes: '',
        });
      });
    }
  };

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );
  };

  const getWeekTasks = (week: number) => {
    let weekTasks = tasks.filter((t) => t.week === week);

    // Initialize default tasks if no tasks exist for this week
    if (weekTasks.length === 0 && DEFAULT_SPRINT_TASKS[week as keyof typeof DEFAULT_SPRINT_TASKS]) {
      initializeDefaultTasks(week);
      weekTasks = tasks.filter((t) => t.week === week);
    }

    if (filter === 'incomplete') {
      weekTasks = weekTasks.filter((t) => !t.completed);
    }

    return weekTasks;
  };

  const getWeekProgress = (week: number) => {
    const weekTasks = tasks.filter((t) => t.week === week);
    if (weekTasks.length === 0) return 0;
    const completed = weekTasks.filter((t) => t.completed).length;
    return calculatePercentage(completed, weekTasks.length);
  };

  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            90-Day Sprint Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            12 weeks to build your empire
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['all', 'incomplete', 'this-week'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {f === 'all' ? 'All' : f === 'incomplete' ? 'Incomplete' : 'This Week'}
            </button>
          ))}
        </div>
      </div>

      {/* Week Accordions */}
      <div className="space-y-4">
        {weeks.map((week) => {
          const weekTasks = getWeekTasks(week);
          const progress = getWeekProgress(week);
          const isExpanded = expandedWeeks.includes(week);

          return (
            <div
              key={week}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Week Header */}
              <button
                onClick={() => toggleWeek(week)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Week {week}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {weekTasks.length} tasks • {progress}% complete
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWeek(week);
                      setShowNewTaskModal(true);
                    }}
                    className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </button>

              {/* Week Tasks */}
              {isExpanded && (
                <div className="p-4 pt-0 space-y-2">
                  {weekTasks.length > 0 ? (
                    weekTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 text-primary-600 rounded mt-0.5"
                        />
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              task.completed
                                ? 'line-through text-gray-500 dark:text-gray-600'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {task.taskName}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {formatDate(task.dueDate)}</span>
                          </div>
                          {task.notes && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {task.notes}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-8 text-gray-600 dark:text-gray-400">
                      No tasks for this week. Add one to get started!
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        week={selectedWeek}
      />
    </div>
  );
}
