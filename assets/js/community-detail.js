// Community Detail JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load community data from URL parameters or localStorage
    loadCommunityData();
    
    // Initialize tab functionality
    initializeTabs();
    
    // Initialize join/leave functionality
    initializeJoinButton();
});

function loadCommunityData() {
    // Get community data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const communityId = urlParams.get('id');
    const communityName = urlParams.get('name');
    const communityFollowers = urlParams.get('followers');
    const communityDescription = urlParams.get('description');
    
    // If we have URL parameters, use them to populate the page
    if (communityName) {
        document.getElementById('community-name').textContent = communityName;
        document.title = `${communityName} - Comunidad`;
    }
    
    if (communityFollowers) {
        document.getElementById('community-followers').textContent = `${communityFollowers} seguidores`;
    }
    
    if (communityDescription) {
        document.getElementById('community-description').textContent = communityDescription;
    }
    
    // Store community data in localStorage for future use
    if (communityId) {
        const communityData = {
            id: communityId,
            name: communityName || 'Michael Jackson',
            followers: communityFollowers || '75B',
            description: communityDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        };
        localStorage.setItem('currentCommunity', JSON.stringify(communityData));
    }
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function initializeJoinButton() {
    const joinBtn = document.getElementById('join-btn');
    
    // Check if user is already a member
    const currentCommunity = JSON.parse(localStorage.getItem('currentCommunity') || '{}');
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    const isJoined = joinedCommunities.some(community => community.id === currentCommunity.id);
    
    if (isJoined) {
        joinBtn.textContent = 'Abandonar';
        joinBtn.classList.add('joined');
    }
    
    joinBtn.addEventListener('click', function() {
        if (this.textContent === 'Unirse') {
            joinCommunity();
        } else {
            leaveCommunity();
        }
    });
}

function joinCommunity() {
    const currentCommunity = JSON.parse(localStorage.getItem('currentCommunity') || '{}');
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    
    // Add community to joined list if not already there
    if (!joinedCommunities.some(community => community.id === currentCommunity.id)) {
        joinedCommunities.push(currentCommunity);
        localStorage.setItem('joinedCommunities', JSON.stringify(joinedCommunities));
    }
    
    // Update button
    const joinBtn = document.getElementById('join-btn');
    joinBtn.textContent = 'Abandonar';
    joinBtn.classList.add('joined');
    
    // Show success message
    showNotification('Te has unido a la comunidad exitosamente!', 'success');
}

function leaveCommunity() {
    const currentCommunity = JSON.parse(localStorage.getItem('currentCommunity') || '{}');
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    
    // Remove community from joined list
    const updatedCommunities = joinedCommunities.filter(community => community.id !== currentCommunity.id);
    localStorage.setItem('joinedCommunities', JSON.stringify(updatedCommunities));
    
    // Update button
    const joinBtn = document.getElementById('join-btn');
    joinBtn.textContent = 'Unirse';
    joinBtn.classList.remove('joined');
    
    // Show success message
    showNotification('Has abandonado la comunidad', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize post interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('post-action-btn')) {
        e.preventDefault();
        
        // Simple interaction feedback
        const originalText = e.target.textContent;
        e.target.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
        
        // If it's a like button, toggle the count
        if (originalText.includes('❤️')) {
            const isLiked = e.target.classList.contains('liked');
            const countMatch = originalText.match(/\d+/);
            let count = countMatch ? parseInt(countMatch[0]) : 0;
            
            if (isLiked) {
                count--;
                e.target.classList.remove('liked');
            } else {
                count++;
                e.target.classList.add('liked');
            }
            
            e.target.textContent = `❤️ ${count}`;
        }
    }
    
    if (e.target.classList.contains('play-btn')) {
        e.preventDefault();
        
        // Toggle play/pause
        if (e.target.textContent === '▶️') {
            e.target.textContent = '⏸️';
            showNotification('Reproduciendo...', 'info');
        } else {
            e.target.textContent = '▶️';
            showNotification('Pausado', 'info');
        }
    }
});
