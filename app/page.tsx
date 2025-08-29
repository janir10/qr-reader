"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Import dinâmico do scanner (evita SSR)
const QrReader = dynamic(() => import("react-qr-reader-es6"), { ssr: false });

export default function Home() {
  const [result, setResult] = useState<string>("Nenhum código lido ainda");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);

      // Fecha o modal após leitura
      setOpen(false);

      // Se for link válido, redireciona
      if (/^https?:\/\//i.test(data)) {
        window.location.href = data; // redireciona para fora
        // router.push(data); // rotas internas
      }
    }
  };

  const handleError = (err: unknown) => {
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4">
      <h1 className="text-2xl font-bold">Scanner QR Code</h1>

      {/* Botão para abrir scanner */}
      <Button onClick={() => setOpen(true)}>Abrir Scanner</Button>

      {/* Resultado */}
      <p className="text-lg break-all text-center">
        <span className="font-semibold">Resultado:</span> {result}
      </p>

      {/* AlertDialog com a câmera */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Escaneie o QR Code</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="w-full h-80 border-2 border-gray-400 rounded-lg overflow-hidden">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
