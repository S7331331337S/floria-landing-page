import { Plant } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
    return (
        <footer className="bg-zinc-950 pt-32 pb-10 px-4 md:px-8 border-t border-white/5 relative overflow-hidden">

            {/* Massive Background Typography */}
            <div className="absolute top-0 left-0 w-full flex justify-center items-start pt-10 overflow-hidden pointer-events-none opacity-[0.02] select-none">
                <span className="text-[22vw] font-bold leading-none tracking-tighter text-white whitespace-nowrap">
                    LA CASA DEL AMOR
                </span>
            </div>

            {/* Creative Glowing Flower Background Element */}
            <div className="absolute -bottom-1/4 -right-20 md:-right-64 w-[500px] md:w-[900px] h-[500px] md:h-[900px] pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
                <img src="/hero-accent.webp" alt="Footer Flower" className="w-full h-full object-contain blur-md rotate-12" />
            </div>

            <div className="w-full max-w-7xl mx-auto flex flex-col relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32 mt-10">
                    <div className="md:col-span-5 flex flex-col text-zinc-50">
                        <div className="flex flex-col mb-8">
                            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-2">La Casa Del Amor.</h2>
                            <p className="text-xl md:text-2xl text-accent font-serif italic opacity-90">Architecture of Nature</p>
                        </div>
                        <p className="text-zinc-400 max-w-[35ch] leading-relaxed text-lg">
                            An independent floral styling studio for modern, sculptural living. Sourced locally, curated globally.
                        </p>
                    </div>

                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-zinc-50 font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Archive
                        </h4>
                        <ul className="flex flex-col gap-4 text-zinc-400">
                            <li><a href="#" className="hover:text-white transition-colors">Spring Collection</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">The Wedding Edit</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Corporate Spaces</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-zinc-50 font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Studio
                        </h4>
                        <ul className="flex flex-col gap-4 text-zinc-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sourcing Ethos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-zinc-50 font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Contact
                        </h4>
                        <div className="flex flex-col gap-4 text-zinc-400 cursor-pointer">
                            <a href="mailto:hello@lacasadelamor.com" className="hover:text-white transition-colors items-center group flex gap-2">
                                hello@lacasadelamor.com
                            </a>
                            <p className="hover:text-white transition-colors">+1 (310) 555-0824</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-zinc-500">
                    <p>© {new Date().getFullYear()} La Casa Del Amor. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-zinc-300 transition-colors uppercase tracking-widest text-xs font-semibold">Instagram</a>
                        <a href="#" className="hover:text-zinc-300 transition-colors uppercase tracking-widest text-xs font-semibold">Pinterest</a>
                        <a href="#" className="hover:text-zinc-300 transition-colors uppercase tracking-widest text-xs font-semibold">Arez.na</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
