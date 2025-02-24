
"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Edit2, Search, Trash2 } from "lucide-react";
// import { format } from "date-fns";
import { api } from "@/lib/api";

const schema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    source: z.string().min(1, "Selecione uma origem"),
});

type FormData = z.infer<typeof schema>;

interface Group {
    id: string;
    name: string;
    source: string;
    createdAt: Date;
}

export default function Groups() {
    const [groups, setGroups] = useState<Group[]>([]);
    // const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            source: undefined,
        },
    });

    const onSubmit = async (data: FormData) => {
        const response = await api.post("/groups", { data });

        console.log(response);
        console.log("Form submitted:", data);
        reset();
    };

    const handleEdit = (id: string) => {
        console.log("Edit group:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Delete group:", id);
    };

    const filteredGroups = groups.filter(
        (group) =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.source.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: ColumnsType<Group> = [
        {
            title: "Nome do Grupo / Canal",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Data de Cadastro",
            dataIndex: "createdAt",
            key: "createdAt",
            // render: (date: Date) => format(date, "dd/MM/yyyy"),
            render: (text) => text,

        },
        {
            title: "Origem",
            dataIndex: "source",
            key: "source",
        },
        {
            title: "Ações",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(record.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Editar"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(record.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Excluir"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        async function fetchGroups() {
            try {
                const response = await api.get('/groups');
                setGroups(response.data ?? []);
            } catch (err) {
                console.error("Erro ao listar os grupos: ", err)
            }
        }

        fetchGroups();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Cadastrar Grupo</h1>

            <div className="bg-white rounded-lg shadow p-6">
                <Form layout="inline" onFinish={handleSubmit(onSubmit)} className="gap-4">
                    <Form.Item
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name?.message}
                        className="mb-0"
                        name="name"
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Digite o nome do grupo"
                                    className="min-w-[200px]"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        validateStatus={errors.source ? "error" : ""}
                        help={errors.source?.message}
                        className="mb-0"
                        name="source"
                    >
                        <Controller
                            name="source"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Selecione a origem"
                                    className="min-w-[150px]"
                                    options={[
                                        { value: "Telegram", label: "Telegram" },
                                        { value: "WhatsApp", label: "WhatsApp" },
                                        { value: "Discord", label: "Discord" },
                                    ]}
                                />
                            )}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="bg-primary">
                        Cadastrar
                    </Button>
                </Form>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                    <Input
                        prefix={<Search className="h-4 w-4 text-gray-400" />}
                        placeholder="Buscar por nome ou origem..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredGroups}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                    }}
                />
            </div>
        </div>
    );
}