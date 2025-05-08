// JavaScript customizado virá aqui 

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const startButton = document.getElementById('startButton');
    const progressBar = document.querySelector('.progress-bar');
    const signatureCounterElement = document.getElementById('signatureCounter');
    const successModalElement = document.getElementById('successModal');
    const downloadLink = document.getElementById('downloadLink');
    const downloadModalElement = document.getElementById('downloadModal');
    const cameraInstruction = document.getElementById('cameraInstruction');
    const downloadSuccessModalElement = document.getElementById('downloadSuccessModal');

    const saveButton = document.getElementById('saveButton');
    const digitalInstruction = document.getElementById('digitalInstruction');

    let successModal;
    let downloadModal;
    let downloadSuccessModal;

    if (successModalElement) {
        successModal = new bootstrap.Modal(successModalElement);
    }
    if (downloadModalElement) {
        downloadModal = new bootstrap.Modal(downloadModalElement);
    }
    if (downloadSuccessModalElement) {
        downloadSuccessModal = new bootstrap.Modal(downloadSuccessModalElement);
    }

    let overlay = document.querySelector('.overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    overlay.addEventListener('click', function () {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });

    if (downloadLink && downloadSuccessModal) {
        downloadLink.addEventListener('click', function (event) {
            event.preventDefault();
            downloadSuccessModal.show();
        });
    }

    if (startButton && progressBar && signatureCounterElement && cameraInstruction) {
        startButton.addEventListener('click', function () {
            startButton.disabled = true;
            

            const steps = [
                { text: "Centralize seu rosto na câmera.", progress: 0, delay: 1500, animDuration: 500 }, 
                { text: "Mantenha o rosto parado", progress: 30, delay: 2000, animDuration: 1000 },
                { text: "Pisque os olhos", progress: 50, delay: 2000, animDuration: 1000 },
                { text: "Dê um sorriso", progress: 70, delay: 2000, animDuration: 1000 },
                { text: "Pronto!", progress: 100, delay: 1500, animDuration: 1000 }
            ];

            let currentStepIndex = 0;

            function runAnimationStep() {
                if (currentStepIndex >= steps.length) {
                    if (signatureCounterElement) {
                        signatureCounterElement.innerHTML = '<i class="bi bi-pencil-square me-2"></i> 1 / 1 Assinaturas';
                    }
                    if (successModal) {
                        successModal.show();
                    }
                    startButton.innerHTML = 'Enviado';
                    startButton.classList.remove('btn-success');
                    startButton.classList.add('btn-secondary');
                    return;
                }

                const step = steps[currentStepIndex];
                cameraInstruction.textContent = step.text;
                
                let startWidth = parseFloat(progressBar.style.width) || 0;
                if (currentStepIndex === 0) {
                } else if (currentStepIndex > 0) {
                    startWidth = steps[currentStepIndex - 1].progress; 
                }


                const targetWidth = step.progress;
                const animationDuration = step.animDuration;
                const intervalTime = 20; 
                
                if (startWidth === targetWidth) {
                    progressBar.style.width = targetWidth + '%';
                    progressBar.setAttribute('aria-valuenow', targetWidth);
                    setTimeout(() => {
                        currentStepIndex++;
                        runAnimationStep();
                    }, step.delay);
                    return;
                }

                const totalFrames = animationDuration / intervalTime;
                const widthIncrement = (targetWidth - startWidth) / totalFrames;
                let currentFrame = 0;
                
                const animationInterval = setInterval(function () {
                    currentFrame++;
                    let newWidth = startWidth + (widthIncrement * currentFrame);

                    if (currentFrame >= totalFrames) {
                        newWidth = targetWidth; 
                        clearInterval(animationInterval);
                        progressBar.style.width = newWidth + '%';
                        progressBar.setAttribute('aria-valuenow', newWidth);
                        
                        setTimeout(() => {
                            currentStepIndex++;
                            runAnimationStep();
                        }, step.delay);
                    } else {
                        progressBar.style.width = newWidth + '%';
                        progressBar.setAttribute('aria-valuenow', newWidth);
                    }
                }, intervalTime);
            }
            
            runAnimationStep(); 
        });
    }

    if (saveButton && progressBar && signatureCounterElement && digitalInstruction) {
        saveButton.addEventListener('click', function() {
            saveButton.disabled = true;

            const stepsDigital = [
                { text: "Pressione seu dedo no leitor digital.", progress: 0, delay: 100, animDuration: 100 }, // Initial text state
                { text: "Mantenha o dedo pressionado", progress: 45, delay: 2000, animDuration: 2000 },
                { text: "Retire o dedo", progress: 50, delay: 2000, animDuration: 1000 },
                { text: "Coloque o dedo novamente", progress: 90, delay: 2000, animDuration: 1000 },
                { text: "Pronto!", progress: 100, delay: 1500, animDuration: 1000 }
            ];

            let currentDigitalStepIndex = 0;

            function runDigitalAnimationStep() {
                if (currentDigitalStepIndex >= stepsDigital.length) {
                    if (signatureCounterElement) {
                        signatureCounterElement.innerHTML = '<i class="bi bi-pencil-square me-2"></i> 1 / 1 Assinaturas';
                    }
                    if (successModal) {
                        successModal.show();
                    }
                    saveButton.textContent = 'Enviado';
                    saveButton.classList.remove('btn-success');
                    saveButton.classList.add('btn-secondary');
                    return;
                }

                const step = stepsDigital[currentDigitalStepIndex];
                digitalInstruction.textContent = step.text;
                
                let startWidth = parseFloat(progressBar.style.width) || 0;
                if (currentDigitalStepIndex === 0 && stepsDigital[0].progress === 0) {
                    startWidth = 0; 
                } else if (currentDigitalStepIndex > 0) {
                    startWidth = stepsDigital[currentDigitalStepIndex - 1].progress;
                }

                const targetWidth = step.progress;
                const animationDuration = step.animDuration;
                const intervalTime = 20; 

                if (startWidth === targetWidth && currentDigitalStepIndex > 0) {
                     progressBar.style.width = targetWidth + '%';
                     progressBar.setAttribute('aria-valuenow', targetWidth);
                     setTimeout(() => {
                        currentDigitalStepIndex++;
                        runDigitalAnimationStep();
                    }, step.delay);
                    return;
                } else if (currentDigitalStepIndex === 0 && startWidth === targetWidth) {
                     setTimeout(() => {
                        currentDigitalStepIndex++;
                        runDigitalAnimationStep();
                    }, step.delay);
                    return;
                }

                const totalFrames = animationDuration / intervalTime;
                const widthIncrement = (targetWidth - startWidth) / totalFrames;
                let currentFrame = 0;
                
                const animationInterval = setInterval(function () {
                    currentFrame++;
                    let newWidth = startWidth + (widthIncrement * currentFrame);

                    if (currentFrame >= totalFrames) {
                        newWidth = targetWidth; 
                        clearInterval(animationInterval);
                        progressBar.style.width = newWidth + '%';
                        progressBar.setAttribute('aria-valuenow', newWidth);
                        
                        setTimeout(() => {
                            currentDigitalStepIndex++;
                            runDigitalAnimationStep();
                        }, step.delay);
                    } else {
                        progressBar.style.width = newWidth + '%';
                        progressBar.setAttribute('aria-valuenow', newWidth);
                    }
                }, intervalTime);
            }
            if(stepsDigital.length > 0 && stepsDigital[0].progress === 0) {
                digitalInstruction.textContent = stepsDigital[0].text;
                 setTimeout(() => {
                    currentDigitalStepIndex++; 
                    runDigitalAnimationStep();
                }, stepsDigital[0].delay);
            } else {
                 runDigitalAnimationStep(); 
            }
        });
    }
});

document.getElementById('confirmButton').addEventListener('click', function () {
    alert('Você confirmou que está nesta localização!');
    const urlParams = new URLSearchParams(window.location.search);
    const nextPage = urlParams.get('next');

    if (nextPage === 'facial') {
        window.location.href = 'facial.html';
    } else if (nextPage === 'digital') {
        window.location.href = 'digital.html';
    } else {
        console.warn('Nenhuma página de destino especificada após geolocalização.');
        window.location.href = 'index.html'; 
    }
});

document.getElementById('denyButton').addEventListener('click', function () {
    alert('Você indicou que não está nesta localização!');
});