'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxes, faUsers, faCog, faBars, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@nextui-org/react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} text-xl font-bold`}>Dashboard</h1>
        <Button isIconOnly onClick={toggleSidebar} color="default">
          <FontAwesomeIcon icon={isSidebarOpen ? faBars : faArrowRight} />
        </Button>
      </div>
      <ul className="mt-6">
        <Link href={'/admin'}>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <FontAwesomeIcon icon={faHome} />
            {isSidebarOpen && <span className="ml-4">Home</span>}
          </li>
        </Link>
        <Link href={'/admin/products'}>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <FontAwesomeIcon icon={faBoxes} />
            {isSidebarOpen && <span className="ml-4">Products</span>}
          </li>
        </Link>
        <Link href={'/admin/categories'}>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <FontAwesomeIcon icon={faBoxes} />
            {isSidebarOpen && <span className="ml-4">Categories</span>}
          </li>
        </Link>

        <Link href={'/admin'}>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <FontAwesomeIcon icon={faUsers} />
            {isSidebarOpen && <span className="ml-4">Users</span>}
          </li>
        </Link>

        <Link href={'/admin'}>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <FontAwesomeIcon icon={faCog} />
            {isSidebarOpen && <span className="ml-4">Settings</span>}
          </li>
        </Link>

      </ul>
    </div>
  );
};

export default Sidebar;