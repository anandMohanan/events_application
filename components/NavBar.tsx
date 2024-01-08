import Link from "next/link"
import { ModeToggle } from "./ui/ThemeToggle"
import Container from "./ui/container"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { auth } from "@/auth"

export const NavBar = async () => {
    const session = await auth();
    return (
        <header className="sm:flex sm:justify-between py-3 px-4 ">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
                    <div
                        className="flex items-center"
                    >
                        <Sheet>
                            <SheetTrigger>
                                <ChevronRightIcon className="h-6 md:hidden w-6 " />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                {session?.user ?
                                    (<nav className="flex flex-col gap-4">
                                        <Link href={"/dashboard"} className="block px-2 py-1 text-lg">
                                            Dashboard

                                        </Link>
                                        <Link href={"/create/event"} className="block px-2 py-1 text-lg">
                                            Create

                                        </Link>
                                        <Link href={"/create/event"} className="block px-2 py-1 text-lg">
                                            Participate

                                        </Link>
                                    </nav>
                                    ) : null
                                }
                            </SheetContent>

                        </Sheet>
                        <Link href="/" className="ml-4 lg:ml-0">

                            <h1 className="text-xl font-bold"> Events</h1>
                        </Link>
                    </div>
                    {session?.user ? (<nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
                        <Button asChild variant="ghost">
                            <Link href={"/dashboard"} className="text-sm font-medium transition-colors">
                                Create
                                Dashboard

                            </Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href={"/create/event"} className="text-sm font-medium transition-colors">
                                Create

                            </Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href={"/create/event"} className="text-sm font-medium transition-colors">
                                Participate

                            </Link>
                        </Button>
                    </nav>
                    ) : null}
                    <div className="flex items-center">

                        <ModeToggle />
                        <Button className="ml-2" variant="default">

                            <Link href={"/login"}>
                                Login
                            </Link>
                        </Button>
                    </div>
                </div>

            </Container>

        </header>

    )


}
