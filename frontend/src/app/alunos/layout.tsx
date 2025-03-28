import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Alunos",
  description: "Sistema de Matriculas",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
