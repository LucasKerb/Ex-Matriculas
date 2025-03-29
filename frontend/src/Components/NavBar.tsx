// src/components/Header.js
import { useRouter } from 'next/navigation';
import { ButtonNav } from './ButtoNav';


const Header = () => {
    const router = useRouter();
  return (
    <nav className="w-full flex justify-center gap-2">

        <ButtonNav  onClick={() => router.push('/')}>Sistema de Matrículas</ButtonNav>

        <ButtonNav  onClick={() => router.push('/alunos')}>Aluno</ButtonNav>

        <ButtonNav  onClick={() => router.push('/adm')}>Administrador</ButtonNav>


    </nav>
  );
};

export default Header;