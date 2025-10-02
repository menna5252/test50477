"use client";

import {
  Heart,
  MenuIcon,
  ShoppingCart,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cartContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const Navbar = () => {
  const { data: session, status } = useSession();

  const { cartDetails ,  } = useCart();
  return (
    <section className="py-4 pt-7">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {links.map((link, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink
                    href={link.path}
                    className={navigationMenuTriggerStyle()}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status == "loading" ? (
              <> </>
            ) : status == "unauthenticated" ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>{" "}
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <Link className="relative" href="/whishlist">
                    <Badge
                      className="absolute -top-1/2 -start-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      99
                    </Badge>
                    <Heart className="size-8" />{" "}
                  </Link>

                  <Link className="relative" href="/cart">
                    <Badge
                      className="absolute -top-1/2 -start-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      {cartDetails?.numOfCartItems || 0}
                    </Badge>
                    <ShoppingCart className="size-8" />{" "}
                  </Link>
                  <Link className="relative" href="/profile">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <User className="size-8" />{" "}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          {" "}
                          <Button variant="outline" onClick={() => signOut()}>
                            Sign Out
                          </Button>{" "}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Link>
                </div>{" "}
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {links.map((link, idx) => (
                    <Link key={idx} href={link.path} className="font-medium">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status == "loading" ? (
                    <> </>
                  ) : status == "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign up</Link>
                      </Button>{" "}
                    </>
                  ) : (
                    <>
                <div className="flex items-center gap-4">
                  <Link className="relative" href="/whishlist">
                    <Badge
                      className="absolute -top-1/2 -start-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                    0 
                    </Badge>
                    <Heart className="size-8" />{" "}
                  </Link>

                  <Link className="relative" href="/cart">
                    <Badge
                      className="absolute -top-1/2 -start-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      {cartDetails?.numOfCartItems || 0}
                    </Badge>
                    <ShoppingCart className="size-8" />{" "}
                  </Link>
                  <Link className="relative" href="/profile">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <User className="size-8" />{" "}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button variant="outline" onClick={() => signOut()}>
                            Sign Out
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Link>
                </div>{" "}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
