"use client";
import { Button } from "@/Components/Button";
import Header from "@/Components/NavBar";
import { usePostLogin } from "@/hooks/usePostLogin";
import { useRegisterAluno } from "@/hooks/useRegisterAluno";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const { mutate } = usePostLogin();
  const { mutate: mutateRegister } = useRegisterAluno();

  function handleLogin() {
    mutate(
      {
        id: Number(id),
        nome,
      },
      {
        onError(err) {
          setErrorMessage(err.message);
        },
        onSuccess() {
          localStorage.setItem("idAluno", id);
          router.push("/alunos");
        },
      }
    );
  }

  function handleCadastro() {
    mutateRegister(
      {
        id: Number(id),
        nome,
      },
      {
        onError(err) {
          setErrorMessage(err.message);
        },
        onSuccess() {
          localStorage.setItem("idAluno", id);
          router.push("/alunos");
        },
      }
    );
  }

  return (
    <div className="w-full h-screen size-500 rounded-none bg-radial-[at_50%_75%] from-sky-400 via-blue-500 to-slate-950 to-90%size-500 rounded-none bg-radial-[at_25%_25%] from sky-400 via-blue-500 to-slate-950 to-75% text-indigo-500 flex flex-col items-center overflow-auto gap-5">
      <Header />

      <Image
        style={{ cursor: "pointer" }}
        alt="img"
        src="/logo.png"
        width={200}
        height={200}
        onClick={() =>
          window.open("https://ead.unisinos.br/area-do-aluno", "_blank")
        }
      />
      <h2 className="text-indigo-50 text-[30px] ">
        {isLogin ? "Login" : "Cadastro"}
      </h2>
      <input
        className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
        type="number"
        placeholder="ID do Aluno"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Button onClick={isLogin ? handleLogin : handleCadastro}>
        {isLogin ? "Entrar" : "Cadastrar"}
      </Button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Criar Cadastro" : "Já tenho cadastro"}
      </Button>
    </div>
  );
}
