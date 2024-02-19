function searchWord() {
    let word = document.getElementById("searchWord").value.trim();
    if (!word) {
      alert("Please enter a word to search.");
      return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => response.json())
      .then(data => {
        if (data.hasOwnProperty("title")) {
          // Word not found
          alert("Word not found. Check spelling");
        } else {

          //Turning on HRs
          const hrElement1 = document.getElementById("hrID1");
          const hrElement2 = document.getElementById("hrID2");
          function changeClassToHrOn() {
              hrElement1.classList.remove("hrOff");
              hrElement1.classList.add("hrOn");

              hrElement2.classList.remove("hrOff");
              hrElement2.classList.add("hrOn");
          }
          changeClassToHrOn();

          //Searched Word
          let word = data[0].word;
          document.getElementById("output1").textContent = word;
          
          //Phonetic
          let phonetic = data[0].phonetic;
          document.getElementById("output2").textContent = phonetic;
          
          //Voice
          const playButton = document.getElementById("playButton");
          const audioPlayer = document.getElementById("audioPlayer");
          if (data[0].phonetics[0].audio) { // Check if audio source exists
            playButton.textContent = "volume_up";
            playButton.style.opacity = 1;
            playButton.addEventListener("click", () => {
              audioPlayer.src = data[0].phonetics[0].audio;
              audioPlayer.play();
            });
          } else {
            audioPlayer.src = "abc";
            playButton.style.opacity = 0.3;
            playButton.textContent = "volume_off";
          }

          //partsOfSpeech
          let partOfSpeech = data[0].meanings[0].partOfSpeech;
          document.getElementById("wordPartsOfSpeech").textContent = partOfSpeech;

          //Definition
          document.getElementById("wordDefinitionHeading").textContent = "Definition :";
          let definition = data[0].meanings[0].definitions[0].definition;
          document.getElementById("wordDefinition").textContent = definition;
          
          //Printing Synonyms
          let synonymArray = [];
          synonymArray = data[0].meanings[0].synonyms;
          let synArrLength = synonymArray.length;
          if(synArrLength!=0){
          console.log(synonymArray)
          let synonymText = "";
          for(const syn of synonymArray){
            synonymText += syn + ", ";
          }
          synonymText = synonymText.slice(0, -2);
          document.getElementById("wordSynonym").textContent = "Synonyms : " + synonymText;
          }else{
            document.getElementById("wordSynonym").textContent = "No synonyms found.";
          }
          

          //Printing Antonyms
          let antonymArray = [];
          antonymArray = data[0].meanings[0].antonyms;
          let antoArrLength = antonymArray.length;
          if(antoArrLength!=0){
          console.log(antonymArray)
          let antonymText = "";
          for(const anto of antonymArray){
            antonymText += anto + ", ";
          }
          antonymText = antonymText.slice(0, -2);
          document.getElementById("wordAntonym").textContent = "Antonyms : " + antonymText;
          }else{
            document.getElementById("wordAntonym").textContent = "No antonyms found.";
          }


          //Source Button
        //   if (data[0].souceUrls) {
        //     // playButton.textContent = "volume_up";
        //     // playButton.style.opacity = 1;
        //     srcBtn.addEventListener("click", () => {
        //         let srcLink = data[0].souceUrls;
        //         const srcBtn = document.getElementById("srcBtn");
        //         srcBtn.src = srcLink;
        //     });
        //   } else {
            
        //     srcBtn.style.opacity = 0.1;
            
        //   }


        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Oops! We are having turbulance. Hold up");
    });
  }