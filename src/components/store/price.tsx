import { formatEGP } from "@/lib/format";
export function Price({ value, compareAt, className = "" }: { value: number; compareAt?: number; className?: string }) { return <span className={`meta inline-flex items-center gap-2 ${className}`} dir="ltr"><span>{formatEGP(value)}</span>{compareAt && <del className="text-[var(--ink-soft)]">{formatEGP(compareAt)}</del>}</span>; }
