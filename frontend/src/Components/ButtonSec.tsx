import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

export function ButtonSec({ children, onClick }: ButtonProps){
    return(<button onClick={onClick} className="text-[13px] bg-blue-900 hover:bg-indigo-950 border-1 border-indigo-400 p-0.5 rounded-full text-indigo-50 ring-indigo-50 shadow-slate-950 w-15">       {children}
        </button>
    )
}