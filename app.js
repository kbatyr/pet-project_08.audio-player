let currentSong = 0;

// finding all elements from html page
const audio = document.querySelector('#audio');

const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');

const diskCover = document.querySelector('.disk');

const seekBar = document.querySelector('.seek-bar');
const currentTime = document.querySelector('.current-time');
const songDuration = document.querySelector('.song-duration');

const prevBtn = document.querySelector('.prev-btn');
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');

playBtn.addEventListener('click', () => {
	playBtn.classList.toggle('pause');
	diskCover.classList.toggle('play');

	if (playBtn.classList.contains('pause')) {
		audio.pause()
	} else {
		audio.play()
	}
});

(function preloadImages() {
	const img = new Image();
	for (let i = 1; i <= songs.length; i++) {
		img.src = `./assets/img/cover${i}.png`;
	}
	img.src = './assets/img/vinyl.png'
}());


// sets the song
const setSong = (i) => {

	seekBar.value = 0;
	let song = songs[i];
	currentSong = i;
	audio.src = song.path;

	songName.innerHTML = song.name;
	artistName.innerHTML = song.artist;

	diskCover.style.setProperty("--song-cover", `url('${song.cover}')`);

	currentTime.innerHTML = '00:00';
	setTimeout(() => {
		seekBar.max = audio.duration;
		songDuration.innerHTML = formatTime(audio.duration);
	}, 300)
}

setSong(0);

// formats music's duration to min and sec
const formatTime = (time) => {

	let min = Math.floor(time / 60);
	if (min < 10) {
		min = `0${min}`
	};

	let sec = Math.floor(time % 60);
	if (sec < 10) {
		sec = `0${sec}`;
	}

	return `${min} : ${sec}`;
}

// displays actual music's current time and checks whether it ended
setInterval(() => {
	seekBar.value = audio.currentTime;
	currentTime.innerHTML = formatTime(audio.currentTime);

	if (audio.ended) nextBtn.click();
}, 500);


// allows to jump between different parts of the song
seekBar.addEventListener('change', () => {
	audio.currentTime = seekBar.value;
});


const playSong = () => {
	audio.play();
	playBtn.classList.remove('pause');
	diskCover.classList.add('play');
}

nextBtn.addEventListener('click', () => {

	if (currentSong > songs.length - 1) {
		currentSong = 0;
	} else {
		currentSong++;
	}

	setSong(currentSong);
	playSong();
});

prevBtn.addEventListener('click', () => {

	if (currentSong < 0) {
		currentSong = songs.length - 1;
	} else {
		currentSong--;
	}

	setSong(currentSong);
	playSong();
});