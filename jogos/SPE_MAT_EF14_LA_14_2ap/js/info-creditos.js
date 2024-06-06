var equipe = {
    Diretor_geral: ["Daniel Gonçalves Manaia Moreira"],
    Diretor_de_conteudo: ["Igor Junqueira de Castro"],
    NCE: {
        Gerencia: ["Marcele Quaglio"],
        Edicao_de_conteudo: {
            SPE: {
                Educacao_infantil: ["Giovanna Farinhas", "Hannah Lucas"],
                Anos_iniciais: ["Aline Cavichia", "Andrea Guimarães", "Caroline Ercole", "Flávia Righi", "Marcelle Iubel", "Siloé Almeida"],
                Anos_finais: ["Alana Misael", "Alana Ribeiro", "Gabriel Miranda", "Giselle Siemsen", "Jéssica Miara", "Joice Tozato"],
                Ensino_medio: ["Aline Cavichia", "Ana Amorim", "Anne da Rocha", "Bárbara Lourenço", "Carlos Zlatic", "Franciane Foques", "Giorgia Hellou", "Helen França", "Kathia Gavinho", "Luiz Tobias", "Matheus Diniz", "Renan Oliveira", "Thaís dos Santos"]
            },
            CQT: {
                Educacao_infantil: ["Giovanna Farinhas", "Hannah Lucas"],
                Anos_iniciais: ["Aline Cavichia", "Andrea Guimarães", "Caroline Ercole", "Flávia Righi", "Marcelle Iubel", "Siloé Almeida"],
                Anos_finais: ["Alana Ribeiro", "Alana Santos", "Gabriel Miranda", "Jéssica Miara", "Giselle Siemsen", "Joice Tozato"],
                Ensino_medio: ["Aline Cavichia", "Ana Amorim", "Anne da Rocha", "Bárbara Lourenço", "Carlos Zlatic", "Franciane Foques", "Giorgia Hellou", "Helen França", "Kathia Gavinho", "Luiz Tobias", "Matheus Diniz", "Renan Oliveira", "Thaís dos Santos"]
            },
            SAE: {
                Educacao_infantil: ["Giovanna Farinhas", "Hannah Lucas"],
                Anos_iniciais: ["Aline Cavichia", "Andrea Guimarães", "Caroline Ercole", "Flávia Righi", "Marcelle Iubel", "Siloé Almeida"],
                Anos_finais: [""],
                Ensino_medio: ["Clarianna Matos", "Eduardo Leal", "Eduardo Schumacher", "Fernanda Crevelin", "Igor Goulart", "Jéssica de Lima", "Leonardo Fajardo", "Maria Linhares", "Mariana Chaves", "Matteus Crummenauer", " Mayara Fadel", "Rodrigo Stocco", "Sara Monteiro", "Thais Semprebom"]
            }
        }
    },
    NEL: {
        Coordenação: [""],
        Edicao_de_texto: ["André Corrêa(Esp.)", "Ana Cordeiro, Fernando Vaz", "Jacqueline Mota", "Jessica Bombilio", "Juliana Martins", "Lucas Carvalho", "Ludmilla Borinelli", "Marcela Batista", "Priscila Sousa", "Sara Guerreiro", "Thainara Gabardo"],
        Revisao_de_texto: ["Amábille Mattozo", "Anna Souza", "Bianca Gasparin", "Bruna Remes", "Fernanda Rodrigues", " Henrique Fendrich", "Jonatan Camargo", "Sabrina Godoy", "Taynah Pereira", "Thiago Silva"],
    },
    NTC: {
        Coordenacao_de_iconografia: ["Susan Mileski"],
        Pesquisa_iconografica: ["Camila Filipaki", "Ângela Barbara"]
    }

};

var dieitos = {
    SPE: ["©Todos os direitos desta edição estão reservados à Companhia Brasileira de Educação e Sistemas de Ensino S.A"],
    CQT: ["©Todos os direitos desta edição estão reservados à Companhia Brasileira de Educação e Sistemas de Ensino S.A"],
    SAE: ["©Todos os direitos desta edição estão reservados à SAE DIGITAL S.A."],
}

var editores = ""

$(document).ready(function () {

    //Diretor Geral  
    $('.diretorGeral')
        .html(
            '<div class="cargos">\
                <h2 class="cargo">Diretor Geral:</h2>\
                <p class="nome">' + equipe.Diretor_geral + '</p>\
            </div>\
            ')

    //Diretor de Conteúdo  
    $('.diretorConteudo')
        .html(
            '<div class="cargos">\
                <h2 class="cargo">Diretor de Contéudo:</h2>\
                <p class="nome">' + equipe.Diretor_de_conteudo + '</p>\
            </div>\
            ')

    //NCE
    var colecao = $(".colecao");
    var segmento = $(".segmento");

    if (colecao.length > 0 && segmento.length > 0) {
        var idColecao = colecao.attr("id");
        var idSegmento = segmento.attr("id");

        if (idColecao === "SPE" && idSegmento === "EducacaoInfantil") {
            editores = equipe.NCE.Edicao_de_conteudo.SPE.Educacao_infantil.join(', ')
            console.log(editores);
        } else if (idColecao === "SPE" && idSegmento === "AnosIniciais") {
            editores = equipe.NCE.Edicao_de_conteudo.SPE.Anos_iniciais.join(', ')
            console.log(editores);
        } else if (idColecao === "SPE" && idSegmento === "AnosFinais") {
            editores = equipe.NCE.Edicao_de_conteudo.SPE.Anos_finais.join(', ')
            console.log(editores);
        } else if (idColecao === "SPE" && idSegmento === "EnsinoMedio") {
            editores = equipe.NCE.Edicao_de_conteudo.SPE.Ensino_medio.join(', ')
            console.log(editores);
        } else if (idColecao === "CQT" && idSegmento === "EducacaoInfantil") {
            editores = equipe.NCE.Edicao_de_conteudo.CQT.Educacao_infantil.join(', ')
            console.log(editores);
        } else if (idColecao === "CQT" && idSegmento === "AnosIniciais") {
            editores = equipe.NCE.Edicao_de_conteudo.CQT.Anos_iniciais.join(', ')
            console.log(editores);
        } else if (idColecao === "CQT" && idSegmento === "AnosFinais") {
            editores = equipe.NCE.Edicao_de_conteudo.CQT.Anos_finais.join(', ')
            console.log(editores);
        } else if (idColecao === "CQT" && idSegmento === "EnsinoMedio") {
            editores = equipe.NCE.Edicao_de_conteudo.CQT.Ensino_medio.join(', ')
            console.log(editores);
        } else if (idColecao === "SAE" && idSegmento === "EducacaoInfantil") {
            editores = equipe.NCE.Edicao_de_conteudo.SAE.Educacao_infantil.join(', ')
            console.log(editores);
        } else if (idColecao === "SAE" && idSegmento === "AnosIniciais") {
            editores = equipe.NCE.Edicao_de_conteudo.SAE.Anos_iniciais.join(', ')
            console.log(editores);
        } else if (idColecao === "SAE" && idSegmento === "AnosFinais") {
            editores = equipe.NCE.Edicao_de_conteudo.SAE.Anos_finais.join(', ')
            console.log(editores);
        } else if (idColecao === "SAE" && idSegmento === "EnsinoMedio") {
            editores = equipe.NCE.Edicao_de_conteudo.SAE.Ensino_medio.join(', ')
            console.log(editores);
        } else {
            console.log("Condição não correspondente.");
        }
    } else {
        console.log("Verifique se foi inserido na class coleção a id com o nome da coleção (SPE, SAE ou CQT) ou na classe segmento a id correspondente (EducacaoInfantil, AnosIniciais, AnosFinais ou EnsinoMedio).");
    }

    $('.NCE')
        .html(
            '<h1 class="title">Núcleo de Conteúdo Educacional </h1>\
            <div class = "cargos">\
                <h2 class="cargo">Gerência:</h2>\
                <p class="nome">' + equipe.NCE.Gerencia + '</p>\
            </div>\
            <div class="cargos">\
                <h2 class="cargo"> Edição de Conteúdo </h2>\
                <p class="nome"> ' + editores + ' </p>\
            </div>\
            ')

    //NEL
    $('.NEL')
        .html(
            '<h1 class="title">Núcleo de Excelência em Linguagem </h1>\
            <!-- <div class="cargos">\
                <h2 class="cargo">Coordenação:</h2>\
                <p class="nome">' + equipe.NEL.Coordenação + '</p>\
            </div>-->\
            <div class="cargos">\
                <h2 class="cargo"> Edição de texto: </h2>\
                <p class="nome">' + equipe.NEL.Edicao_de_texto.join(', ') + '</p>\
            </div>\
            <div class="cargos">\
                <h2 class="cargo"> Revisão de texto: </h2>\
                <p class="nome"> ' + equipe.NEL.Revisao_de_texto.join(', ') + '</p>\
            </div>\
            ')

    $('.NTC')
        .html(
            '<h1 class="title">Núcleo de Transformação Criativa </h1>\
            <div class="cargos">\
                <h2 class="cargo"> Coordenação de Iconografia: </h2>\
                <p class="nome"> ' + equipe.NTC.Coordenacao_de_iconografia + ' </p>\
            </div>\
            <div class="cargos">\
                <h2 class="cargo">Pesquisa Iconográfica:</h2>\
                <p class="nome">' + equipe.NTC.Pesquisa_iconografica.join(', ') + '</p>\
            </div>\
            ')

    //direitos
    if (colecao.length > 0) {
        var idColecao = colecao.attr("id");

        if (idColecao === "SPE") {
            $('.direitos')
                .html('<p class="direitos-de-imagem">' + dieitos.SPE + '</p>')
        } else if (idColecao === "SAE") {
            $('.direitos')
                .html('<p class="direitos-de-imagem">' + dieitos.SAE + '</p>')
        } else if (idColecao === "CQT") {
            $('.direitos')
                .html('<p class="direitos-de-imagem">' + dieitos.CQT + '</p>')
        }
    }
})