const chart = document.querySelector("#chart").getContext("2d");

const btcData = [];
const etData = [];

function showChart() {
  new Chart(chart, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
      ],
      datasets: [
        {
          label: "BTC",
          //   data: [
          //     29374, 33537, 49631, 59095, 57828, 36684, 33572, 39974, 48847,
          //     48116, 61004,
          //   ],
          data: btcData,
          borderColor: "red",
          borderWidth: 2,
        },
        {
          label: "ETH",
          //   data: [
          //     31500, 41000, 88800, 26000, 46000, 32698, 5000, 3000, 18656, 24832,
          //     36844,
          //   ],
          data: etData,
          borderColor: "blue",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

async function fetchData() {
  try {
    const ethResponse = await fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30&interval=daily");
    const ethData = await ethResponse.json();
    //data manipulate
    let ethPrices = ethData.prices.slice(0, 10); // [[0,1], [0,1],[0,1]]
    let start = 10000;
    for (let i = 0; i < ethPrices.length; i++) {
      etData.push(ethPrices[i][1] + start);
    }

    const btcResponse = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily");
    const btcDataResponse = await btcResponse.json();
    let btcPrices = btcDataResponse.prices.slice(0, 10); 
    for (let i = 0; i < btcPrices.length; i++) {
      btcData.push(btcPrices[i][1] + start);
    }
  } catch (error) {
    console.log(error);
  } finally {
    showChart(); 
  }
}

fetchData(); 


// show or hide sidebar
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');

menuBtn.addEventListener('click',()=>{
    sidebar.style.display ='block';
})

closeBtn.addEventListener('click' , ()=>{
    sidebar.style.display='none';
})

//change theme
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click' , ()=>{
    document.body.classList.toggle('dark-theme');
    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');

})
//end of code