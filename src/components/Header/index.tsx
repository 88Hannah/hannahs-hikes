import Logo from "../Logo";
import Menu from "../Menu";

export default function Header() {
    return (
        <header className="fixed w-full p-3 bg-[#CC5500] flex justify-between items-center">
            <Logo />
            <Menu />
        </header>
    )
}