document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cep-form');
  const input = document.getElementById('cep');
  const resultadoDiv = document.getElementById('resultado');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cep = input.value.trim();

    // Validação simples
    if (!cep.match(/^\d{8}$/)) {
      resultadoDiv.innerHTML = '<p style="color: red;">CEP inválido. Digite exatamente 8 números.</p>';
      return;
    }

    resultadoDiv.innerHTML = 'Buscando...';

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);

      if (!response.ok) {
        throw new Error('CEP não encontrado ou erro na API.');
      }

      const data = await response.json();

      resultadoDiv.innerHTML = `
        <strong>CEP:</strong> ${data.cep}<br>
        <strong>Estado:</strong> ${data.state}<br>
        <strong>Cidade:</strong> ${data.city}<br>
        <strong>Bairro:</strong> ${data.neighborhood || 'Não informado'}<br>
        <strong>Rua:</strong> ${data.street || 'Não informado'}
      `;
    } catch (error) {
      resultadoDiv.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
    }
  });
});
