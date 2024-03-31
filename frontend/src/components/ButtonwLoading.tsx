import React from 'react';
import { Button } from './ui/button';

export default function ButtonwLoading({
  isLoading = false,
  name,
  classname = 'w-full',
}: {
  isLoading: boolean;
  name: string;
  classname?: string;
}) {
  return (
    <Button
      className={classname}
      type="submit"
      disabled={isLoading ? true : false}
    >
      {isLoading ? (
        <div className="flex space-x-2 animate-pulse">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
      ) : (
        name
      )}
    </Button>
  );
}
