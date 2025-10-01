"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';

interface DropdownItem { href: string; label: string; }
interface DropdownProps {
  buttonLabel: string;
  items: DropdownItem[];
  className?: string;
  buttonClassName?: string;
}

export default function Dropdown({ buttonLabel, items, className = '', buttonClassName = '' }: DropdownProps) {
  return (
    <div className={`relative text-left ${className}`}>
      <Menu>
        {({ open }) => (
          <>
            <MenuButton className={`inline-flex items-center justify-center rounded-md px-2 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${buttonClassName}`}>
              {buttonLabel}
              <svg className={`ml-2 -mr-1 h-4 w-4 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </MenuButton>
            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
              <MenuItems anchor="bottom start" className="mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1">
                  {items.map((item) => (
                    <MenuItem key={item.href}>
                      {({ active }) => (
                        <Link href={item.href} className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                          {item.label}
                        </Link>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
