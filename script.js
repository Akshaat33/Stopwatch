const arr = [];
const arr2 = [];
let ms = 0;
let sec = 0;
let min = 0;
let hr = 0;
let si;
let runs = false;
let st = document.querySelector("#start");
let lap = document.querySelector("#lap");
let re = document.querySelector("#reset");
let f = document.querySelector(".laphistory");
st.addEventListener("click", function () {
    if (runs) {
        clearInterval(si);
        runs = false;

        st.innerHTML = `
        <div class="emoji">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="currentcolor" stroke="currentcolor" stroke-width="2.5" stroke-linecap="round"
        stroke-linejoin="round">
        
        <path d="M8 5L19 12L8 19Z" />
        
        </svg>
        </div>
        <div class="buttontext">Resume</div>
        `
        document.querySelector("#active").innerHTML = `
        <div class="activeanimation">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
        fill="rgb(232,162,59)" id="pauseanimation">
        
        <circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="0" />
        
        </svg> 
        </div>
        <div class="activetext">
        Paused
        </div>
        `
        lap.classList.remove('butactive');
        return;
    }
    runs = true;
    let a = document.querySelectorAll(".but");
    a.forEach(btn => {
        btn.classList.add('butactive');
    });
    st.innerHTML = `
    <div class="emoji">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="currentColor" >
    
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
    
    </svg>
    
    </div>
    <div class="buttontext">Pause</div>
    `
    document.querySelector("#active").innerHTML = `
    <div class="activeanimation">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
    viewBox="0 0 12 12" fill="none" id="runninganimation">
    
    <circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="0" />
    
    </svg> 
    </div>
    <div class="activetext">
    Running 
    </div>
    `
    si = setInterval(() => {
        ms = ms + 1;
        if (ms == 100) {
            ms = 0;
            sec++;
        }
        if (sec == 60) {
            sec = 0;
            min++;
        }
        if (min == 60) {
            min = 0;
            hr++;
        }
        let displayms = String(ms).padStart(2, "0");
        let displaysec = String(sec).padStart(2, "0");
        let displaymin = String(min).padStart(2, "0");
        let displayhr = String(hr).padStart(2, "0");
        document.querySelector(".time").textContent = `${displayhr}:${displaymin}:${displaysec}.${displayms}`;
        if (hr == 99 && min == 59 && sec == 59 && ms == 99) {
            clearInterval(si);
            runs = false;
        }
    }, 10);
})
let lapno = 1;
lap.addEventListener("click", function () {
    let displayms = String(ms).padStart(2, "0");
    let displaysec = String(sec).padStart(2, "0");
    let displaymin = String(min).padStart(2, "0");
    let displayhr = String(hr).padStart(2, "0");
    if (runs) {
        let noLap = f.querySelector("#nolaptext");
        if (noLap) {
            noLap.remove();
        }
        document.querySelector("#textb").textContent = `${lapno} Lap`;
        document.querySelector("#tl").textContent = `${lapno}`;
        f.insertAdjacentHTML("beforeend" , `
            <div class="lapcard">
            <div class="lapcardcontent">
            <div class="ta">
            <div class="taa">Lap ${lapno}</div>
            </div>
            <div class="tb">${displayhr}:${displaymin}:${displaysec}.${displayms}</div>
            </div>
            </div>
            `);
            let card =document.querySelectorAll(".lapcard")
            card.forEach(a => {
                a.classList.remove("currentcard");
            });
            card[card.length - 1].classList.add("currentcard");
            let t = hr * 360000 + min * 6000 + sec * 100 + ms;
            let d=0;
            arr[lapno - 1] = t;
            if(lapno==1){
                arr2[0]=arr[0];
            }else{
                arr2[lapno-1]=arr[lapno-1]-arr[lapno-2]
            }
            for (let i = 0; i < arr2.length; i++) {
                d+=arr2[i];
            }
            // let n = 0;
            // for (let i = 0; i < arr.length-1; i++) {
                //     arr2[i]=arr[i+1]-arr[i];
                // }
                let x = Math.round(d/arr2.length);
                let nhr = Math.floor(x / 360000);
                let rem = x % 360000;
                let nmin = Math.floor(rem / 6000);
                rem = rem % 6000;
                let nsec = Math.floor(rem / 100);
                let nms = rem % 100;
                let displaynhr = String(nhr).padStart(2, "0");
                let displaynmin = String(nmin).padStart(2, "0");
                let displaynsec = String(nsec).padStart(2, "0");
                let displaynms = String(nms).padStart(2, "0");
                document.querySelector("#al").textContent = `${displaynhr}:${displaynmin}:${displaynsec}.${displaynms}`;
                let minimum = Math.min(...arr2);
                let bestIndex = arr2.indexOf(minimum);
                card.forEach(a => {
                    a.classList.remove("bestcard")
                });
                card[bestIndex].classList.add("bestcard");
                let newhr = Math.floor(minimum / 360000);
                let newrem = minimum % 360000;
                let newmin = Math.floor(newrem / 6000);
                newrem = newrem % 6000;
                let newsec = Math.floor(newrem / 100);
                let newms = newrem % 100;
                let displaynewhr = String(newhr).padStart(2, "0");
                let displaynewmin = String(newmin).padStart(2, "0");
                let displaynewsec = String(newsec).padStart(2, "0");
                let displaynewms = String(newms).padStart(2, "0");
                document.querySelector("#bl").textContent = `${displaynewhr}:${displaynewmin}:${displaynewsec}.${displaynewms}`;

                lapno++;
            }
        })
re.addEventListener("click",function(){
    clearInterval(si);
    runs = false;
    ms=0;
    sec=0;
    min=0;
    hr=0;
    lapno=1;
    arr.length=0;
    arr2.length=0;
    document.querySelector(".time").textContent = "00:00:00.00";
        document.querySelector("#bl").textContent = `00:00:00.00`;
        document.querySelector("#al").textContent = `00:00:00.00`;
        f.innerHTML=`
        <div class="laphistext">
        <div class="laphistextcontent" id="texta">LAP HISTORY</div>
        <div class="laphistextcontent" id="textb">0 Lap</div>
        </div>
        <div id="nolaptext">No laps yet — hit Start</div>
        `
        document.querySelector("#tl").textContent = `0`;
        lap.classList.remove('butactive');
        re.classList.remove('butactive');
        st.innerHTML=`
        <div class="emoji">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="currentColor">
        
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
        
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="currentcolor" stroke="currentcolor" stroke-width="2.5" stroke-linecap="round"
        stroke-linejoin="round">
        
        <path d="M8 5L19 12L8 19Z" />
        
        </svg>
        </div>
        <div class="buttontext">Start</div>
        `
        document.querySelector("#active").innerHTML=`
        <div class="activeanimation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                viewBox="0 0 12 12" fill="rgb(63,63,70)" id="idleanimation">

                                <circle cx="6" cy="6" r="6" stroke="currentColor" stroke-width="0" />

                            </svg>
                        </div>
                        <div class="activetext">
                            Idle
                        </div>
        `
    
})