import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

export function ButtonNav({ children, onClick }: ButtonProps){
    return(<button onClick={onClick} className=" cursor-pointer h-14 bg-linear-to-t from-sky-500 to-indigo-500 hover:bg-blue-950 p-10 pt-10 rounded-b-lg text-indigo-50 w-70 text-[20px]">       {children}
        </button>
    )
}