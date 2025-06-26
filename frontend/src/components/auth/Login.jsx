import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import loginImage from '../logo/loginlogo.jpg';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const roleChangeHandler = (value) => {
    setInput({ ...input, role: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:3000/api/v1/user/login", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const data = res.data;

      if (data.success) {
        dispatch(setUser(data.user));
        navigate("/");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className='min-h-screen bg-[#B4D4FF] flex flex-col'>
      <Navbar />
      
      <div className='flex-1 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between px-4 md:px-8 gap-8 md:gap-12 pt-12 pb-12'>
        {/* Login Form Container */}
        <div className='w-full max-w-md bg-[#EEF5FF] rounded-[20px] shadow-lg p-8 border border-[#86B6F6]/50 ml-4 md:ml-12 mb-8 md:mb-0'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-[#050C9C] mb-2'>Welcome Back</h1>
            <p className='text-[#176B87] text-lg'>Sign in to continue your journey</p>
          </div>

          <form onSubmit={submitHandler} className='space-y-6'>
            <div className='space-y-5'>
              <div>
                <Label className='text-[#176B87] font-medium'>Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="Example@example.com"
                  className='mt-1 bg-[#F0F9FF] border-[#86B6F6] focus:ring-2 focus:ring-[#3ABEF9] rounded-xl'
                />
              </div>

              <div>
                <Label className='text-[#176B87] font-medium'>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className='mt-1 bg-[#F0F9FF] border-[#86B6F6] focus:ring-2 focus:ring-[#3ABEF9] rounded-xl'
                />
              </div>

              <div>
                <Label className='text-[#176B87] font-medium block mb-3'>Account Type</Label>
                <RadioGroup 
                  value={input.role}
                  onValueChange={roleChangeHandler}
                  className="grid grid-cols-2 gap-3"
                >
                  {[
                    { value: 'student', label: 'Seeker' },
                    { value: 'recruiter', label: 'Recruiter' }
                  ].map(({ value, label }) => (
                    <div
                      key={value}
                      className={`relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        input.role === value 
                          ? 'border-[#3ABEF9] bg-[#3ABEF9]/10'
                          : 'border-[#B4D4FF] hover:border-[#3ABEF9] bg-white'
                      }`}
                    >
                      <RadioGroupItem
                        value={value}
                        id={value}
                        className="absolute opacity-0 w-0 h-0"
                      />
                      <Label 
                        htmlFor={value}
                        className={`font-medium cursor-pointer ${
                          input.role === value ? 'text-[#050C9C]' : 'text-[#176B87]'
                        }`}
                      >
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-xl transition-all ${
                loading 
                  ? 'bg-[#86B6F6] cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#3ABEF9] to-[#050C9C] hover:from-[#050C9C] hover:to-[#3ABEF9]'
              }`}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Continue →'
              )}
            </Button>

            <p className='text-center text-sm text-[#176B87]'>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className='font-semibold text-[#050C9C] hover:text-[#3ABEF9] transition-colors'
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>

        {/* Image Container with Background */}
        <div className='hidden md:block w-full max-w-2xl mr-4 bg-[#B4D4FF] p-6 rounded-2xl shadow-lg'>
          <img 
            src={loginImage} 
            alt="Login Visual" 
            className='w-full h-auto rounded-lg shadow-md object-cover'
            style={{ maxHeight: '65vh' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;