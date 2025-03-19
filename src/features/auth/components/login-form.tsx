"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-1 items-center justify-center p-6 md:p-12'>
      <div className='w-full max-w-md'>
        <div className='mb-6 space-y-2'>
          <h2 className='text-3xl font-bold'>Welcome back</h2>
          <p className='text-primary text-base'>See what's trending today.</p>
          <p className='text-muted-foreground'>
            Enter your email and password to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='maynard@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className='h-4 w-4' />
                  ) : (
                    <EyeIcon className='h-4 w-4' />
                  )}
                  <span className='sr-only'>
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div className='mt-6 flex flex-col'>
            <Button type='submit' className='w-full'>
              Sign in
            </Button>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{" "}
              <a
                href='#'
                className='text-primary hover:text-primary/90 underline'
              >
                Sign up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
