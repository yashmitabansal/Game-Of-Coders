import React from "react";
import { Disclosure, } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { navigation } from "../data/linksdata";
import { Domain } from "../data/linksdata";

import fb from "../firebase";
import useAuthState from "../hooks";

export const NavBar=()=>{
  const {user} = useAuthState(fb.auth());
  const signout=()=>{
    fb.auth().signOut();
  };
    return (
      <header className="relative z-50   ">
        <div className="fixed top-0 left-0 right-0">
          <Disclosure as="nav" id="header" className="">
            {({ open }) => (
              <>
                <div className="px-12 py-4 sm:px-6 lg:px-8 bg-white">
                  <div className="flex items-center justify-between h-16">
                    <div className="items-center w-36 p-8">
                        <a href={Domain.link} >
                            <img src={Domain.icon} className="w-full h-full" alt={Domain.name}/>
                            
                        </a>
                    </div>
                    <div className="hidden md:block">
                    <div className="flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="px-3 -pt-4 rounded-md text-lg font-bold text-Amber-800 hover:text-Amber-900"
                        >
                          {item.name}
                        </a>
                      ))}
                      {user
                        ?<div className="flex">
                      <div className="-mr-2 flex">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <div className="rounded-full overflow-hidden w-12 h-12">
                          <img src={user.photoURL} alt="user" className=""/>
                      </div>
                        ) : (
                          <div className="rounded-full overflow-hidden w-12 h-12">
                          <img src={user.photoURL} alt="user" className=""/>
                      </div>
                        )}
                      </Disclosure.Button>
                    </div>
                      
                        </div>
                        :<a
                        key="Signin"
                        href="/signin/"
                        className="px-3 py-2 rounded-md text-lg font-bold text-Amber-800 hover:text-Amber-900"
                      >
                        Sign in
                      </a>
                      }
                      
                    </div>
                    
                  </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-green-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-100 hover:bg-green-500 ">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
                <Disclosure.Panel className="max-w-xl ml-auto">
                  <div className="mt-2 px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                    {user
                      ?<div className="">
                          <div className=" flex  p-12 space-x-5 bg-white">
                          <div className="rounded-full overflow-hidden">
                              <img src={user.photoURL} alt="user" className="w-24 h-24"/>
                          </div>
                          <div className="p-4">
                              <p className="font-bold text-xl">{user.displayName}</p>
                              <p className="text-lg">{user.email}</p>
                          </div>
                          
                      </div> 
                      <button className="border-2 w-full bg-red-600 p-2 text-white border-none rounded-lg"
                            onClick={signout}
                            >sign out</button>   
                      </div>
                      :<a
                      key="Signin"
                      href="/signin/"
                      className="px-3 py-2 rounded-md text-lg font-bold text-Amber-800 hover:text-Amber-900"
                    >
                      Sign in
                    </a>
                    }
                  </div>      
                </Disclosure.Panel>
                <Disclosure.Panel className="md:hidden">
                  <div className="mt-2 px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center bg-green-500">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-lg font-bold text-white hover:text-green-200"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                    {user
                      ?<div>
                      <a
                      key="Create"
                      href="/Create/"
                      className="px-3 py-2 rounded-md text-lg font-bold text-Amber-800 hover:text-Amber-900"
                    >
                    Create New Blog
                    </a>
                      <a
                      key="Profile"
                      href="/profile/"
                      className="px-3 py-2 rounded-md text-lg font-bold text-Amber-800 hover:text-Amber-900"
                    >
                      Profile
                    </a>
                    
                      </div>
                      :<a
                      key="Signin"
                      href="/signin/"
                      className="px-3 py-2 rounded-md text-lg font-bold text-Amber-800 hover:text-Amber-900"
                    >
                      Sign in
                    </a>
                    }
                  </div>      
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </header>
    );
}