"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/Components/Button';
import Image from 'next/image';
import { usePostLogin } from '@/hooks/usePostLogin';
import { useRegisterAluno } from '@/hooks/useRegisterAluno';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const { mutate } = usePostLogin();
  const { mutate: mutateRegister } = useRegisterAluno();

  useEffect(() => {
    const item = localStorage.getItem('isLoged');
    if(item === 'true') {
      router.push('/alunos')
    }
  }, [])

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
          localStorage.setItem('isLoged', 'true')
          localStorage.setItem('idAluno', id.toString())
          router.push('/alunos')
				},
			}
    )
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
          localStorage.setItem('isLoged', 'true')
          router.push('/alunos')
				},
			}
    )
  }

  return(
    <div className="w-full h-screen bg-gradient-to-r from-sky-400 via-blue-500 to-slate-950 text-indigo-50 flex flex-col gap-2 grid place-content-start md:place-content-center overflow-auto ">
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


