import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrador",
  description: "Sistema de Matriculas",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
