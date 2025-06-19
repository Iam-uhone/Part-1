//About page javascript
function setupAboutPage() {
    // Create accordion for team members
    const teamMembers = document.querySelectorAll('.Aboutpage h2');
    teamMembers.forEach((member, index) => {
        const bio = member.nextElementSibling;
        if (bio) {
            // Initially hide all bios except first
            if (index !== 0) {
                bio.style.display = 'none';
            }
            
            // accordion toggle
            member.addEventListener('click', function() {
        
                teamMembers.forEach((otherMember, otherIndex) => {
                    if (index !== otherIndex) {
                        otherMember.nextElementSibling.style.display = 'none';
                    }
                });
                
                // Toggle current bio
                bio.style.display = bio.style.display === 'none' ? 'block' : 'none';
            });
        }
    });
}
//Contact Page js

function setupContactMap() {
    if (document.getElementById('map')) {
        
        const map = document.getElementById('map');
        map.style.backgroundColor = '#f0f0f0';
        map.style.display = 'flex';
        map.style.justifyContent = 'center';
        map.style.alignItems = 'center';
        map.style.border = '2px solid peru';
        map.innerHTML = '<p style="font-size: 1.5rem; cursor: pointer;">📍 Click to view our location on Google Maps</p>';
        
        map.addEventListener('click', function() {
            window.open('https://maps.google.com?q=120+Mia+drive,+Midrand,+Gauteng,+South+Africa', '_blank');
        });
    }
}


if (document.querySelector('.contact-page')) {
    setupContactMap();
}
//SERVICES PAGE
function setupGallery() {
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const caption = document.querySelector('.caption');
        const close = document.querySelector('.close');
        
        gallery.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'block';
                lightboxImg.src = this.getAttribute('data-fullsize');
                caption.textContent = this.alt;
            });
        });
        
        close.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
}


if (document.querySelector('.body2')) {
    setupHomePage();
    setupGallery();
}
function setupServicesTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
        
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}


function setupServicesPage() {
    setupServicesTabs();
    // ... rest of my existing services page code
}
function setupOrderModal() {
    const modal = document.getElementById('orderModal');
    const orderBtn = document.querySelector('.button');
    const closeBtn = document.querySelector('.close-modal');
    
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.querySelector('.delivery-btn').addEventListener('click', function() {
        alert('Redirecting to delivery partners...');
        modal.style.display = 'none';
    });
    
    document.querySelector('.pickup-btn').addEventListener('click', function() {
        alert('Redirecting to reservation system...');
        modal.style.display = 'none';
    });
}


function setupHomePage() {
    setupOrderModal();
    // ... rest of my existing home page code
}


// Menu data
const menuData = {
    meals: [
        { name: "Tripe, pap and 3 salads of your own choice", price: 75.00 },
        { name: "Chicken feet, pap and 3 salads of your own choice", price: 65.00 },
        { name: "Steak, wors, pap and 3 salads of your own choice", price: 75.00 },
        { name: "Cow legs, pap and 3 salads of your own choice", price: 70.00 },
        { name: "Beef stew, pap and 3 salads of your own choice", price: 75.00 },
        { name: "Chicken stew, pap and 3 salads of your own choice", price: 70.00 },
        { name: "Full chicken", price: 130.00 },
        { name: "Half chicken", price: 75.00 },
        { name: "Quarter chicken", price: 40.00 },
        { name: "Pap", price: 15.00 },
        { name: "Salads", price: 10.00, note: "each" }
    ],
    beverages: [
        { name: "Still water", price: 15.00 },
        { name: "Cider", price: 25.00 },
        { name: "Beer", price: 20.00 },
        { name: "Cocktails", price: 35.00 },
        { name: "Juice", price: 18.00 },
        { name: "Milkshake", price: 22.00 }
    ]
};

function loadMenuItems(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; //  existing content clearing
    
    menuData[category].forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.innerHTML = `${item.name} - R${item.price.toFixed(2)}${item.note ? ` (${item.note})` : ''}`;
        itemElement.style.cursor = 'pointer';
        itemElement.style.margin = '8px 0';
        itemElement.style.padding = '5px';
        itemElement.style.transition = 'background-color 0.3s';
        
        itemElement.addEventListener('mouseover', () => {
            itemElement.style.backgroundColor = '#f5f5f5';
        });
        
        itemElement.addEventListener('mouseout', () => {
            itemElement.style.backgroundColor = '';
        });
        
        itemElement.addEventListener('click', () => {
            alert(`Added ${item.name} to your cart!`);
        });
        
        container.appendChild(itemElement);
    });
}


function setupServicesPage() {
    setupServicesTabs();
    
    
    loadMenuItems('meals', 'meals');
    loadMenuItems('beverages', 'beverages');
    
    
    setupMenuSearch();
}
function setupMenuSearch() {
    const searchInput = document.getElementById('menuSearch');
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetSearch');
    
    if (!searchInput || !searchBtn || !resetBtn) return;
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (!searchTerm.trim()) return;
        
        const allItems = [...menuData.meals, ...menuData.beverages];
        const results = allItems.filter(item => 
            item.name.toLowerCase()).includes(searchTerm)
            .sort((a, b) => a.price - b.price);
        
        
        const mealsContainer = document.getElementById('meals');
        const beveragesContainer = document.getElementById('beverages');
        
        mealsContainer.innerHTML = '';
        beveragesContainer.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('p');
            noResults.textContent = 'No items found matching your search.';
            mealsContainer.appendChild(noResults);
            return;
        }
        
        results.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.innerHTML = `${item.name} - R${item.price.toFixed(2)}`;
            itemElement.style.cursor = 'pointer';
            itemElement.style.margin = '8px 0';
            
        
            const container = menuData.meals.includes(item) ? mealsContainer : beveragesContainer;
            container.appendChild(itemElement);
        });
    }
    
    function resetSearch() {
        searchInput.value = '';
        loadMenuItems('meals', 'meals');
        loadMenuItems('beverages', 'beverages');
    }
    
    searchBtn.addEventListener('click', performSearch);
    resetBtn.addEventListener('click', resetSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function setupHomePage() {
    setupOrderModal();
    loadDailySpecials();
    
}

function loadDailySpecials() {
    const specialsContainer = document.getElementById('dailySpecials');
    if (!specialsContainer) return;
    
    
    const today = new Date().getDay(); // 0-6 (Sun-Sat)
    const dailySpecials = {
        1: [ // Monday
            { name: "Monday Madness: Tripe Special", price: 65.00, desc: "Our famous tripe with pap and 3 salads" },
            { name: "Monday Beer Combo", price: 85.00, desc: "Half chicken + 2 beers" }
        ],
        3: [ // Wednesday
            { name: "Wacky Wednesday: Cow Leg Special", price: 60.00, desc: "Cow legs with pap and 3 salads" },
            { name: "Midweek Cocktail", price: 30.00, desc: "Special house cocktail" }
        ],
        5: [ // Friday
            { name: "Friday Feast: Full Chicken Combo", price: 110.00, desc: "Full chicken with pap and 3 salads + 2 drinks" },
            { name: "Weekend Starter", price: 45.00, desc: "Chicken feet with special sauce" }
        ],
        default: [
            { name: "Chef's Special", price: 75.00, desc: "Ask your server about today's chef special" },
            { name: "Drink of the Day", price: 20.00, desc: "Special discounted beverage" }
        ]
    };
    
    const todaysSpecials = dailySpecials[today] || dailySpecials.default;
    
    specialsContainer.innerHTML = '';
    todaysSpecials.forEach(special => {
        const specialElement = document.createElement('div');
        specialElement.className = 'special-item';
        specialElement.innerHTML = `
            <div>
                <h3>${special.name}</h3>
                <div class="special-desc">${special.desc}</div>
            </div>
            <div class="special-price">R${special.price.toFixed(2)}</div>
        `;
        specialsContainer.appendChild(specialElement);
    });
}
function loadEvents() {
    
    const events = [
        {
            title: "Live Music Friday",
            date: "2025-07-15",
            time: "19:00",
            description: "Enjoy our delicious food with live jazz performances",
            price: "Free entry"
        },
        {
            title: "Traditional Food Festival",
            date: "2025-08-20",
            time: "12:00-22:00",
            description: "A celebration of African culinary traditions",
            price: "R50 entry (food purchased separately)"
        }
    ];
    
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = '';
    
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-card';
        eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <div class="event-date">${formatDate(event.date)} at ${event.time}</div>
            <p>${event.description}</p>
            <div class="event-price">${event.price}</div>
            <button class="rsvp-btn">RSVP</button>
        `;
        eventsContainer.appendChild(eventElement);
    });
    
    // Add event listeners to RSVP buttons
    document.querySelectorAll('.rsvp-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventTitle = this.closest('.event-card').querySelector('h3').textContent;
            alert(`Thank you for your interest in "${eventTitle}". We'll contact you with details.`);
        });
    });
}

function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-ZA', options);
}

function loadGoogleReviews() {
    // In a real implementation, you would use the Google My Business API
    // This is a placeholder that simulates fetching reviews
    const reviews = [
        { author: "Sarah M.", rating: 5, text: "The tripe here is amazing! Authentic flavors and great service." },
        { author: "James K.", rating: 4, text: "Best African restaurant in Midrand. Cow legs are a must-try!" }
    ];
    
    const container = document.getElementById('google-reviews-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    reviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <div class="review-rating">${stars}</div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-author">- ${review.author}</div>
        `;
        container.appendChild(reviewElement);
    });
}


loadGoogleReviews();
document.getElementById('email-review-request').addEventListener('click', function() {
    const email = prompt("Please enter your email address to receive review links:");
    if (email) {
    
        alert(`Thank you! Review links will be sent to ${email}.`);
        
        
        // fetch('/send-review-email', {
        //     method: 'POST',
        //     body: JSON.stringify({ email: email }),
        //     headers: { 'Content-Type': 'application/json' }
        // });
    }
});
<script>
// Simple performance monitoring
window.addEventListener('load', function()) 
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    
    if (loadTime  3000) 
        console.warn('Page load took ' + loadTime + 'ms - Consider optimizing');
        
        // Send to analytics (example)
        if (navigator.sendBeacon) 
            const data = new FormData();
            data.append('load_time', loadTime);
            navigator.sendBeacon('/perf-log', data);
          
</script>
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for event date picker to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate').min = today;

    // Dynamic form fields based on enquiry type
    const enquiryType = document.getElementById('enquiryType');
    enquiryType.addEventListener('change', function() {
        const eventDateGroup = document.getElementById('eventDateGroup');
        const guestCountGroup = document.getElementById('guestCountGroup');
        
        if (this.value === 'catering' || this.value === 'event') {
            eventDateGroup.style.display = 'flex';
            guestCountGroup.style.display = 'flex';
        } else {
            eventDateGroup.style.display = 'none';
            guestCountGroup.style.display = 'none';
        }
    });

    // Form validation and submission
    setupFormValidation('serviceEnquiryForm', handleServiceEnquiry);
    setupFormValidation('volunteerForm', handleVolunteerApplication);
});

function setupFormValidation(formId, submitHandler) {
    const form = document.getElementById(formId);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors(form);
        
        if (validateForm(form)) {
            submitHandler(form);
        }
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !validateEmail(field.value)) {
            showError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.hasAttribute('minlength') && field.value.length < field.getAttribute('minlength')) {
            showError(field, `Must be at least ${field.getAttribute('minlength')} characters`);
            isValid = false;
        } else if (field.type === 'tel' && field.value && !field.checkValidity()) {
            showError(field, 'Please enter a valid 10-digit phone number');
            isValid = false;
        }
    });
    
    return isValid;
}

function showError(field, message) {
    const errorElement = document.getElementById(`${field.id}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        field.classList.add('error-border');
    }
}

function clearErrors(form) {
    form.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    form.querySelectorAll('.error-border').forEach(el => {
        el.classList.remove('error-border');
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function handleServiceEnquiry(form) {
    const formData = new FormData(form);
    const responseMessage = document.getElementById('responseMessage');
    
    // Simulate form submission
    setTimeout(() => {
        const enquiryType = formData.get('enquiryType');
        let responseText = '';
        
        switch(enquiryType) {
            case 'catering':
                responseText = `Thank you for your catering enquiry! Our team will contact you within 24 hours to discuss your event on ${formData.get('eventDate')} for ${formData.get('guestCount')} guests.`;
                break;
            case 'event':
                responseText = `Thank you for your event booking enquiry! We'll check availability for ${formData.get('eventDate')} and contact you shortly.`;
                break;
            case 'volunteer':
                responseText = 'Thank you for your interest in volunteering! Our volunteer coordinator will contact you to discuss opportunities.';
                break;
            case 'sponsorship':
                responseText = 'Thank you for your sponsorship enquiry! Our partnerships manager will contact you to discuss possibilities.';
                break;
            default:
                responseText = 'Thank you for your enquiry! We will respond as soon as possible.';
        }
        
        showResponse(responseMessage, responseText, 'success');
        form.reset();
    }, 1000);
}

function handleVolunteerApplication(form) {
    const formData = new FormData(form);
    const responseMessage = document.getElementById('volunteerResponse');
    
    setTimeout(() => {
        const responseText = `Thank you, ${formData.get('volunteerName')}, for your volunteer application! We appreciate your interest in supporting Mashesha Flavor Haven. Our team will review your application and contact you within 3-5 business days.`;
        
        showResponse(responseMessage, responseText, 'success');
        form.reset();
    }, 1000);
}

function showResponse(element, message, type) {
    element.textContent = message;
    element.className = `response-message ${type}`;
    element.style.display = 'block';
    
    element.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 10000);
}
setupFormValidation('contactForm', handleContactForm);

function handleContactForm(form) {
    const formData = new FormData(form);
    const responseMessage = document.getElementById('contactResponse');
    
    // Simulate form submission
    setTimeout(() => {
        const subject = formData.get('contactSubject');
        let responseText = '';
        
        switch(subject) {
            case 'reservation':
                responseText = 'Thank you for your reservation inquiry! Our team will contact you shortly to assist with your booking.';
                break;
            case 'feedback':
                responseText = 'We appreciate your feedback! Your suggestions help us improve our services.';
                break;
            case 'complaint':
                responseText = 'We apologize for any inconvenience. Our customer service team will address your concern within 24 hours.';
                break;
            default:
                responseText = 'Thank you for your message! We will respond to your inquiry as soon as possible.';
        }
        
        showResponse(responseMessage, responseText, 'success');
        form.reset();
    }, 1000);
}
