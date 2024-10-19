import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    return (
        <header className="navbar py-2 px-5 flex justify-between h-[48px]">
            <h1>{title}</h1>
            <ThemeSwitcher />
        </header>
    );
}
