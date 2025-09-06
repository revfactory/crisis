document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');

    // CTA 버튼 클릭 이벤트
    ctaButton.addEventListener('click', function() {
        // 시뮬레이션 페이지로 이동 또는 스크롤
        const infoSection = document.querySelector('.info-section');
        infoSection.scrollIntoView({ behavior: 'smooth' });
    });

    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.video-card, .info-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 페이지 로드 시 부드러운 진입 효과
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // 스크롤 시 헤더 그림자 효과
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // 비디오 재생 관리
    const videos = document.querySelectorAll('video');
    
    // 모바일 기기 감지
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 모바일이 아닌 경우에만 스크롤 시 자동 재생
    if (!isMobile) {
        // 화면에 보이는 비디오만 재생
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(err => {
                        console.log('자동 재생 실패:', err);
                    });
                } else {
                    entry.target.pause();
                }
            });
        }, {
            threshold: 0.5
        });

        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
    
    // 비디오 에러 처리 (모든 기기에 적용)
    videos.forEach(video => {
        video.addEventListener('error', function(e) {
            console.error('비디오 로딩 에러:', e);
            this.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">비디오를 불러올 수 없습니다.</div>';
        });
    });
});