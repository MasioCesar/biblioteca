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

function alocarLivroNaPrateleira(livros) {
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

function reorganizarLivrosEmEstantes(livros) {
  const estantes = [];
  const comprimentoEstante = 90;

  while (livros.length > 0) {
    const estanteAtual = [];
    const comprimentoPrateleiras = [0, 0, 0, 0, 0, 0];

    for (let prateleiraAtual = 1; prateleiraAtual <= 6; prateleiraAtual++) {
      const livrosAlocados = [];

      for (let i = 0; i < livros.length; i++) {
        const livro = livros[i];

        if (comprimentoPrateleiras[prateleiraAtual - 1] + livro.comprimento <= comprimentoEstante) {
          livro.estante = estantes.length + 1;
          livro.prateleira = prateleiraAtual;
          estanteAtual.push(livro);
          comprimentoPrateleiras[prateleiraAtual - 1] += livro.comprimento;
          livrosAlocados.push(i);
        }
      }

      for (let j = livrosAlocados.length - 1; j >= 0; j--) {
        livros.splice(livrosAlocados[j], 1);
      }
    }

    if (estanteAtual.length > 0) {
      estantes.push(estanteAtual);
    }
  }

  return estantes;
}

function organizarAlfabeticamente(estantesOrganizadas) {
  for (let i = 0; i < estantesOrganizadas.length; i++) {
    const estante = estantesOrganizadas[i];

    estante.sort((a, b) => {
      if (a.prateleira === b.prateleira) {
        if (a.titulo !== b.titulo) {
          return a.titulo.localeCompare(b.titulo);
        }
        if (a.altura !== b.altura) {
          return a.altura - b.altura;
        }
        if (a.edicao !== b.edicao) {
          return a.edicao - b.edicao;
        }
      }
    });
  }
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

const inputLivros = '/O Hobbit,J.R.R. Tolkien,1,1937,19,27 | 1984,George Orwell,1,1949,20,28 | Dom Quixote,Miguel de Cervantes,1,1605,23,30\/Dom Quixote,Miguel de Cervantes,2,1615,23,30 | O Senhor dos Anéis,J.R.R. Tolkien,1,1954,22,45 | A Revolução dos Bichos,George Orwell,1,1945,19,25\/Crime e Castigo,Fyodor Dostoevsky,1,1866,21,30 | Ulisses,James Joyce,1,1922,24,34 | Os Miseráveis,Victor Hugo,1,1862,20,36 | Moby Dick,Herman Melville,1,1851,23,35\/Senhor dos Aneis,Tolkien,1,1950,20,45 | Senhor das Moscas,1,1970,30,40\/O grande gatsby,fitzgerald,1,1948,20,50\/Lego,Hasbro,1,2000,20,5\/Batman,DC,1,2000,20,28\/Homem de ferro,MARVEL,1,2000,24,5\/Jovem Tranquilao,Arthur,2,2012,20,20 | Ola Mundo,Masio,2,2019,20,20\ ';

const livros = extrairLivros(inputLivros);
let estantesOrganizadas = alocarLivroNaPrateleira(livros);

console.log("\nESTANTES ANTES DE ORGANIZAR:\n")
mostrarEstantes(estantesOrganizadas);

estantesOrganizadas = reorganizarLivrosEmEstantes(livros);

organizarAlfabeticamente(estantesOrganizadas);

console.log("\nESTANTES APÓS ORGANIZAR:\n")
mostrarEstantes(estantesOrganizadas);
