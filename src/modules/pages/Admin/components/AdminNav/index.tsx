import React from 'react';

import { useRouter } from 'next/router';

import { MdChevronLeft } from 'react-icons/md';

const AdminNav: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="flex items-center my-8">
      <button
        type="button"
        className="p-1.5 bg-white rounded-full md:border border-gray1"
        onClick={() => router.back()}
      >
        <MdChevronLeft size={24} />
      </button>

      <h1 className="text-2xl font-merriweather font-bold ml-4">{title}</h1>
    </div>
  );
};

export default AdminNav;
