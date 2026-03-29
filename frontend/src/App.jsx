import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  UserPlus, 
  Download, 
  LayoutDashboard, 
  Users, 
  Loader2, 
  Database,
  ShieldCheck
} from 'lucide-react';

import { getAllStudents } from './services/api';
import Sidebar from './components/Sidebar.jsx';
import StudentTable from './components/StudentTable.jsx';
import StudentModal from './components/StudentModal.jsx';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // 1. Centralized Data Fetching
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data || []);
    } catch (error) {
      console.error("API Fetch Error:", error);
      toast.error('Could not connect to Backend on Port 8081');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 2. Success Handler
  const handleModalSuccess = useCallback(() => {
    loadData();
    setModalOpen(false);
    setEditingStudent(null);
    
    toast.success('Database synchronized successfully!', {
      style: {
        borderRadius: '15px',
        background: '#1e293b',
        color: '#fff',
      },
    });
  }, [loadData]);

  // 3. Stats
  const totalStudents = students.length;
  const eceStudents = students.filter(s => s.department === 'ECE').length;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Toaster position="top-right" reverseOrder={false} />

      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* DASHBOARD VIEW */}
          {currentView === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-3xl font-black mb-8 bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                System Overview
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Records</p>
                      <h3 className="text-4xl font-black mt-1">{totalStudents}</h3>
                    </div>
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl">
                      <Users className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">ECE Dept</p>
                      <h3 className="text-4xl font-black mt-1 text-emerald-500">{eceStudents}</h3>
                    </div>
                    <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
                      <Database className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Server Status</p>
                      <h3 className="text-xl font-bold mt-2 text-blue-600">Online :8081</h3>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-7 h-7" /> Admin Control Panel Active
                  </h2>
                  <p className="opacity-90 max-w-xl">
                    Welcome back. Your Student Management System is fully synced with the MySQL backend. 
                  </p>
                </div>
                <LayoutDashboard className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
              </div>
            </div>
          )}

          {/* MANAGE STUDENTS VIEW */}
          {currentView === 'students' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-black">Student Directory</h1>
                  <p className="text-slate-500 dark:text-slate-400">Manage and export database records</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => window.open('http://localhost:8081/api/students/export/excel', '_blank')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <Download className="w-5 h-5" /> Export
                  </button>
                  <button 
                    onClick={() => { setEditingStudent(null); setModalOpen(true); }}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                  >
                    <UserPlus className="w-5 h-5" /> Add Student
                  </button>
                </div>
              </div>
              
              <StudentTable 
                students={students} 
                loading={loading} 
                onEdit={(s) => { setEditingStudent(s); setModalOpen(true); }} 
                onRefresh={loadData} 
              />
            </div>
          )}
        </div>
      </main>

      <StudentModal 
        isOpen={modalOpen} 
        student={editingStudent} 
        onClose={() => setModalOpen(false)} 
        onSuccess={handleModalSuccess} 
      />
    </div>
  );
}

export default App;