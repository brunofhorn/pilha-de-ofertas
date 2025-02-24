"use client"

import { useState } from "react";
import { Search, Send, Trash2 } from "lucide-react";
import { format } from "date-fns";
interface Message {
    id: string;
    title: string;
    text: string;
    value: number;
    discount: number;
    createdAt: Date;
}
const mockMessages: Message[] = [
    {
        id: "1",
        title: "Black Friday",
        text: "Promoção especial de Black Friday!",
        value: 199.99,
        discount: 20,
        createdAt: new Date("2024-02-20"),
    },
    {
        id: "2",
        title: "Cyber Monday",
        text: "Ofertas imperdíveis de Cyber Monday!",
        value: 299.99,
        discount: 15,
        createdAt: new Date("2024-02-21"),
    },
];
export default function PromotionList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const filteredMessages = mockMessages.filter((message) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            message.title.toLowerCase().includes(searchLower) ||
            message.text.toLowerCase().includes(searchLower) ||
            message.value.toString().includes(searchTerm) ||
            message.discount.toString().includes(searchTerm)
        );
    });
    const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMessages = filteredMessages.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    const handleSendPromo = (messageId: string) => {
        console.log("Enviando promoção:", messageId);
    };
    const handleDeletePromo = (messageId: string) => {
        console.log("Excluindo promoção:", messageId);
    };
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Fila de Promoções
                </h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar mensagens..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Título
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Texto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Valor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Desconto (%)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data de Cadastro
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedMessages.map((message) => (
                                <tr key={message.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {message.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {message.text}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        R$ {message.value.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {message.discount}%
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(message.createdAt, "dd/MM/yyyy")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleSendPromo(message.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                title="Enviar Promoção"
                                            >
                                                <Send className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePromo(message.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                title="Excluir Promoção"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t">
                    <div className="flex-1 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                                            ? "z-10 bg-primary border-primary text-white"
                                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};