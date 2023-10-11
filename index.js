function extrairLivros(input) {
  const livros = [];
  const estantes = input.split('/');

  for (let i = 0; i < estantes.length; i++) {
    const estante = estantes[i].trim();
    if (estante !== '') {
      const livrosEstante = estante.split('|');
      for (let j = 0; j < livrosEstante.length; j++) {
        const livroInfo = livrosEstante[j].trim().split(',');
        if (livroInfo.length === 6) {
          const [titulo, autor, edicao, ano, altura, comprimento] = livroInfo;
          livros.push({
            titulo,
            autor,
            edicao,
            ano,
            altura: parseInt(altura),
            comprimento: parseInt(comprimento),
            estante: 1,
            prateleira: 1,
          });
        }
      }
    }
  }

  return livros;
}

function organizarLivrosEmEstantes(livros) {
  const comprimentoEstante = 90;
  const estantes = [];
  let estanteAtual = [];
  let prateleiraAtual = 1;
  let comprimentoAtual = 0;

  for (let i = 0; i < livros.length; i++) {
    const livro = livros[i];
    if (comprimentoAtual + livro.comprimento <= comprimentoEstante) {
      livro.estante = estantes.length + 1;
      livro.prateleira = prateleiraAtual;
      estanteAtual.push(livro);
      comprimentoAtual += livro.comprimento;
    } else {
      if (prateleiraAtual === 6) {
        estantes.push(estanteAtual);
        estanteAtual = [];
        prateleiraAtual = 1;
        estanteAtual.push(livro);
        comprimentoAtual = livro.comprimento;
      } else {
        prateleiraAtual++;
        livro.estante = estantes.length + 1;
        livro.prateleira = prateleiraAtual;
        estanteAtual.push(livro);
        comprimentoAtual = livro.comprimento;
      }
    }
  }

  if (estanteAtual.length > 0) {
    estantes.push(estanteAtual);
  }

  return estantes;
}

function organizarLivros(estantesOrganizadas) {
  for (let i = 0; i < estantesOrganizadas.length; i++) {
    const estante = estantesOrganizadas[i];
    estante.sort((a, b) => {
      if (a.prateleira === b.prateleira) {
        if (a.altura !== b.altura) {
          return b.altura - a.altura;
        }
        if (a.edicao !== b.edicao) {
          return a.edicao - b.edicao;
        }
        if (a.ano !== b.ano) {
          return a.ano - b.ano;
        }
        return a.titulo.localeCompare(b.titulo);
      }
    });
  }
  estantesOrganizadas.reverse();
}

function mostrarEstantes(estantesOrganizadas) {
  for (let i = 0; i < estantesOrganizadas.length; i++) {
    const estante = estantesOrganizadas[i];
    console.log(`Estante ${i + 1}:`);
    let prateleiraAtual = 0;
    for (let j = 0; j < estante.length; j++) {
      const livro = estante[j];
      if (livro.prateleira !== prateleiraAtual) {
        prateleiraAtual = livro.prateleira;
        console.log(`    Prateleira ${prateleiraAtual}:`);
      }
      console.log(`        Título: ${livro.titulo}`);
      console.log(`        Autor: ${livro.autor}`);
      console.log(`        Edição: ${livro.edicao}`);
      console.log(`        Ano: ${livro.ano}`);
      console.log(`        Altura: ${livro.altura} cm`);
      console.log(`        Comprimento: ${livro.comprimento} cm`);
      console.log();
    }
  }
}

const inputLivros = '/DAlculo 1,João da Silva,3,2022,25,30 | CAlculo 1,Maria Souza,2,2023,30,30 | Balculo 3,Carla Silva,2,2009,40,40\/Boa Noite,Marcos Pereira,1,2021,20,1 | Livro 1,Autor 1,1,2022,20,30 | Livro 2,Autor 2,1,2021,25,30 | Livro 3,Autor 3,1,2023,25,2\/Senhor dos Aneis,Tolkien,1,1950,20,45 | Senhor das Moscas,1,1970,30,40\/O grande gatsby,fitzgerald,1,1948,20,50\/Lego,Hasbro,1,2000,20,50\/Batman,DC,1,2000,20,40\/Homem de ferro,MARVEL,1,2000,24,60\/Jovem Tranquilao,Arthur,2,2012,20,50 | olamundo,Masio,2,2019,20,50\ ';
const livros = extrairLivros(inputLivros);
const estantesOrganizadas = organizarLivrosEmEstantes(livros);

console.log("\nESTANTES ANTES DE ORGANIZAR:\n")
mostrarEstantes(estantesOrganizadas);

organizarLivros(estantesOrganizadas);

console.log("\nESTANTES APÓS ORGANIZAR:\n")
mostrarEstantes(estantesOrganizadas);