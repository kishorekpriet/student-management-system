import { useState, useEffect } from 'react'
import { X, Save, UserPlus, Loader2 } from 'lucide-react'
import { createStudent, updateStudent } from '../services/api.js'

export default function StudentModal({ 
  student, 
  isOpen, 
  onClose, 
  onSuccess 
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const isEditing = !!student

  useEffect(() => {
    if (isOpen) {
      if (isEditing && student) {
        setFormData({
          firstName: student.firstName || '',
          lastName: student.lastName || '',
          email: student.email || '',
          department: student.department || ''
        })
      } else {
        setFormData({ firstName: '', lastName: '', email: '', department: '' })
      }
      setErrors({})
      setSubmitError(null)
    }
  }, [isOpen, isEditing, student])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setSubmitError(null)

    try {
      const data = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        department: formData.department.trim()
      }

      if (isEditing && student.id) {
        await updateStudent(student.id, data)
      } else {
        await createStudent(data)
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Form submit error:', error)
      setSubmitError(isEditing ? 'Failed to update student' : 'Failed to create student')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-200/50 dark:border-slate-700/50"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 pb-4 border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm z-10 rounded-t-3xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center shadow-lg">
                  <UserPlus className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  {isEditing ? 'Edit Student' : 'Add New Student'}
                </h2>
                {isEditing && student && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">ID: #{student.id}</p>
                )}
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl transition-colors duration-200 hover:scale-105"
            >
              <X className="w-6 h-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {submitError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span className="text-sm font-medium text-red-900 dark:text-red-100">{submitError}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 shadow-sm transition-all duration-200 bg-slate-50/50 dark:bg-slate-700/50 ${
                  errors.firstName 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30 dark:bg-red-900/10' 
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 shadow-sm transition-all duration-200 bg-slate-50/50 dark:bg-slate-700/50 ${
                  errors.lastName 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30 dark:bg-red-900/10' 
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 shadow-sm transition-all duration-200 bg-slate-50/50 dark:bg-slate-700/50 ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30 dark:bg-red-900/10' 
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
                placeholder="student@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 shadow-sm transition-all duration-200 bg-slate-50/50 dark:bg-slate-700/50 ${
                  errors.department 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30 dark:bg-red-900/10' 
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
                placeholder="e.g. Computer Science"
              />
              {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <>
                  {isEditing ? (
                    <Save className="w-5 h-5" />
                  ) : (
                    <UserPlus className="w-5 h-5" />
                  )}
                  <span>{isEditing ? 'Update Student' : 'Create Student'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
