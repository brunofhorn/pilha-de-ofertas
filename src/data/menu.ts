import { Menu, MessageSquare, Settings, Users2 } from "lucide-react";

export const menu = [
    {
        title: "Fila de Promoções",
        icon: Menu,
        path: "/promotions/list",
    },
    {
        title: "Grupos / Canais",
        icon: Users2,
        path: "/groups",
    },
    {
        title: "Enviar Mensagem",
        icon: MessageSquare,
        path: "/promotion/send",
    },
    {
        title: "Configurações",
        icon: Settings,
        path: "/config",
    },
];