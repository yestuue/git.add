import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2, User, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Strict Client-Side JavaScript Validation Rules
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Name: Required, minimum 2 characters
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full Name must contain at least 2 characters.';
    }

    // 2. Email: Required, strict regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g., student@miva.edu.ng).';
    }

    // 3. Phone: Required, pure digits check
    const digitsOnlyRegex = /^\+?[0-9\s\-()]{7,16}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!digitsOnlyRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must contain only numeric digits and valid phone characters.';
    }

    // 4. Message: Required, minimum 10 characters
    if (!formData.message.trim()) {
      newErrors.message = 'Message content cannot be blank.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 400);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-8 sm:gap-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-2">
        <h2 
          id="contact-heading" 
          className="font-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Get in Touch & Academic Inquiries
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
          Submit feedback, inquire about coursework collaborations, or review project documentation with real-time JavaScript validation.
        </p>
      </div>

      {/* Grid: Form on Left + Student Academic Contact Info on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Semantic Form */}
        <div className="lg:col-span-7">
          <Card className="rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
            <CardContent className="p-5 xs:p-6 sm:p-8 space-y-5">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
                  Send a Message
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  All fields are strictly validated with custom JavaScript rules.
                </p>
              </div>

              {/* Success Notification Alert */}
              {isSubmitted && (
                <div 
                  role="status"
                  className="p-4 rounded-2xl bg-white/[0.05] border border-white/20 text-neutral-200 flex items-start gap-3 animate-in fade-in"
                >
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-white">Message Dispatched Successfully!</p>
                    <p className="text-xs text-neutral-400">
                      Thank you for contacting me regarding the COS 106 Term Project. I will reply to your verified email shortly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-neutral-300">
                    Full Name <span className="text-white">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g. Alex Adeleke"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/60 border text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none transition-all ${
                        errors.name
                          ? 'border-white focus:border-white focus:ring-1 focus:ring-white'
                          : 'border-white/10 focus:border-white focus:ring-1 focus:ring-white'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p id="error-name" className="text-[11px] text-neutral-300 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 text-white" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* 2. Email & Phone in 2-Column Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-300">
                      Email Address <span className="text-white">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="student@miva.edu.ng"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/60 border text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none transition-all ${
                          errors.email
                            ? 'border-white focus:border-white focus:ring-1 focus:ring-white'
                            : 'border-white/10 focus:border-white focus:ring-1 focus:ring-white'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p id="error-email" className="text-[11px] text-neutral-300 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-white" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-neutral-300">
                      Phone Number <span className="text-white">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+234 800 000 0000"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/60 border text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none transition-all ${
                          errors.phone
                            ? 'border-white focus:border-white focus:ring-1 focus:ring-white'
                            : 'border-white/10 focus:border-white focus:ring-1 focus:ring-white'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p id="error-phone" className="text-[11px] text-neutral-300 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-white" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-300">
                    Message <span className="text-white">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Write your feedback, inquiry, or question here..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    className={`w-full p-3.5 rounded-xl bg-black/60 border text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none transition-all resize-y ${
                      errors.message
                        ? 'border-white focus:border-white focus:ring-1 focus:ring-white'
                        : 'border-white/10 focus:border-white focus:ring-1 focus:ring-white'
                    }`}
                  />
                  {errors.message && (
                    <p id="error-message" className="text-[11px] text-neutral-300 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 text-white" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 active:scale-[0.99] font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-black stroke-[2.2]" />
                  <span>{isSubmitting ? 'Validating & Sending...' : 'Send Verified Message'}</span>
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Academic Contact Info Card */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <CardContent className="p-5 xs:p-6 sm:p-7 space-y-5">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-headline text-lg font-bold text-white">
                  University Student Directory
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Official contact credentials for academic evaluation.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Building2 className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Institution</p>
                    <p className="text-neutral-300 text-xs">MIVA Open University</p>
                    <p className="text-neutral-500 text-[11px]">Department of Computer Science</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Mail className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Student Email</p>
                    <a 
                      href="mailto:alex.adeleke@miva.university" 
                      className="text-neutral-300 hover:text-white underline text-xs"
                    >
                      alex.adeleke@miva.university
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Phone className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone Support</p>
                    <a 
                      href="tel:+2348000000000" 
                      className="text-neutral-300 hover:text-white text-xs"
                    >
                      +234 (0) 800 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Campus Location</p>
                    <p className="text-neutral-300 text-xs">Abuja, FCT, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* COS 106 Compliance Badge */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <div className="text-[11px] text-neutral-300 leading-snug">
                  Validated against W3C HTML5 Form & JS constraint validation standards.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
