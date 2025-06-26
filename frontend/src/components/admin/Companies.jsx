import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="min-h-screen bg-[#0C0950]">
            <Navbar />
            <div className='max-w-6xl mx-auto py-10 px-4'>
                {/* Header Section */}
                <div className='mb-8 text-center'>
                    <h1 className="text-4xl font-bold text-[#00E5FF] mb-2">
                        Company Directory
                    </h1>
                    <p className="text-[#F8F9FA] opacity-90">Discover and manage partner companies</p>
                </div>

                {/* Control Bar */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-4 bg-[#176B87]/20 rounded-lg shadow-xl'>
                    <div className="relative w-full md:w-96">
                        <Input
                            className="w-full pl-4 pr-4 py-2 bg-[#F8F9FA] text-[#0C0950] rounded-lg border-2 border-[#00E5FF]/30 focus:border-[#00E5FF] transition-all"
                            placeholder="🔍 Search companies..."
                            onChange={(e) => setInput(e.target.value)}
                            style={{ boxShadow: '0 4px 14px rgba(0, 229, 255, 0.1)' }}
                        />
                    </div>
                    
                    <Button 
                        className="w-full md:w-auto bg-[#00E5FF] hover:bg-[#00B8D4] text-[#0C0950] px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        + New Company
                    </Button>
                </div>

                {/* Table Section */}
                <div className="border-2 border-[#00E5FF]/20 rounded-xl overflow-hidden shadow-2xl">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies