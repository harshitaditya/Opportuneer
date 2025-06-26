import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name cannot be empty");
            return;
        }
        
        setIsLoading(true);
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/company/register`, {companyName}, {
                headers: {
                    'Content-Type':'application/json',
                },
                withCredentials: true
            });

            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message, {
                    style: {
                        background: '#050C9C',
                        color: '#A7E6FF',
                        border: 'none'
                    }
                });
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred", {
                style: {
                    background: '#FF3A3A',
                    color: 'white',
                    border: 'none'
                }
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#A7E6FF] to-[#3ABEF9]/20">
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8'>
                <div className='bg-white rounded-xl p-8 shadow-lg border border-[#3572EF]/20 hover:shadow-[#3572EF]/20 hover:shadow-xl transition-all duration-300'>
                    <div className='mb-10'>
                        <h1 className='font-bold text-3xl text-[#050C9C]'>Your Company Name</h1>
                        <p className='text-[#050C9C]/80 mt-2'>
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[#050C9C] font-medium">Company Name</Label>
                        <div className={`relative transition-all duration-200 ${isFocused ? 'ring-2 ring-[#3572EF] rounded-lg' : ''}`}>
                            <Input
                                type="text"
                                className={`my-2 border-2 ${isFocused ? 'border-[#3572EF]' : 'border-[#3ABEF9]'} focus:border-[#050C9C] focus-visible:ring-[#3ABEF9]/30 transition-colors duration-200`}
                                placeholder="e.g. JobHunt, Microsoft, etc."
                                onChange={(e) => setCompanyName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && registerNewCompany()}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                value={companyName}
                            />
                            {companyName && (
                                <button 
                                    onClick={() => setCompanyName("")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#050C9C]/50 hover:text-[#050C9C] transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                        <p className={`text-xs transition-all duration-200 ${companyName.length > 0 ? 'opacity-100 h-5' : 'opacity-0 h-0'} text-[#050C9C]/60`}>
                            {companyName.length > 30 ? 'Name is too long' : `${30 - companyName.length} characters remaining`}
                        </p>
                    </div>

                    <div className='flex items-center gap-4 mt-10'>
                        <Button 
                            variant="outline" 
                            onClick={() => navigate("/admin/companies")}
                            className="border-[#3572EF] text-[#050C9C] hover:bg-[#3ABEF9]/10 hover:border-[#050C9C] hover:text-[#050C9C] transition-colors duration-200"
                        >
                            Cancel
                        </Button>
                        <Button 
                            className={`relative bg-gradient-to-r from-[#050C9C] to-[#3572EF] hover:from-[#3572EF] hover:to-[#3ABEF9] text-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group ${(isLoading || !companyName.trim()) ? 'opacity-70' : ''}`}
                            onClick={registerNewCompany}
                            disabled={isLoading || !companyName.trim()}
                        >
                            <span className="relative z-10 flex items-center">
                                {isLoading ? "Creating..." : "Continue"}
                                {isLoading && (
                                    <svg className="animate-spin -mr-1 ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-[#3572EF] to-[#3ABEF9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[#050C9C]/70 text-sm">
                        Need help deciding? Choose a name that reflects your business identity.
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                        {['TechNova', 'BlueWave', 'PrimeCore', 'ElevateHQ'].map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => setCompanyName(suggestion)}
                                className="px-3 py-1 text-xs bg-[#A7E6FF]/50 text-[#050C9C] rounded-full hover:bg-[#3ABEF9]/30 transition-colors duration-200"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate