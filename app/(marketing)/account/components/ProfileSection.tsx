'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface ProfileSectionProps {
  email: string;
}

export function ProfileSection({ email }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: localStorage.getItem('customer-first-name') || '',
    lastName: localStorage.getItem('customer-last-name') || '',
    phone: localStorage.getItem('customer-phone') || '',
    email: email,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Save to localStorage
    localStorage.setItem('customer-first-name', profile.firstName);
    localStorage.setItem('customer-last-name', profile.lastName);
    localStorage.setItem('customer-phone', profile.phone);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('customer-email');
    localStorage.removeItem('customer-first-name');
    localStorage.removeItem('customer-last-name');
    localStorage.removeItem('customer-phone');
    window.location.href = '/';
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
          {!isEditing && (
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={profile.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={profile.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              value={profile.email}
              disabled={true}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <p className="text-sm text-gray-500 mt-2">Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            {isEditing && (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setProfile({
                      firstName: localStorage.getItem('customer-first-name') || '',
                      lastName: localStorage.getItem('customer-last-name') || '',
                      phone: localStorage.getItem('customer-phone') || '',
                      email: email,
                    });
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
