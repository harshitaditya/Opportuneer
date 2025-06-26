import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };
    

    const submitHandler = async (e) => {
        e.preventDefault();
        
        console.log(input);
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:3000/api/v1/job/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#A7E6FF]">
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-[#3572EF] shadow-lg rounded-md bg-white'>
                    <h2 className="text-2xl font-bold text-[#050C9C] mb-6 text-center">Post a New Job Opportunity</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className="text-[#050C9C]">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-[#3ABEF9] my-1 border-[#3572EF]"
                            />
                        </div>
                        <div>
                            <Label className="text-[#050C9C]">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-[#3ABEF9] my-1 border-[#3572EF]"
                            />
                        </div>
                        <div>
                            <Label className="text-[#050C9C]">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-[#3ABEF9] my-1 border-[#3572EF]"
                            />
                        </div>
                        <div>
                            <Label className="text-[#050C9C]">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-[#3ABEF9] my-1 border-[#3572EF]"
                            />
                        </div>
                        <div>
                            <Label className="text-[#050C9C]">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-[#3ABEF9] my-1 border-[#3572EF]"
                            />
                        </div>
                        <div>
                            <Label className="text-[#050C9C]">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-[#3ABEF9] my-1 border-[#3572EF]"
                            />
                        </div>
                        <div>
                            <Label className="text-[#050C9C]">Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-[#3ABEF9] my-1 border-[#3572EF]"
                            />
                        </div>
                        <div>
                            <Label className="text-[#050C9C]">No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-[#3ABEF9] my-1 border-[#3572EF]"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="col-span-2">
                                    <Label className="text-[#050C9C]">Select Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full border-[#3572EF] focus:ring-[#3ABEF9]">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent className="border-[#3572EF]">
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem 
                                                                value={company?.name?.toLowerCase()}
                                                                className="hover:bg-[#A7E6FF] focus:bg-[#3ABEF9] focus:text-white"
                                                            >
                                                                {company.name}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div> 
                    {
                        loading ? (
                            <Button className="bg-[#050C9C] hover:bg-[#3572EF] w-full my-4 h-10">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Please wait
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full my-4 bg-[#050C9C] hover:bg-[#3572EF] h-10 transition-all duration-300"
                                disabled={companies.length === 0}
                            >
                                Post New Job
                            </Button>
                        )
                    }
                    {
                        companies.length === 0 && (
                            <p className='text-xs text-[#050C9C] font-bold text-center my-3'>
                                *Please register a company first, before posting a job
                            </p>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob