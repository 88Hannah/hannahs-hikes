export default function MenuButton({ isOpen, handleClick }) {
    return (
        <div onClick={() => handleClick(prevState => !prevState)} className={`h-6 w-8 relative z-10 ${!isOpen && 'flex flex-col justify-between'}`}>

                <span className={`transition-all h-1 w-full bg-[#FFE8D2] block rounded-full relative ${isOpen && 'rotate-45 top-2'}`}></span>
                <span className={`transition-all h-1 w-full bg-[#FFE8D2] block rounded-full relative ${isOpen && 'hidden'}`}></span>
                <span className={`transition-all h-1 w-full bg-[#FFE8D2] block rounded-full relative ${isOpen && '-rotate-45 top-1'}`}></span>

        </div>
    )
}