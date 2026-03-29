import { useState } from 'react'
import { Trash2, Loader2, Search, Edit3, UserX } from 'lucide-react'
import { deleteStudent } from '../services/api.js'

export default function StudentTable({ students, loading, onEdit, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Permanently delete this record?')) return;
    setDeletingId(id);
    try {
      await deleteStudent(id);
      onRefresh(); // Tell App.jsx to reload the list
    } catch (err) {
      alert('Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredStudents = students.filter(s => 
    s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      <p className="mt-4 text-slate-500 font-medium">Syncing with MySQL...</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 text-slate-500 font-bold text-xs uppercase">Student</th>
              <th className="px-6 py-4 text-slate-500 font-bold text-xs uppercase">Email</th>
              <th className="px-6 py-4 text-slate-500 font-bold text-xs uppercase">Dept</th>
              <th className="px-6 py-4 text-slate-500 font-bold text-xs uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                  <UserX className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 dark:text-white">{student.firstName} {student.lastName}</p>
                    <p className="text-xs text-slate-400 font-mono uppercase">ID: {student.id}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{student.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold">
                      {student.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(student)} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-colors">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)} 
                        className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                        disabled={deletingId === student.id}
                      >
                        {deletingId === student.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}