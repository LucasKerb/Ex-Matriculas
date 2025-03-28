"use client";
import React, { useState } from 'react'
import { corePath } from '../utils/corePath';
import { useRouter } from 'next/navigation';
import { useAxios } from '@/hooks/useAxios';
import { Button } from '@/Components/Button';
import Image from 'next/image';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  
  const { data: dataLogin, refetch: refetchLogin } = useAxios({ method: "POST", url: `${corePath}/login`, body: { name: nome, id }, auto: false});
  const { refetch: refetchCadastro} = useAxios({ method: "POST", url: `${corePath}/alunos`, body: { name: nome, id }, auto: false});

  function handleLogin() {
    refetchLogin();
    if (dataLogin) {
      router.push('/alunos');
    }
  }
  
  function handleCadastro() {
    refetchCadastro();
  }

  return(
    <div className="w-full h-screen bg-gradient-to-r from-sky-400 via-blue-500 to-slate-950 text-indigo-50 flex flex-col gap-2 grid place-content-start md:place-content-center ">
      <h2 className="text-indigo-50 text-[30px] grid place-content-start md:place-content-center">{isLogin ? 'Login' : 'Cadastro'}</h2>
      <Image style={{ cursor: 'pointer' }} alt='img' src="/logo.png" width={200} height={200}  onClick={() => window.open('https://ead.unisinos.br/area-do-aluno', '_blank')}/>
      <input className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
        type="number"
        
        placeholder="ID do Aluno"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Button onClick={isLogin ? handleLogin : handleCadastro} >
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </Button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Criar Cadastro' : 'Já tenho cadastro'}
      </Button>
    </div>
  )
}


