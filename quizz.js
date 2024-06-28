const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'Como o plástico afeta a vida marinha nos oceanos?',
    answers: [
      {
        answer: 'Causando emaranhamento e ingestão que podem levar à morte',
        correct: true,
      },
      {
        answer: 'Aumentando a biodiversidade',
        correct: false,
      },
      {
        answer: 'Criando habitats artificiais',
        correct: false,
      },
      {
        answer: 'Facilitando a migração de espécies',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual das seguintes ações pode ajudar a reduzir a sobrepesca?',
    answers: [
      {
        answer: 'Aumentar a quota de pesca anual',
        correct: false,
      },
      {
        answer: 'Implantar períodos de defeso e cotas de pesca sustentáveis',
        correct: true,
      },
      {
        answer: 'Incentivar o consumo ilimitado de frutos do mar',
        correct: false,
      },
      {
        answer: 'Subsidiar indústrias de pesca para aumentar a produção',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a importância de reduzir as emissões de gases de efeito estufa para a saúde dos oceanos?',
    answers: [
      {
        answer: 'Para aumentar a temperatura da água e promover o crescimento de corais',
        correct: false,
      },
      {
        answer: 'Para diminuir a acidificação dos oceanos e proteger a biodiversidade marinha',
        correct: true,
      },
      {
        answer: 'Para expandir as áreas de pesca industrial',
        correct: false,
      },
      {
        answer: 'Para aumentar a quantidade de plâncton na água',
        correct: false,
      },
    ],
  },
  {
    question: 'Por que é importante preservar os manguezais?',
    answers: [
      {
        answer: 'Eles oferecem habitat para muitas espécies e protegem contra a erosão costeira',
        correct: true,
      },
      {
        answer: 'Eles não têm importância ecológica significativa',
        correct: false,
      },
      {
        answer: 'Eles são principais fontes de poluição marinha',
        correct: false,
      },
      {
        answer: 'Eles são usados principalmente para o desenvolvimento imobiliário',
        correct: false,
      },
    ],
  },
  {
    question: 'Como as comunidades locais podem contribuir para a conservação dos oceanos?',
    answers: [
      {
        answer: 'Aumentando o consumo de produtos marinhos',
        correct: false,
      },
      {
        answer: 'Ignorando regulamentos locais de pesca',
        correct: false,
      },
      {
        answer: 'Construindo mais infraestruturas na costa',
        correct: false,
      },
      {
        answer: 'Participando de programas de limpeza de praias e conscientização ambiental',
        correct:  true,
      },
    ],
  },
  {
    question: 'Qual é o principal contribuinte para o acúmulo de lixo nos oceanos?',
    answers: [
      {
        answer: 'Descarte adequado de resíduos industriais',
        correct: false,
      },
      {
        answer: 'Efluentes tratados de estações de tratamento de água',
        correct: false,
      },
      {
        answer: 'Resíduos plásticos descartados inadequadamente',
        correct: true,
      },
      {
        answer: 'Resíduos plásticos descartados inadequadamente',
        correct:  false,
      },
    ],
  },
  {
    question: 'Qual é a principal consequência da poluição dos oceanos para a vida marinha?',
    answers: [
      {
        answer: 'Melhoria na qualidade da água marinha',
        correct: false,
      },
      {
        answer: 'Aumento da diversidade de espécies marinhas',
        correct: false,
      },
      {
        answer: 'Degradação de habitats e morte de organismos marinhos',
        correct: true,
      },
      {
        answer: 'Crescimento populacional de peixes',
        correct:  false,
      },
    ],
  },
  {
    question: 'Como o aquecimento global afeta principalmente a vida marinha?',
    answers: [
      {
        answer: 'Aumentando a capacidade de suporte de vida marinha',
        correct: false,
      },
      {
        answer: 'Causando branqueamento de corais e alterações nos habitats marinhos',
        correct: true,
      },
      {
        answer: 'Diminuindo a temperatura da superfície do mar',
        correct: false,
      },
      {
        answer: 'Reduzindo a acidificação dos oceanos',
        correct:  false,
      },
    ],
  },
  {
    question: 'Quais são as medidas mais eficazes para reduzir a quantidade de lixo nos oceanos?',
    answers: [
      {
        answer: 'Promover o uso indiscriminado de plásticos descartáveis',
        correct: false,
      },
      {
        answer: 'Eliminar todas as leis de proteção ambiental',
        correct: false,
      },
      {
        answer: 'Aumentar a produção industrial costeira',
        correct: false,
      },
      {
        answer: 'Incentivar a reciclagem e o uso de materiais biodegradáveis',
        correct:  true,
      },
    ],
  },
  {
    question: 'De que maneira a poluição dos oceanos pode impactar economicamente uma região costeira?',
    answers: [
      {
        answer: 'Aumentando o turismo e investimentos em infraestrutura',
        correct: false,
      },
      {
        answer: 'Impulsionando o desenvolvimento tecnológico',
        correct: false,
      },
      {
        answer: 'Reduzindo a renda proveniente da pesca e turismo devido à degradação ambiental',
        correct: true,
      },
      {
        answer: ' Gerando empregos em indústrias de produtos descartáveis',
        correct: false,
      },
    ],
  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  
  setTimeout(function () {
   
    if (actualQuestion >= questions.length) {
      showSuccessMessage();
      return;
    }
    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();