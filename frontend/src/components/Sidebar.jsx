import { LayoutDashboard, Users } from 'lucide-react'
import { useCallback } from 'react'

export default function Sidebar({ currentView, onViewChange }) {
  const handleDashboardClick = useCallback(() => onViewChange('dashboard'), [onViewChange])
  const handleStudentsClick = useCallback(() => onViewChange('students'), [onViewChange])

  return (
    <aside className="w-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 dark:border-slate-700/50 p-6 flex flex-col h-screen sticky top-0">
      <div className="text-2xl font-black bg-gradient-to-r from-primary-600 via-blue-600 to-primary-700 bg-clip-text text-transparent mb-12 pb-2 border-b border-slate-200/50 dark:border-slate-700/50">
        SMS Admin
      </div>
      <nav className="flex-1 space-y-2">
        <button 
          onClick={handleDashboardClick}
          className={`group w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transform ${
            currentView === 'dashboard' 
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary-500/25 dark:shadow-primary-900/50 ring-2 ring-primary-500/30 dark:ring-primary-400/30' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-700/70 hover:text-slate-900 dark:hover:text-white bg-white/50 dark:bg-slate-800/50'
          }`}
        >
          <LayoutDashboard className={`w-6 h-6 transition-transform group-hover:scale-110 ${currentView === 'dashboard' ? 'fill-white' : ''}`} />
          <span>Dashboard Overview</span>
        </button>
        <button 
          onClick={handleStudentsClick}
          className={`group w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transform ${
            currentView === 'students' 
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary-500/25 dark:shadow-primary-900/50 ring-2 ring-primary-500/30 dark:ring-primary-400/30' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-700/70 hover:text-slate-900 dark:hover:text-white bg-white/50 dark:bg-slate-800/50'
          }`}
        >
          <Users className={`w-6 h-6 transition-transform group-hover:scale-110 ${currentView === 'students' ? 'fill-white' : ''}`} />
          <span>Manage Students</span>
        </button>
      </nav>
      <div className="mt-auto pt-6 pb-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">v1.0.0</p>
      </div>
    </aside>
  )
}
