"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Menu } from "lucide-react";

import NavButton from "@/components/NavButton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("max-width:768px", false);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const renderMobileNavigation = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button
          variant="outline"
          size="sm"
          className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none outline-none text-white focus:bg-white/30 transition"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="px-2">
        <nav className="flex flex-col gap-y-2 pt-6">
          {routes.map(({ href, label }) => (
            <Button
              key={href}
              variant={href === pathname ? "secondary" : "ghost"}
              onClick={() => handleNavigation(href)}
              className="w-full justify-start"
            >
              {label}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );

  const renderDesktopNavigation = () => (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map(({ href, label }) => (
        <NavButton
          key={href}
          href={href}
          label={label}
          isActive={pathname === href}
        />
      ))}
    </nav>
  );

  return isMobile ? renderMobileNavigation() : renderDesktopNavigation();
};

export default Navigation;
