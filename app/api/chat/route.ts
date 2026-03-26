import { NextResponse } from 'next/server';

interface ChatRequest {
  messages: { role: 'user' | 'model'; content: string }[];
}

interface N8nResponse {
  output?: string;
  text?: string;
  response?: string;
}

export async function POST(req: Request) {
  try {
    // 1. Recebe e tipa o corpo da requisição
    const body = (await req.json()) as ChatRequest;
    
    // 2. Segurança: Pega a URL do webhook do .env (nunca exposta no client)
    const webhookUrl = process.env.N8N_WEBHOOK_URL_CHAT;

    if (!webhookUrl) {
      console.error('ERRO: N8N_WEBHOOK_URL_CHAT ausente no .env');
      return NextResponse.json(
        { error: 'Erro de configuração interna.' },
        { status: 500 }
      );
    }

    // 3. Chamada segura para o n8n
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Passamos o histórico de mensagens completo
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      throw new Error(`O n8n retornou status: ${n8nResponse.status}`);
    }

    // 4. Tratamento da resposta do n8n
    const data = (await n8nResponse.json()) as N8nResponse;
    const replyText = data.output || data.text || data.response || 'Desculpe, não consegui processar sua solicitação no momento.';

    return NextResponse.json({ reply: replyText });

  } catch (error) {
    console.error('Erro no proxy de chat:', error);
    return NextResponse.json(
      { error: 'Estou com dificuldades técnicas. Por favor, chame no WhatsApp.' },
      { status: 500 }
    );
  }
}