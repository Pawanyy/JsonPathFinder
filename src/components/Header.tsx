import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    return (
        <header className="bg-blue-500 dark:bg-blue-900 py-2 px-5 flex justify-between h-[48px]">
            <h1 className="text-white font-bold text-2xl">
                {title}
            </h1>
            <ThemeSwitcher />
        </header>
    );
}
