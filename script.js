// Global variables
let allPlans = [];
let filteredPlans = [];

// DOM elements
const plansGrid = document.getElementById('plansGrid');
const resultsCount = document.getElementById('resultsCount');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const sortSelect = document.getElementById('sortBy');
const priceRange = document.getElementById('priceRange');
const maxPriceDisplay = document.getElementById('maxPrice');

// Filter elements
const providerFilters = document.querySelectorAll('.provider-filter');
const dataFilters = document.querySelectorAll('.data-filter');
const networkFilters = document.querySelectorAll('.network-filter');
const contractFilters = document.querySelectorAll('.contract-filter');
const resetButton = document.querySelector('.reset-filters');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadPlans();
    setupEventListeners();
});

// Load plans from JSON file
async function loadPlans() {
    try {
        const response = await fetch('plans.json');
        allPlans = await response.json();
        filteredPlans = [...allPlans];
        hideLoading();
        applyFilters();
    } catch (error) {
        console.error('Error loading plans:', error);
        hideLoading();
        showNoResults();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Provider filters
    providerFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Data filters
    dataFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Network filters
    networkFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Contract filters
    contractFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Price range
    priceRange.addEventListener('input', function() {
        maxPriceDisplay.textContent = this.value + '€';
        applyFilters();
    });

    // Sort selection
    sortSelect.addEventListener('change', applySorting);

    // Reset filters
    resetButton.addEventListener('click', resetFilters);
}

// Apply all filters
function applyFilters() {
    const selectedProviders = Array.from(providerFilters)
        .filter(f => f.checked)
        .map(f => f.value);

    const selectedDataRanges = Array.from(dataFilters)
        .filter(f => f.checked)
        .map(f => f.value);

    const selectedNetworks = Array.from(networkFilters)
        .filter(f => f.checked)
        .map(f => f.value);

    const selectedContracts = Array.from(contractFilters)
        .filter(f => f.checked)
        .map(f => f.value);

    const maxPrice = parseFloat(priceRange.value);

    filteredPlans = allPlans.filter(plan => {
        // Provider filter
        if (!selectedProviders.includes(plan.provider)) {
            return false;
        }

        // Price filter
        if (plan.price > maxPrice) {
            return false;
        }

        // Data filter
        if (!matchesDataFilter(plan, selectedDataRanges)) {
            return false;
        }

        // Network filter
        if (!selectedNetworks.includes(plan.network)) {
            return false;
        }

        // Contract filter
        if (!selectedContracts.includes(plan.contract)) {
            return false;
        }

        return true;
    });

    applySorting();
}

// Check if plan matches data filter
function matchesDataFilter(plan, selectedRanges) {
    if (selectedRanges.length === 0) return false;

    for (let range of selectedRanges) {
        switch (range) {
            case 'unlimited':
                if (plan.isUnlimited) return true;
                break;
            case '100+':
                if (!plan.isUnlimited && parseInt(plan.data) >= 100) return true;
                break;
            case '50-99':
                if (!plan.isUnlimited && parseInt(plan.data) >= 50 && parseInt(plan.data) <= 99) return true;
                break;
            case '20-49':
                if (!plan.isUnlimited && parseInt(plan.data) >= 20 && parseInt(plan.data) <= 49) return true;
                break;
            case '0-19':
                if (!plan.isUnlimited && parseInt(plan.data) < 20) return true;
                break;
        }
    }

    return false;
}

// Apply sorting
function applySorting() {
    const sortBy = sortSelect.value;

    switch (sortBy) {
        case 'price-asc':
            filteredPlans.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredPlans.sort((a, b) => b.price - a.price);
            break;
        case 'data-desc':
            filteredPlans.sort((a, b) => {
                if (a.isUnlimited && !b.isUnlimited) return -1;
                if (!a.isUnlimited && b.isUnlimited) return 1;
                if (a.isUnlimited && b.isUnlimited) return 0;
                return parseInt(b.data) - parseInt(a.data);
            });
            break;
        case 'provider':
            filteredPlans.sort((a, b) => a.provider.localeCompare(b.provider));
            break;
        case 'name':
            filteredPlans.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    renderPlans();
}

// Render plans to the grid
function renderPlans() {
    if (filteredPlans.length === 0) {
        showNoResults();
        return;
    }

    hideNoResults();
    
    plansGrid.innerHTML = filteredPlans.map(plan => createPlanCard(plan)).join('');
    updateResultsCount();
}

// Create a plan card HTML
function createPlanCard(plan) {
    const dataDisplay = plan.isUnlimited ? 'Illimité' : `${plan.data} Go`;
    const originalPriceDisplay = plan.originalPrice ? 
        `<span style="text-decoration: line-through; color: #9ca3af; font-size: 0.9rem; margin-right:8px">${formatPrice(plan.originalPrice)}€</span>` : '';
    const logoPath = `assets/logos/${plan.provider}.svg`;
    
    return `
        <div class="plan-card ${plan.special ? 'featured' : ''}">
            <div class="plan-header">
                <div class="provider-badge provider-${plan.provider}">
                    <span class="provider-logo"><img src="${logoPath}" alt="${plan.subBrand} logo" onerror="this.style.display='none'"/></span>
                </div>
                <h3 class="plan-name">${plan.name}</h3>
                <div class="plan-price">
                    ${originalPriceDisplay}
                    ${formatPrice(plan.price)}€<span class="currency">/mois</span>
                </div>
            </div>
            <div class="plan-body">
                <div class="plan-features">
                    <div class="feature">
                        <span class="feature-icon"></span>
                        <span><strong>${dataDisplay}</strong> de data mobile</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon"></span>
                        <span><strong>${plan.calls}</strong> d'appels</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon"></span>
                        <span><strong>${plan.sms}</strong> SMS</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon"></span>
                        <span>Réseau <strong>${plan.network.toUpperCase()}</strong></span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon"></span>
                        <span><strong>${getContractDisplay(plan.contract)}</strong></span>
                    </div>
                    ${plan.features.slice(0, 3).map(feature => `
                        <div class="feature">
                            <span class="feature-icon"></span>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="plan-footer">
                <button class="plan-cta" onclick="window.open('${plan.link}', '_blank')">
                    Voir l'offre
                </button>
            </div>
        </div>
    `;
}

// Get contract display text
function getContractDisplay(contract) {
    switch (contract) {
        case 'sans-engagement': return 'Sans engagement';
        case '12-mois': return 'Engagement 12 mois';
        case '24-mois': return 'Engagement 24 mois';
        default: return contract;
    }
}

// Update results count
function updateResultsCount() {
    const count = filteredPlans.length;
    const total = allPlans.length;
    resultsCount.textContent = `${count} forfait${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''} sur ${total}`;
}

// Reset all filters
function resetFilters() {
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });

    // Reset price range
    priceRange.value = 100;
    maxPriceDisplay.textContent = '100€';

    // Reset sort
    sortSelect.value = 'price-asc';

    // Apply filters
    applyFilters();
}

// Show/hide loading state
function hideLoading() {
    loading.style.display = 'none';
}

function showLoading() {
    loading.style.display = 'block';
    plansGrid.innerHTML = '';
    noResults.style.display = 'none';
}

// Show/hide no results state
function showNoResults() {
    noResults.style.display = 'block';
    plansGrid.innerHTML = '';
    resultsCount.textContent = '0 forfait trouvé';
}

function hideNoResults() {
    noResults.style.display = 'none';
}

// Utility functions for price formatting
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

// Export functions for potential future use
window.ParComApp = {
    loadPlans,
    applyFilters,
    resetFilters,
    filteredPlans: () => filteredPlans,
    allPlans: () => allPlans
};