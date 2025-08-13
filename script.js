// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 17, 23, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Skill progress bars animation
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                bar.style.animation = 'none';
                bar.offsetHeight; // Trigger reflow
                bar.style.animation = 'fillProgress 2s ease-in-out forwards';
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Timeline animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Typing animation for hero code block
function typewriterEffect() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, (index + 1) * 500);
    });
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Start typewriter effect after a short delay
    setTimeout(typewriterEffect, 1000);
    
    // Initialize other animations
    document.querySelectorAll('.stat').forEach((stat, index) => {
        setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
        heroImage.style.transform = `translateY(${rate * 0.7}px)`;
    }
});

// Add loading animation for page
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 17, 23, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Character-by-character typing animation with inline cursor
class CodeTyper {
    constructor() {
        this.container = document.querySelector('.code-content');
        this.text = `public class BackendDeveloper
{
    private string expertise = ".NET Core";
    private string database = "SQL Server";
    private string architecture = "Microservices";
    
    public async Task<ApiResponse> BuildAPI()
    {
        // Creating high-performance APIs
        return await ProcessRequest();
    }
    
    public void OptimizePerformance()
    {
        // Database optimization magic
        ExecuteOptimizedQueries();
    }
    
    public void ImplementCleanArchitecture()
    {
        // Separation of concerns
        ApplySOLIDPrinciples();
    }
}`;
        this.index = 0;
        this.isTyping = false;
    }

    type() {
        if (this.isTyping || !this.container) return;
        this.isTyping = true;

        if (this.index < this.text.length) {
            const currentText = this.text.substring(0, this.index + 1);
            
            // Apply IntelliSense-style highlighting as we type
            const highlightedText = this.applyIntelliSenseColors(currentText);
            const textWithCursor = highlightedText + '<span class="typing-cursor">|</span>';
            this.container.innerHTML = textWithCursor;
            
            this.index++;
            
            // Variable typing speed for more natural feel
            const char = this.text[this.index - 1];
            let delay = 50;
            
            if (char === '\n') delay = 200; // Pause at line breaks
            else if (char === ' ') delay = 30; // Faster for spaces
            else if (char === '{' || char === '}') delay = 150; // Pause at braces
            
            setTimeout(() => {
                this.isTyping = false;
                this.type();
            }, delay);
        } else {
            // Finished typing, apply full Visual Studio 2022 IntelliSense colors
            this.container.innerHTML = this.applyIntelliSenseColors(this.text);
            
            // Restart after pause with blank start
            setTimeout(() => {
                this.index = 0;
                this.container.innerHTML = '<span class="typing-cursor">|</span>';
                this.isTyping = false;
                this.type();
            }, 3000);
        }
    }

    highlightCode(text) {
        // Split text into tokens to avoid overlapping HTML tags
        const lines = text.split('\n');
        let highlighted = '';
        
        for (let line of lines) {
            if (line.trim() === '') {
                highlighted += '<br>';
                continue;
            }
            
            // Process each line to avoid nested tags
            let processedLine = line
                // Escape HTML characters first
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                
                // String literals first (to protect quotes)
                .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
                
                // Comments (protect from other highlighting)
                .replace(/(\/\/.*$)/g, '<span class="comment">$1</span>')
                
                // Keywords (blue)
                .replace(/\b(public|private|protected|internal|class|interface|struct|enum|namespace|using|async|await|return|new|this|base|static|virtual|override|abstract)\b/g, '<span class="keyword">$1</span>')
                
                // Built-in types (blue) - avoid conflict with keywords
                .replace(/\b(string|int|bool|void|object|decimal|double|float|char|byte|long|short|uint|ulong|ushort|sbyte)\b(?![^<]*<\/span>)/g, '<span class="type">$1</span>')
                
                // Task with generic
                .replace(/\bTask(&lt;)([A-Za-z]+)(&gt;)/g, '<span class="class">Task</span>$1<span class="generic">$2</span>$3')
                
                // Class names (cyan)
                .replace(/\b(BackendDeveloper|ApiResponse)\b(?![^<]*<\/span>)/g, '<span class="class">$1</span>')
                
                // Method names (yellow) - only when followed by parentheses
                .replace(/\b(BuildAPI|OptimizePerformance|ImplementCleanArchitecture|ProcessRequest|ExecuteOptimizedQueries|ApplySOLIDPrinciples)(?=\()/g, '<span class="method">$1</span>')
                
                // Property/Variable names (light blue)
                .replace(/\b(expertise|database|architecture)\b(?![^<]*<\/span>)/g, '<span class="property">$1</span>')
                
                // Operators and punctuation (keep as default white)
                .replace(/([=;{}().,])/g, '<span class="operator">$1</span>');
            
            highlighted += processedLine + '<br>';
        }
        
        // Remove the last <br> if it exists
        return highlighted.replace(/<br>$/, '');
    }

    highlightCodeRider(text) {
        // JetBrains Rider-style C# syntax highlighting - optimized for real-time typing
        if (!text || text.trim() === '') {
            return text;
        }
        
        let processedText = text
            // Escape HTML entities first
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Convert line breaks
            .replace(/\n/g, '<br>');
        
        // Apply highlighting in specific order to avoid conflicts
        
        // 1. String literals first (green) - complete strings only
        processedText = processedText.replace(/"([^"]*)"(?![^<]*<\/span>)/g, '<span class="string">"$1"</span>');
        
        // 2. Comments (gray, italic) - complete comments only
        processedText = processedText.replace(/(\/\/[^<]*)(?=<br>|$)/g, '<span class="comment">$1</span>');
        
        // 3. Keywords and access modifiers (orange, bold) - complete words only
        processedText = processedText.replace(/\b(public|private|protected|internal|static|virtual|override|abstract|class|interface|struct|enum|namespace|using|async|await|return|new|this|base)(?=\s|<br>|$|[^a-zA-Z])/g, '<span class="keyword">$1</span>');
        
        // 4. Built-in types (orange, bold) - complete words only
        processedText = processedText.replace(/\b(string|int|bool|void|object|decimal|double|float|char|byte|long|short|uint|ulong|ushort|sbyte|Task)(?=\s|<br>|$|[^a-zA-Z])/g, '<span class="type">$1</span>');
        
        // 5. Method calls (yellow) - complete method names only
        processedText = processedText.replace(/\b(BuildAPI|OptimizePerformance|ImplementCleanArchitecture|ProcessRequest|ExecuteOptimizedQueries|ApplySOLIDPrinciples)(?=\()/g, '<span class="method">$1</span>');
        
        // 6. Class names (light gray) - complete words only
        processedText = processedText.replace(/\b(BackendDeveloper|ApiResponse)(?=\s|<br>|$|[^a-zA-Z])/g, '<span class="class">$1</span>');
        
        // 7. Properties and fields (purple) - complete words only
        processedText = processedText.replace(/\b(expertise|database|architecture)(?=\s|<br>|$|[^a-zA-Z])/g, '<span class="property">$1</span>');
        
        // 8. Handle generics properly - complete generic expressions only
        processedText = processedText.replace(/(&lt;)([A-Za-z]+)(&gt;)/g, '$1<span class="generic">$2</span>$3');
        
        return processedText;
    }

    highlightTyping(text) {
        // Ultra-safe approach: tokenize and rebuild to avoid HTML conflicts
        if (!text || text.trim() === '') {
            return text;
        }
        
        // Split text into tokens (words, spaces, punctuation, newlines)
        const tokens = text.split(/(\s+|\n|[{}();,=<>".])/);
        let result = '';
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            if (!token) continue;
            
            // Handle line breaks
            if (token === '\n') {
                result += '<br>';
                continue;
            }
            
            // Handle whitespace and punctuation as-is
            if (/^\s+$/.test(token) || /^[{}();,=<>".]$/.test(token)) {
                result += token;
                continue;
            }
            
            // Check if this is a keyword that should be highlighted
            if (/^(public|private|protected|internal|static|virtual|override|abstract|class|interface|struct|enum|namespace|using|async|await|return|new|this|base)$/.test(token)) {
                result += `<span class="keyword">${token}</span>`;
            }
            // Check if this is a built-in type
            else if (/^(string|int|bool|void|object|decimal|double|float|char|byte|long|short|uint|ulong|ushort|sbyte|Task)$/.test(token)) {
                result += `<span class="type">${token}</span>`;
            }
            // Check if this is a method name (look ahead for parenthesis)
            else if (/^(BuildAPI|OptimizePerformance|ImplementCleanArchitecture|ProcessRequest|ExecuteOptimizedQueries|ApplySOLIDPrinciples)$/.test(token) && 
                     i + 1 < tokens.length && tokens[i + 1] === '(') {
                result += `<span class="method">${token}</span>`;
            }
            // Check if this is a class name
            else if (/^(BackendDeveloper|ApiResponse)$/.test(token)) {
                result += `<span class="class">${token}</span>`;
            }
            // Check if this is a property/field
            else if (/^(expertise|database|architecture)$/.test(token)) {
                result += `<span class="property">${token}</span>`;
            }
            // Check if this is a string literal
            else if (/^".*"$/.test(token)) {
                result += `<span class="string">${token}</span>`;
            }
            // Check if this starts a comment
            else if (token.startsWith('//')) {
                // Find the rest of the comment until newline
                let comment = token;
                let j = i + 1;
                while (j < tokens.length && tokens[j] !== '\n') {
                    comment += tokens[j];
                    j++;
                }
                result += `<span class="comment">${comment}</span>`;
                // Don't skip the newline - let it be processed normally
                i = j - 1;
            }
            // Default case - regular text
            else {
                result += token;
            }
        }
        
        return result;
    }

    applyIntelliSenseColors(text) {
        // Ultra-safe token-based highlighting to prevent HTML conflicts
        if (!text || text.trim() === '') {
            return text;
        }
        
        // Split into lines first, then process each line separately
        const lines = text.split('\n');
        let result = '';
        
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            
            if (line.trim() === '') {
                result += '<br>';
                continue;
            }
            
            // Check if this line is a comment
            if (line.trim().startsWith('//')) {
                // Entire line is a comment
                result += `<span class="vs-comment">${line}</span><br>`;
                continue;
            }
            
            // Process non-comment lines with full IntelliSense colors
            const tokens = line.split(/(\s+|[{}();,=<>".])/);
            let lineResult = '';
            
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                
                if (!token) continue;
                
                // Handle whitespace and single characters as-is
                if (/^\s+$/.test(token) || /^[{}();,=<>".]$/.test(token)) {
                    lineResult += token;
                    continue;
                }
                
                // Apply Visual Studio 2022 colors based on token type
                
                // Keywords (blue) - C# reserved words
                if (/^(public|private|protected|internal|static|virtual|override|abstract|class|interface|struct|enum|namespace|using|async|await|return|new|this|base)$/.test(token)) {
                    lineResult += `<span class="vs-keyword">${token}</span>`;
                }
                // Built-in types (blue)
                else if (/^(string|int|bool|void|object|decimal|double|float|char|byte|long|short|uint|ulong|ushort|sbyte|Task)$/.test(token)) {
                    lineResult += `<span class="vs-type">${token}</span>`;
                }
                // Method names (yellow) - check if next non-whitespace token is (
                else if (/^(BuildAPI|OptimizePerformance|ImplementCleanArchitecture|ProcessRequest|ExecuteOptimizedQueries|ApplySOLIDPrinciples)$/.test(token)) {
                    // Look ahead for opening parenthesis
                    let isMethod = false;
                    for (let j = i + 1; j < tokens.length; j++) {
                        if (tokens[j] === '(') {
                            isMethod = true;
                            break;
                        }
                        if (!/^\s*$/.test(tokens[j])) break; // Stop at non-whitespace
                    }
                    if (isMethod) {
                        lineResult += `<span class="vs-method">${token}</span>`;
                    } else {
                        lineResult += token;
                    }
                }
                // Class names (cyan/teal)
                else if (/^(BackendDeveloper|ApiResponse)$/.test(token)) {
                    lineResult += `<span class="vs-class">${token}</span>`;
                }
                // Properties/Variables (light blue)
                else if (/^(expertise|database|architecture)$/.test(token)) {
                    lineResult += `<span class="vs-property">${token}</span>`;
                }
                // String literals (orange/red)
                else if (/^".*"$/.test(token)) {
                    lineResult += `<span class="vs-string">${token}</span>`;
                }
                // Default - regular text
                else {
                    lineResult += token;
                }
            }
            
            result += lineResult + '<br>';
        }
        
        // Remove the last <br> if it exists
        return result.replace(/<br>$/, '');
    }

    start() {
        if (this.container) {
            // Initialize with cursor
            this.container.innerHTML = '<span class="typing-cursor">|</span>';
            setTimeout(() => this.type(), 1000);
        }
    }
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const codeTyper = new CodeTyper();
    codeTyper.start();
});


