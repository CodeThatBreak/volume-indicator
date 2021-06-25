navigator.mediaDevices.getUserMedia({ audio: true, video: false })
.then(function(stream) {

    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.9
    audioSource.connect(analyser)


    const volumes = new Uint8Array(analyser.frequencyBinCount)
    const volumeCallBack = ()=>{
        analyser.getByteFrequencyData(volumes);
        let volumeSum = 0;
        for(const volume of volumes){
            volumeSum +=volume
        }
        const averageVolume = volumeSum/volumes.length
        colorPids(averageVolume)
    }

    setInterval(volumeCallBack,10)

  })
  .catch(function(err) {
    /* handle the error */
});

function colorPids(vol) {

    let scale_0 = Math.min(3,Math.max(1,vol/10))
    let scale_1 = Math.max(1,scale_0/1.5)
    let scale_2 = Math.max(1,scale_0/2)

    let earth_green = document.querySelector(".earth-green.dot")
    let sun_orange = document.querySelector(".sun-orange.dot")
    let space_gray = document.querySelector('.space-gray.dot')
    let sky_blue = document.querySelector('.sky-blue.dot')
    let ocean_blue = document.querySelector('.ocean-blue.dot')

    earth_green.style.webkitTransform = `scale(1,${scale_2})`
    sun_orange.style.webkitTransform = `scale(1,${scale_1})`
    space_gray.style.webkitTransform = `scale(1,${scale_0})`
    sky_blue.style.webkitTransform = `scale(1,${scale_1})`
    ocean_blue.style.webkitTransform = `scale(1,${scale_2})`
}

