const camposDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const listaRespostas = {
        'nome': e.target.elements['nome'].value,
        'email': e.target.elements['email'].value,
        'assunto': e.target.elements['assunto'].value,
        'mensagem': e.target.elements['mensagem'].value,
    }

    localStorage.setItem('contato', JSON.stringify(listaRespostas));

})

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
    const iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>';

    // mensagemErro.classList.add('ativo', 'animate__animated', 'animate__fadeIn');
    // --------------------------------- //
    
    if(!validadorDeInput) {
        mensagemErro.innerHTML = `${iconeErro} ${mensagem}`;
        mensagemErro.setAttribute('mostrar', '')
    } else {
        mensagemErro.setAttribute('esconder', '');
        btnSubmit.classList.remove('btn-disabled')


        mensagemErro.addEventListener('animationend', () => {
            mensagemErro.removeAttribute('esconder');
            mensagemErro.removeAttribute('mostrar');
        }, {once: true})
    }
    
    // --------------------------------- //
    // if(!validadorDeInput) {
    //     mensagemErro.setAttribute('mostrar', '')
    //     mensagemErro.innerHTML = `${iconeErro} ${mensagem}`
    // } else {
    //     mensagemErro.setAttribute('esconder', '');
    //     mensagemErro.textContent = "";
        

    //     mensagemErro.addEventListener('animationend', () => {
    //         mensagemErro.removeAttribute('esconder', '')
    //         mensagemErro.removeAttribute('mostrar', '')
    //         // mensagemErro.textContent = "";

            
    //     }, {once: true})
    //     // mensagemErro.classList.add('animate__animated', 'animate__fadeOut')
    //     // mensagemErro.classList.remove('ativo');
    // }
}