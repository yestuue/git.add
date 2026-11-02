import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trash2, Plus, Calendar, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface Task {
  id: string;
  title: string;
  courseCode: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'miva_academic_planner_tasks';

export const AcademicPlanner: React.FC = () => {
  // Initial default tasks matching COS 106 requirements
  const initialTasks: Task[] = [
    {
      id: 'task-1',
      title: 'Complete COS 106 Term Project Web Platform & Defense',
      courseCode: 'COS 106',
      dueDate: '2026-11-20',
      priority: 'High',
      completed: true,
      createdAt: '2026-11-01',
    },
    {
      id: 'task-2',
      title: 'Review MTH 101 Calculus Problem Sets & Differential Equations',
      courseCode: 'MTH 101',
      dueDate: '2026-11-24',
      priority: 'High',
      completed: false,
      createdAt: '2026-11-01',
    },
    {
      id: 'task-3',
      title: 'Submit GST 101 Essay on Communication in Digital Age',
      courseCode: 'GST 101',
      dueDate: '2026-11-28',
      priority: 'Medium',
      completed: false,
      createdAt: '2026-11-02',
    },
    {
      id: 'task-4',
      title: 'Conduct PHY 101 Virtual Physics Experiment Report',
      courseCode: 'PHY 101',
      dueDate: '2026-12-02',
      priority: 'Low',
      completed: false,
      createdAt: '2026-11-02',
    },
  ];

  // State initialized with LocalStorage persistence
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  // Form input states
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('COS 106');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [formError, setFormError] = useState('');

  // Synchronize tasks state to browser LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Graceful fallback for restricted storage
    }
  }, [tasks]);

  // JavaScript function: Add a new task with validation
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError('Please enter a descriptive task title.');
      return;
    }

    if (!dueDate) {
      setFormError('Please select a valid deadline date.');
      return;
    }

    const newTask: Task = {
      id: 'task-' + Date.now(),
      title: title.trim(),
      courseCode,
      dueDate,
      priority,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTasks(prev => [newTask, ...prev]);
    setTitle('');
    setDueDate('');
    setPriority('High');
    setFormError('');
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <section 
      id="planner" 
      aria-labelledby="planner-heading"
      className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-8 sm:gap-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-2">
        <h2 
          id="planner-heading" 
          className="font-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Academic Task Planner
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
          Manage coursework, track deadlines, and monitor completion metrics with dynamic DOM manipulation, array state logic, and local persistence.
        </p>
      </div>

      {/* Analytics Metric Bar (Clean Monochrome) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Total Tasks</p>
            <p className="font-headline text-2xl sm:text-3xl font-extrabold text-white mt-0.5">{totalTasks}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5 stroke-[1.8]" />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Completed</p>
            <p className="font-headline text-2xl sm:text-3xl font-extrabold text-white mt-0.5">{completedTasks}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
            <CheckCircle2 className="w-5 h-5 stroke-[1.8]" />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Pending</p>
            <p className="font-headline text-2xl sm:text-3xl font-extrabold text-white mt-0.5">{pendingTasks}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
            <Calendar className="w-5 h-5 stroke-[1.8]" />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Progress Rate</p>
            <p className="font-headline text-2xl sm:text-3xl font-extrabold text-white mt-0.5">{completionPercentage}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 stroke-[1.8]" />
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Form to Add Task */}
        <div className="lg:col-span-5">
          <Card className="rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <CardContent className="p-5 xs:p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                  <Plus className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="font-headline text-lg font-bold text-white">
                  Add Academic Task
                </h3>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/20 text-neutral-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-white" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleAddTask} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <label htmlFor="task-title" className="block text-xs font-semibold text-neutral-300">
                    Task Title *
                  </label>
                  <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Prepare COS 106 Project Defense"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="course-code" className="block text-xs font-semibold text-neutral-300">
                      Course Code
                    </label>
                    <select
                      id="course-code"
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
                    >
                      <option value="COS 106">COS 106 (Web Tech)</option>
                      <option value="COS 101">COS 101 (Comp Sci)</option>
                      <option value="MTH 101">MTH 101 (Math)</option>
                      <option value="GST 101">GST 101 (English)</option>
                      <option value="PHY 101">PHY 101 (Physics)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="task-priority" className="block text-xs font-semibold text-neutral-300">
                      Priority Level
                    </label>
                    <select
                      id="task-priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="task-date" className="block text-xs font-semibold text-neutral-300">
                    Target Deadline *
                  </label>
                  <input
                    id="task-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.2]" />
                  <span>Insert Task into State</span>
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Task List and Filter Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950/80 p-3 sm:p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All ({tasks.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === 'pending'
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Pending ({pendingTasks})
              </button>
              <button
                type="button"
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === 'completed'
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Completed ({completedTasks})
              </button>
            </div>

            <span className="text-[11px] text-neutral-400 font-mono">
              LocalStorage Sync
            </span>
          </div>

          {/* Render List */}
          <div className="space-y-2.5">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 rounded-3xl bg-neutral-950/80 border border-white/10 p-6 space-y-2">
                <p className="font-headline text-base font-bold text-white">No tasks in this category</p>
                <p className="text-xs text-neutral-400">Add a new academic milestone above to begin tracking.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 group ${
                    task.completed
                      ? 'bg-white/[0.02] border-white/5 opacity-60'
                      : 'bg-neutral-950/80 border-white/10 hover:border-white/25'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(task.id)}
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    className="mt-0.5 text-neutral-400 hover:text-white cursor-pointer shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0 space-y-1">
                    <p
                      className={`text-xs sm:text-sm font-semibold transition-all ${
                        task.completed ? 'line-through text-neutral-500' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] text-neutral-400">
                      <span className="font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white font-bold">
                        {task.courseCode}
                      </span>
                      <span>Due: {task.dueDate}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 font-semibold">
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    aria-label={`Delete task ${task.title}`}
                    className="opacity-60 hover:opacity-100 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicPlanner;
