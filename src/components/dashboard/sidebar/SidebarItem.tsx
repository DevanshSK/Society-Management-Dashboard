import type { IconBaseProps } from "@ant-design/icons/lib/components/Icon";
import type { ComponentType } from "react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "../../../lib/utils";


interface Props {
    href: string;
    label: string;
    icon: ComponentType<IconBaseProps>;
}

const SidebarItem = ({ icon: Icon, label, href }: Props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (location.pathname === '/' && href === "/") ||
        location.pathname === href || location.pathname?.startsWith(`${href}/`);

    const onClick = () => {
        navigate(href);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
                isActive && "text-blue-800 bg-blue-200/20 hover:bg-blue-200/30 hover:text-blue-800"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon className={cn(
                    "text-blue-800 text-[22px]",
                    isActive && 'text-blue-800'
                )} />
                {label}
            </div>
            <div className={cn(
                'ml-auto opacity-0 border-2 border-blue-800 h-full transition-all',
                isActive && 'opacity-100'
            )} />
        </button>
    )
}

export default SidebarItem