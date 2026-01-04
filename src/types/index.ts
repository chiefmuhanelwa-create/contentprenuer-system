// Task types for Sprint Tracker
export interface Task {
  id: string;
  userId: string;
  week: number; // 1-12
  taskName: string;
  completed: boolean;
  dueDate: Date;
  notes: string;
  createdAt: Date;
}

// Revenue types
export type RevenueStream = 'products' | 'ads' | 'information' | 'deals' | 'services';

export interface RevenueEntry {
  id: string;
  userId: string;
  date: Date;
  stream: RevenueStream;
  amount: number;
  description: string;
  receiptUrl?: string;
  createdAt: Date;
}

// Product types
export type ProductType = 'course' | 'book' | 'micro-product' | 'membership' | 'other';
export type ProductStatus = 'idea' | 'planning' | 'production' | 'launched' | 'evergreen';

export interface Product {
  id: string;
  userId: string;
  name: string;
  type: ProductType;
  price: number;
  status: ProductStatus;
  launchDate?: Date;
  revenueGenerated: number;
  description?: string;
  createdAt: Date;
}

// Content types
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'email' | 'twitter' | 'linkedin';
export type ContentType = 'reel' | 'carousel' | 'video' | 'story' | 'email' | 'post';
export type FourECategory = 'entertain' | 'educate' | 'encourage' | 'earn';
export type ContentStatus = 'idea' | 'scripted' | 'filmed' | 'edited' | 'scheduled' | 'published';

export interface ContentItem {
  id: string;
  userId: string;
  platform: Platform;
  contentType: ContentType;
  fourECategory: FourECategory;
  title: string;
  status: ContentStatus;
  publishDate?: Date;
  performanceNotes?: string;
  createdAt: Date;
}

// Student types
export type StudentStage = 'lead' | 'subscriber' | 'customer' | 'graduate' | 'affiliate';
export type StudentTag = 'bronze' | 'silver' | 'gold' | 'affiliate' | 'at-risk' | 'champion';

export interface Student {
  id: string;
  userId: string;
  name: string;
  email: string;
  stage: StudentStage;
  productPurchased?: string;
  revenueContributed: number;
  tags: StudentTag[];
  notes?: string;
  createdAt: Date;
}

// Faith types
export type FaithEntryType = 'prayer' | 'giving' | 'testimony' | 'scripture';
export type PrayerStatus = 'praying' | 'answered' | 'redirected';

export interface FaithEntry {
  id: string;
  userId: string;
  entryType: FaithEntryType;
  date: Date;
  amount?: number; // for giving
  content: string;
  scriptureReference?: string;
  prayerStatus?: PrayerStatus;
  isTestimony?: boolean;
  createdAt: Date;
}

// Risk types
export type RiskCategory = 'financial' | 'operational' | 'market' | 'platform';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type RiskStatus = 'monitoring' | 'active' | 'mitigated';

export interface Risk {
  id: string;
  userId: string;
  riskName: string;
  category: RiskCategory;
  likelihood: RiskLevel;
  impact: RiskLevel;
  mitigationPlan: string;
  status: RiskStatus;
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface User {
  id: string;
  email: string;
  businessName: string;
  createdAt: Date;
}

// Dashboard metrics
export interface DashboardMetrics {
  currentWeek: number;
  monthlyRevenue: number;
  revenueTarget: number;
  totalStudents: number;
  emailListSize: number;
  upcomingTasks: Task[];
  paidsBreakdown: {
    products: number;
    ads: number;
    information: number;
    deals: number;
    services: number;
  };
}
