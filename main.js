// Configuração da navegação entre seções
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const secaoAlvo = e.currentTarget.getAttribute('data-section');
    console.log(`Clicou na aba: ${secaoAlvo}`); // Log para depuração

    if (secaoAlvo) {
      mostrarSecao(secaoAlvo);
      
      // Removendo a classe "active" das abas e adicionando à aba clicada
      document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
      e.currentTarget.classList.add('active');
    }
  });
});

// Função para mostrar/esconder seções
function mostrarSecao(idSecao) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.add('d-none');
  });

  const secao = document.getElementById(idSecao);
  console.log(`Mostrando seção: ${idSecao}`); // Log para depuração
  if (secao) {
    secao.classList.remove('d-none');
  }
}

// Validação dos formulários
const formularios = document.querySelectorAll('.needs-validation');
formularios.forEach(formulario => {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!formulario.checkValidity()) {
      e.stopPropagation();
      mostrarFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
    } else {
      mostrarFeedback('Dados salvos com sucesso!', 'success');
      formulario.reset();
    }
    formulario.classList.add('was-validated');
  });
});

// Prévia de imagem para produtos
const imagemProduto = document.getElementById('productImage');
const previewImagem = document.getElementById('imagePreview');

imagemProduto?.addEventListener('change', (e) => {
  const arquivo = e.target.files[0];
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = (e) => {
      previewImagem.innerHTML = `<img src="${e.target.result}" alt="Prévia da imagem">`;
    };
    leitor.readAsDataURL(arquivo);
  }
});

// Busca automática de endereço pelo CEP
const campoCep = document.getElementById('clientCep');
const campoEndereco = document.getElementById('clientAddress');

campoCep?.addEventListener('blur', async () => {
  const cep = campoCep.value.replace(/\D/g, '');
  if (cep.length === 8) {
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();
      if (!dados.erro) {
        campoEndereco.value = `${dados.logradouro}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}`;
      }
    } catch (erro) {
      mostrarFeedback('Erro ao buscar CEP', 'error');
    }
  }
});

// Configuração do gráfico de relatórios
const contextoGrafico = document.getElementById('reportChart');
if (contextoGrafico) {
  new Chart(contextoGrafico, {
    type: 'bar',
    data: {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
      datasets: [{
        label: 'Vendas Mensais',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(13, 110, 253, 0.5)',
        borderColor: 'rgb(13, 110, 253)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Relatório de Vendas'
        }
      }
    }
  });
}

// Função para mostrar mensagens de feedback
function mostrarFeedback(mensagem, tipo) {
  Swal.fire({
    title: tipo === 'success' ? 'Sucesso!' : 'Atenção!',
    text: mensagem,
    icon: tipo,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });
}

// Configuração do botão de ajuda
document.getElementById('helpBtn')?.addEventListener('click', () => {
  Swal.fire({
    title: 'Ajuda',
    html: `
      <div class="text-start">
        <h6>Como usar o sistema:</h6>
        <ul>
          <li>Use o menu superior para navegar entre as seções</li>
          <li>Campos marcados com * são obrigatórios</li>
          <li>Para cadastrar, preencha todos os campos necessários</li>
          <li>Em caso de dúvidas, entre em contato com o suporte</li>
        </ul>
      </div>
    `,
    icon: 'info',
    confirmButtonText: 'Entendi'
  });
});

// Configuração dos botões de exportação
document.getElementById('exportExcel')?.addEventListener('click', () => {
  mostrarFeedback('Relatório Excel gerado com sucesso!', 'success');
});

document.getElementById('exportPdf')?.addEventListener('click', () => {
  mostrarFeedback('Relatório PDF gerado com sucesso!', 'success');
});

// Inicialização do sistema
document.addEventListener('DOMContentLoaded', () => {
  // Mostra a seção de cadastro de usuário por padrão
  mostrarSecao('cadastro-usuario');
});