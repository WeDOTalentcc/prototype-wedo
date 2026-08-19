/* =============================================================
   Mock — dados fake determinísticos em pt-BR
   Seed fixa: a mesma tela renderiza SEMPRE os mesmos dados
   (screenshots e revisões ficam estáveis). Nunca usar lorem ipsum.
   ============================================================= */
(function () {
  "use strict";

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const NOMES = ["Ana Beatriz Souza", "Carlos Eduardo Lima", "Mariana Ferreira", "João Pedro Alves", "Fernanda Costa", "Rafael Oliveira", "Juliana Martins", "Bruno Cardoso", "Camila Rocha", "Diego Santana", "Larissa Mendes", "Thiago Barbosa", "Patrícia Nunes", "Gustavo Ribeiro", "Aline Teixeira", "Marcelo Freitas", "Renata Duarte", "Felipe Moraes", "Vanessa Castro", "Rodrigo Pires", "Isabela Ramos", "André Gonçalves", "Tatiane Lopes", "Leonardo Cunha", "Priscila Araújo", "Vinícius Farias", "Débora Campos", "Eduardo Siqueira", "Natália Borges", "Henrique Tavares"];
  const CARGOS = ["Desenvolvedor(a) Full Stack Sênior", "Analista de Dados Pleno", "Product Manager", "Designer de Produto", "Engenheiro(a) de Dados", "Analista de RH", "Tech Lead", "QA Engineer", "Desenvolvedor(a) Backend Ruby", "Cientista de Dados", "Analista Financeiro Sênior", "Coordenador(a) de Marketing", "Executivo(a) de Vendas B2B", "DevOps Engineer", "Analista de Suporte"];
  const EMPRESAS = ["TechNova", "Grupo Vetor", "Lumen Digital", "Atlas Sistemas", "Prisma Labs", "NexBank", "Solaris Energia", "Verde Campo", "Onda Pay", "Cubo Log"];
  const CIDADES = ["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", "Porto Alegre, RS", "Recife, PE", "Campinas, SP", "Florianópolis, SC", "Remoto"];
  const DEPTOS = ["Tecnologia", "Produto", "Comercial", "Financeiro", "Pessoas & Cultura", "Operações", "Marketing"];
  const SKILLS = ["React", "Node.js", "Python", "SQL", "AWS", "Figma", "Scrum", "Ruby on Rails", "TypeScript", "Power BI", "Kubernetes", "Inglês avançado"];
  const ETAPAS = ["Triagem", "Entrevista LIA", "Entrevista Gestor", "Proposta", "Contratado"];
  const STATUS_VAGA = ["Ativa", "Rascunho", "Pausada", "Em aprovação", "Encerrada"];

  function make(seed) {
    const rnd = mulberry32(seed);
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
    const int = (min, max) => min + Math.floor(rnd() * (max - min + 1));

    function diasAtras(max) {
      const d = new Date(2026, 7, 19);
      d.setDate(d.getDate() - int(0, max));
      return d;
    }
    function fmtData(d) {
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    }
    function iniciais(nome) {
      const p = nome.split(" ");
      return (p[0][0] + p[p.length - 1][0]).toUpperCase();
    }

    function candidato() {
      const nome = pick(NOMES);
      return {
        nome, iniciais: iniciais(nome),
        email: nome.toLowerCase().replace(/[^a-z ]/g, "").split(" ").slice(0, 2).join(".") + "@email.com",
        cargo: pick(CARGOS), empresa: pick(EMPRESAS), cidade: pick(CIDADES),
        etapa: pick(ETAPAS), score: int(52, 98),
        skills: [pick(SKILLS), pick(SKILLS), pick(SKILLS)],
        atualizadoEm: fmtData(diasAtras(30)),
        sugeridoIa: rnd() < 0.25,
      };
    }

    function vaga() {
      const abertas = int(1, 8);
      return {
        titulo: pick(CARGOS), depto: pick(DEPTOS), cidade: pick(CIDADES),
        status: pick(STATUS_VAGA), vagasAbertas: abertas,
        candidatos: int(0, 120), novosCandidatos: int(0, 12),
        recrutador: pick(NOMES), criadaEm: fmtData(diasAtras(90)),
        prazo: fmtData(new Date(2026, 7 + int(1, 3), int(1, 28))),
      };
    }

    return {
      rnd, pick, int, fmtData, diasAtras, iniciais,
      candidato, vaga,
      lista(n, gen) { return Array.from({ length: n }, () => gen()); },
    };
  }

  /* API: const m = Mock.seed(42); m.lista(30, m.vaga) */
  window.Mock = { seed: make, NOMES, CARGOS, EMPRESAS, CIDADES, DEPTOS, SKILLS, ETAPAS, STATUS_VAGA };
})();
