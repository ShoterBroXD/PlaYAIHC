// Community functionality for community.html

// Community data
const communityData = [
    { name: "Michael Jackson", followers: "75B", description: "El Rey del Pop y sus mejores éxitos." },
    { name: "Madonna", followers: "62B", description: "La Reina del Pop y su música icónica." },
    { name: "The Beatles", followers: "89B", description: "La banda más influyente de todos los tiempos." },
    { name: "Queen", followers: "71B", description: "Rock legendario con Freddie Mercury." },
    { name: "Elvis Presley", followers: "55B", description: "El Rey del Rock and Roll." },
    { name: "Bob Dylan", followers: "43B", description: "Poeta y músico legendario." },
    { name: "Prince", followers: "38B", description: "Genio musical y artista innovador." },
    { name: "Whitney Houston", followers: "41B", description: "Una de las mejores voces de la historia." },
    // Segunda sección - Top en PlaYA!
    { name: "Taylor Swift", followers: "95B", description: "Superestrella del pop moderno." },
    { name: "Ed Sheeran", followers: "73B", description: "Cantautor británico fenomenal." },
    { name: "Ariana Grande", followers: "68B", description: "Voz poderosa y hits contemporáneos." },
    { name: "Drake", followers: "82B", description: "Rapper y artista más reproducido." },
    { name: "Billie Eilish", followers: "59B", description: "Nueva generación de música alternativa." },
    { name: "The Weeknd", followers: "65B", description: "R&B moderno y sonidos únicos." },
    { name: "Dua Lipa", followers: "57B", description: "Pop dance y energía británica." },
    { name: "Bruno Mars", followers: "61B", description: "Showman excepcional y hits inolvidables." }
];

document.addEventListener('DOMContentLoaded', function() {
    // Update community cards with varied data
    updateCommunityCards();
    
    // Add click handlers to community cards
    addCommunityClickHandlers();
    
    // Load joined communities status
    loadJoinedCommunitiesStatus();
    
    // Create and manage "Tus Comunidades" section
    createYourCommunitiesSection();
    
    // Handle sidebar navigation
    handleSidebarNavigation();
    
    // Update all community sections
    setTimeout(() => {
        updateAllCommunitySections();
        updateSidebarCommunityCount();
    }, 100);
});

function updateCommunityCards() {
    const communityCards = document.querySelectorAll('.community-card');
    
    communityCards.forEach((card, index) => {
        if (index < communityData.length) {
            const data = communityData[index];
            
            // Update title
            const titleElement = card.querySelector('.community-tittle');
            if (titleElement) {
                titleElement.textContent = data.name;
            }
            
            // Update followers
            const detailsElement = card.querySelector('.community-details');
            if (detailsElement) {
                detailsElement.textContent = `${data.followers} seguidores`;
            }
            
            // Update description
            const descriptionElement = card.querySelector('.community-description');
            if (descriptionElement) {
                descriptionElement.textContent = data.description;
            }
        }
    });
}

function addCommunityClickHandlers() {
    const communityCards = document.querySelectorAll('.community-card');
    
    communityCards.forEach((card, index) => {
        // Add cursor pointer style
        card.style.cursor = 'pointer';
        
        // Add click handler
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button
            if (e.target.classList.contains('filter-button')) {
                return;
            }
            
            // Use community data if available, otherwise fallback to DOM content
            let communityName, communityFollowers, communityDescription;
            
            if (index < communityData.length) {
                const data = communityData[index];
                communityName = data.name;
                communityFollowers = data.followers;
                communityDescription = data.description;
            } else {
                // Fallback to DOM content
                const titleElement = card.querySelector('.community-tittle');
                const detailsElement = card.querySelector('.community-details');
                const descriptionElement = card.querySelector('.community-description');
                
                communityName = titleElement ? titleElement.textContent : `Comunidad ${index + 1}`;
                communityFollowers = detailsElement ? detailsElement.textContent.replace(' seguidores', '') : '50B';
                communityDescription = descriptionElement ? descriptionElement.textContent : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            }
            
            // Navigate to community detail page
            goToCommunityDetail(index + 1, communityName, communityFollowers, communityDescription);
        });
        
        // Add button click handler
        const button = card.querySelector('.filter-button');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleJoinCommunity(this, index + 1);
            });
        }
    });
}

function goToCommunityDetail(id, name, followers, description) {
    // Create URL with parameters
    const params = new URLSearchParams({
        id: id,
        name: name,
        followers: followers,
        description: description
    });
    
    // Navigate to community detail page
    window.location.href = `/pages/community-detail.html?${params.toString()}`;
}

function toggleJoinCommunity(button, communityId) {
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    const isJoined = joinedCommunities.includes(communityId.toString());
    
    if (isJoined) {
        // Leave community
        const updatedCommunities = joinedCommunities.filter(id => id !== communityId.toString());
        localStorage.setItem('joinedCommunities', JSON.stringify(updatedCommunities));
        button.textContent = 'Unirse';
        button.classList.remove('joined');
        showNotification('Has abandonado la comunidad', 'info');
    } else {
        // Join community
        joinedCommunities.push(communityId.toString());
        localStorage.setItem('joinedCommunities', JSON.stringify(joinedCommunities));
        button.textContent = 'Abandonar';
        button.classList.add('joined');
        showNotification('Te has unido a la comunidad!', 'success');
    }
    
    // Update all community sections after join/leave action
    setTimeout(() => {
        updateAllCommunitySections();
    }, 100);
}

function loadJoinedCommunitiesStatus() {
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    const buttons = document.querySelectorAll('.filter-button');
    
    buttons.forEach((button, index) => {
        if (joinedCommunities.includes((index + 1).toString())) {
            button.textContent = 'Abandonar';
            button.classList.add('joined');
        }
    });
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
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Function to create "Tus Comunidades" section
function createYourCommunitiesSection() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Check if section already exists
    if (document.getElementById('your-communities-section')) return;
    
    const yourCommunitiesHTML = `
        <section class="content-section" id="your-communities-section">
            <div class="lib-subtitle-container">
                <p class="subtitle-lib">Tus Comunidades</p>
            </div>
            <div class="c-row" id="your-communities-row">
                <div class="ca">
                    <div class="no-communities-message" style="text-align: center; padding: 2rem; color: #666;">
                        <p>No tienes comunidades seguidas aún.</p>
                        <p>¡Únete a algunas comunidades para verlas aquí!</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Insert at the beginning of main content
    mainContent.insertAdjacentHTML('afterbegin', yourCommunitiesHTML);
}

// Function to update community sections based on joined communities
function updateCommunitySections() {
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    const yourCommunitiesRow = document.getElementById('your-communities-row');
    
    if (!yourCommunitiesRow) return;
    
    // Clear current content
    yourCommunitiesRow.innerHTML = '';
    
    // Debug: log joined communities
    console.log('Joined communities:', joinedCommunities);
    
    if (joinedCommunities.length === 0) {
        // Show no communities message
        yourCommunitiesRow.innerHTML = `
            <div class="ca">
                <div class="no-communities-message" style="text-align: center; padding: 2rem; color: #666;">
                    <p>No tienes comunidades seguidas aún.</p>
                    <p>¡Únete a algunas comunidades para verlas aquí!</p>
                </div>
            </div>
        `;
    } else {
        // Show joined communities
        joinedCommunities.forEach(communityId => {
            const communityIndex = parseInt(communityId) - 1;
            if (communityIndex >= 0 && communityIndex < communityData.length) {
                const community = communityData[communityIndex];
                const communityHTML = createCommunityCardHTML(community, communityId, true);
                yourCommunitiesRow.insertAdjacentHTML('beforeend', communityHTML);
            }
        });
        
        // Re-add click handlers for the new cards
        addClickHandlersToYourCommunities();
    }
}

// Function to create HTML for a community card
function createCommunityCardHTML(community, communityId, isJoined = false) {
    const buttonText = isJoined ? 'Abandonar' : 'Unirse';
    const buttonClass = isJoined ? 'filter-button joined' : 'filter-button';
    
    return `
        <div class="ca">
            <div class="community-card" data-community-id="${communityId}">
                <div class="card-content">
                    <img src="/assets//img/images/perfil-comunidades.png" alt="Icono de comunidad" class="community-icon">
                    <div class="community-text">
                        <p class="community-tittle">${community.name}</p>
                        <p class="community-details">${community.followers} seguidores</p>
                        <p class="community-description">${community.description}</p>
                    </div>
                </div>
                <button class="${buttonClass}" onclick="event.stopPropagation(); toggleJoinCommunity(this, '${communityId}')">${buttonText}</button>
            </div>
        </div>
    `;
}

// Function to add click handlers to "Tus Comunidades" cards
function addClickHandlersToYourCommunities() {
    const yourCommunitiesCards = document.querySelectorAll('#your-communities-section .community-card');
    
    yourCommunitiesCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-button')) {
                return;
            }
            
            const communityId = this.dataset.communityId;
            const communityIndex = parseInt(communityId) - 1;
            
            if (communityIndex >= 0 && communityIndex < communityData.length) {
                const community = communityData[communityIndex];
                goToCommunityDetail(communityId, community.name, community.followers, community.description);
            }
        });
    });
}

// Function to filter communities in other sections (hide joined ones)
function filterCommunitiesInOtherSections() {
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    const allCommunityCards = document.querySelectorAll('.community-card:not(#your-communities-section .community-card)');
    
    allCommunityCards.forEach((card, index) => {
        const communityId = (index + 1).toString();
        const cardContainer = card.closest('.ca');
        
        if (cardContainer) {
            if (joinedCommunities.includes(communityId)) {
                // Hide joined communities from other sections
                cardContainer.style.display = 'none';
            } else {
                // Show non-joined communities
                cardContainer.style.display = 'block';
            }
        }
    });
}

// Enhanced function to update all community sections
function updateAllCommunitySections() {
    updateCommunitySections();
    filterCommunitiesInOtherSections();
    updateSidebarCommunityCount();
}

// Function to handle sidebar navigation for "Tus Comunidades"
function handleSidebarNavigation() {
    const tusComundadesLink = document.querySelector('a[href="/pages/com_liked.html"]');
    if (tusComundadesLink) {
        tusComundadesLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update sidebar active state
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show only "Tus Comunidades" section and hide others
            showOnlyYourCommunities();
            
            // Force update of community count
            updateSidebarCommunityCount();
            
            // Show notification
            showNotification('Mostrando tus comunidades seguidas', 'info');
        });
    }
    
    // Handle return to main page
    const mainPageLink = document.querySelector('a[href="/pages/community.html"]');
    if (mainPageLink) {
        mainPageLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update sidebar active state
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show all sections
            showAllCommunitySections();
        });
    }
}

// Function to show only "Tus Comunidades" section
function showOnlyYourCommunities() {
    const allSections = document.querySelectorAll('.content-section');
    const yourCommunitiesSection = document.getElementById('your-communities-section');
    
    // Hide all sections except "Tus Comunidades"
    allSections.forEach(section => {
        if (section.id !== 'your-communities-section') {
            section.style.display = 'none';
        }
    });
    
    // Show "Tus Comunidades" section
    if (yourCommunitiesSection) {
        yourCommunitiesSection.style.display = 'block';
    }
    
    // Update the section to ensure it has the latest data
    updateCommunitySections();
    
    // Scroll to the section
    if (yourCommunitiesSection) {
        yourCommunitiesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to show all community sections
function showAllCommunitySections() {
    const allSections = document.querySelectorAll('.content-section');
    
    // Show all sections
    allSections.forEach(section => {
        section.style.display = 'block';
    });
    
    // Update all sections
    updateAllCommunitySections();
}

// Function to add community count indicator to sidebar
function updateSidebarCommunityCount() {
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    const tusComundadesLink = document.querySelector('a[href="/pages/com_liked.html"] span:first-of-type');
    
    if (tusComundadesLink) {
        const count = joinedCommunities.length;
        const currentText = tusComundadesLink.textContent;
        
        // Remove existing count if any
        const baseText = currentText.replace(/\s*\(\d+\)$/, '');
        
        // Add new count
        if (count > 0) {
            tusComundadesLink.textContent = `${baseText} (${count})`;
        } else {
            tusComundadesLink.textContent = baseText;
        }
    }
}
