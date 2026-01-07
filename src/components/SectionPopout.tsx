import Link from "next/link";
import { useState } from "react"
import { IoIosArrowUp } from "react-icons/io";
import { MdClose, MdTableRows } from "react-icons/md";

export default function SectionPopout({ sections } : { sections: string[] }) {

    const [isOut, setIsOut] = useState(false);

    return (
        <>
            <div className={`${isOut ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-60'} text-foreground border-foreground transition-all duration-300 text-right text-3xl fixed bottom-20 right-8 flex flex-col z-50 backdrop-blur-md rounded-xl px-5 py-3 border`}>
                {sections.map((section, idx) => (
                    <Link href={`#${section}`} key={idx} className="hover:underline">{section.slice(0,1).toUpperCase()}{section.slice(1)}</Link>
                ))}
            </div>
            <button 
                onClick={() => setIsOut(!isOut)}
                className="cursor-pointer fixed bottom-3 right-8 p-3 rounded-2xl z-50 border text-foreground bg-background border-foreground"
                >
                <IoIosArrowUp className={`w-8 h-8 ${isOut ? 'rotate-0' : '-rotate-180'} transition-transform duration-200`} />
            </button>
        </>
    )

}