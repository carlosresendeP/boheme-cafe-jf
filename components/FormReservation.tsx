import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Field, 
  FieldError, 
  FieldGroup, 
  FieldLabel 
} from "@/components/ui/field";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller } from 'react-hook-form';
import { Spinner } from './ui/spinner';
import { motion } from 'motion/react';

const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: 'Digite um telefone válido com DDD.' }),
  date: z.string().min(1, { message: 'Escolha uma data.' }),
  time: z.string().min(1, { message: 'Escolha um horário.' }),
  guests: z.string().min(1, { message: 'Selecione a quantidade de pessoas.' }),
});

type FormValues = z.infer<typeof formSchema>;


export const FormResevation = ()=>{
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
    },
  });

    async function onSubmit(values: FormValues) {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // O form.formState.isSubmitting já está true aqui (Spinner ativado)
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data: { success?: boolean; error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Erro de comunicação com o servidor.');
      }

      // O n8n respondeu o webhook com sucesso (Spinner desativado nativamente pelo hook form)
      setSuccessMessage('Envio confirmado! Sua reserva foi salva e enviamos uma mensagem para o seu telefone.');
      form.reset();

    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro desconhecido.';
      console.error('Erro:', msg);
      setErrorMessage('Ocorreu um erro ao enviar sua reserva. Por favor, tente novamente.');
    }
  }

  const inputStyles = "border-b-1 shadow-sm border-t-0 border-l-0 border-r-0 rounded-md border-boheme-brown/20 px-2 py-3 focus-visible:ring-1 focus:ring-boheme-brown focus-visible:border-boheme-bronze bg-transparent";

    return(
        <div className="w-full lg:w-1/2">
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 md:p-16 rounded-[3rem] text-boheme-brown shadow-2xl"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <Field>
                <FieldLabel className="text-xs font-bold uppercase tracking-widest opacity-60">Nome Completo</FieldLabel>
                <Input placeholder="Como podemos te chamar?" className={inputStyles} {...form.register('name')} />
                {form.formState.errors.name && <FieldError>{form.formState.errors.name.message}</FieldError>}
              </Field>

              <FieldGroup className="grid grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest opacity-60">Data</FieldLabel>
                  <Input type="date" className={inputStyles} {...form.register('date')} />
                  {form.formState.errors.date && <FieldError>{form.formState.errors.date.message}</FieldError>}
                </Field>
                
                <Field>
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest opacity-60">Horário</FieldLabel>
                  <Input type="time" className={inputStyles} {...form.register('time')} />
                  {form.formState.errors.time && <FieldError>{form.formState.errors.time.message}</FieldError>}
                </Field>
              </FieldGroup>

              {/* Telefone usando Controller para aplicar a máscara em tempo real */}
              <Controller
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest opacity-60">Telefone</FieldLabel>
                    <Input 
                      placeholder="(32) 99999-9999" 
                      className={inputStyles}
                      {...field}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
                        let formatted = digits;
                        if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
                        if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
                        field.onChange(formatted);
                      }}
                    />
                    {form.formState.errors.phone && <FieldError>{form.formState.errors.phone.message}</FieldError>}
                  </Field>
                )}
              />

              {/* Select usando Controller pois o Shadcn Select não usa o onChange nativo do HTML */}
              <Controller
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest opacity-60">Pessoas</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="border-b-2 border-t-0 border-l-0 border-r-0 border-boheme-brown/10 rounded-none px-0 focus:ring-0 focus:border-boheme-bronze bg-transparent shadow-none">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Pessoa</SelectItem>
                        <SelectItem value="2">2 Pessoas</SelectItem>
                        <SelectItem value="3">3 Pessoas</SelectItem>
                        <SelectItem value="4">4 Pessoas</SelectItem>
                        <SelectItem value="5+">5 ou mais</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.guests && <FieldError>{form.formState.errors.guests.message}</FieldError>}
                  </Field>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-boheme-brown text-white py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-boheme-bronze transition-all duration-300 flex items-center justify-center gap-3 mt-8 shadow-lg disabled:opacity-70"
              >
              {form.formState.isSubmitting ? <Spinner /> : 'Reservar'}
              </Button>

              {/* Feedbacks */}
              {successMessage && (
                <div className="p-4 rounded-xl text-sm font-medium text-center bg-green-50 text-green-800 border border-green-200">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="p-4 rounded-xl text-sm font-medium text-center bg-red-50 text-red-800 border border-red-200">
                  {errorMessage}
                </div>
              )}
            </form>
          </motion.div>
        </div>
    )
}