    var isPlaying = true;
    var rndSampleTotalNumber = 34; // max number value for random samples
    var rndSampleCurr; // current random sample reference
    var rndSampleCurrIndex = 1; // 
    var rndSampleBank = new Array(); //array with short samples (Howls)
    var bgSampleLoop;
    var bgSamplePath = 'sound/marketplace_drone.mp3';
    var rndSampleFolder = 'sound/192_selected';

    $(function() {
        console.log("DOM ready. Loading samples and background loop...");
        playBgSampleLoop(bgSamplePath), playRndSampleLoop(rndSampleFolder); //background sound starts first, samples afterwards via callback
        // $('.scapeSwitch').click(function() // sounscape selector button function
        //     {
        //         stopRndSample();
        //         playBgSampleLoop($(this).attr('data-loop')), playRndSampleLoop($(this).attr('data-samples'));
        //     });
    });
    $('#sound-mute').click(function() // mute button function
        {
            $(this).toggleClass('fa-volume-up  fa-volume-off');
            if (isPlaying) {
                isPlaying = false;
                Howler.mute();
                console.log("muted");
            } else {
                isPlaying = true;
                Howler.unmute();
                console.log("unmuted");
            }
        });

    function playBgSampleLoop(val) { // play background loop over and over again
        bgSampleLoop = new Howl({
            urls: [val],
            autoplay: true,
            loop: true,
            volume: 1,
            onload: function() {
                console.log('background loop loaded. fading in...');
            },
            onend: function() {
                console.log('background loop finished, starting over');
            }
        });
    };

    function playRndSampleLoop(val) { // get random samples and play it
        getRndSampleNextIndex();
        rndSampleCurr = new Howl({
            urls: [val + "/" + rndSampleCurrIndex + ".mp3"],
            volume: 0.8,
            onload: function() {
                console.log('random sample #' + rndSampleCurrIndex + " loaded. starting...");
            },
            onend: function() {
                console.log('random sample #' + rndSampleCurrIndex + " finished.");
                playRndSampleLoop(val);
            }
        });
        rndSampleCurr.play();
    };

    function getRndSampleNextIndex() {
        rndSampleCurrIndex = Math.floor(Math.random() * rndSampleTotalNumber) + 1;
    }