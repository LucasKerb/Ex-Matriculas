// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware para processar JSON
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} ${req.body}`);
  next();
});

// Banco de dados fictício (uma lista em memória)
let turmas = [
  { id: 1, disciplina: "Matemática", professor: "Prof. João", horario: "Segunda-feira, 08:00", alunos: [] },
  { id: 2, disciplina: "Física", professor: "Prof. Maria", horario: "Terça-feira, 10:00", alunos: [] }
];

let alunos = []; // Banco de dados dos alunos

// alunos = [{id: 1, nome: 'Lucas Kerber' }]

// Rota para salvar um aluno (criar aluno)
// Rota para salvar um aluno (criar aluno)
app.post('/api/aluno', (req, res) => {
  console.log("Requisição recebida para cadastrar aluno:", req.body); // Log para verificar a requisição

  const { nome, id } = req.body;

  // Verifica se o nome ou o ID não foram fornecidos
  if (!nome || !id) {
    return res.status(400).json({ error: "Nome e ID são obrigatórios para o cadastro!" });
  }

  // Verifica se o aluno já existe
  const alunoExistente = alunos.find(aluno => aluno.id === id);
  
  if (alunoExistente) {
    // Se o aluno já existe, retorna um erro
    return res.status(400).json({ error: "Este ID de aluno já está registrado!" });
  }

  // Se o aluno não existir, cria um novo
  const novoAluno = { nome, id, matriculas: [] };
  alunos.push(novoAluno);

  // Log para verificar os alunos armazenados
  console.log("Alunos armazenados após cadastro:", alunos);

  res.status(201).json(novoAluno);
});

app.post('/api/login', (req, res) => {
  const { name, id } = req.body;
  const idLogin = parseInt(id);

  if (!name || !idLogin) {
    return res.status(400).json({ response: false });
  }

  const aluno = alunos.find(a => parseInt(a.id) === idLogin && a.nome.toLowerCase() === name.toLowerCase());
  
  console.log('aqui passou')
  if (!aluno) {
    return res.status(200).json({ response: false });
  }

  res.status(200).json({response: true});
});


// Rota para obter todos os alunos (para login)
// Rota para obter todos os alunos (para login)
// Rota para obter todos os alunos (para login)
// Rota para obter todos os alunos (para login)
// Rota para obter todos os alunos (para login)
app.get('/api/alunos', (req, res) => {
  // Forçar a conversão do ID para número
  const alunosComIdConvertido = alunos.map(aluno => ({
    ...aluno,
    id: parseInt(aluno.id)  // Garantindo que o ID seja tratado como número
  }));

  console.log("Lista de alunos no momento do login:", alunosComIdConvertido);
  res.json(alunosComIdConvertido); // Retorna todos os alunos
});


app.post('/api/alunos', (req, res) => {
  const { name, id } = req.body;
  const aluno = alunos.find((aluno) => aluno.id === parseInt(id))
   
  if (aluno) {
    return res.status(400).json({ error: "Aluno já cadastrado!" });
  }

  alunos.push({id, nome: name});

  res.json(`Aluno ${name} cadastrado com sucesso!`);
});


// Rota para criar uma nova turma
// Rota para criar uma nova turma
app.post('/api/matriculas', (req, res) => {
  const { disciplina, professor, horario } = req.body;
  const novaTurma = { disciplina, professor, horario, id: turmas.length + 1 };
  turmas.push(novaTurma);

  // Log para verificar as turmas armazenadas
  console.log("Turmas armazenadas após criação:", turmas);

  res.status(201).json(novaTurma);
});

// Rota para listar todos os alunos com suas matrículas
app.get('/api/alunos', (req, res) => {
  res.json(alunos); // Retorna todos os alunos e suas matrículas
});

// Rota para obter todas as turmas
app.get('/api/matriculas', (req, res) => {
  res.json(turmas);
});

// Rota para o aluno se matricular
app.post('/api/matriculas/aluno', (req, res) => {
  const { alunoId, turmaId } = req.body;

  const aluno = alunos.find(a => a.id === alunoId);
  const turma = turmas.find(t => t.id === turmaId);

  if (!aluno || !turma) {
    return res.status(404).json({ error: "Aluno ou turma não encontrados" });
  }

  // Verifica se o aluno já está matriculado na turma
  if (aluno.matriculas.some(matricula => matricula.id === turmaId)) {
    return res.status(400).json({ error: "Aluno já matriculado nesta turma" });
  }

  // Adiciona a matrícula
  aluno.matriculas.push({
    id: turma.id,
    disciplina: turma.disciplina,
    professor: turma.professor,
    diaSemana: turma.diaSemana,
    turno: turma.turno
  });

  res.status(201).json({ message: "Matrícula realizada com sucesso!" });
});

// Rota para adicionar matrícula

app.post('/api/matriculas/adicionar', (req, res) => {
  console.log("passou aqui");
  const { alunoId, turmaId } = req.body;

  // Encontra o aluno e a turma
  const aluno = alunos.find(a => a.id === alunoId);
  const turma = turmas.find(t => t.id === turmaId);


  // if (!aluno || !turma) {
  //   return res.status(404).json({ error: "Aluno ou turma não encontrados" });
  // }

  // Verifica se o aluno já está matriculado na turma
  if (aluno.matriculas.some(matricula => matricula.id === turmaId)) {
    return res.status(400).json({ error: "Aluno já matriculado nesta turma!" });
  }

  // Adiciona a turma às matrículas do aluno
  aluno.matriculas.push(turma);
  res.status(201).json({ message: "Matrícula realizada com sucesso!" });
});
// Rota para criar uma nova turma
// Rota para criar uma nova turma
app.post('/api/matriculas', (req, res) => {
  const { disciplina, professor, diaSemana, turno } = req.body;

  // Verifica se todos os campos foram fornecidos
  if (!disciplina || !professor || !diaSemana || !turno) {
    return res.status(400).json({ error: "Disciplina, professor, dia da semana e turno são obrigatórios!" });
  }

  // Criar uma nova turma
  const novaTurma = {
    disciplina,
    professor,
    diaSemana,
    turno,
    id: turmas.length + 1, // Incrementa o id automaticamente
  };

  turmas.push(novaTurma);

  // Log para verificar as turmas armazenadas
  console.log("Turmas armazenadas após criação:", turmas);

  res.status(201).json(novaTurma);
});

// Rota para excluir um aluno
app.delete('/api/alunos/:id', (req, res) => {
  const alunoId = parseInt(req.params.id);  // Acessa o ID do aluno a ser deletado

  // Verificar se o aluno existe na lista
  const alunoIndex = alunos.findIndex(aluno => aluno.id === alunoId);

  if (alunoIndex === -1) {
    // Se o aluno não for encontrado, retorna 404
    return res.status(404).json({ error: "Aluno não encontrado!" });
  }

  // Remove o aluno da lista de alunos
  alunos.splice(alunoIndex, 1);

  // Remover o aluno das turmas em que ele está matriculado
  turmas.forEach(turma => {
    turma.matriculados = turma.matriculados.filter(id => id !== alunoId);
  });

  // Responde com sucesso
  res.status(200).json({ message: "Aluno excluído com sucesso!" });
});








// Rota para remover matrícula
// Rota para remover matrícula
// Rota para remover matrícula
// Rota para excluir uma turma
// Rota para excluir uma turma
app.delete('/api/matriculas/:id', (req, res) => {
  const turmaId = parseInt(req.params.id);  // Garantir que o ID seja um número inteiro
  const turmaIndex = turmas.findIndex(turma => turma.id === turmaId);

  if (turmaIndex !== -1) {
    // Remove a turma com o ID fornecido
    turmas.splice(turmaIndex, 1); 
    res.status(200).json({ message: "Turma excluída com sucesso!" });
  } else {
    res.status(404).json({ error: "Turma não encontrada!" });
  }
});



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
