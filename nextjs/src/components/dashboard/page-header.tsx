"use client";

import React from 'react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="page-header d-flex justify-content-between align-items-center mb-4 bg-white">
      {/* Page Title */}
      <h4 className="m-0 ms-3">{title}</h4> 

      {/* Breadcrumb Navigation (You can customize this further) */}
      <nav aria-label="breadcrumb" className="me-3"> {/* Added me-3 for right margin */}
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">Dashboard</li>
          <li className="breadcrumb-item active" aria-current="page">{title}</li>
        </ol>
      </nav>
    </div>
  );
};

export default PageHeader;
