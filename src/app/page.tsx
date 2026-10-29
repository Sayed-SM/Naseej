import { Suspense } from "react"; import { RailHero } from "@/components/store/rail-hero"; import { HomeSections } from "@/components/store/home-sections";
export default function HomePage() { return <main><Suspense fallback={<div className="min-h-[620px] bg-[var(--bone)]"/>}><RailHero /></Suspense><HomeSections /></main>; }
