import React from 'react'


interface BracketProps {
    className?: string;
}

const Bracket: React.FC<BracketProps> = ({ className = '' }) => {
    return (
        <div className="h-6 w-1 bg-gradient-to-br from-blue-600 to-green-600 relative">
            <div className={`bg-gradient-to-br from-blue-600 to-green-600 h-1 w-4 absolute ${className}`} />
            <div className={`bg-gradient-to-br from-blue-600 to-green-600 h-1 w-4 absolute bottom-0 ${className}`} />
        </div>
    );
};

const SmallLine = () => {
    return (
        <div className="flex flex-row items-center justify-center">
            <Bracket />
            <div className="w-[300px] h-[3px] bg-gradient-to-br from-blue-600 to-green-600" />
            <Bracket className="right-1" />
        </div>
    )
}

export default SmallLine