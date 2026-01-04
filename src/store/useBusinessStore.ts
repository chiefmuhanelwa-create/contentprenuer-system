import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Task,
  RevenueEntry,
  Product,
  ContentItem,
  Student,
  FaithEntry,
  Risk,
  RevenueStream,
} from '../types';
import { generateId } from '../lib/utils';

interface BusinessState {
  // Sprint Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Revenue
  revenueEntries: RevenueEntry[];
  addRevenue: (entry: Omit<RevenueEntry, 'id' | 'createdAt'>) => void;
  deleteRevenue: (id: string) => void;
  getTotalRevenue: (stream?: RevenueStream, startDate?: Date, endDate?: Date) => number;
  getMonthlyRevenue: () => number;
  getPAIDSBreakdown: () => Record<RevenueStream, number>;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'revenueGenerated'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Content
  contentItems: ContentItem[];
  addContent: (item: Omit<ContentItem, 'id' | 'createdAt'>) => void;
  updateContent: (id: string, updates: Partial<ContentItem>) => void;
  deleteContent: (id: string) => void;

  // Students
  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getTotalStudents: () => number;

  // Faith
  faithEntries: FaithEntry[];
  addFaithEntry: (entry: Omit<FaithEntry, 'id' | 'createdAt'>) => void;
  updateFaithEntry: (id: string, updates: Partial<FaithEntry>) => void;
  deleteFaithEntry: (id: string) => void;
  getTotalGiving: (year?: number) => number;

  // Risks
  risks: Risk[];
  addRisk: (risk: Omit<Risk, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRisk: (id: string, updates: Partial<Risk>) => void;
  deleteRisk: (id: string) => void;

  // Settings
  sprintStartDate: Date;
  setSprintStartDate: (date: Date) => void;
  revenueTarget: number;
  setRevenueTarget: (target: number) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      // Initial state
      tasks: [],
      revenueEntries: [],
      products: [],
      contentItems: [],
      students: [],
      faithEntries: [],
      risks: [],
      sprintStartDate: new Date(),
      revenueTarget: 170000, // R170,000 target from blueprint
      darkMode: false,

      // Sprint Task actions
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: generateId(),
              createdAt: new Date(),
            },
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      // Revenue actions
      addRevenue: (entry) =>
        set((state) => ({
          revenueEntries: [
            ...state.revenueEntries,
            {
              ...entry,
              id: generateId(),
              createdAt: new Date(),
            },
          ],
        })),

      deleteRevenue: (id) =>
        set((state) => ({
          revenueEntries: state.revenueEntries.filter((entry) => entry.id !== id),
        })),

      getTotalRevenue: (stream, startDate, endDate) => {
        const { revenueEntries } = get();
        return revenueEntries
          .filter((entry) => {
            const matchesStream = !stream || entry.stream === stream;
            const matchesDate =
              (!startDate || new Date(entry.date) >= startDate) &&
              (!endDate || new Date(entry.date) <= endDate);
            return matchesStream && matchesDate;
          })
          .reduce((sum, entry) => sum + entry.amount, 0);
      },

      getMonthlyRevenue: () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return get().getTotalRevenue(undefined, startOfMonth, endOfMonth);
      },

      getPAIDSBreakdown: () => {
        const { revenueEntries } = get();
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const breakdown: Record<RevenueStream, number> = {
          products: 0,
          ads: 0,
          information: 0,
          deals: 0,
          services: 0,
        };

        revenueEntries
          .filter((entry) => new Date(entry.date) >= startOfMonth)
          .forEach((entry) => {
            breakdown[entry.stream] += entry.amount;
          });

        return breakdown;
      },

      // Product actions
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              ...product,
              id: generateId(),
              revenueGenerated: 0,
              createdAt: new Date(),
            },
          ],
        })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      // Content actions
      addContent: (item) =>
        set((state) => ({
          contentItems: [
            ...state.contentItems,
            {
              ...item,
              id: generateId(),
              createdAt: new Date(),
            },
          ],
        })),

      updateContent: (id, updates) =>
        set((state) => ({
          contentItems: state.contentItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),

      deleteContent: (id) =>
        set((state) => ({
          contentItems: state.contentItems.filter((item) => item.id !== id),
        })),

      // Student actions
      addStudent: (student) =>
        set((state) => ({
          students: [
            ...state.students,
            {
              ...student,
              id: generateId(),
              createdAt: new Date(),
            },
          ],
        })),

      updateStudent: (id, updates) =>
        set((state) => ({
          students: state.students.map((student) =>
            student.id === id ? { ...student, ...updates } : student
          ),
        })),

      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((student) => student.id !== id),
        })),

      getTotalStudents: () => {
        return get().students.length;
      },

      // Faith actions
      addFaithEntry: (entry) =>
        set((state) => ({
          faithEntries: [
            ...state.faithEntries,
            {
              ...entry,
              id: generateId(),
              createdAt: new Date(),
            },
          ],
        })),

      updateFaithEntry: (id, updates) =>
        set((state) => ({
          faithEntries: state.faithEntries.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry
          ),
        })),

      deleteFaithEntry: (id) =>
        set((state) => ({
          faithEntries: state.faithEntries.filter((entry) => entry.id !== id),
        })),

      getTotalGiving: (year) => {
        const { faithEntries } = get();
        const targetYear = year || new Date().getFullYear();

        return faithEntries
          .filter(
            (entry) =>
              entry.entryType === 'giving' &&
              new Date(entry.date).getFullYear() === targetYear
          )
          .reduce((sum, entry) => sum + (entry.amount || 0), 0);
      },

      // Risk actions
      addRisk: (risk) =>
        set((state) => ({
          risks: [
            ...state.risks,
            {
              ...risk,
              id: generateId(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),

      updateRisk: (id, updates) =>
        set((state) => ({
          risks: state.risks.map((risk) =>
            risk.id === id
              ? { ...risk, ...updates, updatedAt: new Date() }
              : risk
          ),
        })),

      deleteRisk: (id) =>
        set((state) => ({
          risks: state.risks.filter((risk) => risk.id !== id),
        })),

      // Settings actions
      setSprintStartDate: (date) => set({ sprintStartDate: date }),
      setRevenueTarget: (target) => set({ revenueTarget: target }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'nochill-business-os',
    }
  )
);
