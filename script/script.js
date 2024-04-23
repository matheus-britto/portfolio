const camposDoFormulario = document.querySelectorAll("[required]");

// console.log(camposDoFormulario);
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um e-mail válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    assunto: {
        valueMissing: 'Por favor, digite o assunto da mensagem',
        tooShort: "O assunto da mensagem é muito curto"
    },
    mensagem: {
        valueMissing: "Por favor, digite uma mensagem",
        tooShort: "A mensagem digitada é muito curta"
    },
}

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    
    tiposDeErro.forEach((erro) => {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem)
        }
    })
    const mensagemErro = campo.parentNode.querySelector('#mensagemErro');
    const validadorDeInput = campo.checkValidity();

    mensagemErro.classList.add('ativo', 'animate__animated', 'animate__fadeIn');
    let iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>';

    if(!validadorDeInput) {
        mensagemErro.innerHTML = iconeErro + ' ' + mensagem;
    } else {
        mensagemErro.textContent = "";
        mensagemErro.classList.remove('ativo');
    }
}