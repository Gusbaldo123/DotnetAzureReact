const BASE_URL = 'localhost:3001';

export const fetchCourses = async () => {
  const response = await fetch(`${BASE_URL}/courses`);
  if (!response.ok) {
    throw new Error('Erro ao buscar cursos');
  }
  return response.json();
};

export const fetchProfessors = async () => {
  const response = await fetch(`${BASE_URL}/professors`);
  if (!response.ok) {
    throw new Error('Erro ao buscar professores');
  }
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Erro ao fazer login');
  }
  return response.json();
};
