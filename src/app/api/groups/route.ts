import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const groups = await prisma.group.findMany();
        return NextResponse.json(groups, { status: 200 });
    } catch (error) {
        console.error('Error on get groups: ', error);

        return NextResponse.json(
            { message: 'Erro ao listar os grupos.' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { data } = await request.json();

        const group = await prisma.group.create({
            data: {
                name: data.name,
                source: data.source
            }
        });

        return NextResponse.json(group, { status: 201 });
    } catch (error) {
        console.error("Error on post group: ", error);

        return NextResponse.json(
            { message: 'Erro ao cadastrar grupo / canal.' },
            { status: 500 }
        );
    }
}