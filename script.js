// Zenga Music Catalog Mock Data
const trackCatalog = [
    {
        id: 1,
        title: "Kizomba Express",
        artist: "Zenga All Stars",
        genre: "kizomba",
        duration: "3:45",
        cover: "https://picsum.photos/seed/kizomba/300/300"
    },
    {
        id: 2,
        title: "Semba Tradicional",
        artist: "Mestre Ngola",
        genre: "semba",
        duration: "4:12",
        cover: "https://picsum.photos/seed/semba/300/300"
    },
    {
        id: 3,
        title: "Luanda Night Vibes",
        artist: "MC Viana",
        genre: "hiphop",
        duration: "2:58",
        cover: "https://picsum.photos/seed/luanda/300/300"
    },
    {
        id: 4,
        title: "Afro Beats Energy",
        artist: "DJ Paluanda",
        genre: "afrobeats",
        duration: "3:20",
        cover: "https://picsum.photos/seed/afro/300/300"
    },
    {
        id: 5,
        title: "Ritmo Suave",
        artist: "Helena & Grupo",
        genre: "kizomba",
        duration: "3:50",
        cover: "https://picsum.photos/seed/suave/300/300"
    }
];

// App State
let currentTrackIndex = 0;
let isPlaying = false;

// DOM Elements
const musicGrid = document.getElementById('musicGrid');
const playBtn = document.getElementById('playBtn');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const playerThumb = document.getElementById('playerThumb');
const searchInput = document.getElementById('searchInput');
const categoryChips = document.querySelectorAll('.category-chip');

// Initialize Catalog Grid
function renderCatalog(tracks) {
    musicGrid.innerHTML = '';
    tracks.forEach((track, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${track.cover}" alt="${track.title}">
                <button class="card-play-btn" onclick="playTrack(${index})">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>
            <div class="card-title">${track.title}</div>
            <div class="card-subtitle">${track.artist}</div>
        `;
        musicGrid.appendChild(card);
    });
}

// Play Selected Track
function playTrack(index) {
    currentTrackIndex = index;
    const track = trackCatalog[currentTrackIndex];
    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerThumb.src = track.cover;
    isPlaying = true;
    updatePlayButton();
}

// Toggle Play/Pause
function togglePlay() {
    if (trackCatalog.length === 0) return;
    isPlaying = !isPlaying;
    updatePlayButton();
}

function updatePlayButton() {
    playBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
}

// Filtering by Genre
categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const genre = chip.getAttribute('data-genre');
        if (genre === 'all') {
            renderCatalog(trackCatalog);
        } else {
            const filtered = trackCatalog.filter(t => t.genre === genre);
            renderCatalog(filtered);
        }
    });
});

// Real-time Search Filter
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = trackCatalog.filter(t => 
        t.title.toLowerCase().includes(term) || 
        t.artist.toLowerCase().includes(term)
    );
    renderCatalog(filtered);
});

// Event Listeners
playBtn.addEventListener('click', togglePlay);

// Initial Render
renderCatalog(trackCatalog);