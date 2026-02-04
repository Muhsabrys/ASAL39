// ===================================
// Program Schedule Management
// ===================================

// Load and display program schedule
async function loadProgram() {
    try {
        const response = await fetch('program-data.json');
        const data = await response.json();
        
        // Populate each day's schedule
        populateSchedule('friday', data.friday);
        populateSchedule('saturday', data.saturday);
        populateSchedule('sunday', data.sunday);
    } catch (error) {
        console.log('Program data not yet available:', error);
        displayPlaceholder();
    }
}

// Populate schedule for a specific day
function populateSchedule(day, sessions) {
    const container = document.getElementById(`${day}-sessions`);
    
    if (!sessions || sessions.length === 0) {
        container.innerHTML = '<p class="loading-message">Program schedule coming soon. Check back later for detailed session information.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    sessions.forEach(session => {
        const sessionElement = createSessionElement(session);
        container.appendChild(sessionElement);
    });
}

// Create a session element
function createSessionElement(session) {
    const sessionDiv = document.createElement('div');
    sessionDiv.className = 'session';
    
    let presentationsHTML = '';
    if (session.presentations && session.presentations.length > 0) {
        presentationsHTML = '<div class="presentations">';
        session.presentations.forEach((pres, index) => {
            presentationsHTML += `
                <div class="presentation" onclick="showAbstract(${JSON.stringify(pres).replace(/"/g, '&quot;')})">
                    <div class="presentation-title">${pres.title}</div>
                    <div class="presentation-authors">${pres.authors}</div>
                </div>
            `;
        });
        presentationsHTML += '</div>';
    }
    
    sessionDiv.innerHTML = `
        <div class="session-header">
            <span class="session-time">${session.time}</span>
            <span class="session-type">${session.type || 'Session'}</span>
        </div>
        <h3 class="session-title">${session.title}</h3>
        ${session.chair ? `<p><strong>Chair:</strong> ${session.chair}</p>` : ''}
        ${presentationsHTML}
    `;
    
    return sessionDiv;
}

// Display placeholder when no data available
function displayPlaceholder() {
    const days = ['friday', 'saturday', 'sunday'];
    days.forEach(day => {
        const container = document.getElementById(`${day}-sessions`);
        container.innerHTML = '<p class="loading-message">Program schedule coming soon. Check back later for detailed session information.</p>';
    });
}

// Show abstract in modal
function showAbstract(presentation) {
    const modal = document.getElementById('abstractModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2>${presentation.title}</h2>
        <p class="presentation-authors"><strong>Authors:</strong> ${presentation.authors}</p>
        ${presentation.affiliation ? `<p><strong>Affiliation:</strong> ${presentation.affiliation}</p>` : ''}
        <hr style="margin: 1.5rem 0;">
        <h3>Abstract</h3>
        <p>${presentation.abstract || 'Abstract coming soon.'}</p>
    `;
    
    modal.style.display = 'block';
}

// ===================================
// Day Tab Navigation
// ===================================

function initializeDayTabs() {
    const dayTabs = document.querySelectorAll('.day-tab');
    
    dayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and schedules
            dayTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.day-schedule').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding schedule
            this.classList.add('active');
            const day = this.getAttribute('data-day');
            document.getElementById(`${day}-schedule`).classList.add('active');
        });
    });
}

// ===================================
// Modal Functionality
// ===================================

function initializeModal() {
    const modal = document.getElementById('abstractModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ===================================
// Registration Form Handling
// ===================================

function initializeRegistrationForm() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        // Show/hide presentation title field based on participation selection
        const participationCheckboxes = document.querySelectorAll('input[name="participation"]');
        const presentationTitleGroup = document.getElementById('presentationTitleGroup');
        
        participationCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const showPresentationTitle = Array.from(participationCheckboxes).some(cb => 
                    (cb.value === 'presenting-paper' || cb.value === 'presenting-poster') && cb.checked
                );
                
                if (showPresentationTitle) {
                    presentationTitleGroup.style.display = 'block';
                    document.getElementById('presentationTitle').required = true;
                } else {
                    presentationTitleGroup.style.display = 'none';
                    document.getElementById('presentationTitle').required = false;
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate at least one day is selected
            const daysChecked = document.querySelectorAll('input[name="days"]:checked');
            if (daysChecked.length === 0) {
                showFormMessage('Please select at least one day you plan to attend.', 'error');
                return;
            }
            
            // Validate participation type
            const participationChecked = document.querySelectorAll('input[name="participation"]:checked');
            if (participationChecked.length === 0) {
                showFormMessage('Please select your participation type.', 'error');
                return;
            }
            
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            // Get all form values
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    // Handle multiple values (checkboxes)
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            
            // Log the registration data (in production, this would be sent to a server)
            console.log('Registration Data:', data);
            
            // Show success message
            showFormMessage('Thank you for registering! You will receive a confirmation email shortly at ' + data.email, 'success');
            
            // Reset form after short delay
            setTimeout(() => {
                form.reset();
                document.getElementById('presentationTitleGroup').style.display = 'none';
            }, 3000);
        });
    }
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = 'form-message ' + type;
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 10000);
    }
}

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===================================
// Mobile Navigation
// ===================================

function initializeMobileNav() {
    // Add mobile menu toggle if needed in future
    const nav = document.querySelector('nav');
    
    // Add sticky navigation highlighting
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// ===================================
// Initialize Everything on Page Load
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize common features
    initializeSmoothScrolling();
    initializeMobileNav();
    
    // Initialize page-specific features
    if (document.getElementById('registrationForm')) {
        initializeRegistrationForm();
    }
    
    if (document.querySelector('.day-tabs')) {
        initializeDayTabs();
        loadProgram();
    }
    
    if (document.getElementById('abstractModal')) {
        initializeModal();
    }
});

// ===================================
// Utility Functions
// ===================================

// Add animation on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.speaker-card, .committee-member, .sponsor, .detail-card, .session');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
