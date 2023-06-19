import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/userSlice";

// import assets
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import LogoWhite from "../assets/logoFullWhite.png";
import LogoIcon from "../assets/logoPutih.png";

// Import Components
import ListBox from "./subcomponents/ListBox";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let token = false;

  if (user.id) {
    token = true;
  }

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  }

  const navigation = [
    { name: "Home", href: "http://localhost:3000/", current: false },
    {
      name: "Products",
      href: "http://localhost:3000/products",
      current: false,
    },
    { name: "Categories", href: "https://www.youtube.com/", current: false },
    { name: "Calendar", href: "#", current: false },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const searchFilter = e.target.search.value;
    if (searchFilter) {
      navigate({
        pathname: "/products",
        search: `?q=${searchFilter}`,
      });
    }
  }
  return (
    <Disclosure as="nav" className="bg-red-500 sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="mx-auto container-screen px-2 sm:px-4 lg:px-1">
            <div className="relative flex h-16 items-center justify-between">
              <Link to="/" className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={LogoIcon}
                    alt="Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={LogoWhite}
                    alt="Company"
                  />
                </div>
              </Link>
              <div className="flex justify-center items-center">
                <ListBox />
              </div>

              <div className="flex  flex-1 px-7">
                <div className="w-full max-w-xl lg:max-w-2xl">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                        required
                      />
                      <input type="submit" hidden />
                    </form>
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Navbar */}
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex flex-auto items-center">
                  <button
                    type="button"
                    className="mr-5 flex-shrink-0 rounded-lg p-1 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon
                      className="h-8 w-8 transition-colors duration-200"
                      aria-hidden="true"
                    />
                  </button>
                  {token ? (
                    <>
                      <Menu as="div" className="relative ml-4 flex-shrink-0">
                        <div className="flex flex-row items-center text-white">
                          <div>{user.name}</div>
                          <div className="ml-3">
                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/user/settings"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={handleLogout}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("/login")}
                        type="button"
                        className="w-32 h-auto flex-shrink-0 rounded-lg bg-transparen bg-red-800 p-1 text-white  hover:bg-white transition-colors duration-300 ease-in-out hover:text-red-700"
                      >
                        Login
                      </button>

                      <button
                        onClick={() => navigate("/register")}
                        type="button"
                        className="ml-2 h-auto w-32 flex-shrink-0 rounded-lg bg-red-800 p-1 text-white hover:bg-white  transition-colors duration-300 ease-in-out hover:text-red-700 "
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <nav
              className="hidden lg:flex lg:space-x-8 lg:py-2"
              aria-label="Global"
            >
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-white  hover:text-yellow-300",
                    "rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          {token ? (
            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  Dashboard
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Team
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Projects
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Calendar
                </Disclosure.Button>
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="user/settings"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    onClick={handleLogout}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          ) : (
            <Disclosure.Panel className="lg:hidden">
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="mt-3 space-y-1 px-2 ">
                  <Disclosure.Button
                    as="a"
                    href="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-red-800"
                  >
                    Login
                  </Disclosure.Button>

                  <Disclosure.Button
                    as="a"
                    href="/register"
                    className="block items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-red-800"
                  >
                    Register
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}
