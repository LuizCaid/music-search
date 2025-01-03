const botao = document.getElementById('pesquisa');

botao.addEventListener('click', () => {
    const cartao = document.querySelector('.anima');
    cartao.classList.remove('anima'); 
    cartao.classList.add('show');
    
});