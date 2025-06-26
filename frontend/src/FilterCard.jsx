import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Label } from './components/ui/label';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from './redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    arr: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Noida", "Mumbai"]
  },
  {
    filterType: "Industry",
    arr: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Analyst"]
  },
  {
    filterType: "Salary",
    arr: ["0-4k", "40k-1Lakh", "1Lakh-5Lakh"]
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({
    Location: '',
    Industry: '',
    Salary: ''
  });

  const handleFilter = (type, value) => {
    setSelected(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
  };

  const clearFilter = (type) => {
    setSelected(prev => ({ ...prev, [type]: '' }));
  };

  const clearAll = () => {
    setSelected({ Location: '', Industry: '', Salary: '' });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(Object.values(selected).filter(Boolean).join(', ')));
  }, [selected, dispatch]);

  return (
    <div className="w-full max-w-[18rem] bg-[#C6E7FF] p-4 rounded-xl shadow-lg border border-[#050C9C]">
      {/* Header with Active Filters */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-[#050C9C]">Filters</h1>
          <button 
            onClick={clearAll}
            className="text-xs text-[#050C9C] hover:text-[#176B87] transition-colors"
          >
            Clear All
          </button>
        </div>
        
        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(selected).map(([type, value]) => (
            value && (
              <div 
                key={type}
                className="flex items-center gap-1 px-2 py-1 bg-[#050C9C] rounded-full"
              >
                <span className="text-xs text-[#176B87]">{value}</span>
                <button 
                  onClick={() => clearFilter(type)}
                  className="text-[#86B6F6] hover:text-[#176B87]"
                >
                  <X size={12} />
                </button>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Filter Sections */}
      <div className="space-y-4">
        {filterData.map((data) => (
          <div key={data.filterType} className="pb-3 border-b border-[#050C9C] last:border-0">
            <h3 className="text-xs font-semibold text-[#050C9C] uppercase mb-2">
              {data.filterType}
            </h3>
            <RadioGroup 
              value={selected[data.filterType]} 
              onValueChange={(value) => handleFilter(data.filterType, value)}
            >
              <div className="space-y-1.5">
                {data.arr.map((item) => (
                  <div key={item} className="flex items-center">
                    <RadioGroupItem 
                      value={item}
                      id={`${data.filterType}-${item}`}
                      className="peer hidden"
                    />
                    <Label
                      htmlFor={`${data.filterType}-${item}`}
                      className="flex items-center gap-2 w-full p-1.5 rounded-md cursor-pointer
                        transition-colors duration-200 hover:bg-[#B4D4FF]/30
                        peer-data-[state=checked]:bg-[#86B6F6]/20"
                    >
                      <div className="flex items-center justify-center w-4 h-4 border border-[#86B6F6] 
                        rounded-full peer-data-[state=checked]:bg-[#176B87] peer-data-[state=checked]:border-[#176B87]
                        transition-colors duration-200">
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 
                          peer-data-[state=checked]:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm text-[#050C9C]">{item}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;