import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
    {
        to: "/",
        icon: "📊",
        label: "Dashboard",
    },
    {
        to: "/subjects",
        icon: "📚",
        label: "Subjects",
    },
    {
        to: "/timetable",
        icon: "🕰️",
        label: "Timetable",
    },
    {
        to: "/calendar",
        icon: "📅",
        label: "Calendar",
    },
];

export default function Sidebar() {

const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebar")) ?? false
);

    return (

        <aside
            className={`
                h-screen
                bg-gray-200
                text-black
                transition-all
                duration-300
                ${
                    collapsed
                        ? "w-20"
                        : "w-64"
                }
            `}
        >

            <div className="flex items-center justify-between p-4">

                {!collapsed && (

                    <h1 className="text-xl font-bold">
                        Noted.
                    </h1>

                )}

                <button
                    onClick={() =>
                        setCollapsed(
                            !collapsed
                        )
                    }
                    className="rounded p-2 hover:bg-gray-700"
                >
                    ☰
                </button>

            </div>

            <nav className="mt-5 flex flex-col gap-2">

                {links.map(link => (

                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `
                            mx-2
                            flex
                            items-center
                            gap-4
                            rounded-lg
                            px-4
                            py-3
                            transition-colors
                            ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-800"
                            }
                            `
                        }
                    >

                        <span className="text-xl">
                            {link.icon}
                        </span>

                        {!collapsed && (

                            <span>
                                {link.label}
                            </span>

                        )}

                    </NavLink>

                ))}

            </nav>

        </aside>

    );

}