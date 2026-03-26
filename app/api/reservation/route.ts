import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Recebe os dados do frontend
    const body = await req.json();

    // 2. Pega a URL do n8n do arquivo .env de forma segura
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('A variável N8N_WEBHOOK_URL não está configurada');
      return NextResponse.json(
        { error: 'Erro de configuração interna do servidor.' },
        { status: 500 }
      );
    }

    // 3. Envia os dados para o n8n
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      throw new Error(`O n8n retornou erro: ${n8nResponse.status}`);
    }

    // 4. Retorna sucesso para o frontend
    return NextResponse.json({ 
      success: true, 
      message: 'Reserva enviada com sucesso!' 
    });

  } catch (error) {
    console.error('Erro na rota de reserva:', error);
    return NextResponse.json(
      { error: 'Falha ao processar a solicitação de reserva.' },
      { status: 500 }
    );
  }
}