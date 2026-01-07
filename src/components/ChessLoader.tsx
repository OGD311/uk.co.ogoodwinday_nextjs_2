import { useEffect, useState } from "react";
import { FaChessBishop, FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from "react-icons/fa";
export default function ChessLoader() {

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentId((prev) => (prev + 1) % 6);
        }, 500);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="text-8xl w-full h-full flex justify-center self-center">
            <FaChessPawn
                className={`inset-0 transition-opacity duration-1000 ${currentId == 0 ? 'opacity-100' : 'opacity-0'}`}
            />
            <FaChessKnight
                className={` inset-0 transition-opacity duration-1000 ${currentId == 1 ? 'opacity-100' : 'opacity-0'}`}
            />
            <FaChessRook
                className={` inset-0 transition-opacity duration-1000 ${currentId == 2 ? 'opacity-100' : 'opacity-0'}`}
            />
            <FaChessBishop
                className={` inset-0 transition-opacity duration-1000 ${currentId == 3 ? 'opacity-100' : 'opacity-0'}`}
            />
            <FaChessQueen
                className={` inset-0 transition-opacity duration-1000 ${currentId == 4 ? 'opacity-100' : 'opacity-0'}`}
            />
            <FaChessKing
                className={` inset-0 transition-opacity duration-1000 ${currentId == 5 ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    )
}