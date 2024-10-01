'use client';

import React from 'react';

const Breadcrumb = ({ pageTitle }: {
    pageTitle: string;
}) => {
    return (
        <div className="flex justify-between items-center mb-4 bg-white h-10">
            {/* Left Side: Name of the Page */}
            <h4 className="font-semibold uppercase ml-2">{pageTitle}</h4>

            {/* Right Side: Breadcrumb */}
            <nav className="text-gray-600 mr-4">
                <ol className="flex space-x-2">
                    <li>
                        <a href="/dashboard" className="hover:text-blue-600">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <span>&gt;</span>
                    </li>
                    <li>
                        <span className="text-gray-400">{pageTitle}</span>
                    </li>
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;