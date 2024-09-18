// components/Topbar.js  
'use client';  

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, Avatar } from "@nextui-org/react";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faMoon, faBell } from '@fortawesome/free-solid-svg-icons';  

const Topbar = () => {  
  return (  
    <Navbar isBordered>  
      <NavbarBrand>  
        <p className="font-bold text-inherit">ACME</p>  
      </NavbarBrand>  
      <NavbarContent className="flex items-center justify-between flex-1">  
        {/* Search Input on the Left Side */}  
        <Input   
          aria-label="Search"   
          placeholder="Search..."   
          className="max-w-xs"   
        />  
        
        {/* Right Side Icons Without Buttons */}  
        <div className="flex items-center gap-4">  
          {/* Moon Icon for Theme Toggle */}  
          <NavbarItem>  
            <Button isIconOnly className="p-0">  
              <FontAwesomeIcon icon={faMoon} size="lg" />  
            </Button>  
          </NavbarItem>  
          {/* Notification Icon */}  
          <NavbarItem>  
            <Button isIconOnly className="p-0 relative">  
              <FontAwesomeIcon  icon={faBell} size="lg" />  
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-1">  
                0  
              </span>  
            </Button>  
          </NavbarItem>  
          {/* Avatar */}  
          <NavbarItem>  
            <Avatar   
              isBordered   
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"   
              alt="User Avatar"   
            />  
          </NavbarItem>  
        </div>  
      </NavbarContent>  
    </Navbar>  
  );  
};  

export default Topbar;