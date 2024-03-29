import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

export default function SearchInput() {
  return (
    <div className="relative hidden lg:block">
      <Input
        className="w-full lg:w-[500px] md:w-[300px] h-10 py-2 bg-muted rounded-2xl pl-10"
        placeholder="Search article..."
      />
      <Search className="absolute left-2 top-3 h-4 w-4" />
    </div>
  );
}
