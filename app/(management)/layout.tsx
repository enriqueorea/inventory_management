"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@nextui-org/react";
import { useNavbar } from "@/store/ui";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ArchiveRestore, BoxesIcon, Home, User } from "lucide-react";

const ManagerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isMenuOpen, setIsMenuOpen } = useNavbar();
  const pathname = usePathname();

  const session = useSession();

  useEffect(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth > 768) {
      setIsMenuOpen(true);
    }
  }, [setIsMenuOpen]);

  console.log(session);

  const handleSignOut = () => {
    signOut();
  };

  const menuItems = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: <Home className="ml-2" />,
    },
    {
      label: "Mi Inventario",
      href: "/my-inventory",
      icon: <BoxesIcon className="ml-2" />,
    },

    {
      label: "Mis Transferencias",
      href: "/transfers",
      icon: <ArchiveRestore className="ml-2" />,
    },
    {
      label: "Perfil",
      href: "/profile",
      icon: <User className="ml-2" />,
    },
  ];

  if (!session.data?.user) return <Spinner color="primary" />;
  return (
    <>
      <Navbar
        isBordered
        classNames={{
          base: "mb-[40px] shadow-md",
          wrapper: "max-w-[100%]",
          menu: "bg-[#f9f9f9] border-b-[1px] border-[#e1e1e1] w-fit shadow-md px-0 gap-0",
          menuItem: `bg-[#f9f9f9] px-4 py-2`,
        }}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">Inventory</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent as={"div"} justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                name={session.data?.user?.name || ""}
                size="sm"
                src={session.data?.user?.image || ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">
                  {session.data?.user?.name || ""}
                </p>
                <p className="font-semibold">
                  {session.data?.user?.email || ""}
                </p>
              </DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem onPress={handleSignOut} key="logout" color="danger">
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              className={`${
                pathname === item.href
                  ? "bg-white shadow-lg scale-110"
                  : "bg-[#f9f9f9]"
              }`}
              key={`${item.label}-${index}`}
            >
              <Link
                className={`w-full ${
                  pathname === item.href
                    ? "text-black font-semibold"
                    : "text-slate-700"
                }`}
                anchorIcon={item.icon}
                showAnchorIcon
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div
        className={`${
          isMenuOpen ? "ml-[200px]" : ""
        } transition-all duration-200 ease-in-out px-11`}
      >
        {children}
      </div>
    </>
  );
};

export default ManagerLayout;
