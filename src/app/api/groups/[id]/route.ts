import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string; }; }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({ message: 'ID do grupo é obrigatório.' }, { status: 400 });
        }

        const existingGroup = await prisma.group.findUnique({
            where: { id: Number(id) },
        });

        if (!existingGroup) {
            return NextResponse.json({ message: 'Grupo não encontrado.' }, { status: 404 });
        }

        await prisma.group.delete({ where: { id: Number(id) } });

        return NextResponse.json({ message: 'Grupo excluído com sucesso.' }, { status: 200 });
    } catch (error) {
        console.error('Error on delete group: ', error);
        return NextResponse.json({ message: 'Erro ao excluir o grupo.' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string; }; }) {
    try {
        const { id } = params;
        const { name, source } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'ID do grupo / canal é obrigatório.' }, { status: 400 });
        }

        if (!name && !source) {
            return NextResponse.json({ message: 'Nenhum dado para atualizar.' }, { status: 400 });
        }

        const updatedGroup = await prisma.group.update({
            where: { id: Number(id) },
            data: { name, source }
        });

        return NextResponse.json(updatedGroup, { status: 200 });
    } catch (error) {
        console.error('Error on update group: ', error);
        return NextResponse.json({ message: 'Erro ao atualizar o grupo.' }, { status: 500 });
    }
}