
"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, Input, Modal, notification, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Edit2, Search, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { api } from "@/lib/api";

const schema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    source: z.string().min(1, "Selecione uma origem"),
});

type FormData = z.infer<typeof schema>;

interface Group {
    id: number;
    name: string;
    source: string;
    createdAt: Date;
}

export default function Groups() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
    const [notificationApi, contextHolder] = notification.useNotification();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
    const [editingGroup, setEditingGroup] = useState<Group | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            source: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsFormLoading(true);

        try {
            if (!editingGroup) {
                const response = await api.post("/groups", { data });

                if (response.status === 201) {
                    setGroups([...groups, response.data]);

                    reset();

                    notificationApi.open({
                        message: 'Sucesso!',
                        description: `O grupo / canal foi cadastrado com sucesso.`,
                        duration: 3,
                        placement: 'bottom',
                        type: 'success',
                    });
                } else {
                    notificationApi.open({
                        message: 'Atenção!',
                        description: `Ocorreu um erro ao tentar cadastrar o grupo / canal. ${response.data.message}`,
                        duration: 3,
                        placement: 'bottom',
                        type: 'error',
                    });
                }
            } else {

                const response = await api.put(`/groups/${editingGroup.id}`, data);


                if (response.status === 200) {
                    const newGroups = groups.filter(group => group.id !== editingGroup.id);

                    setGroups([...newGroups, response.data]);

                    reset();

                    notificationApi.open({
                        message: 'Sucesso!',
                        description: `O grupo / canal foi atualizado com sucesso.`,
                        duration: 3,
                        placement: 'bottom',
                        type: 'success',
                    });
                } else {
                    notificationApi.open({
                        message: 'Atenção!',
                        description: `Ocorreu um erro ao tentar atualizar o grupo / canal. ${response.data.message}`,
                        duration: 3,
                        placement: 'bottom',
                        type: 'error',
                    });
                }

                setEditingGroup(null);
            }

        } catch (error) {
            console.error(`Erro ao ${editingGroup ? "editar" : "cadastrar"} um grupo: `, error);
        } finally {
            setIsFormLoading(false);
        }
    };

    const handleEdit = (group: Group) => {
        setEditingGroup(group);
        setValue("name", group.name);
        setValue("source", group.source);
    };

    const showDeleteConfirm = (group: Group) => {
        setGroupToDelete(group);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        if (groupToDelete) {
            handleDelete();
            setDeleteModalVisible(false);
            setGroupToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
        setGroupToDelete(null);
    };

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/groups/${groupToDelete?.id}`);

            if (response.status === 200) {
                const newGroups = groups.filter(group => group.id !== groupToDelete?.id);
                setGroups(newGroups);
                setGroupToDelete(null);
                reset();

                notificationApi.open({
                    message: 'Sucesso!',
                    description: `O grupo / canal foi removido com sucesso.`,
                    duration: 3,
                    placement: 'bottom',
                    type: 'success',
                });
            } else {
                notificationApi.open({
                    message: 'Atenção!',
                    description: `Ocorreu um erro ao tentar remover o grupo / canal. ${response.data.message}`,
                    duration: 3,
                    placement: 'bottom',
                    type: 'error',
                });
            }
        } catch (error) {
            console.error("Erro na exclusão do grupo / canal.", error);
        }
    };

    const handleCancel = () => {
        reset();
        setValue("name", "");
        setValue("source", "");
        setEditingGroup(null)
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
            render: (date: Date) => format(new Date(date), "dd/MM/yyyy")
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
                        onClick={() => handleEdit(record)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Editar"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => showDeleteConfirm(record)}
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
        setIsTableLoading(true);

        async function fetchGroups() {
            try {
                const response = await api.get('/groups');
                setGroups(response.data ?? []);
            } catch (err) {
                console.error("Erro ao listar os grupos: ", err);
            } finally {
                setIsTableLoading(false);
            }
        }

        fetchGroups();
    }, []);

    return (
        <div className="space-y-6">
            {contextHolder}
            <h1 className="text-2xl font-semibold text-gray-900">Cadastrar Grupo</h1>

            <div className="bg-white rounded-lg shadow p-6">
                <Form layout="inline" onFinish={handleSubmit(onSubmit)} className="gap-4">
                    <Form.Item
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name?.message}
                        className="mb-0"
                        name="name"
                        label="Nome / ID"
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Digite o nome ou ID do grupo"
                                    className="min-w-[300px]"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        validateStatus={errors.source ? "error" : ""}
                        help={errors.source?.message}
                        className="mb-0"
                        name="source"
                        label="Origem"
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

                    <Button type="primary" htmlType={!isFormLoading ? "submit" : "button"} className="bg-primary">
                        {editingGroup ? "Salvar Alterações" : "Cadastrar"}
                    </Button>
                    <Button type="default" htmlType="reset" className="bg-gray-200" onClick={handleCancel}>
                        Cancelar
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
                    loading={isTableLoading}
                    rowKey={(record) => record.id || Math.random().toString()}
                    pagination={{
                        pageSize: 10,
                    }}
                />
            </div>
            <Modal
                title="Confirmar exclusão"
                open={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Excluir"
                cancelText="Cancelar"
                okButtonProps={{ danger: true }}
            >
                <p>
                    Tem certeza que deseja excluir o grupo {groupToDelete?.name}? Esta ação não poderá ser desfeita.
                </p>
            </Modal>
        </div>
    );
}