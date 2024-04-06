'use client'
import { useScrollTop } from "@/hooks/use-scroll-top";
import { Logo } from "./logo"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScrollTop()
    return (
        <div className={cn("z-50 fixed dark:bg-[#1f1f1f]  top-0 flex items-center w-full p-6 ", scrolled && 'border-b shadow-sm')}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <>
                            <SignInButton mode="modal">
                                <Button variant='ghost' size='sm'>
                                    Log In
                                </Button>
                            </SignInButton>
                            <SignInButton mode="modal">
                                <Button variant='ghost' size='sm'>
                                    Get Free
                                </Button>
                            </SignInButton>


                        </>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">
                                Enter Jotion
                            </Link>
                        </Button>
                        <UserButton
                            afterSignOutUrl="/"
                        />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
}

export default Navbar;