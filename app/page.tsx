import { NavBar } from "@/components/NavBar"
import Container from "@/components/ui/container"

export default function Home() {
    return (
        <Container>

            <NavBar />
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Create, Discover, and Connect on Events
                    </h1>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Where Every {""}
                        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                            Event {" "}
                        </span>
                        {" "}Matters!
                    </h4>
                </div>
            </section>
        </Container>
    )
}
