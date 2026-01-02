let allSongs = [];

let mainTag = document.getElementById('main')
mainTag.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter' || event.key === 'k') {
        event.preventDefault()
        togglePlay()
    }
})

let now = document.getElementById('now-playing-container')
now.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter' || event.key === 'k') {
        event.preventDefault()
        togglePlay()
    }
})


document.getElementById('searchbox').addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
        document.getElementById('searchbox').value = '';
    }
    search();
});



async function search() {
    let newArr = [];
    let count = 0;
    let searchText = document.getElementById('searchbox').value.trim();

    allSongs.forEach((e) => {
        if (e.name.toLowerCase().startsWith(searchText.toLowerCase())) {
            newArr = [...newArr.slice(0, count), e, ...newArr.slice(count)];
            count++;
        }
        else if (e.name.toLowerCase().includes(searchText.toLowerCase())) {
            newArr.push(e);
        }
    });
    // console.log(newArr)
    // console.log(searchText);
    renderSongs(newArr);
}

let nowPlaying;
function togglePlay() {
    nowPlaying = document.getElementById('now-playing');
    if (!nowPlaying) return;

    if (nowPlaying.paused) {
        nowPlaying.play();
    }
    else {
        nowPlaying.pause();
    }
}

allSongs = [];

async function getData() {
    const response = await fetch("songs.json");
    const data = await response.json(); // convert to JS object
    allSongs = data.songs;
}

function renderSongs(allSongs) {
    const main = document.getElementById("main");
    main.innerHTML = "";
    allSongs.forEach((e) => {
        main.innerHTML += `<div> </div><div class="song-container">
        <button data-file-path="${e.filePath}" data-name="${e.name}" class="song-container-button">${e.name}</button>
        </div>`;
    });
    const buttons = document.getElementsByClassName("song-container-button");
    for (let b of buttons) {
        // console.log('--->')
        b.addEventListener('click', () => {

            const songPath = b.dataset.filePath;
            const name = b.dataset.name;
            // console.log(b.dataset);

            // console.log( document.getElementById("now-playing-container"))
            document.getElementById("now-playing-container").innerHTML = `${name}<br>
                     <audio controls id="now-playing"> 
                        <source 
                            src="${songPath}" 
                            type="audio/mp3"
                        >
                    </audio>`
            document.getElementById("now-playing").play();


        });

        b.addEventListener('keydown', (event) => {
            if (event.key === 'Spacebar' || event.key === ' ' || event.key == 'Enter' || event.key === 'k') {
                event.preventDefault()
            }
        });
    }
}

let nowPlaying;
function togglePlay() {
    nowPlaying = document.getElementById('now-playing');
    if (!nowPlaying) return;
    
    if (nowPlaying.paused) {
        nowPlaying.play();
    }
    else {
        nowPlaying.pause();
    }
}


// console.log('-----<')
const buttons = document.getElementsByClassName("song-container-button");
// console.log(buttons)
// console.log(buttons[0])

// console.log('--<>---')
allSongs = undefined;

async function getData() {
    const response = await fetch("songs.json");
    const data = await response.json(); // convert to JS object
    return data;
}

function renderSongs(allSongs) {
    const main = document.getElementById("main");
    main.innerHTML = "";
    allSongs.forEach((e) => {
        main.innerHTML += `<div class="song-container">
        <button data-file-path=${e.filePath} data-name=${e.name} class="song-container-button">${e.name}</button>
        </div>`
    });
}

async function start() {
    const allSongs = await getData();
    renderSongs(allSongs.songs);
}
main();

