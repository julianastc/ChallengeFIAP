// JavaScript customizado virá aqui 

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const startButton = document.getElementById('startButton');
    const progressBar = document.querySelector('.progress-bar');
    const signatureCounterElement = document.getElementById('signatureCounter');
    const successModalElement = document.getElementById('successModal'); 
    const downloadLink = document.getElementById('downloadLink');
    const downloadModalElement = document.getElementById('downloadModal');
    let successModal; 
    let downloadModal; 

    if (successModalElement) {
        successModal = new bootstrap.Modal(successModalElement); 
    }
    if (downloadModalElement) { 
        downloadModal = new bootstrap.Modal(downloadModalElement);
    }

    let overlay = document.querySelector('.overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active'); 
        });
    }

    overlay.addEventListener('click', function() {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });

    if (downloadLink && downloadModal) {
        downloadLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            downloadModal.show(); 
        });
    }

    if (startButton && progressBar && signatureCounterElement) {
        startButton.addEventListener('click', function() {
            startButton.disabled = true; 
            let currentWidth = parseFloat(progressBar.style.width) || 0;
            const targetWidth = 100;
            const duration = 1500; 
            const intervalTime = 20; 
            const step = (targetWidth - currentWidth) / (duration / intervalTime);

            let animationInterval = setInterval(function() {
                currentWidth += step;
                if (currentWidth >= targetWidth) {
                    currentWidth = targetWidth;
                    clearInterval(animationInterval);
                    if(signatureCounterElement) {
                        signatureCounterElement.innerHTML = '<i class="bi bi-pencil-square me-2"></i> 1 / 1 Assinaturas';
                    }
                    if (successModal) {
                        successModal.show();
                    }
                }
                progressBar.style.width = currentWidth + '%';
                progressBar.setAttribute('aria-valuenow', currentWidth);
            }, intervalTime);
        });
    }
}); 