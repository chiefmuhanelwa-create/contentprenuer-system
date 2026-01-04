import { useState } from 'react';
import { useBusinessStore } from '../store/useBusinessStore';
import { Plus, X, Mail, TrendingUp, AlertCircle, Users } from 'lucide-react';
import { formatDate, calculatePercentage } from '../lib/utils';
import type { StudentStage } from '../types';

interface NewContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NewContactModal({ isOpen, onClose }: NewContactModalProps) {
  const { addStudent } = useBusinessStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<StudentStage>('lead');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addStudent({
      userId: 'default-user',
      name,
      email,
      stage,
      revenueContributed: 0,
      tags: [],
    });

    setName('');
    setEmail('');
    setStage('lead');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Add New Contact
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              SEEDS Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as StudentStage)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="lead">Signal - Lead (Awareness)</option>
              <option value="subscriber">Engagement - Subscriber</option>
              <option value="customer">Education - Customer (Learning)</option>
              <option value="graduate">Decision - Graduate (Implementing)</option>
              <option value="affiliate">Success - Affiliate (Advocate)</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Contact
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

export default function SEEDSFunnel() {
  const { students, updateStudent } = useBusinessStore();
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState<StudentStage | 'all'>('all');

  // Map student stages to SEEDS stages
  const seedsStages: { id: StudentStage; label: string; description: string; color: string }[] = [
    {
      id: 'lead',
      label: 'Signal',
      description: 'Awareness stage - They know you exist',
      color: 'bg-blue-500',
    },
    {
      id: 'subscriber',
      label: 'Engagement',
      description: 'Engagement stage - They follow your content',
      color: 'bg-purple-500',
    },
    {
      id: 'customer',
      label: 'Education',
      description: 'Learning stage - They bought a product',
      color: 'bg-green-500',
    },
    {
      id: 'graduate',
      label: 'Decision',
      description: 'Implementation stage - Getting results',
      color: 'bg-yellow-500',
    },
    {
      id: 'affiliate',
      label: 'Success',
      description: 'Advocacy stage - Referring others',
      color: 'bg-pink-500',
    },
  ];

  // Calculate funnel metrics
  const stageCounts = seedsStages.map((stage) => ({
    ...stage,
    count: students.filter((s) => s.stage === stage.id).length,
  }));

  const totalContacts = students.length;

  const filteredStudents =
    selectedStage === 'all'
      ? students
      : students.filter((s) => s.stage === selectedStage);

  // Calculate conversion rates between stages
  const getConversionRate = (fromStage: StudentStage, toStage: StudentStage) => {
    const fromCount = students.filter((s) => s.stage === fromStage).length;
    const toCount = students.filter((s) => s.stage === toStage).length;
    if (fromCount === 0) return 0;
    return calculatePercentage(toCount, fromCount);
  };

  const moveContact = (studentId: string, newStage: StudentStage) => {
    updateStudent(studentId, { stage: newStage });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            SEEDS Funnel
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Signal → Engagement → Education → Decision → Success
          </p>
        </div>

        <button
          onClick={() => setShowNewContactModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Contact
        </button>
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Funnel Overview
        </h3>

        <div className="space-y-4">
          {stageCounts.map((stage, index) => {
            const percentage = totalContacts > 0 ? calculatePercentage(stage.count, totalContacts) : 0;
            const nextStage = seedsStages[index + 1];
            const conversionRate = nextStage
              ? getConversionRate(stage.id, nextStage.id)
              : 100;

            return (
              <div key={stage.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {stage.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stage.count}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {percentage}% of total
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${stage.color} transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Conversion Rate to Next Stage */}
                {nextStage && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {conversionRate}% convert to {nextStage.label}
                    {conversionRate < 20 && (
                      <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                        <AlertCircle className="w-4 h-4" />
                        Low conversion
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedStage('all')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedStage === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          All ({totalContacts})
        </button>
        {seedsStages.map((stage) => {
          const count = students.filter((s) => s.stage === stage.id).length;
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedStage === stage.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {stage.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Contacts List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Contacts ({filteredStudents.length})
        </h3>

        {filteredStudents.length > 0 ? (
          <div className="space-y-3">
            {filteredStudents.map((student) => {
              const currentStage = seedsStages.find((s) => s.id === student.stage);

              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {student.name}
                      </h4>
                      {currentStage && (
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium text-white ${currentStage.color}`}
                        >
                          {currentStage.label}
                        </span>
                      )}
                      {student.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {student.email}
                      </div>
                      <div>Added {formatDate(student.createdAt)}</div>
                    </div>
                  </div>

                  {/* Stage Actions */}
                  <div className="flex gap-2">
                    {seedsStages.map((stage) => {
                      if (stage.id === student.stage) return null;
                      return (
                        <button
                          key={stage.id}
                          onClick={() => moveContact(student.id, stage.id)}
                          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                          title={`Move to ${stage.label}`}
                        >
                          → {stage.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No contacts in this stage
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Add contacts to start tracking your SEEDS funnel
            </p>
          </div>
        )}
      </div>

      {/* New Contact Modal */}
      <NewContactModal
        isOpen={showNewContactModal}
        onClose={() => setShowNewContactModal(false)}
      />
    </div>
  );
}
