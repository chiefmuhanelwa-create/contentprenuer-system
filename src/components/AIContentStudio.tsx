import { useState } from 'react';
import { Sparkles, Wand2, Copy, Calendar, Loader2, CheckCircle2 } from 'lucide-react';
import { generateScript, type ScriptGenerationInput, type ScriptGenerationOutput } from '../lib/ai';
import { useBusinessStore } from '../store/useBusinessStore';
import { formatCurrency } from '../lib/utils';

export default function AIContentStudio() {
  const { addContent } = useBusinessStore();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<ScriptGenerationOutput | null>(null);
  const [copied, setCopied] = useState(false);

  // Form state
  const [problem, setProblem] = useState('');
  const [seedsStage, setSeedsStage] = useState<ScriptGenerationInput['seedsStage']>('education');
  const [duration, setDuration] = useState(60);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContext, setStoryContext] = useState('');

  const handleGenerate = async () => {
    if (!problem.trim()) return;

    setGenerating(true);
    try {
      const result = await generateScript({
        problem: problem.trim(),
        seedsStage,
        duration,
        storyTitle: storyTitle.trim() || undefined,
        storyContext: storyContext.trim() || undefined,
        userId: 'default-user', // In production, use actual user ID
      });

      setGenerated(result);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate script. Please check your API key and try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generated?.script) {
      navigator.clipboard.writeText(generated.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveToCalendar = () => {
    if (!generated) return;

    addContent({
      userId: 'default-user',
      platform: 'instagram',
      contentType: 'reel',
      fourECategory: 'educate',
      title: problem.substring(0, 50),
      status: 'idea',
      publishDate: new Date(),
    });

    alert('Saved to Content Calendar!');
  };

  const getSeedsColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-primary-600" />
            AI Content Studio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate high-performing scripts in seconds using SEEDS framework
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Script Parameters
        </h3>

        <div className="space-y-4">
          {/* Problem Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What problem are you addressing? *
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g., Creators getting views but making R0 in revenue"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* SEEDS Stage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              SEEDS Stage
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['signal', 'engagement', 'education', 'decision', 'success'] as const).map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSeedsStage(stage)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                    seedsStage === stage
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration: {duration} seconds
            </label>
            <input
              type="range"
              min="30"
              max="90"
              step="15"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>30s</span>
              <span>45s</span>
              <span>60s</span>
              <span>75s</span>
              <span>90s</span>
            </div>
          </div>

          {/* Optional Story */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Include a Story (Optional)
            </h4>
            <div className="space-y-3">
              <input
                type="text"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="Story title (e.g., 'R23K in one day')"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <textarea
                value={storyContext}
                onChange={(e) => setStoryContext(e.target.value)}
                placeholder="Brief story context or key points..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={2}
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!problem.trim() || generating}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Script with AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Output */}
      {generated && (
        <div className="space-y-6">
          {/* Script */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Generated Script
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={handleSaveToCalendar}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Save to Calendar
                </button>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {generated.script}
            </div>
          </div>

          {/* SEEDS Score */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              SEEDS Framework Score
            </h3>

            <div className="grid grid-cols-6 gap-4">
              {Object.entries(generated.seedsScore).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className={`text-3xl font-bold ${getSeedsColor(value)}`}>
                    {value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize mt-1">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Predictions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance Predictions
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Hook Rate</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {generated.predictions.hookRate}%
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Completion</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {generated.predictions.completionRate}%
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">CTR</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {generated.predictions.ctr}%
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Est. Revenue</div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {formatCurrency(generated.predictions.estimatedRevenue)}
                </div>
              </div>
            </div>
          </div>

          {/* Production Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Production Package
            </h3>

            <div className="space-y-4">
              {/* B-Roll */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">B-Roll Suggestions</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {generated.productionNotes.broll.map((scene, idx) => (
                    <li key={idx}>{scene}</li>
                  ))}
                </ul>
              </div>

              {/* Music */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Music</h4>
                <p className="text-gray-700 dark:text-gray-300">{generated.productionNotes.music}</p>
              </div>

              {/* Thumbnails */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Thumbnail Ideas</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {generated.productionNotes.thumbnailIdeas.map((idea, idx) => (
                    <li key={idx}>{idea}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!generated && !generating && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 shadow-md border border-gray-200 dark:border-gray-700 text-center">
          <Sparkles className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Ready to Create Magic?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Fill in the parameters above and let AI generate a high-performing script
            optimized for your SEEDS funnel stage.
          </p>
        </div>
      )}
    </div>
  );
}
