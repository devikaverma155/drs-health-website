'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { validatePhone } from '@/lib/phoneValidation';

const SERVICES = [
  { id: 'b2b', label: 'B2B - Wholesale & Distribution', description: 'Partner with us for wholesale opportunities' },
  { id: 'private-labelling', label: 'Private Labelling', description: 'Custom formulations with your brand' },
  { id: 'pcd', label: 'PCD - Propaganda Cum Distribution', description: 'Regional distribution partnership' },
  { id: 'manufacturing', label: 'Contract Manufacturing', description: 'Bring your concept, we manufacture' }
];

export default function BusinessEnquiryForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, phone: value }));
    const validation = validatePhone(value);
    setPhoneError(validation.error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setGeneralError('');
    setSuccessMessage('');

    // Validation checks
    if (!selectedServices.length) {
      setGeneralError('Please select at least one service');
      return;
    }

    if (!formData.name.trim()) {
      setGeneralError('Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      setGeneralError('Please enter your email');
      return;
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error);
      return;
    }

    if (!formData.message.trim()) {
      setGeneralError('Please enter your enquiry details');
      return;
    }

    setIsLoading(true);

    try {
      // Submit to API
      const response = await fetch('/api/business-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          services: selectedServices
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setGeneralError(data.message || 'Something went wrong');
        return;
      }

      setSuccessMessage('✓ Enquiry Received! Our business team will contact you shortly...');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedServices([]);
      setPhoneError('');
    } catch (error) {
      setGeneralError('Failed to submit enquiry. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Service Selection */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-foreground">
          Select Services <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map(service => (
            <label key={service.id} className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
              <input
                type="checkbox"
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
                className="w-5 h-5 mt-1 text-primary rounded cursor-pointer"
              />
              <div>
                <div className="font-semibold text-foreground">{service.label}</div>
                <div className="text-sm text-body-muted">{service.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Your Full Name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-body-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Your Email Address"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-body-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      {/* Phone */}
      <div className="space-y-2">
        <input
          type="tel"
          name="phone"
          placeholder="Your 10-Digit Phone Number"
          value={formData.phone}
          onChange={handlePhoneChange}
          maxLength={10}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-body-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {phoneError && (
          <div className="text-sm text-red-600 font-medium">{phoneError}</div>
        )}
      </div>

      {/* Message */}
      <textarea
        name="message"
        placeholder="Tell us about your business enquiry..."
        value={formData.message}
        onChange={handleInputChange}
        rows={5}
        className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-body-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      {/* Error Message */}
      {generalError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm font-medium">
          {generalError}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm font-medium">
          {successMessage}
        </div>
      )}

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Submitting...' : 'Submit Enquiry'}
        </Button>
      </div>
    </form>
  );
}
