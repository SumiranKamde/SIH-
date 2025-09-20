// CODEHEX - Smart Temple Crowd Management System for SIH 2025
class SmartTempleApp {
    constructor() {
        this.currentMode = 'pilgrim';
        this.activeTab = 'dashboard';
        this.chart = null;
        this.updateInterval = null;
        this.selectedTemple = null;
        
        // Application data from the provided JSON
        this.temples = [
            {
                id: 1,
                name: "Somnath Temple",
                location: "Somnath, Gujarat", 
                greeting: "🙏 Jay Somnath",
                description: "First Jyotirlinga of Lord Shiva, rebuilt multiple times",
                currentCrowd: 4200,
                capacity: 6000,
                dailyAverage: 22000,
                annualVisitors: "80 lakh",
                festivalPeak: "2-3 lakh daily",
                waitTime: "45 minutes",
                parkingAvailable: 245,
                parkingCapacity: 500,
                emergencyStatus: "normal",
                coordinates: {lat: 20.8880, lng: 70.4017},
                artiTimings: ["6:00 AM", "12:00 PM", "7:00 PM"],
                specialFeatures: ["Sea view", "Light & Sound show", "Museum"],
                crowdZones: {
                    main_temple: 85,
                    queue_area: 78,
                    parking: 49,
                    food_court: 32,
                    museum: 15
                }
            },
            {
                id: 2,
                name: "Dwarkadhish Temple",
                location: "Dwarka, Gujarat",
                greeting: "🙏 Dwarkadheesh Ki Jay",
                description: "Krishna's ancient kingdom capital temple",
                currentCrowd: 3150,
                capacity: 4500,
                dailyAverage: 18000,
                annualVisitors: "50 lakh", 
                festivalPeak: "2-3 lakh daily",
                waitTime: "35 minutes",
                parkingAvailable: 123,
                parkingCapacity: 300,
                emergencyStatus: "normal",
                coordinates: {lat: 22.2394, lng: 68.9678},
                artiTimings: ["5:30 AM", "12:30 PM", "8:30 PM"],
                specialFeatures: ["Ancient architecture", "Gomti Ghat", "Rukmini Temple nearby"],
                crowdZones: {
                    main_temple: 92,
                    queue_area: 87,
                    parking: 41,
                    ghat_area: 55,
                    market: 63
                }
            },
            {
                id: 3,
                name: "Ambaji Temple",
                location: "Ambaji, Gujarat",
                greeting: "🙏 Jay Ambaji Ma",
                description: "Sacred Shakti Peeth dedicated to Goddess Amba",
                currentCrowd: 2800,
                capacity: 4000,
                dailyAverage: 15000,
                annualVisitors: "40 lakh",
                festivalPeak: "1.5 lakh daily",
                waitTime: "25 minutes",
                parkingAvailable: 89,
                parkingCapacity: 250,
                emergencyStatus: "caution",
                coordinates: {lat: 24.2197, lng: 72.8661},
                artiTimings: ["4:00 AM", "12:00 PM", "8:00 PM"],
                specialFeatures: ["Gabbar Hill", "Koteshwar", "Kailash Hill"],
                crowdZones: {
                    main_temple: 88,
                    hill_path: 75,
                    parking: 36,
                    prasad_area: 42,
                    shops: 58
                }
            },
            {
                id: 4,
                name: "Pavagadh Temple",
                location: "Pavagadh, Gujarat",
                greeting: "🙏 Jay Kalika Ma",
                description: "Kalika Mata Temple atop Pavagadh Hill",
                currentCrowd: 1950,
                capacity: 3000,
                dailyAverage: 12000,
                annualVisitors: "25 lakh",
                festivalPeak: "80,000 daily",
                waitTime: "20 minutes",
                parkingAvailable: 67,
                parkingCapacity: 200,
                emergencyStatus: "normal",
                coordinates: {lat: 22.4862, lng: 73.5292},
                artiTimings: ["5:00 AM", "12:30 PM", "7:30 PM"],
                specialFeatures: ["Ropeway", "Archaeological park", "Hill fort"],
                crowdZones: {
                    main_temple: 65,
                    ropeway_station: 82,
                    parking: 34,
                    fort_area: 28,
                    base_temple: 45
                }
            }
        ];

        this.crowdPredictions = [
            {time: "05:00", actual: 850, predicted: 900, confidence: 95},
            {time: "06:00", actual: 2400, predicted: 2300, confidence: 92},
            {time: "07:00", actual: 3800, predicted: 3900, confidence: 89},
            {time: "08:00", actual: 4200, predicted: 4100, confidence: 91},
            {time: "09:00", actual: 3600, predicted: 3700, confidence: 88},
            {time: "10:00", actual: 2900, predicted: 3000, confidence: 90},
            {time: "11:00", actual: 2200, predicted: 2300, confidence: 92},
            {time: "12:00", actual: 3100, predicted: 3200, confidence: 87},
            {time: "13:00", actual: 2800, predicted: 2700, confidence: 89},
            {time: "14:00", actual: 2300, predicted: 2400, confidence: 91},
            {time: "15:00", actual: 2600, predicted: 2500, confidence: 90},
            {time: "16:00", actual: 2900, predicted: 3000, confidence: 88},
            {time: "17:00", actual: 3400, predicted: 3300, confidence: 86},
            {time: "18:00", actual: 3800, predicted: 3900, confidence: 84},
            {time: "19:00", actual: 4000, predicted: 4100, confidence: 87},
            {time: "20:00", actual: 3200, predicted: 3100, confidence: 89}
        ];

        this.emergencyAlerts = [
            {
                id: "EMRG001",
                temple: "Somnath Temple",
                type: "medical_emergency",
                severity: "high",
                location: "Main Darshan Queue",
                message: "Elderly devotee needs immediate medical assistance",
                timestamp: "09:42 AM",
                status: "active",
                responders: ["Medical Team A", "Security Team 1"]
            },
            {
                id: "EMRG002", 
                temple: "Dwarkadhish Temple",
                type: "crowd_surge",
                severity: "medium",
                location: "Main Entry Gate",
                message: "Crowd density exceeding 90% threshold",
                timestamp: "09:15 AM", 
                status: "monitoring",
                responders: ["Crowd Control Team"]
            }
        ];

        this.userBookings = [
            {
                id: "BK2025092001",
                temple: "Somnath Temple",
                templeId: 1,
                date: "2025-09-20",
                slot: "10:00-11:00",
                queueNumber: "A-156",
                qrCode: "QR_SOMNATH_A156_20250920",
                status: "confirmed",
                specialAccess: "elderly",
                estimatedWait: "15 minutes"
            }
        ];

        this.festivalsCalendar = [
            {date: "2025-10-02", festival: "Dussehra", temples: ["all"], expectedCrowd: "300% increase"},
            {date: "2025-10-31", festival: "Diwali", temples: ["all"], expectedCrowd: "250% increase"},
            {date: "2025-11-15", festival: "Kartik Purnima", temples: ["Somnath", "Dwarka"], expectedCrowd: "400% increase"},
            
        ];

        this.weatherInfo = {
            temperature: "28°C",
            condition: "Partly Cloudy",
            humidity: "65%",
            windSpeed: "12 km/h",
            recommendation: "Good weather for temple visit. Carry water bottle."
        };
    }

    init() {
        console.log('Initializing CODEHEX Smart Temple Management System...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        console.log('Setting up application components...');
        
        // Add a small delay to ensure DOM is fully ready
        setTimeout(() => {
            this.setupEventListeners();
            this.renderDashboard();
            this.renderTemples();
            this.renderBookings();
            this.renderFestivals();
            this.renderEmergencyAlerts();
            this.updateDashboardStats();
            this.updateGreeting();
            this.startRealTimeUpdates();
            
            console.log('CODEHEX App initialized successfully');
        }, 100);
        
        // Initialize chart after a longer delay to ensure canvas is ready
        setTimeout(() => {
            if (this.activeTab === 'analytics') {
                this.initChart();
            }
        }, 500);
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Tab navigation - improved with better event handling
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tabName = e.currentTarget.getAttribute('data-tab');
                console.log('Tab clicked:', tabName);
                this.switchTab(tabName);
            });
        });

        // User mode toggle - improved
        const userToggle = document.getElementById('userToggle');
        if (userToggle) {
            userToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('User toggle clicked');
                this.toggleUserMode();
            });
        }

        // SOS Button - improved with better feedback
        const sosButton = document.getElementById('sosButton');
        if (sosButton) {
            sosButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('SOS button clicked');
                this.triggerSOS();
            });
        }

        // QR Scanner - improved
        document.addEventListener('click', (e) => {
            if (e.target.closest('#qrScanBtn') || e.target.closest('.qr-scan-btn')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('QR Scanner opened');
                this.openQRScanner();
            }
        });

        // Quick actions - improved
        document.addEventListener('click', (e) => {
            if (e.target.closest('#quickBookBtn')) {
                e.preventDefault();
                e.stopPropagation();
                this.openTempleSelection();
            }
            
            if (e.target.closest('#newBookingBtn')) {
                e.preventDefault();
                e.stopPropagation();
                this.openTempleSelection();
            }
            
            if (e.target.closest('.navigation-btn')) {
                e.preventDefault();
                e.stopPropagation();
                this.showToast('🧭', 'GPS Navigation activated - Routing to selected temple');
            }
            
            if (e.target.closest('.aarti-btn')) {
                e.preventDefault();
                e.stopPropagation();
                this.showAartiTimings();
            }
        });

        // Modal event listeners - improved
        this.setupModalListeners();
        
        // Emergency buttons - improved
        document.addEventListener('click', (e) => {
            if (e.target.closest('.emergency-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const emergencyType = e.target.closest('.emergency-btn').querySelector('span:last-child').textContent;
                this.triggerEmergencyAlert(emergencyType);
            }
        });

        // Admin controls - improved
        document.addEventListener('click', (e) => {
            if (e.target.closest('#broadcastBtn')) {
                e.preventDefault();
                e.stopPropagation();
                this.showToast('📢', 'Broadcast system activated - Alert sent to all pilgrims');
            }
            
            if (e.target.closest('#staffDeployBtn')) {
                e.preventDefault();
                e.stopPropagation();
                this.showToast('👥', 'Staff deployment initiated - Emergency teams dispatched');
            }
            
            if (e.target.closest('#generateReportBtn')) {
                e.preventDefault();
                e.stopPropagation();
                this.generateReport();
            }
            
            if (e.target.closest('.deploy-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const area = e.target.closest('.area-deployment').querySelector('.area-name').textContent;
                this.showToast('✅', `Security team deployed to ${area}`);
            }

            if (e.target.closest('#sendAlertBtn')) {
                e.preventDefault();
                e.stopPropagation();
                this.sendBroadcastAlert();
            }
        });

        // Temple operations
        const templeFilter = document.getElementById('templeFilter');
        if (templeFilter) {
            templeFilter.addEventListener('change', (e) => {
                this.filterTemples(e.target.value);
            });
        }

        const refreshBtn = document.getElementById('refreshTemples');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.refreshTempleData();
            });
        }

        // Heatmap temple selection
        const heatmapSelect = document.getElementById('heatmapTempleSelect');
        if (heatmapSelect) {
            heatmapSelect.addEventListener('change', (e) => {
                this.updateHeatmap(parseInt(e.target.value));
            });
        }

        console.log('Event listeners setup complete');
    }

    setupModalListeners() {
        // QR Modal
        const qrModalClose = document.getElementById('qrModalClose');
        const qrModalOverlay = document.getElementById('qrModalOverlay');
        const simulateScan = document.getElementById('simulateScan');
        const manualEntry = document.getElementById('manualEntry');

        if (qrModalClose) {
            qrModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('qrModal');
            });
        }
        if (qrModalOverlay) {
            qrModalOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('qrModal');
            });
        }
        if (simulateScan) {
            simulateScan.addEventListener('click', (e) => {
                e.preventDefault();
                this.simulateQRScan();
            });
        }
        if (manualEntry) {
            manualEntry.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('📝', 'Manual entry mode activated');
                this.closeModal('qrModal');
            });
        }

        // Booking Modal
        const bookingModalClose = document.getElementById('bookingModalClose');
        const bookingModalOverlay = document.getElementById('bookingModalOverlay');

        if (bookingModalClose) {
            bookingModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('bookingModal');
            });
        }
        if (bookingModalOverlay) {
            bookingModalOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('bookingModal');
            });
        }

        // Temple Selection Modal
        const templeSelectModalClose = document.getElementById('templeSelectModalClose');
        const templeSelectModalOverlay = document.getElementById('templeSelectModalOverlay');

        if (templeSelectModalClose) {
            templeSelectModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('templeSelectModal');
            });
        }
        if (templeSelectModalOverlay) {
            templeSelectModalOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('templeSelectModal');
            });
        }

        // Toast close
        const toastClose = document.getElementById('toastClose');
        if (toastClose) {
            toastClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeToast();
            });
        }

        // Booking actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('#downloadQR')) {
                e.preventDefault();
                this.showToast('📱', 'QR Code downloaded to your device');
            }
            if (e.target.closest('#shareBooking')) {
                e.preventDefault();
                this.showToast('📤', 'Booking shared via WhatsApp/SMS');
            }
        });
    }

    switchTab(tabName) {
        console.log('Switching to tab:', tabName);
        
        if (!tabName) {
            console.error('No tab name provided');
            return;
        }

        // Update active tab with improved handling
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
            console.log('Tab button activated:', tabName);
        }

        // Show corresponding content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const tabContent = document.getElementById(tabName);
        if (tabContent) {
            tabContent.classList.add('active');
            console.log('Tab content shown:', tabName);
        } else {
            console.error('Tab content not found for:', tabName);
        }

        this.activeTab = tabName;

        // Initialize specific tab content
        setTimeout(() => {
            if (tabName === 'analytics') {
                if (!this.chart) {
                    this.initChart();
                }
                this.updateHeatmap(1); // Default to Somnath
            }
        }, 200);
    }

    toggleUserMode() {
        console.log('Toggling user mode from:', this.currentMode);
        const userToggle = document.getElementById('userToggle');
        const body = document.body;
        
        if (this.currentMode === 'pilgrim') {
            this.currentMode = 'admin';
            if (userToggle) {
                userToggle.setAttribute('data-mode', 'admin');
                const label = userToggle.querySelector('.toggle-label');
                if (label) label.textContent = 'Admin';
            }
            body.classList.add('admin-mode');
            this.showToast('⚙️', 'Admin Control Center Activated - Full System Access Granted');
            
            // Update greeting for admin mode
            const greetingEl = document.getElementById('greetingText');
            if (greetingEl) {
                greetingEl.textContent = '🔐 Admin Mode Active';
            }
        } else {
            this.currentMode = 'pilgrim';
            if (userToggle) {
                userToggle.setAttribute('data-mode', 'pilgrim');
                const label = userToggle.querySelector('.toggle-label');
                if (label) label.textContent = 'Pilgrim';
            }
            body.classList.remove('admin-mode');
            this.showToast('🙏', 'Welcome back, Pilgrim - Temple services ready');
            
            // Resume normal greeting cycle
            this.updateGreeting();
        }
        
        console.log('User mode changed to:', this.currentMode);
    }

    renderDashboard() {
        const liveTempleCards = document.getElementById('liveTempleCards');
        if (!liveTempleCards) return;

        liveTempleCards.innerHTML = '';

        this.temples.forEach(temple => {
            const crowdPercentage = (temple.currentCrowd / temple.capacity) * 100;
            
            let crowdStatus, statusClass;
            if (crowdPercentage < 50) {
                crowdStatus = 'Safe';
                statusClass = 'safe';
            } else if (crowdPercentage < 80) {
                crowdStatus = 'Moderate';
                statusClass = 'moderate';
            } else {
                crowdStatus = 'Crowded';
                statusClass = 'crowded';
            }

            const templeCard = document.createElement('div');
            templeCard.className = `temple-live-card ${statusClass}`;
            templeCard.innerHTML = `
                <div class="temple-live-header">
                    <div>
                        <div class="temple-live-name">${temple.name}</div>
                        <div class="temple-live-greeting">${temple.greeting}</div>
                    </div>
                    <div class="crowd-status ${statusClass}">${crowdStatus}</div>
                </div>
                
                <div class="temple-live-stats">
                    <div class="temple-live-stat">
                        <div class="temple-live-stat-value">${temple.currentCrowd.toLocaleString()}</div>
                        <div class="temple-live-stat-label">Current</div>
                    </div>
                    <div class="temple-live-stat">
                        <div class="temple-live-stat-value">${temple.waitTime}</div>
                        <div class="temple-live-stat-label">Wait Time</div>
                    </div>
                </div>
                
                <div class="capacity-bar">
                    <div class="capacity-fill" style="width: ${crowdPercentage}%; background: ${statusClass === 'safe' ? 'var(--color-success)' : statusClass === 'moderate' ? 'var(--color-warning)' : 'var(--color-error)'}"></div>
                </div>
            `;

            templeCard.addEventListener('click', () => {
                this.switchTab('temples');
                this.showToast('🏛️', `Switching to ${temple.name} details`);
            });

            liveTempleCards.appendChild(templeCard);
        });
    }

    renderTemples() {
        const templesGrid = document.getElementById('templesGrid');
        if (!templesGrid) return;

        templesGrid.innerHTML = '';

        this.temples.forEach(temple => {
            const crowdPercentage = (temple.currentCrowd / temple.capacity) * 100;
            
            let crowdStatus, statusClass;
            if (crowdPercentage < 50) {
                crowdStatus = 'Safe Crowd Level';
                statusClass = 'safe';
            } else if (crowdPercentage < 80) {
                crowdStatus = 'Moderate Crowd';
                statusClass = 'moderate';
            } else {
                crowdStatus = 'High Crowd Density';
                statusClass = 'crowded';
            }

            const templeCard = document.createElement('div');
            templeCard.className = `temple-card ${statusClass}`;
            templeCard.setAttribute('data-crowd-level', statusClass);
            templeCard.innerHTML = `
                <div class="temple-header">
                    <div>
                        <div class="temple-name">${temple.name}</div>
                        <div class="temple-location">📍 ${temple.location}</div>
                    </div>
                    <div class="crowd-status ${statusClass}">${crowdStatus}</div>
                </div>
                
                <div class="temple-description">${temple.description}</div>
                
                <div class="temple-stats">
                    <div class="temple-stat">
                        <div class="temple-stat-value">${temple.currentCrowd.toLocaleString()}</div>
                        <div class="temple-stat-label">Current Crowd</div>
                    </div>
                    <div class="temple-stat">
                        <div class="temple-stat-value">${temple.waitTime}</div>
                        <div class="temple-stat-label">Wait Time</div>
                    </div>
                    <div class="temple-stat">
                        <div class="temple-stat-value">${temple.parkingAvailable}/${temple.parkingCapacity}</div>
                        <div class="temple-stat-label">Parking</div>
                    </div>
                    <div class="temple-stat">
                        <div class="temple-stat-value">${temple.annualVisitors}</div>
                        <div class="temple-stat-label">Annual Visitors</div>
                    </div>
                </div>
                
                <div class="capacity-bar">
                    <div class="capacity-fill" style="width: ${crowdPercentage}%; background: ${statusClass === 'safe' ? 'var(--color-success)' : statusClass === 'moderate' ? 'var(--color-warning)' : 'var(--color-error)'}"></div>
                </div>
                
                <div class="temple-features">
                    <h4>🌟 Aarti Timings: ${temple.artiTimings.join(', ')}</h4>
                    <div class="features-list">
                        ${temple.specialFeatures.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                </div>
                
                <div class="temple-actions">
                    <button class="btn btn--primary book-darshan" data-temple-id="${temple.id}">🎫 Book Darshan</button>
                    <button class="btn btn--outline view-details" data-temple-id="${temple.id}">📹 Live View</button>
                </div>
            `;

            templesGrid.appendChild(templeCard);
        });

        // Add event listeners for booking buttons
        document.querySelectorAll('.book-darshan').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const templeId = parseInt(e.target.getAttribute('data-temple-id'));
                const temple = this.temples.find(t => t.id === templeId);
                if (temple) {
                    this.bookDarshan(temple);
                }
            });
        });

        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const templeId = parseInt(e.target.getAttribute('data-temple-id'));
                const temple = this.temples.find(t => t.id === templeId);
                if (temple) {
                    this.showToast('📹', `Live CCTV access granted for ${temple.name}`);
                }
            });
        });
    }

    renderBookings() {
        const currentBooking = document.getElementById('currentBooking');
        const bookingsList = document.getElementById('bookingsList');
        
        if (!currentBooking || !bookingsList) return;

        // Render current active booking
        if (this.userBookings.length > 0) {
            const booking = this.userBookings[0];
            const temple = this.temples.find(t => t.id === booking.templeId);
            
            currentBooking.innerHTML = `
                <h3>🎫 Active Darshan Booking</h3>
                <div class="booking-card">
                    <div class="booking-qr">📱</div>
                    <div class="booking-info">
                        <h4>${temple ? temple.name : booking.temple}</h4>
                        <div class="booking-details">
                            <div class="booking-detail">
                                <div class="booking-detail-label">Date</div>
                                <div class="booking-detail-value">${booking.date}</div>
                            </div>
                            <div class="booking-detail">
                                <div class="booking-detail-label">Time Slot</div>
                                <div class="booking-detail-value">${booking.slot}</div>
                            </div>
                            <div class="booking-detail">
                                <div class="booking-detail-label">Queue Number</div>
                                <div class="booking-detail-value">${booking.queueNumber}</div>
                            </div>
                            <div class="booking-detail">
                                <div class="booking-detail-label">Estimated Wait</div>
                                <div class="booking-detail-value">${booking.estimatedWait}</div>
                            </div>
                        </div>
                        <div class="status status--success">✅ Confirmed - Ready for Darshan</div>
                    </div>
                    <div class="booking-actions">
                        <button class="btn btn--primary" onclick="window.smartTempleApp.showQRCode('${booking.qrCode}')">📱 Show QR</button>
                        <button class="btn btn--secondary" onclick="window.smartTempleApp.navigateToTemple(${booking.templeId})">🧭 Navigate</button>
                    </div>
                </div>
            `;
        } else {
            currentBooking.innerHTML = `
                <h3>🎫 No Active Bookings</h3>
                <div class="card">
                    <div class="card__body" style="text-align: center; padding: 40px;">
                        <h4>Book Your Sacred Darshan</h4>
                        <p style="color: var(--color-text-secondary); margin-bottom: 20px;">Select a temple and book your darshan slot to avoid long queues and ensure a peaceful visit.</p>
                        <button class="btn btn--primary" onclick="window.smartTempleApp.openTempleSelection()">
                            🏛️ Book Now
                        </button>
                    </div>
                </div>
            `;
        }

        // Show historical bookings message
        bookingsList.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--color-text-secondary);">
                <p>📚 Booking history will appear here after you complete darshan visits</p>
            </div>
        `;
    }

    renderFestivals() {
        const festivalCards = document.getElementById('festivalCards');
        if (!festivalCards) return;

        festivalCards.innerHTML = '';

        this.festivalsCalendar.forEach(festival => {
            const festivalDate = new Date(festival.date);
            const formattedDate = festivalDate.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            const festivalCard = document.createElement('div');
            festivalCard.className = 'festival-card';
            festivalCard.innerHTML = `
                <div class="festival-date">📅 ${formattedDate}</div>
                <div class="festival-name">🎊 ${festival.festival}</div>
                <div class="festival-impact">Expected crowd: ${festival.expectedCrowd}</div>
            `;

            festivalCard.addEventListener('click', () => {
                this.showToast('🎊', `${festival.festival} - Plan your visit accordingly`);
            });

            festivalCards.appendChild(festivalCard);
        });
    }

    renderEmergencyAlerts() {
        const alertsList = document.getElementById('alertsList');
        if (!alertsList) return;

        alertsList.innerHTML = '';

        this.emergencyAlerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = `alert-item ${alert.severity}`;
            alertItem.innerHTML = `
                <div class="alert-header">
                    <span class="alert-type">${alert.type.replace('_', ' ').toUpperCase()}</span>
                    <span class="alert-time">${alert.timestamp}</span>
                </div>
                <div class="alert-location">📍 ${alert.temple} - ${alert.location}</div>
                <div class="alert-message">${alert.message}</div>
            `;
            alertsList.appendChild(alertItem);
        });

        if (this.emergencyAlerts.length === 0) {
            alertsList.innerHTML = `
                <div class="alert-item">
                    <div class="alert-message" style="text-align: center; color: var(--color-success);">
                        ✅ No active emergency alerts. All temple systems operational.
                    </div>
                </div>
            `;
        }
    }

    initChart() {
        const ctx = document.getElementById('crowdChart');
        if (!ctx || this.chart) return;

        console.log('Initializing AI crowd analytics chart...');

        try {
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.crowdPredictions.map(d => d.time),
                    datasets: [
                        {
                            label: 'Actual Crowd',
                            data: this.crowdPredictions.map(d => d.actual),
                            borderColor: '#DC143C',
                            backgroundColor: 'rgba(220, 20, 60, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: '#DC143C',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 5
                        },
                        {
                            label: 'AI Predicted',
                            data: this.crowdPredictions.map(d => d.predicted),
                            borderColor: '#FF8C00',
                            backgroundColor: 'rgba(255, 140, 0, 0.1)',
                            fill: false,
                            borderDash: [8, 4],
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: '#FF8C00',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#DC143C',
                            borderWidth: 1,
                            callbacks: {
                                afterLabel: function(context) {
                                    const dataIndex = context.dataIndex;
                                    const confidence = window.smartTempleApp.crowdPredictions[dataIndex]?.confidence;
                                    return confidence ? `AI Confidence: ${confidence}%` : '';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Pilgrims',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#DC143C'
                            },
                            grid: {
                                color: 'rgba(220, 20, 60, 0.1)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time of Day',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#FF8C00'
                            },
                            grid: {
                                color: 'rgba(255, 140, 0, 0.1)'
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
            
            console.log('AI Analytics chart initialized successfully');
        } catch (error) {
            console.error('Error initializing chart:', error);
        }
    }

    updateHeatmap(templeId) {
        const heatmapContainer = document.getElementById('heatmapContainer');
        if (!heatmapContainer) return;

        const temple = this.temples.find(t => t.id === templeId);
        if (!temple) return;

        heatmapContainer.innerHTML = '';

        Object.entries(temple.crowdZones).forEach(([area, density]) => {
            let bgColor, textColor;
            
            if (density < 40) {
                bgColor = 'rgba(80, 200, 120, 0.3)';
                textColor = '#000';
            } else if (density < 70) {
                bgColor = 'rgba(255, 140, 0, 0.4)';
                textColor = '#000';
            } else {
                bgColor = 'rgba(220, 20, 60, 0.5)';
                textColor = '#fff';
            }

            const heatmapItem = document.createElement('div');
            heatmapItem.className = 'heatmap-item';
            heatmapItem.style.backgroundColor = bgColor;
            heatmapItem.style.color = textColor;
            heatmapItem.innerHTML = `
                <div class="heatmap-label">${area.replace('_', ' ').toUpperCase()}</div>
                <div class="heatmap-value">${density}% capacity</div>
            `;

            heatmapItem.addEventListener('click', () => {
                this.showToast('📊', `${area.replace('_', ' ')} - ${density}% capacity utilization`);
            });

            heatmapContainer.appendChild(heatmapItem);
        });
    }

    openQRScanner() {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.classList.remove('hidden');
            this.showToast('📱', 'QR Scanner activated - Position QR code in frame');
        }
    }

    openTempleSelection() {
        const modal = document.getElementById('templeSelectModal');
        const grid = document.getElementById('templeSelectionGrid');
        
        if (!modal || !grid) return;

        grid.innerHTML = '';

        this.temples.forEach(temple => {
            const crowdPercentage = (temple.currentCrowd / temple.capacity) * 100;
            let statusText = crowdPercentage < 50 ? '✅ Good time to visit' : 
                           crowdPercentage < 80 ? '⚠️ Moderate crowd' : '🔴 High crowd';

            const templeSelectCard = document.createElement('div');
            templeSelectCard.className = 'temple-select-card';
            templeSelectCard.innerHTML = `
                <div class="temple-select-icon">🏛️</div>
                <div class="temple-select-name">${temple.name}</div>
                <div class="temple-select-status">${statusText}</div>
                <div style="margin-top: 8px; font-size: 12px; color: var(--color-text-secondary);">
                    Wait: ${temple.waitTime}
                </div>
            `;

            templeSelectCard.addEventListener('click', () => {
                this.selectedTemple = temple;
                this.closeModal('templeSelectModal');
                this.bookDarshan(temple);
            });

            grid.appendChild(templeSelectCard);
        });

        modal.classList.remove('hidden');
        this.showToast('🏛️', 'Select temple for darshan booking');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            console.log('Modal closed:', modalId);
        }
    }

    simulateQRScan() {
        this.closeModal('qrModal');
        
        // Show scanning animation effect
        this.showToast('📱', 'Scanning QR code...');
        
        setTimeout(() => {
            const randomTemple = this.temples[Math.floor(Math.random() * this.temples.length)];
            this.showToast('✅', `QR Verified! Welcome to ${randomTemple.name} - Entry granted`);
        }, 1500);
    }

    bookDarshan(temple) {
        const newBooking = {
            id: `BK${Date.now()}`,
            temple: temple.name,
            templeId: temple.id,
            date: new Date().toISOString().split('T')[0],
            slot: "11:00-12:00",
            queueNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 999) + 100}`,
            qrCode: `QR_${temple.name.replace(/\s/g, '')}_${Date.now()}`,
            status: "confirmed",
            estimatedWait: `${Math.floor(Math.random() * 30) + 10} minutes`
        };

        // Add to bookings (replace existing for demo)
        this.userBookings = [newBooking];
        
        this.showBookingConfirmation(temple, newBooking);
        this.renderBookings();
    }

    showBookingConfirmation(temple, booking) {
        const bookingModal = document.getElementById('bookingModal');
        const bookingDetails = document.getElementById('bookingDetails');
        
        if (bookingDetails) {
            bookingDetails.innerHTML = `
                <div class="detail-row">
                    <span class="detail-label">Temple:</span>
                    <span class="detail-value">${temple.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${booking.date}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time Slot:</span>
                    <span class="detail-value">${booking.slot}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Queue Number:</span>
                    <span class="detail-value">${booking.queueNumber}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Estimated Wait:</span>
                    <span class="detail-value">${booking.estimatedWait}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">QR Code ID:</span>
                    <span class="detail-value">${booking.qrCode}</span>
                </div>
            `;
        }

        if (bookingModal) {
            bookingModal.classList.remove('hidden');
        }
        
        this.showToast('✅', `Darshan booked at ${temple.name} - QR code generated`);
    }

    showQRCode(qrCode) {
        this.showToast('📱', `Displaying QR Code: ${qrCode}`);
    }

    navigateToTemple(templeId) {
        const temple = this.temples.find(t => t.id === templeId);
        if (temple) {
            this.showToast('🧭', `GPS navigation started to ${temple.name}`);
        }
    }

    showAartiTimings() {
        let timingsText = "🪔 Today's Aarti Timings:\n\n";
        this.temples.forEach(temple => {
            timingsText += `${temple.name}:\n${temple.artiTimings.join(', ')}\n\n`;
        });
        
        this.showToast('🪔', 'Aarti timings displayed - Plan your visit accordingly');
    }

    triggerSOS() {
        console.log('🚨 EMERGENCY SOS ACTIVATED');
        
        const newAlert = {
            id: `EMRG${Date.now()}`,
            temple: "GPS Location",
            type: "emergency_sos",
            severity: "high",
            location: "User GPS Coordinates",
            message: "🚨 EMERGENCY SOS ACTIVATED - Immediate assistance dispatched",
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: "active",
            responders: ["Emergency Services", "Temple Security", "Medical Team", "Police"]
        };
        
        this.emergencyAlerts.unshift(newAlert);
        this.renderEmergencyAlerts();
        
        // Enhanced SOS feedback
        this.showToast('🚨', 'EMERGENCY ALERT SENT! Police, Medical & Temple Security notified');
        
        // Update emergency status
        const emergencyStatus = document.getElementById('emergencyStatus');
        if (emergencyStatus) {
            emergencyStatus.textContent = '🚨 EMERGENCY ACTIVE - Response Teams Dispatched';
            emergencyStatus.className = 'status-indicator high';
            emergencyStatus.style.background = 'rgba(220, 20, 60, 0.2)';
            emergencyStatus.style.color = '#DC143C';
        }
        
        console.log('Emergency response initiated');
    }

    triggerEmergencyAlert(type) {
        const newAlert = {
            id: `EMRG${Date.now()}`,
            temple: "User Location",
            type: type.toLowerCase().replace(/\s+/g, '_'),
            severity: "medium",
            location: "Pilgrim Reported",
            message: `${type} reported - Relevant authorities have been notified and dispatched`,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: "investigating"
        };
        
        this.emergencyAlerts.unshift(newAlert);
        this.renderEmergencyAlerts();
        this.showToast('🚨', `${type} alert sent - Response team dispatched to your location`);
    }

    filterTemples(filter) {
        const templeCards = document.querySelectorAll('.temple-card');
        
        templeCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const crowdLevel = card.getAttribute('data-crowd-level');
                card.style.display = crowdLevel === filter ? 'block' : 'none';
            }
        });
        
        this.showToast('🔍', `Filtered temples by ${filter === 'all' ? 'all' : filter} crowd level`);
    }

    refreshTempleData() {
        // Simulate real-time data refresh with realistic variations
        this.temples.forEach(temple => {
            const variation = Math.floor(Math.random() * 300) - 150;
            temple.currentCrowd = Math.max(100, Math.min(temple.capacity, temple.currentCrowd + variation));
            
            // Update wait times based on crowd
            const waitMinutes = Math.floor((temple.currentCrowd / temple.capacity) * 90) + Math.floor(Math.random() * 20);
            temple.waitTime = `${waitMinutes} minutes`;
            
            // Update parking
            const parkingChange = Math.floor(Math.random() * 50) - 25;
            temple.parkingAvailable = Math.max(0, Math.min(temple.parkingCapacity, temple.parkingAvailable + parkingChange));
            
            // Update crowd zones
            Object.keys(temple.crowdZones).forEach(zone => {
                const zoneVariation = Math.floor(Math.random() * 30) - 15;
                temple.crowdZones[zone] = Math.max(10, Math.min(95, temple.crowdZones[zone] + zoneVariation));
            });
        });

        this.renderDashboard();
        this.renderTemples();
        this.updateDashboardStats();
        
        if (this.activeTab === 'analytics' && this.chart) {
            this.updateHeatmap(1);
        }
        
        this.showToast('🔄', 'Live temple data refreshed - All systems updated');
    }

    generateReport() {
        const totalCrowd = this.temples.reduce((sum, t) => sum + t.currentCrowd, 0);
        const averageCapacity = this.temples.reduce((sum, t) => sum + ((t.currentCrowd / t.capacity) * 100), 0) / this.temples.length;
        
        const reportData = {
            timestamp: new Date().toISOString(),
            totalCrowd: totalCrowd,
            averageCapacity: Math.round(averageCapacity),
            totalParking: this.temples.reduce((sum, t) => sum + t.parkingAvailable, 0),
            emergencyAlerts: this.emergencyAlerts.length,
            systemStatus: 'Fully Operational',
            temples: this.temples.length
        };

        this.showToast('📄', `System Report Generated - ${reportData.totalCrowd.toLocaleString()} total pilgrims across ${reportData.temples} temples`);
        
        console.log('Generated Report:', reportData);
    }

    sendBroadcastAlert() {
        const alertType = document.getElementById('alertType')?.value;
        const alertTarget = document.getElementById('alertTarget')?.value;
        const alertMessage = document.getElementById('alertMessage')?.value;

        if (!alertMessage.trim()) {
            this.showToast('⚠️', 'Please enter alert message before broadcasting');
            return;
        }

        // Simulate multi-language broadcast
        const languages = ['English', 'Hindi', 'Gujarati'];
        this.showToast('📢', `Broadcast sent in ${languages.join(', ')} to ${alertTarget || 'All Temples'}`);
        
        // Clear the form
        const messageField = document.getElementById('alertMessage');
        if (messageField) {
            messageField.value = '';
        }
        
        // Add to alerts system
        const broadcastAlert = {
            id: `BROAD${Date.now()}`,
            temple: alertTarget || 'All Temples',
            type: 'broadcast_alert',
            severity: 'low',
            location: 'System Wide',
            message: `Admin Broadcast: ${alertMessage}`,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: 'sent'
        };
        
        this.emergencyAlerts.unshift(broadcastAlert);
        this.renderEmergencyAlerts();
    }

    updateDashboardStats() {
        const totalCrowd = this.temples.reduce((sum, temple) => sum + temple.currentCrowd, 0);
        const totalParking = this.temples.reduce((sum, temple) => sum + temple.parkingAvailable, 0);
        
        // Calculate average wait time in minutes
        const totalWaitMinutes = this.temples.reduce((sum, temple) => {
            const minutes = parseInt(temple.waitTime.replace(/\D/g, '')) || 0;
            return sum + minutes;
        }, 0);
        const avgWaitMinutes = Math.round(totalWaitMinutes / this.temples.length);

        // Update dashboard stats with smooth animations
        const totalPilgrimsEl = document.getElementById('totalPilgrims');
        const avgWaitEl = document.getElementById('avgWait');
        const parkingAvailableEl = document.getElementById('parkingAvailable');
        const weatherTempEl = document.getElementById('weatherTemp');

        if (totalPilgrimsEl) totalPilgrimsEl.textContent = totalCrowd.toLocaleString();
        if (avgWaitEl) avgWaitEl.textContent = `${avgWaitMinutes} min`;
        if (parkingAvailableEl) parkingAvailableEl.textContent = totalParking;
        if (weatherTempEl) weatherTempEl.textContent = this.weatherInfo.temperature;
    }

    updateGreeting() {
        const greetingEl = document.getElementById('greetingText');
        if (!greetingEl) return;

        const greetings = [
            '🙏 Jay Somnath',
            '🙏 Jay Dwarkadhish', 
            '🙏 Jay Ambaji Ma',
            '🙏 Jay Kalika Ma'
        ];

        let currentIndex = 0;
        
        // Initial greeting
        if (this.currentMode === 'pilgrim') {
            greetingEl.textContent = greetings[currentIndex];
            
            // Rotate greetings every 4 seconds
            const greetingInterval = setInterval(() => {
                if (this.currentMode === 'pilgrim') {
                    currentIndex = (currentIndex + 1) % greetings.length;
                    greetingEl.textContent = greetings[currentIndex];
                } else {
                    clearInterval(greetingInterval);
                }
            }, 4000);
        }
    }

    startRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        this.updateInterval = setInterval(() => {
            // Simulate real-time crowd updates
            this.temples.forEach(temple => {
                // More realistic crowd variations
                const timeOfDay = new Date().getHours();
                let baseVariation = Math.floor(Math.random() * 100) - 50;
                
                // Higher variations during peak hours (6-9 AM, 6-8 PM)
                if ((timeOfDay >= 6 && timeOfDay <= 9) || (timeOfDay >= 18 && timeOfDay <= 20)) {
                    baseVariation *= 2;
                }
                
                temple.currentCrowd = Math.max(100, Math.min(temple.capacity, temple.currentCrowd + baseVariation));
                
                // Update wait times
                const crowdPercentage = (temple.currentCrowd / temple.capacity) * 100;
                const waitMinutes = Math.floor(crowdPercentage * 0.8) + Math.floor(Math.random() * 20);
                temple.waitTime = `${waitMinutes} minutes`;
                
                // Update parking
                const parkingChange = Math.floor(Math.random() * 30) - 15;
                temple.parkingAvailable = Math.max(0, Math.min(temple.parkingCapacity, temple.parkingAvailable + parkingChange));
                
                // Update crowd zones
                Object.keys(temple.crowdZones).forEach(zone => {
                    const zoneVariation = Math.floor(Math.random() * 20) - 10;
                    temple.crowdZones[zone] = Math.max(15, Math.min(95, temple.crowdZones[zone] + zoneVariation));
                });
            });

            // Update UI based on current tab
            if (this.activeTab === 'dashboard') {
                this.renderDashboard();
            }
            if (this.activeTab === 'temples') {
                this.renderTemples();
            }
            if (this.activeTab === 'analytics' && this.chart) {
                // Update chart with new data
                const currentHour = new Date().getHours();
                const currentTimeSlot = currentHour.toString().padStart(2, '0') + ':00';
                
                // Update predictions with current data
                const matchingPrediction = this.crowdPredictions.find(p => p.time === currentTimeSlot);
                if (matchingPrediction) {
                    matchingPrediction.actual = this.temples[0].currentCrowd;
                }
                
                this.chart.data.datasets[0].data = this.crowdPredictions.map(d => d.actual);
                this.chart.update('none');
            }
            
            this.updateDashboardStats();
        }, 25000); // Update every 25 seconds for demo
    }

    showToast(icon, message, duration = 4000) {
        const toast = document.getElementById('alertToast');
        if (!toast) {
            console.log('Toast:', icon, message);
            return;
        }
        
        const toastIcon = toast.querySelector('.toast-icon');
        const toastMessage = toast.querySelector('.toast-message');
        
        if (toastIcon) toastIcon.textContent = icon;
        if (toastMessage) toastMessage.textContent = message;
        
        // Clear any existing timeout
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
        
        toast.classList.remove('hidden');
        
        // Auto-hide after duration
        this.toastTimeout = setTimeout(() => {
            this.closeToast();
        }, duration);
    }

    closeToast() {
        const toast = document.getElementById('alertToast');
        if (toast) {
            toast.classList.add('hidden');
        }
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
            this.toastTimeout = null;
        }
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.chart) {
            this.chart.destroy();
        }
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🕉️ CODEHEX Smart Temple Management System Starting...');
    console.log('🏛️ Loading Gujarat Temple Network...');
    
    window.smartTempleApp = new SmartTempleApp();
    window.smartTempleApp.init();
    
    console.log('✅ System Ready - JAY SOMNATH!');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (window.smartTempleApp) {
        if (document.hidden) {
            console.log('⏸️ App paused - Page hidden');
            if (window.smartTempleApp.updateInterval) {
                clearInterval(window.smartTempleApp.updateInterval);
                window.smartTempleApp.updateInterval = null;
            }
        } else {
            console.log('▶️ App resumed - Page visible');
            window.smartTempleApp.startRealTimeUpdates();
        }
    }
});

// Export for global access
window.SmartTempleApp = SmartTempleApp;