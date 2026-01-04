import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export interface ScriptGenerationInput {
  problem: string;
  seedsStage: 'signal' | 'engagement' | 'education' | 'decision' | 'success';
  duration: number; // in seconds
  storyTitle?: string;
  storyContext?: string;
  userId: string;
}

export interface ScriptGenerationOutput {
  script: string;
  components: {
    hook: string;
    problem: string;
    story: string;
    solution: string;
    cta: string;
    closer: string;
  };
  seedsScore: {
    signal: number;
    engagement: number;
    education: number;
    decision: number;
    success: number;
    overall: number;
  };
  productionNotes: {
    broll: string[];
    music: string;
    thumbnailIdeas: string[];
  };
  predictions: {
    hookRate: number;
    completionRate: number;
    ctr: number;
    estimatedRevenue: number;
  };
}

export async function generateScript(
  input: ScriptGenerationInput
): Promise<ScriptGenerationOutput> {
  const { problem, seedsStage, duration, storyTitle, storyContext } = input;

  const storySection = storyTitle && storyContext
    ? `Include this story: ${storyTitle}\nContext: ${storyContext}`
    : 'Create a relatable story that illustrates the problem and solution.';

  const prompt = `You are an expert contentpreneur script writer. Generate a ${duration}-second video script for social media (Instagram Reels, TikTok, YouTube Shorts).

**Problem to address:** ${problem}

**SEEDS Stage:** ${seedsStage}
- Signal: Grab attention, pattern interrupt
- Engagement: Build connection, relatability
- Education: Teach value, demonstrate expertise
- Decision: Present solution, make the offer
- Success: Celebrate wins, build community

**Story:** ${storySection}

**Frameworks to incorporate:**
1. SEEDS: Signal → Engagement → Education → Decision → Success
2. PAIDS: Products, Ads/Affiliates, Information, Deals, Services
3. 4E: Entertain, Educate, Encourage, Earn

**Script Structure:**
1. Hook (0-3s): Pattern interrupt, curiosity gap
2. Transition (3-5s): What this is about
3. Problem Agitation (5-15s): Make them feel the pain
4. Story (15-40s): Personal or client story illustrating the problem
5. Framework/Solution (40-50s): Reveal the system (mention PAIDS, SEEDS, etc)
6. CTA (50-58s): Clear next step
7. Closer (58-60s): Memorable one-liner

**Voice & Style:**
- Direct, conversational South African English
- Mix of hustle culture + Kingdom principles
- Use phrases like "You understand? Because you understand."
- Contrast "what gurus teach" vs "what actually works"
- Results-focused, anti-BS tone
- Include specific numbers (R amounts, percentages)

**Output Format (JSON):**
{
  "script": "Full script with timestamps",
  "components": {
    "hook": "First 3 seconds",
    "problem": "Problem agitation section",
    "story": "Story section",
    "solution": "Framework/solution section",
    "cta": "Call to action",
    "closer": "Final one-liner"
  },
  "seedsScore": {
    "signal": 95,
    "engagement": 90,
    "education": 85,
    "decision": 88,
    "success": 92,
    "overall": 90
  },
  "productionNotes": {
    "broll": ["B-roll scene 1", "B-roll scene 2", "B-roll scene 3"],
    "music": "Upbeat, inspiring background music",
    "thumbnailIdeas": ["Thumbnail concept 1", "Thumbnail concept 2", "Thumbnail concept 3"]
  },
  "predictions": {
    "hookRate": 87,
    "completionRate": 82,
    "ctr": 11.2,
    "estimatedRevenue": 2450
  }
}

Generate the script now.`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Extract JSON from response (Claude sometimes wraps it in markdown)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const parsed: ScriptGenerationOutput = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch (error) {
    console.error('AI Script Generation Error:', error);
    throw new Error('Failed to generate script. Please try again.');
  }
}

// Helper function to calculate SEEDS score from script content
export function calculateSeedsScore(script: string): number {
  // Simple heuristic scoring (in production, this would use ML)
  const hasHook = script.toLowerCase().includes('i made') || script.toLowerCase().includes('here\'s why');
  const hasStory = script.split(' ').length > 50;
  const hasCTA = script.toLowerCase().includes('link') || script.toLowerCase().includes('grab');
  const hasNumbers = /\d+/.test(script);

  let score = 70; // base
  if (hasHook) score += 10;
  if (hasStory) score += 10;
  if (hasCTA) score += 5;
  if (hasNumbers) score += 5;

  return Math.min(score, 100);
}

// Helper to generate production package
export function generateProductionPackage(script: string) {
  return {
    captions: {
      instagram: script.substring(0, 2200), // Instagram limit
      tiktok: script.substring(0, 300), // TikTok best practice
      youtube: script + '\n\n#contentpreneur #createeconomy #paids',
    },
    hashtags: [
      '#contentpreneur',
      '#creatoreconomy',
      '#paids',
      '#digitalmarketing',
      '#onlinebusiness',
      '#socialmedia',
      '#contentcreator',
    ],
    repurposedVersions: [
      {
        platform: 'Twitter',
        type: 'thread',
        content: 'Thread version (10 tweets)',
      },
      {
        platform: 'LinkedIn',
        type: 'post',
        content: 'Professional LinkedIn post',
      },
      {
        platform: 'Email',
        type: 'newsletter',
        content: 'Email newsletter version',
      },
    ],
  };
}
