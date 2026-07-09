// ======================================
// AGRO FORTE - FUTURO SUSTENTÁVEL
// script.js
// Parte 1
// ======================================

// ===========================
// MODO ESCURO
// ===========================

const botaoDark = document.getElementById("darkMode");

botaoDark.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        botaoDark.textContent = "☀️";

    }else{

        botaoDark.textContent = "🌙";

    }

});

// ===========================
// BOTÃO VOLTAR AO TOPO
// ===========================

const topo = document.getElementById("topo");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        topo.style.display="block";

    }else{

        topo.style.display="none";

    }

});

topo.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ===========================
// CONTADORES ANIMADOS
// ===========================

const contadores = document.querySelectorAll(".contador");

const iniciarContadores = () => {

    contadores.forEach(contador=>{

        const objetivo = Number(contador.dataset.target);

        let numero = 0;

        const incremento = objetivo / 100;

        const atualizar = ()=>{

            numero += incremento;

            if(numero < objetivo){

                contador.innerText = Math.floor(numero);

                requestAnimationFrame(atualizar);

            }else{

                contador.innerText = objetivo + "%";

            }

        }

        atualizar();

    });

}

let contadoresIniciados=false;

window.addEventListener("scroll",()=>{

    const secao=document.querySelector("#estatisticas");

    if(!secao) return;

    const topoSecao=secao.offsetTop-500;

    if(window.scrollY>=topoSecao && !contadoresIniciados){

        iniciarContadores();

        contadoresIniciados=true;

    }

});

// ===========================
// ANIMAÇÃO AO ROLAR
// ===========================

const elementos=document.querySelectorAll(
".card,.box,.numero,.evento,.galeria img"
);

function revelar(){

    const altura=window.innerHeight;

    elementos.forEach(item=>{

        const distancia=item.getBoundingClientRect().top;

        if(distancia<altura-100){

            item.style.opacity="1";

            item.style.transform="translateY(0)";

        }

    });

}

elementos.forEach(item=>{

    item.style.opacity="0";

    item.style.transform="translateY(60px)";

    item.style.transition=".8s";

});

window.addEventListener("scroll",revelar);

revelar();

// ===========================
// QUIZ
// ===========================

const perguntas=[

{

pergunta:"1. O que caracteriza a agricultura orgânica?",

opcoes:[

"Uso intenso de agrotóxicos",

"Uso de adubação natural e respeito ao meio ambiente",

"Desmatamento para ampliar a produção",

"Uso exclusivo de fertilizantes químicos"

],

correta:1

},

{

pergunta:"2. A agrofloresta combina:",

opcoes:[

"Apenas árvores",

"Apenas criação de animais",

"Árvores, culturas agrícolas e biodiversidade",

"Somente milho e soja"

],

correta:2

},

{

pergunta:"3. Qual prática ajuda na conservação do solo?",

opcoes:[

"Queimadas",

"Plantio direto",

"Desmatamento",

"Retirada da cobertura vegetal"

],

correta:1

},

{

pergunta:"4. O controle biológico consiste em:",

opcoes:[

"Utilizar organismos naturais para controlar pragas",

"Aplicar mais pesticidas",

"Queimar a lavoura",

"Eliminar toda a vegetação"

],

correta:0

},

{

pergunta:"5. A cobertura vegetal serve para:",

opcoes:[

"Aumentar a erosão",

"Proteger o solo e conservar a umidade",

"Ressecar o terreno",

"Facilitar queimadas"

],

correta:1

          }
  // ======================================
// PARTE 2
// ======================================

// Continuação das perguntas

perguntas.push(

{
    pergunta:"6. Qual destas práticas ajuda a preservar a água?",
    opcoes:[
        "Cobertura vegetal",
        "Queimadas",
        "Desmatamento",
        "Compactação do solo"
    ],
    correta:0
},

{
    pergunta:"7. O solo fértil é importante porque:",
    opcoes:[
        "Dificulta o crescimento das plantas",
        "Favorece o desenvolvimento das culturas",
        "Impede infiltração de água",
        "Aumenta a erosão"
    ],
    correta:1
},

{
    pergunta:"8. Um benefício da agrofloresta é:",
    opcoes:[
        "Redução da biodiversidade",
        "Maior equilíbrio ecológico",
        "Aumento das queimadas",
        "Eliminação das árvores"
    ],
    correta:1
},

{
    pergunta:"9. O plantio direto ajuda a:",
    opcoes:[
        "Proteger o solo",
        "Remover toda a vegetação",
        "Aumentar a erosão",
        "Compactar o terreno"
    ],
    correta:0
},

{
    pergunta:"10. O objetivo da agricultura sustentável é:",
    opcoes:[
        "Produzir sem pensar no meio ambiente",
        "Equilibrar produção, economia e preservação ambiental",
        "Desmatar novas áreas",
        "Usar apenas fertilizantes químicos"
    ],
    correta:1
}

);

// ======================================
// ELEMENTOS
// ======================================

const pergunta = document.getElementById("pergunta");
const respostas = document.getElementById("respostas");
const resultado = document.getElementById("resultado");
const proxima = document.getElementById("proxima");

let indice = 0;
let pontos = 0;

// ======================================
// CARREGAR PERGUNTA
// ======================================

function carregarPergunta(){

    if(indice >= perguntas.length){

        finalizarQuiz();
        return;

    }

    pergunta.innerHTML = perguntas[indice].pergunta;

    respostas.innerHTML = "";

    perguntas[indice].opcoes.forEach((texto,posicao)=>{

        const botao=document.createElement("button");

        botao.innerHTML=texto;

        botao.onclick=()=>verificarResposta(posicao);

        respostas.appendChild(botao);

    });

}

let respondeu=false;

// ======================================
// VERIFICAR
// ======================================

function verificarResposta(escolha){

    if(respondeu) return;

    respondeu=true;

    const botoes=document.querySelectorAll("#respostas button");

    botoes.forEach((botao,index)=>{

        if(index===perguntas[indice].correta){

            botao.style.background="#4CAF50";
            botao.style.color="white";

        }

        if(index===escolha && escolha!==perguntas[indice].correta){

            botao.style.background="#E53935";
            botao.style.color="white";

        }

        botao.disabled=true;

    });

    if(escolha===perguntas[indice].correta){

        pontos++;

    }

}

// ======================================
// PRÓXIMA
// ======================================

proxima.addEventListener("click",()=>{

    if(!respondeu){

        alert("Escolha uma resposta.");

        return;

    }

    indice++;

    respondeu=false;

    carregarPergunta();

});

// ======================================
// RESULTADO
// ======================================

function finalizarQuiz(){

    pergunta.innerHTML="Quiz Finalizado!";

    respostas.innerHTML="";

    proxima.style.display="none";

    let mensagem="";

    if(pontos==10){

        mensagem="🏆 Excelente! Você domina o tema.";

    }

    else if(pontos>=8){

        mensagem="🌱 Muito bom! Continue aprendendo.";

    }

    else if(pontos>=5){

        mensagem="📚 Bom resultado. Vale revisar alguns conceitos.";

    }

    else{

        mensagem="🌿 Continue estudando sobre agricultura sustentável.";

    }

    resultado.innerHTML=`

        <h2>${pontos} / ${perguntas.length} acertos</h2>

        <p>${mensagem}</p>

    `;

    localStorage.setItem("pontuacaoQuiz",pontos);

}

// ======================================
// FORMULÁRIO
// ======================================

const formulario=document.getElementById("formContato");

if(formulario){

formulario.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Mensagem enviada com sucesso! 🌱");

formulario.reset();

});

}

// ======================================
// GALERIA
// ======================================

const imagens=document.querySelectorAll(".galeria img");

imagens.forEach((imagem)=>{

imagem.addEventListener("click",()=>{

imagem.classList.toggle("zoom");

});

});

// ======================================
// DATA NO RODAPÉ
// ======================================

const ano=new Date().getFullYear();

const rodape=document.querySelector("footer p:last-child");

if(rodape){

rodape.innerHTML=`© ${ano} - Agro Forte | Futuro Sustentável`;

}

// ======================================
// INICIAR QUIZ
// ======================================

carregarPergunta();
