// Assets/js/signature.js

document.addEventListener('DOMContentLoaded', function () {
    const cameraImage = document.getElementById('cameraImagePlaceholder');
    const saveButton = document.getElementById('saveButton');

    // Array com os caminhos das imagens de progresso
    const fingerprintImages = [
        'Assets/img/digital/digital.png',
        'Assets/img/digital/digital-stage2.png',
        'Assets/img/digital/digital-stage3.png',
        'Assets/img/digital/digital-stage4.png',
        'Assets/img/digital/digital-stage5.png'
    ];

    // Tempo médio entre cada imagem (em milissegundos)
    const intervalTime = 500;

    // Função para simular o processo de leitura digital
    function simulateFingerprintScan() {
        let currentIndex = 0;

        // Desabilita o botão durante o processo
        saveButton.disabled = true;
        saveButton.textContent = 'Lendo digital...';

        // Limpa qualquer intervalo anterior
        if (window.fingerprintInterval) {
            clearInterval(window.fingerprintInterval);
        }

        // Inicia o intervalo para trocar as imagens
        window.fingerprintInterval = setInterval(() => {
            cameraImage.src = fingerprintImages[currentIndex];
            currentIndex++;

            // Quando chegar na última imagem, para o intervalo
            if (currentIndex >= fingerprintImages.length) {
                clearInterval(window.fingerprintInterval);

                // Atualiza para a imagem final (pode ser a primeira ou uma específica)
                setTimeout(() => {
                    cameraImage.src = 'Assets/img/digital/digital-stage5.png';
                    saveButton.disabled = false;
                    saveButton.textContent = 'Enviar';

                    // Atualiza o contador de assinaturas
                    updateSignatureCounter(1);
                }, intervalTime);
            }
        }, intervalTime);
    }

    // Função para atualizar o contador de assinaturas
    function updateSignatureCounter(count) {
        const counterElement = document.getElementById('signatureCounter');
        const currentText = counterElement.textContent;
        const currentCount = parseInt(currentText.match(/\d+/)[0]);
        counterElement.innerHTML = `<i class="bi bi-pencil-square me-2"></i> ${currentCount + count} / 2 Assinaturas`;
    }

    // Inicia a simulação quando a página carrega
    simulateFingerprintScan();

    // Configura o botão de enviar
    saveButton.addEventListener('click', function () {
        // Simula o envio da assinatura
        alert('Assinatura digital enviada com sucesso!');
    });
});