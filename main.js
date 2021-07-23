const nav = document.getElementsByTagName('nav')[0];
const cssAtivo = 'ativo';
const topoNav = nav.offsetTop;

const menuSections = document.querySelectorAll('.navSection');
const menuItens = document.querySelectorAll('nav div ul li');

const email = document.getElementsByClassName('social')[0];

const showArea = document.querySelector('.showArea');
const exitArea = document.querySelector('.exitArea');

const btnGenericos = document.querySelector('#btnGenericos');
const btnExemplos = document.querySelector('#btnExemplos');


import {gerarPosterGenerico, gerarPosterExemplo, smoothScrollTo} from './components/components.js';

email.addEventListener('click', (e)=>{
    e.preventDefault();
    let endereco = document.createElement('textarea');
    endereco.value = "gileadeateixeira@gmail.com";
    document.body.appendChild(endereco);
    endereco.select();
    document.execCommand("copy", false, `${endereco.value}`);
    document.body.removeChild(endereco);
    alert("O e-mail foi copiado: " + endereco.value);
});

window.addEventListener('scroll', ()=>{
    fixarMenuNoTopo();
    let current = '';

    menuSections.forEach((section)=>{
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (window.pageYOffset >= top) {
            current = section.getAttribute('id');
        } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            //Chegou no fim da página
            current = 'footer';
        }
    });

    menuItens.forEach((item)=>{
        item.classList.remove(cssAtivo);
        if (item.classList.contains(current)) {
            item.classList.add(cssAtivo);
        };
    });
});

const fixarMenuNoTopo = ()=> {
    if(window.pageYOffset >= topoNav){
        nav.classList.add('fixoNoTopo');
    }
    else{
        nav.classList.remove('fixoNoTopo');
    };
}

menuItens.forEach(
    (item) => {
        item.addEventListener('click', (event)=>{
            scrollOnClick(event);

            for (let index = 0; index < menuItens.length; index++) {
                menuItens[index].classList.remove(cssAtivo);                
            };

            item.classList.add(cssAtivo);
        });
    }
);

const scrollOnClick = (event)=>{
    event.preventDefault();
    const to = getTopByRef(event.target);
    scrolToPosition(to);
};
const getTopByRef = (element)=>{
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
};
const scrolToPosition = (to)=>{
    /*
        window.scroll({
            top: to,
            behavior: 'smooth',
        });
    */
    smoothScrollTo(0, to);
};

btnGenericos.addEventListener('click', (e)=>{
    e.preventDefault();
    showArea.innerHTML = "";
    exitArea.innerHTML = "";

    for (let index = 1; index <= 6; index++) {
        const movie = document.createElement('div');
        const generico = gerarPosterGenerico({index});
        movie.classList.add('movies');
        movie.innerHTML = generico.html;

        movie.addEventListener('click', (e)=>{
            e.preventDefault();
            window.open(generico.url, '_blank').focus();
        });

        showArea.appendChild(movie);
    };

    const btn = document.createElement('button');
    btn.id = 'btnExit';
    btn.innerHTML = 'X';

    btn.addEventListener('click', (e)=>{
        e.preventDefault();
        showArea.innerHTML = "";
        exitArea.innerHTML = "";
    });

    exitArea.appendChild(btn);
});

btnExemplos.addEventListener('click', (e)=>{
    e.preventDefault();
    showArea.innerHTML = "";
    exitArea.innerHTML = "";

    for (let index = 1; index <= 6; index++) {
        const background_color = Math.floor(Math.random()*16777215).toString(16);
        const text_color = Math.floor(Math.random()*16777215).toString(16);
        const movie = document.createElement('div');
        const exemplo = gerarPosterExemplo({background_color, text_color, index});
        movie.classList.add('movies');
        movie.innerHTML = exemplo.html;

        movie.addEventListener('click', (e)=>{
            e.preventDefault();
            window.open(exemplo.url, '_blank').focus();
        });

        showArea.appendChild(movie);
    };

    const btn = document.createElement('button');
    btn.id = 'btnExit';
    btn.innerHTML = 'X';

    btn.addEventListener('click', (e)=>{
        e.preventDefault();
        showArea.innerHTML = "";
        exitArea.innerHTML = "";
    });

    exitArea.appendChild(btn);
});