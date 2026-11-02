'use client';

import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Save, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Camera,
  QrCode,
  Lock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [saved, setSaved] = useState(false);

  // Safe initializers using localStorage directly (No useEffect warning)
  const getInitialProfile = () => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('user_profile');
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch {
          // fallback if JSON parse fails
        }
      }
    }
    return {
      fullName: 'Sadaf Ameer',
      email: 'asadafameer@gmail.com',
      phone: '+923295806515',
      designation: 'Lead Web Developer & Instructor',
    };
  };

  const initial = getInitialProfile();

  const [fullName, setFullName] = useState(initial.fullName);
  const [email, setEmail] = useState(initial.email);
  const [phone, setPhone] = useState(initial.phone);
  const [designation, setDesignation] = useState(initial.designation);

  // Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = { fullName, email, phone, designation };
    localStorage.setItem('user_profile', JSON.stringify(profileData));
    window.dispatchEvent(new Event('profileUpdated'));

    if (activeTab === 'security' && newPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordMsg('New passwords do not match!');
        return;
      }
      setPasswordMsg('Password changed successfully!');
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setPasswordMsg('');
    }, 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-indigo-600" />
            Instructor Account Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your profile details, secure credentials, and portal notifications.
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="h-4 w-4" /> Changes saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation Tabs */}
        <div className="md:col-span-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1.5 h-fit">
          <button 
            type="button" 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'profile' 
                ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="h-4 w-4" /> Profile Information
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'notifications' 
                ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bell className="h-4 w-4" /> Notifications & QR
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'security' 
                ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield className="h-4 w-4" /> Security & Password
          </button>
        </div>

        {/* Tab Contents */}
        <div className="md:col-span-3 space-y-6">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Public Instructor Profile</h3>
                <p className="text-xs text-slate-400 mt-0.5">Update your personal credentials visible on the portal.</p>
              </div>

              {/* Avatar & Picture Upload Option */}
              <div className="flex items-center gap-4 py-4 border-y border-slate-100">
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                  {fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{fullName}</h4>
                  <p className="text-xs text-slate-400">{designation}</p>
                  <label className="cursor-pointer mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <Camera className="h-3.5 w-3.5 text-slate-500" /> Upload New Picture
                    <input type="file" accept="image/*" className="hidden" onChange={() => alert('Picture upload simulated!')} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Full Name</label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-slate-50 border-slate-200 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 bg-slate-50 border-slate-200 text-sm" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-9 bg-slate-50 border-slate-200 text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Designation / Role</label>
                  <Input value={designation} onChange={(e) => setDesignation(e.target.value)} className="bg-slate-50 border-slate-200 text-sm" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NOTIFICATIONS & EMAIL QR */}
          {activeTab === 'notifications' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Notifications & Email Verification</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage alerts and scan your email authentication QR code.</p>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Student Quiz Submissions', desc: 'Get alerted instantly when students submit assessments.' },
                  { title: 'New Course Enrollments', desc: 'Notifications for new course registrations.' },
                  { title: 'PR & System Sync Alerts', desc: 'Receive status reports for repository updates.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600 rounded mt-1 cursor-pointer" />
                  </div>
                ))}
              </div>

              {/* Email QR Code Section */}
              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-col sm:flex-row items-center gap-4 mt-6">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-indigo-100 text-indigo-600 shrink-0">
                  <QrCode className="h-16 w-16" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Email Verification & Mobile App QR</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Scan this QR code received via email to instantly link your mobile authenticator or verify instructor credentials.
                  </p>
                  <Button type="button" variant="outline" size="sm" className="mt-3 h-8 text-xs bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                    Resend QR Code Email
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Security & Password Change</h3>
                <p className="text-xs text-slate-400 mt-0.5">Ensure your portal account is protected with a secure password.</p>
              </div>

              {passwordMsg && (
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" /> {passwordMsg}
                </div>
              )}

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                      className="pl-9 bg-slate-50 border-slate-200 text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className="pl-9 bg-slate-50 border-slate-200 text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="pl-9 bg-slate-50 border-slate-200 text-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Global Save Button */}
          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 flex items-center gap-2 shadow-sm py-2.5">
              <Save className="h-4 w-4" /> Save All Changes
            </Button>
          </div>

        </div>

      </form>

    </div>
  );
}