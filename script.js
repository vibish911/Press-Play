// document.getElementsByTagName("audio").forEach(b=>
//     {b.addEventListener('play',(event)=>{
//      const audio=document.getElementsByTagName("audio");
//      let len=audio.length
//      for(let i=0;i<len;i++){
//         if(audio[i]!=event.target){
//             audio[i].pause()
//         }
//      }
// })});

let bodyTag = document.getElementById('bodyTag')
bodyTag.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Spacebar') {
        // console.log('pressed the div section')
        togglePlay()
    }
})

initial();
async function initial() {
    await start();
    for (let b of buttons) {
        // console.log('--->')
        b.addEventListener('click', () => {

            const songPath = b.dataset.filePath;
            const name = b.dataset.name;

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
            if (event.key === 'Spacebar' || event.key === ' '){
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
        main.innerHTML += `<div> </div><div class="song-container">
        <button data-file-path=${e.filePath} data-name=${e.name} class="song-container-button">${e.name}</button>
        </div>`
    });
}

async function start() {
    const allSongs = await getData();
    renderSongs(allSongs.songs);
}

