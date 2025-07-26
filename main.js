// 마음의 정원 - 메인 JavaScript

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 네비게이션 토글
    initMobileNavigation();
    
    // 검색 기능
    initSearch();
    
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 카테고리 필터
    initCategoryFilter();
    
    // 부드러운 스크롤
    initSmoothScroll();
    
    // 툴팁
    initTooltips();

    // 스크롤 인디케이터 (새로 추가)
    initScrollIndicator();
});

// 모바일 네비게이션 토글
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 아이콘 변경
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
}

// 검색 기능
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        // 검색 버튼 클릭
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        // 엔터 키 검색
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

// 검색 실행
function performSearch(query) {
    if (query.trim() === '') {
        return;
    }
    
    // 실제 검색 로직 (향후 구현)
    console.log('검색어:', query);
    
    // 검색 결과 페이지로 이동하거나 필터링 수행
    // 현재는 콘솔에만 출력
}

// 스크롤 애니메이션
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.card, .article-card, .hero-title, .hero-subtitle');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 카테고리 필터
function initCategoryFilter() {
    const filterItems = document.querySelectorAll('.category-filter-item');
    const articleCards = document.querySelectorAll('.article-card');
    
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 활성 상태 변경
            filterItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 글 필터링
            articleCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 부드러운 스크롤
function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 툴팁 초기화
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.dataset.tooltip;
        
        // 툴팁 요소 생성
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-text';
        tooltip.textContent = tooltipText;
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        // 호버 이벤트
        element.addEventListener('mouseenter', function() {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
    });
}

// 페이지네이션
function initPagination() {
    const paginationItems = document.querySelectorAll('.pagination-item');
    
    paginationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('disabled')) {
                return;
            }
            
            // 현재 활성 페이지 제거
            paginationItems.forEach(i => i.classList.remove('active'));
            
            // 새로운 활성 페이지 설정
            this.classList.add('active');
            
            // 페이지 로딩 로직 (향후 구현)
            const pageNumber = this.textContent;
            console.log('페이지 이동:', pageNumber);
        });
    });
}

// 소셜 공유
function shareToSocial(platform, url, title) {
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'kakao':
            // 카카오톡 공유는 별도 SDK 필요
            if (typeof Kakao !== 'undefined') {
                Kakao.Link.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: title,
                        description: '마음의 정원에서 자기이해에 대한 인사이트를 얻어보세요.',
                        imageUrl: window.location.origin + '/assets/images/logo/og-image.jpg',
                        link: {
                            mobileWebUrl: url,
                            webUrl: url
                        }
                    }
                });
                return;
            }
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// 로딩 상태 관리
function showLoading(element) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    element.appendChild(loading);
}

function hideLoading(element) {
    const loading = element.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// 알림 메시지 표시
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // 페이지 상단에 추가
    const main = document.querySelector('.main');
    if (main) {
        main.insertBefore(alert, main.firstChild);
        
        // 3초 후 자동 제거
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
}

// 유틸리티 함수들
const utils = {
    // 디바운스
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 스로틀
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 날짜 포맷팅
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('ko-KR', options);
    },
    
    // 읽기 시간 계산
    calculateReadTime: function(text) {
        const wordsPerMinute = 200; // 평균 읽기 속도
        const words = text.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes}분 읽기`;
    }
};

// 전역 객체로 노출
window.MindGarden = {
    shareToSocial,
    showAlert,
    showLoading,
    hideLoading,
    utils
};

// 스크롤 인디케이터 초기화
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.section');
            if (nextSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = nextSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}
