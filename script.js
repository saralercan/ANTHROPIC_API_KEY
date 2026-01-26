/**
 * Akıllı Ofis Hesaplayıcı - JavaScript
 * Kullanıcı sayısına göre sepet ve teslimat önerisi hesaplar
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const personSlider = document.getElementById('personSlider');
    const personInput = document.getElementById('personInput');
    const basketSize = document.getElementById('basketSize');
    const deliveryFreq = document.getElementById('deliveryFreq');
    const dots = document.querySelectorAll('.dot');
    const steps = document.querySelectorAll('.process-step');

    // Öneri tablosu
    const recommendations = [
        { max: 10, basket: 'Small', delivery: 'Haftada 1' },
        { max: 20, basket: 'Medium', delivery: 'Haftada 1' },
        { max: 30, basket: 'Medium', delivery: 'Haftada 2' },
        { max: 50, basket: 'Large', delivery: 'Haftada 2' },
        { max: 75, basket: 'Large', delivery: 'Haftada 3' },
        { max: 100, basket: 'XL', delivery: 'Haftada 3' },
        { max: Infinity, basket: 'XL+', delivery: 'Her gün' }
    ];

    /**
     * Kişi sayısına göre öneri hesapla
     */
    function getRecommendation(personCount) {
        for (const rec of recommendations) {
            if (personCount <= rec.max) {
                return rec;
            }
        }
        return recommendations[recommendations.length - 1];
    }

    /**
     * UI'ı güncelle
     */
    function updateRecommendation(value) {
        const count = parseInt(value) || 1;
        const rec = getRecommendation(count);

        // Öneri kartını güncelle
        basketSize.textContent = rec.basket;
        deliveryFreq.textContent = rec.delivery;

        // Animasyon efekti
        basketSize.style.transform = 'scale(1.1)';
        deliveryFreq.style.transform = 'scale(1.1)';

        setTimeout(() => {
            basketSize.style.transform = 'scale(1)';
            deliveryFreq.style.transform = 'scale(1)';
        }, 200);
    }

    /**
     * Slider değişikliğini işle
     */
    function handleSliderChange(e) {
        const value = e.target.value;
        personInput.value = value;
        updateRecommendation(value);
        updateSliderTrack(value);
    }

    /**
     * Input değişikliğini işle
     */
    function handleInputChange(e) {
        let value = parseInt(e.target.value);

        // Geçerli aralıkta tut
        if (value < 1) value = 1;
        if (value > 500) value = 500;

        e.target.value = value;

        // Slider'ı güncelle (max 100)
        personSlider.value = Math.min(value, 100);

        updateRecommendation(value);
        updateSliderTrack(Math.min(value, 100));
    }

    /**
     * Slider track rengini güncelle
     */
    function updateSliderTrack(value) {
        const percentage = ((value - 1) / 99) * 100;
        personSlider.style.background = `linear-gradient(to right, #22c55e ${percentage}%, #e2e8f0 ${percentage}%)`;
    }

    /**
     * Process step animasyonu
     */
    function animateSteps() {
        let currentStep = 0;

        setInterval(() => {
            // Tüm adımlardan active class'ını kaldır
            steps.forEach(step => step.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Mevcut adıma active ekle
            steps[currentStep].classList.add('active');
            dots[currentStep].classList.add('active');

            // Sonraki adıma geç
            currentStep = (currentStep + 1) % 3;
        }, 3000);
    }

    /**
     * Dot tıklama işleyicisi
     */
    function handleDotClick(e) {
        const stepIndex = parseInt(e.target.dataset.step) - 1;

        steps.forEach(step => step.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        steps[stepIndex].classList.add('active');
        dots[stepIndex].classList.add('active');
    }

    /**
     * Smooth scroll için intersection observer
     */
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Animasyon eklenecek elementler
        document.querySelectorAll('.process-step, .calculator-wrapper, .calendar-row, .upsell-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        #basketSize, #deliveryFreq {
            transition: transform 0.2s ease;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    personSlider.addEventListener('input', handleSliderChange);
    personInput.addEventListener('input', handleInputChange);
    personInput.addEventListener('blur', handleInputChange);

    dots.forEach(dot => {
        dot.addEventListener('click', handleDotClick);
    });

    // Başlangıç durumu
    updateRecommendation(personSlider.value);
    updateSliderTrack(personSlider.value);

    // Animasyonları başlat
    setupScrollAnimations();

    // Mobile'da otomatik step animasyonu
    if (window.innerWidth <= 768) {
        animateSteps();
    }

    // Meyve takvimi hover efekti
    document.querySelectorAll('.calendar-row').forEach(row => {
        row.addEventListener('mouseenter', function() {
            const fruitName = this.querySelector('.fruit-name').textContent;
            const seasonFills = this.querySelectorAll('.season-fill');

            seasonFills.forEach(fill => {
                fill.style.transform = 'scaleY(1.2)';
            });
        });

        row.addEventListener('mouseleave', function() {
            const seasonFills = this.querySelectorAll('.season-fill');
            seasonFills.forEach(fill => {
                fill.style.transform = 'scaleY(1)';
            });
        });
    });

    // CTA button click tracking (opsiyonel analytics için)
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            console.log('CTA Clicked:', buttonText);

            // Burada analytics event gönderilebilir
            // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
        });
    });
});
