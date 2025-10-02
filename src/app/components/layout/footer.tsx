import Link from "next/link";


interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}
const links = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/products",
    label: "Products",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "/brands",
    label: "Brands",
  },
];

const Footer = ({

  tagline = "Exuclusive",


}: Footer2Props) => {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto  text-white">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 ">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {links.map((link, idx) => (
              <div key={idx}>
                <h3 className="mb-4 font-bold">{link.label}</h3>
                <ul className=" space-y-4 text-white" >
                  {links.map((link, idx) => (
                    <li
                      key={idx}
                      className="hover:text-red-500 font-medium"
                    >
                      <Link href={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
