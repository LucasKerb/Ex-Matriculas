import React, { useState } from 'react'
import axios from 'axios';
import { corePath } from '../utils/corePath';
import { useNavigate} from 'react-router-dom';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await axios.post(`${corePath}/login`, { name: nome, id });
  
      if (result.data.response) {
        navigate('/alunos');
      } else {
        setErrorMessage("Login inválido.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.response === false ? "Credenciais inválidas" : "Erro ao logar");
    }
  };
  

  const handleCadastro = async () => {
    try {
      const result = await axios.post(`${corePath}/alunos`, { name: nome, id });
      console.log(result.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Erro ao cadastrar aluno");
    }
  };

  return(
    <div>
      <h2>{isLogin ? 'Login do Aluno' : 'Cadastro do Aluno'}</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="ID do Aluno"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={isLogin ? handleLogin : handleCadastro}>
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Criar Cadastro' : 'Já tenho cadastro'}
      </button>
    </div>
  )
}


