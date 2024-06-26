'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';

import { link as linkStyles } from '@nextui-org/theme';

import { useSiteConfig } from '@/app/core/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';

import { ThemeSwitch } from '@/app/core/ui/components/dashboard/theme-switch';
import {
  GithubIcon,
  AcademicFilledIcon,
  SearchIcon,
  Logo,
} from '@/app/core/ui/icons';
import { Cart } from '../shoppingcart/Cart';

export const Navbar = () => {
  const siteConfig = useSiteConfig();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-white dark:bg-darkBackground"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">IMAGEHUB</p>
          </NextLink>
        </NavbarBrand>
        <ul className="ml-2 hidden justify-start gap-4 lg:flex">
          {siteConfig &&
            siteConfig.navItems.map((item) => {
              if (item) {
                return (
                  <NavbarItem key={item.href}>
                    <NextLink
                      className={clsx(
                        linkStyles({ color: 'foreground' }),
                        'data-[active=true]:font-medium data-[active=true]:text-primary',
                      )}
                      color="foreground"
                      href={item.href}
                    >
                      {item.label}
                    </NextLink>
                  </NavbarItem>
                );
              }
              return null;
            })}
        </ul>
        <NavbarBrand className="flex lg:hidden ">
          <NavbarMenuToggle />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="mr-3 hidden basis-1/5 items-center sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 sm:flex">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="bg-default-100 text-sm font-normal text-default-600"
            href={siteConfig.links.github}
            startContent={<AcademicFilledIcon className="text-danger" />}
            variant="flat"
          >
            Univalle
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Cart />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        {/* <NavbarMenuToggle /> */}
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <Cart />
      </NavbarContent>

      <NavbarMenu className="bg-white dark:bg-darkBackground">
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig &&
            siteConfig.navMenuItems.map((item, index) => {
              if (item) {
                return (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                      color={
                        index === 2
                          ? 'primary'
                          : index === siteConfig.navMenuItems.length - 1
                            ? 'danger'
                            : 'foreground'
                      }
                      href={item.href}
                      size="lg"
                    >
                      {item.label}
                    </Link>
                  </NavbarMenuItem>
                );
              }
              return null;
            })}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
