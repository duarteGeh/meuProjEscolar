console.log("==================================");
console.log("===    SISTEMA DA TURMA 913    ===");
console.log("===================================");
console.log("Bem-vindo ao sistema!");
console.log("Sistema desenvolvido por: Geovanna Duarte");
console.log("Curso: Sistemas de Informação");

let nomeAluno = "Eduarda";
let idadeAluno = 17;
let curso = "Informática";
let nota1 = 8.5;
let nota2 = 7;
let nota3 = 9;
let matriculado = true;

console.log("Nome:", nomeAluno);
console.log("Idade:", idadeAluno);
console.log("Curso:", curso);
console.log("Nota 1:", nota1);
console.log("Nota 2:", nota2);
console.log("Nota 3:", nota3);
console.log("Matriculado:", matriculado);

let mediaSimples = (nota1 + nota2 + nota3) / 3;
console.log("Média calculada:", mediaSimples.toFixed(2));
console.log("Média é maior ou igual a 7?", mediaSimples >= 7);

if (mediaSimples >= 7) {
    console.log("Situação: APROVADO");
} else if (mediaSimples >= 5) {
    console.log("Situação: RECUPERAÇÃO");
} else {
    console.log("Situação: REPROVADO");
}

function calcularMedia(n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}

function verificarSituacao(media) {
    if (media >= 7) {
        return "APROVADO";
    } else if (media >= 5) {
        return "RECUPERAÇÃO";
    } else {
        return "REPROVADO";
    }
}

function exibirAluno(nome, media, situacao) {
    console.log(`Aluno: ${nome} | Média: ${media.toFixed(2)} | Situação: ${situacao}`);
}

let aluno1 = {
    nome: "Eduarda",
    idade: 17,
    curso: "Informática",
    nota1: 8.5,
    nota2: 7.0,
    nota3: 9.0
};

let mediaObjeto = calcularMedia(aluno1.nota1, aluno1.nota2, aluno1.nota3);
exibirAluno(aluno1.nome, mediaObjeto, verificarSituacao(mediaObjeto));

let alunos = [
    aluno1,
    { nome: "Alaryce", idade: 18, curso: "Informática", nota1: 6.0, nota2: 5.5, nota3: 6.5 },
    { nome: "Davy", idade: 17, curso: "Informática", nota1: 4.0, nota2: 3.0, nota3: 5.0 },
    { nome: "Pedro", idade: 19, curso: "Informática", nota1: 9.0, nota2: 9.5, nota3: 10.0 },
    { nome: "Raissa Louyse", idade: 18, curso: "Informática", nota1: 7.0, nota2: 7.5, nota3: 8.0 }
];

function ordenarAlunos() {
    alunos.sort(function(a, b) {
        return a.nome.localeCompare(b.nome);
    });
}

ordenarAlunos();

let aprovados = 0;
let recuperacao = 0;
let reprovados = 0;
let somaMedias = 0;
let maiorMedia = -1;
let alunoDestaque = null;

for (let i = 0; i < alunos.length; i++) {
    let m = calcularMedia(alunos[i].nota1, alunos[i].nota2, alunos[i].nota3);
    let s = verificarSituacao(m);

    exibirAluno(alunos[i].nome, m, s);

    somaMedias += m;

    if (s === "APROVADO") {
        aprovados++;
    } else if (s === "RECUPERAÇÃO") {
        recuperacao++;
    } else {
        reprovados++;
    }

    if (m > maiorMedia) {
        maiorMedia = m;
        alunoDestaque = alunos[i];
    }
}

let mediaTurma = somaMedias / alunos.length;
console.log("Total Aprovados:", aprovados);
console.log("Total Recuperação:", recuperacao);
console.log("Total Reprovados:", reprovados);
console.log("Média Geral da Turma:", mediaTurma.toFixed(2));
if (alunoDestaque) {
    console.log(`Aluno Destaque: ${alunoDestaque.nome} com média ${maiorMedia.toFixed(2)}`);
}

function obterClasseStatus(situacao) {
    if (situacao === "APROVADO") return "status-aprovado";
    if (situacao === "RECUPERAÇÃO") return "status-recuperacao";
    return "status-reprovado";
}

window.cadastrarAluno = function() {
    let nomeInput = prompt("Digite o nome do aluno:");
    if (!nomeInput) return;
    let idadeInput = Number(prompt("Digite a idade do aluno:"));
    let cursoInput = prompt("Digite o curso do aluno:");
    let n1Input = Number(prompt("Digite a Nota 1:"));
    let n2Input = Number(prompt("Digite a Nota 2:"));
    let n3Input = Number(prompt("Digite a Nota 3:"));

    let novoAluno = {
        nome: nomeInput,
        idade: idadeInput,
        curso: cursoInput,
        nota1: n1Input,
        nota2: n2Input,
        nota3: n3Input
    };

    alunos.push(novoAluno);
    ordenarAlunos();
    window.listarAlunos();
};

window.listarAlunos = function() {
    ordenarAlunos();
    let html = "<h4>Lista Completa de Alunos (Ordem Alfabética)</h4>";
    for (let i = 0; i < alunos.length; i++) {
        let m = calcularMedia(alunos[i].nota1, alunos[i].nota2, alunos[i].nota3);
        let s = verificarSituacao(m);
        let classe = obterClasseStatus(s);
        html += `<div class="item-aluno">
            <span><strong>${alunos[i].nome}</strong> (${alunos[i].curso}) - Média: ${m.toFixed(2)}</span>
            <span class="${classe}">${s}</span>
        </div>`;
    }
    document.getElementById("conteudo-painel").innerHTML = html;
};

window.mostrarAprovados = function() {
    ordenarAlunos();
    let html = "<h4>Alunos Aprovados</h4>";
    let count = 0;
    for (let i = 0; i < alunos.length; i++) {
        let m = calcularMedia(alunos[i].nota1, alunos[i].nota2, alunos[i].nota3);
        let s = verificarSituacao(m);
        if (s === "APROVADO") {
            html += `<div class="item-aluno">
                <span><strong>${alunos[i].nome}</strong> - Média: ${m.toFixed(2)}</span>
                <span class="status-aprovado">APROVADO</span>
            </div>`;
            count++;
        }
    }
    html += `<p><strong>Total de aprovados:</strong> ${count}</p>`;
    document.getElementById("conteudo-painel").innerHTML = html;
};

window.mostrarReprovados = function() {
    ordenarAlunos();
    let html = "<h4>Alunos Reprovados</h4>";
    let count = 0;
    for (let i = 0; i < alunos.length; i++) {
        let m = calcularMedia(alunos[i].nota1, alunos[i].nota2, alunos[i].nota3);
        let s = verificarSituacao(m);
        if (s === "REPROVADO") {
            html += `<div class="item-aluno">
                <span><strong>${alunos[i].nome}</strong> - Média: ${m.toFixed(2)}</span>
                <span class="status-reprovado">REPROVADO</span>
            </div>`;
            count++;
        }
    }
    html += `<p><strong>Total de reprovados:</strong> ${count}</p>`;
    document.getElementById("conteudo-painel").innerHTML = html;
};

window.mostrarMediaTurma = function() {
    let soma = 0;
    for (let i = 0; i < alunos.length; i++) {
        soma += calcularMedia(alunos[i].nota1, alunos[i].nota2, alunos[i].nota3);
    }
    let mediaGeral = soma / alunos.length;
    let html = `<h4>Média Geral da Turma</h4>
    <p style="font-size: 18px; margin: 10px 0;">A média das notas dos ${alunos.length} alunos é: <strong>${mediaGeral.toFixed(2)}</strong></p>`;
    document.getElementById("conteudo-painel").innerHTML = html;
};

window.mostrarDestaque = function() {
    let topMedia = -1;
    let topAluno = null;
    for (let i = 0; i < alunos.length; i++) {
        let m = calcularMedia(alunos[i].nota1, alunos[i].nota2, alunos[i].nota3);
        if (m > topMedia) {
            topMedia = m;
            topAluno = alunos[i];
        }
    }
    let html = "<h4>Aluno Destaque</h4>";
    if (topAluno) {
        html += `<div class="item-aluno" style="border-color: var(--verde-principal); background-color: #f0fdf4;">
            <span>🌟 <strong>${topAluno.nome}</strong> (${topAluno.curso})</span>
            <span class="status-aprovado">Média: ${topMedia.toFixed(2)}</span>
        </div>`;
    } else {
        html += "<p>Nenhum aluno encontrado.</p>";
    }
    document.getElementById("conteudo-painel").innerHTML = html;
};

window.executarMenuViaPrompt = function() {
    let opcao = "";
    while (opcao !== "0") {
        opcao = prompt(
            "=== MENU DO SISTEMA 913.26 ===\n" +
            "1 - Cadastrar aluno\n" +
            "2 - Listar alunos\n" +
            "3 - Mostrar aprovados\n" +
            "4 - Mostrar reprovados\n" +
            "5 - Média da turma\n" +
            "6 - Aluno destaque\n" +
            "0 - Sair\n\n" +
            "Escolha uma opção:"
        );

        switch (opcao) {
            case "1": window.cadastrarAluno(); break;
            case "2": window.listarAlunos(); break;
            case "3": window.mostrarAprovados(); break;
            case "4": window.mostrarReprovados(); break;
            case "5": window.mostrarMediaTurma(); break;
            case "6": window.mostrarDestaque(); break;
            case "0": alert("Saindo do sistema..."); break;
            default: if (opcao !== null) alert("Opção inválida! Tente novamente."); break;
        }
    }
};

window.onload = function() {
    window.listarAlunos();
};