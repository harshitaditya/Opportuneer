import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const JobsAdTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilteredJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredJobs(sortedJobs);
  };

  const toggleRow = (jobId) => {
    setExpandedRow(expandedRow === jobId ? null : jobId);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="ml-1 h-4 w-4 inline" /> : 
      <ChevronDown className="ml-1 h-4 w-4 inline" />;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-[#3572EF]/20">
      <Table>
        <TableCaption className="text-[#050C9C]/70">A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-[#050C9C]/5 text-[#050C9C] border-b border-[#3ABEF9]/30">
            <TableHead 
              className="font-semibold cursor-pointer hover:text-[#3572EF] transition-colors"
              onClick={() => requestSort('company.name')}
            >
              Company Name {getSortIcon('company.name')}
            </TableHead>
            <TableHead 
              className="font-semibold cursor-pointer hover:text-[#3572EF] transition-colors"
              onClick={() => requestSort('title')}
            >
              Role {getSortIcon('title')}
            </TableHead>
            <TableHead 
              className="font-semibold cursor-pointer hover:text-[#3572EF] transition-colors"
              onClick={() => requestSort('createdAt')}
            >
              Date {getSortIcon('createdAt')}
            </TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <React.Fragment key={job._id}>
                <TableRow
                  className={`hover:bg-[#3ABEF9]/10 transition-colors ${expandedRow === job._id ? 'bg-[#A7E6FF]/20' : ''}`}
                  onClick={() => toggleRow(job._id)}
                >
                  <TableCell className="text-[#050C9C] font-medium">{job?.company?.name}</TableCell>
                  <TableCell className="text-[#050C9C]">{job?.title}</TableCell>
                  <TableCell className="text-[#3572EF]">
                    {new Date(job?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="text-[#050C9C]/60 hover:text-[#3572EF] transition-colors cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent 
                        className="w-40 bg-white border border-[#3ABEF9]/30 rounded-lg shadow-lg p-2 space-y-1"
                        align="end"
                      >
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-[#3ABEF9]/10 cursor-pointer rounded-md text-[#050C9C] hover:text-[#3572EF] transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-[#3ABEF9]/10 cursor-pointer rounded-md text-[#050C9C] hover:text-[#3572EF] transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
                {expandedRow === job._id && (
                  <TableRow className="bg-[#A7E6FF]/10">
                    <TableCell colSpan="4" className="p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm text-[#050C9C]">
                        <div>
                          <p className="font-medium">Job Type:</p>
                          <p>{job?.jobType || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="font-medium">Location:</p>
                          <p>{job?.location || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="font-medium">Salary Range:</p>
                          <p>{job?.salary || 'Not specified'}</p>
                        </div>
                        <div>
                          {/* <p className="font-medium">Status:</p> */}
                          <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            job?.status === 'active' 
                              ? 'bg-[#3ABEF9]/20 text-[#3572EF]' 
                              : 'bg-[#050C9C]/10 text-[#050C9C]'
                          }`}>
                            {/* {job?.status || 'inactive'} */}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-8 text-[#050C9C]/70">
                No jobs found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsAdTable;