document.addEventListener('DOMContentLoaded', function () {
    const cameraImage = document.getElementById('cameraImagePlaceholder');
    const saveButton = document.getElementById('saveButton');

    const fingerprintImages = [
        'Assets/img/digital/digital.png',
        'Assets/img/digital/digital-stage2.png',
        'Assets/img/digital/digital-stage3.png',
        'Assets/img/digital/digital-stage4.png',
        'Assets/img/digital/digital-stage5.png'
    ];

    const intervalTime = 500;

    function simulateFingerprintScan() {
        let currentIndex = 0;

        saveButton.disabled = true;
        saveButton.textContent = 'Lendo digital...';

        if (window.fingerprintInterval) {
            clearInterval(window.fingerprintInterval);
        }

        window.fingerprintInterval = setInterval(() => {
            cameraImage.src = fingerprintImages[currentIndex];
            currentIndex++;

            if (currentIndex >= fingerprintImages.length) {
                clearInterval(window.fingerprintInterval);

                setTimeout(() => {
                    cameraImage.src = 'Assets/img/digital/digital-stage5.png';
                    saveButton.disabled = false;
                    saveButton.textContent = 'Enviar';

                    updateSignatureCounter(1);
                }, intervalTime);
            }
        }, intervalTime);
    }

    function updateSignatureCounter(count) {
        const counterElement = document.getElementById('signatureCounter');
        const currentText = counterElement.textContent;
        const currentCount = parseInt(currentText.match(/\d+/)[0]);
        counterElement.innerHTML = `<i class="bi bi-pencil-square me-2"></i> ${currentCount + count} / 2 Assinaturas`;
    }

    simulateFingerprintScan();

    saveButton.addEventListener('click', function () {
        alert('Assinatura digital enviada com sucesso!');
    });
});