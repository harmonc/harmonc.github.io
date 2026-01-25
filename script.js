// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navigation auto-hide/show based on mouse position
const header = document.querySelector('header');
let mouseY = 0;
let headerVisible = false;

document.addEventListener('mousemove', (e) => {
    mouseY = e.clientY;
    
    if (mouseY < 100 && !headerVisible) {
        header.classList.remove('hidden');
        header.classList.add('visible');
        headerVisible = true;
    } else if (mouseY > 150 && headerVisible && window.scrollY > 0) {
        header.classList.remove('visible');
        header.classList.add('hidden');
        headerVisible = false;
    }
});

// Show header on page load and when scrolling to top
window.addEventListener('load', () => {
    setTimeout(() => {
        header.classList.add('visible');
        headerVisible = true;
    }, 500);
});

window.addEventListener('scroll', () => {
    // Always show header when at the very top of the page
    if (window.scrollY <= 10) {
        header.classList.remove('hidden');
        header.classList.add('visible');
        headerVisible = true;
    } else if (window.scrollY < 100 && !headerVisible) {
        header.classList.remove('hidden');
        header.classList.add('visible');
        headerVisible = true;
    }

    // Scroll progress bar
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const scrollProgress = document.getElementById('scroll-progress');
    scrollProgress.style.width = scrollPercent + '%';

    // Update active nav link
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[index]) {
                navLinks[index].classList.add('active');
            }
        }
    });
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Make h1 clickable to scroll to top
document.querySelector('h1').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add some animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150); // Stagger animation
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe skill items
document.querySelectorAll('.skill-category li').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Review Page Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Gallery lightbox functionality (only if gallery elements exist)
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<div class="lightbox-content"><img src="" alt=""><button class="lightbox-close">&times;</button></div>';
        document.body.appendChild(lightbox);

        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-full');
                lightbox.querySelector('img').src = imgSrc;
                lightbox.classList.add('active');
            });
        });

        lightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
    }

    // Social share functionality
    const shareLinks = document.querySelectorAll('.share-link');
    if (shareLinks.length > 0) {
        const reviewUrl = window.location.href;
        const reviewTitle = document.querySelector('title').textContent;

        shareLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.classList[1];
                let shareUrl = '';

                switch(platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(reviewTitle)}&url=${encodeURIComponent(reviewUrl)}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(reviewUrl)}`;
                        break;
                    case 'reddit':
                        shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(reviewUrl)}&title=${encodeURIComponent(reviewTitle)}`;
                        break;
                }

                window.open(shareUrl, '_blank', 'width=600,height=400');
            });
        });
    }

    // Blog page filtering and search
    const blogSearch = document.getElementById('blog-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    if (blogSearch && blogPosts.length > 0) {
        // Search functionality
        blogSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterBlogPosts(searchTerm, getCurrentFilter());
        });
    }

    if (filterButtons.length > 0 && blogPosts.length > 0) {
        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter posts
                const filter = this.getAttribute('data-filter');
                filterBlogPosts('', filter);
            });
        });
    }

    function getCurrentFilter() {
        const activeButton = document.querySelector('.filter-btn.active');
        return activeButton ? activeButton.getAttribute('data-filter') : 'all';
    }

    function filterBlogPosts(searchTerm = '', filter = 'all') {
        blogPosts.forEach(post => {
            const title = post.querySelector('h4')?.textContent.toLowerCase() || '';
            const content = post.querySelector('p')?.textContent.toLowerCase() || '';
            const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
            
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                content.includes(searchTerm) || 
                tags.includes(searchTerm);
            
            let matchesFilter = true;
            if (filter !== 'all') {
                const category = post.closest('.blog-category');
                if (filter === 'coding' && category) {
                    matchesFilter = category.textContent.toLowerCase().includes('coding');
                } else if (filter === 'reviews' && category) {
                    matchesFilter = category.textContent.toLowerCase().includes('video game') || category.textContent.toLowerCase().includes('review');
                }
            }
            
            post.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
        });
    }
});

// Enhanced blog card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});
