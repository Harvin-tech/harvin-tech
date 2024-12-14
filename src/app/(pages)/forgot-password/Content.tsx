'use client';

import { useState } from 'react';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset instructions have been sent to your email');
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred while processing your request');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-16 bg-background text-foreground mt-[83px]">
      <div className="text-center text-xl md:text-2xl pb-4 font-semibold tracking-tight">
        Reset your password
      </div>
      <div className="max-w-sm md:max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-md border border-border">
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
          {message && (
            <div className="text-primary text-sm text-center">{message}</div>
          )}
          <div className="rounded-md space-y-3">
            <div className="relative">
              <div className="absolute z-50 inset-y-0 left-0 top-6 pl-3 flex items-center pointer-events-none">
                <MailIcon
                  className="h-5 w-5 text-muted-foreground"
                  strokeWidth={2}
                />
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Email</div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full pl-10 px-3 py-2 bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
            >
              Send reset instructions
            </button>
          </div>

          <div className="text-sm text-center text-muted-foreground">
            Remember your password?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
