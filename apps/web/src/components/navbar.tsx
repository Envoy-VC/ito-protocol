import { Link } from "@tanstack/react-router";

const links = [
  {
    href: "/dashboard",
    key: "swap",
    name: "Swap",
  },
  {
    href: "/dashboard/pool",
    key: "pool",
    name: "Pool",
  },
  {
    href: "/dashboard/facet",
    key: "facet",
    name: "Facet",
  },
];

export const Navbar = () => {
  return (
    <div className="flex h-[6dvh] flex-row items-center justify-between px-5 text-[17px]">
      <div className="flex flex-row items-center gap-8">
        <Link className="font-medium text-lg text-primary" to="/">
          Ito Protocol
        </Link>
        <div className="flex flex-row items-center gap-7">
          {links.map((link) => {
            return (
              <Link
                activeOptions={{
                  exact: true,
                }}
                activeProps={{
                  className: "text-white",
                }}
                className="text-neutral-400 transition-all duration-200 ease-in-out hover:text-neutral-200"
                key={link.key}
                to={link.href}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
      <appkit-button balance="hide" />
    </div>
  );
};
