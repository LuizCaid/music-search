const butao = document.getElementById('pesquisa');
const title = document.getElementById('title');
const artista = document.getElementById('artist');
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '33f8efd0a3mshf1e6328d878ff4ep1fd8bfjsne745abd49bb8',
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    }
};
const nomeMus = document.getElementById('musName');
const mosArt = document.getElementById('cantor');
const cartao = document.getElementById('card');
const sound = document.getElementById('musga');
const soundEQ = document.getElementById('wave-menu');

const consulta = async (valor) => {
    try {
        const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${valor}`, options)
            .then((resposta) => resposta.json())
            .then((data) => {
                console.log(data);
                return data;
            });
        return response;
    } catch (error) {
        console.log(Error);
    }
};

// Atributos necessários
// 
// album.title artist.name


const chaves = ['title', 'artist'];

const filtro = (resultado) => {
    const novoObjeto = {};
    chaves.map((chave) => document.getElementById(chave))
        .map((elemento) => {
            (novoObjeto[elemento.name]) = resultado[elemento.name];
        });
    return novoObjeto;

}

butao.addEventListener('click', async (evento) => {
    evento.preventDefault();
    const result = await consulta(title.value);
    title.value.trim() === ""
        ? (title.placeholder = "Por favor, insira um nome válido.", title.style = "filter: drop-shadow(0px 0px 7px #ff00009c); transition: ease-in-out 0.5s")
        : (title.placeholder = 'Espresso', title.style = "filter: drop-shadow(0px 0px 7px #007bff9c); transition: ease-in-out 0.5s");

    artista.value.trim() === ""
        ? (artista.placeholder = "Por favor, insira um nome válido.", artista.style = "filter: drop-shadow(0px 0px 7px #ff00009c); transition: ease-in-out 0.5s")
        : (artista.placeholder = 'Espresso', artista.style = "filter: drop-shadow(0px 0px 7px #007bff9c); transition: ease-in-out 0.5s");

    for (let cont = 0; cont < result.data.length; cont++) {
        if (result.data[cont].artist.name.toLowerCase() === artista.value.toLowerCase()) {
            const procura = {
                nome: result.data[cont].title,
                autor: result.data[cont].artist.name,
                capa: result.data[cont].album.cover_big,
                amostra: result.data[cont].preview,
                link: result.data[cont].link
            };
            console.log(procura);
            
            
            nomeMus.innerText = `${procura.nome}`;
            (procura.nome.length >= '10') ? nomeMus.style.fontSize = '32px' : nomeMus.style.fontSize = '40px';
            (procura.nome.length >= '15') ?(nomeMus.style.fontSize = '22px', nomeMus.style.width = '11em')  : nomeMus.style.fontSize = '40px';
            mosArt.innerText = `${procura.autor}`;
            cartao.style.backgroundImage = `url(${procura.capa})`;
            cartao.style.backgroundSize = 'cover';
            cartao.style.backgroundPosition = 'center';
            cartao.style.transition = 'ease-in-out 0.9s';
            cartao.style.boxShadow = 'inset 0px -300px 167px -2px rgba(0,0,0,1)';
            cartao.style.webkitBoxShadow = '-webkit-box-shadow: inset 0px -300px 167px -2px rgba(0,0,0,1)';
            soundEQ.style.display = 'flex'
            sound.setAttribute('src', `${procura.amostra}`);

            const spotify = document.getElementById('spotifyURL');
            const apple = document.getElementById('appleURL');
            const deezer = document.getElementById('deezerURL');
            const soundcloud = document.getElementById('soundURL');
            const ytmusic = document.getElementById('youtubeURL');

            deezer.setAttribute(`href`, `${procura.link}`);
            break;  
        }       
    }

});

