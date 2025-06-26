import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Table2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [viewMode, setViewMode] = useState("box"); // Default is 'box', can switch to 'table'
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies?.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name
        ?.toLowerCase()
        ?.includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-[#C9EEFF] p-6 rounded-lg border border-[#62CDFF]/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#0C0950] font-medium">
          {viewMode === "box" ? "Company Cards" : "Company Table"}
        </h2>
        <button
          onClick={() => setViewMode(viewMode === "box" ? "table" : "box")}
          className="flex items-center gap-2 px-4 py-2 bg-[#62CDFF] text-[#0C0950] rounded-md hover:bg-[#97DEFF] transition-colors"
        >
          <Table2 size={18} />
          {viewMode === "box" ? "Table View" : "Card View"}
        </button>
      </div>

      {viewMode === "table" ? (
        <Table>
          <TableCaption className="text-[#0C0950]">
            A list of your recently registered companies
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-[#97DEFF] hover:bg-[#97DEFF]">
              <TableHead className="text-[#0C0950]">Logo</TableHead>
              <TableHead className="text-[#0C0950]">Name</TableHead>
              <TableHead className="text-[#0C0950]">Date</TableHead>
              <TableHead className="text-right text-[#0C0950]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies?.length ? (
              filteredCompanies.map((company) => (
                <TableRow 
                  key={company._id} 
                  className="hover:bg-[#97DEFF]/50 border-b border-[#62CDFF]/20"
                >
                  <TableCell>
                    <Avatar className="h-10 w-10 border border-[#62CDFF]">
                      <AvatarImage src={company.logo} alt={company.name} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-[#0C0950]">
                    {company.name}
                  </TableCell>
                  <TableCell className="text-[#0C0950]/80">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer text-[#0C0950] hover:text-[#62CDFF]" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 bg-[#C9EEFF] border border-[#62CDFF]">
                        <div
                          className="flex items-center gap-2 px-2 py-1 hover:bg-[#97DEFF] cursor-pointer rounded-md"
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                        >
                          <Edit2 className="text-[#0C0950]" size={16} />
                          <span className="text-[#0C0950]">Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-[#0C0950]/70">
                  No companies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <>
          <p className="text-[#0C0950]/80 mb-4">
            Browse your companies in card view
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCompanies?.length ? (
              filteredCompanies.map((company) => (
                <div 
                  key={company._id}
                  className="bg-white/70 rounded-lg p-4 border border-[#62CDFF]/30 hover:shadow-md transition-all hover:border-[#62CDFF]/60"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12 border-2 border-[#62CDFF]">
                        <AvatarImage src={company.logo} alt={company.name} />
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-[#0C0950] line-clamp-1">{company.name}</h3>
                        <p className="text-sm text-[#0C0950]/70">
                          Joined: {new Date(company.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-end">
                      <Popover>
                        <PopoverTrigger>
                          <button className="p-1 rounded-full hover:bg-[#97DEFF]/30">
                            <MoreHorizontal className="text-[#0C0950] hover:text-[#62CDFF]" size={20} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 bg-[#C9EEFF] border border-[#62CDFF]">
                          <div
                            className="flex items-center gap-2 px-2 py-1 hover:bg-[#97DEFF] cursor-pointer rounded-md"
                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                          >
                            <Edit2 className="text-[#0C0950]" size={16} />
                            <span className="text-[#0C0950]">Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-[#0C0950]/70">
                No companies found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompaniesTable;