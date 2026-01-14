import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Import useLocation hook
import { Link, useLocation } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

type NavItem = { name: string; id_href: string; icon?: "external" };

function NavbarSection() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // Get current location
  const location = useLocation();
  const menuItems: NavItem[] = [
    { name: "About", id_href: "/#about" },
    { name: "Sponsors", id_href: "/#sponsors" },
    { name: "Team", id_href: "/#team" },
    { name: "History", id_href: "/#history" },
    { name: "Leaderboard", id_href: "/leaderboard" },
    { name: "ASU CS Wiki", id_href: "https://wiki.thesoda.io", icon: "external" },
  ];

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
  };

  const renderNavLink = (item: NavItem) => {
    const handleClick = () => {
      setIsMenuOpen(false);
    };
    if (item.id_href.startsWith('/') && !item.id_href.includes('#')) {
      return (
        <Link key={item.name} to={item.id_href} className="text-white w-full flex items-center gap-1 whitespace-nowrap" onClick={handleClick}>
          <span>{item.name}</span>
          {item.icon === "external" && (
            <FiExternalLink size={12} className="shrink-0" />
          )}
        </Link>
      );
    }
    const isExternal = item.id_href.startsWith('http');
    return (
      <a key={item.name} href={item.id_href} className="text-white w-full flex items-center gap-1 whitespace-nowrap" onClick={handleClick} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        <span>{item.name}</span>
        {item.icon === "external" && (
          <FiExternalLink size={12} className="shrink-0" />
        )}
      </a>
    );
  };

  return (
    <nav className="sticky top-0 bg-black bg-opacity-85 backdrop-blur-md z-20 dark flex flex-col">
      <div className="flex items-center justify-between p-4 w-full">
        <div className="flex items-center gap-4">
          <div className="sm:hidden relative">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="z-50">
                  {isMenuOpen ? "✕" : "☰"}
                </Button>
              </DropdownMenuTrigger>
                <DropdownMenuContent
                className="dark bg-black w-56 min-w-[200px] z-50 border border-gray-700"
                align="start"
                sideOffset={0}
              >
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    {renderNavLink(item)}
                  </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to="/" className="flex gap-4 items-center" onClick={handleLogoClick}>
            <img src="/logo/Soda_Logo_Dark_Mode.svg" width="314" height="132" className="w-28" alt="SoDA Logo" />
          </Link>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          {menuItems.map(renderNavLink)}
        </div>
        <div>
          <Button asChild className="text-white bg-soda-red">
            <a href="https://sundevilcentral.eoss.asu.edu/feeds?type=club&type_id=35661&tab=about" target="_blank" rel="noopener noreferrer">
              Become a Member
            </a>
          </Button>
        </div>
      </div>
      {/* Conditionally render banner based on path */}
      {/* Banner disabled - Officer applications are closed */}
      {location.pathname !== '/mentorship' && (
        <div className="text-xl bg-gray-900/75 text-white text-center p-2 w-full">
          Mentorship applications are now open!{' '}
          <Link to="/mentorship" className="font-bold underline hover:text-soda-red">
            Apply now.
          </Link>
        </div>
      )}
      {/* End Banner Section */}
    </nav>
  );
}

export default NavbarSection;
