import Link from "next/link";
import { useState } from "react"
import { MdClose, MdTableRows } from "react-icons/md";

export default function SectionPopout({ sections } : { sections: string[] }) {

    const [isOut, setIsOut] = useState(false);

    return (
        <>
            <div className={`${isOut ? '' : 'hidden'} text-right fixed bottom-15 right-8 flex flex-col z-50 backdrop-blur-sm rounded-xl px-2 py-1 border border-white`}>
                {sections.map((section, idx) => (
                    <Link href={`#${section}`} key={idx}>{section.slice(0,1).toUpperCase()}{section.slice(1)}</Link>
                ))}
            </div>
            <button 
                onClick={() => setIsOut(!isOut)}
                className="cursor-pointer fixed bottom-3 right-8 bg-black p-3 rounded-2xl z-50 border border-white"
                >
                {isOut ? (
                    <MdClose />
                ) : (
                    <MdTableRows />
                )}
            </button>
        </>
    )

}