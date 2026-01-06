import { ReactNode } from "react";
import Link from "next/link";
import { TfiArrowTopRight } from "react-icons/tfi";

export default function IconLink({ url, children } : { url: string, children: ReactNode}) {
    return (
        <Link href={url} className="rounded-xl border p-2 hover:invert bg-background relative">
            {children}
        </Link>
    )
}