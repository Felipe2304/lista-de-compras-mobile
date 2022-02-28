const timesSerieA = [
  { time: "corinthians", titulos: 200, estado: "SP" },
  { time: "palmeiras", titulos: 90, estado: "SP" },
  { time: "santos", titulos: 110, estado: "SP" },
  { time: "juventude", titulos: 10, estado: "RS" },
  { time: "internacional", titulos: 78, estado: "RS" },
  { time: "atletico-mg", titulos: 20, estado: "MG" },
  { time: "flamengo", titulos: 80, estado: "RJ" },
  { time: "são paulo", titulos: 120, estado: "SP" },
  { time: "coritiba", titulos: 12, estado: "PR" },
  { time: "botafogo", titulos: 30, estado: "RJ" },
  { time: "atletico-pr", titulos: 10, estado: "PR" },
  { time: "fluminense", titulos: 20, estado: "RJ" },
  { time: "goiás", titulos: 1, estado: "GO" },
  { time: "fortaleza", titulos: 10, estado: "CE" },
  { time: "américa-mg", titulos: 34, estado: "MG" },
  { time: "avaí", titulos: 10, estado: "SC" },
  { time: "cuiabá", titulos: 1, estado: "MT" },
  { time: "ceará", titulos: 13, estado: "CE" },
  { time: "bragantino", titulos: 3, estado: "SP" },
  { time: "atletico-go", titulos: 1, estado: "GO" },
];

const input = document.querySelector('input')

input.addEventListener('input', ()=>{
  
  const filterTeste = timesSerieA.filter((times)=> times.time.includes(input.value))
  console.log(filterTeste)
})
