import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

export function Button({ children, onClick }: ButtonProps){
    return(<button onClick={onClick} className="w-50 bg-blue-900 hover:bg-indigo-950 border-1 border-indigo-400 p-0.5 rounded-sm text-indigo-50 ring-indigo-50 shadow-slate-950 w-30">       {children}
        </button>
    )
}