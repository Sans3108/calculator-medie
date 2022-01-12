function randomBg() {
  let body = document.getElementById('body');
  body.className = Math.random() < 0.5 ? 'night' : 'day';
}

isFloat = x => !!(x % 1);

function roundToTwo(n) {
  return +(Math.round(n + "e+2") + "e-2");
}
const maxLen = 10;
let gradeArr = [];
let thesis = 0;

function addGrade(g) {
  if (gradeArr.length >= maxLen) {
    return alert(`De unde atatea note prietene? Hai las-o incolo de activitate...`)
  }
  gradeArr.push(g);
  update();
}

function reset() {
  gradeArr = [];
  thesis = 0;
  update();
  effect(false);
  thesisToggle(true);
  let m = document.getElementById('mean');
  m.innerText = ``;
}

function update() {
  let calc = document.getElementById('calc');
  let result = document.getElementById('result');

  if (!gradeArr[0] && thesis === 0) {
    calc.innerText = 'Notele tale vor aparea aici si vor fi puse in formula';
    result.innerText = 'Iar media va fi afisata aici';
    return;
  }

  let preText = `Media ta este:`;

  calc.innerHTML = `${preText} ${makeFormulaString(gradeArr, thesis)}`;
  let data = calculateMean(gradeArr, thesis);

  if (isFloat(data.mean)) {
    let m = document.getElementById('mean');
    m.innerText = `(${data.mean})`;
  }
  result.innerText = `${data.rounded}`;
  effect();
}

function thesisToggle(s = false) {
  let toggleBtn = document.getElementById('toggleBtn');
  let grid = document.getElementById('thesisGrid');

  if (s) {
    toggleBtn.innerText = 'Nu'
    toggleBtn.className = 'thesis-btn-red';
    grid.className = 'thesis-grid hidden'
    thesis = 0;
  } else {
    toggleBtn.innerText = toggleBtn.innerText === 'Da' ? 'Nu' : 'Da';
    toggleBtn.className = toggleBtn.innerText === 'Da' ? 'thesis-btn-green' : 'thesis-btn-red';
    grid.className = grid.className === 'thesis-grid hidden' ? 'thesis-grid' : 'thesis-grid hidden'
    if (toggleBtn.innerText === 'Nu') thesis = 0;
  }
  update();
}

function setThesis(g) {
  thesis = g;
  update();
}

function calculateMean(grd, t) {
  let data = {
    mean: 0,
    rounded: 0
  }

  if (!grd[0]) {
    if (t !== 0) {
      data.mean = t;
      data.rounded = t;
      return data;
    };
  }

  let val = 0;
  grd.forEach(i => val += i);

  data.mean = roundToTwo(val / grd.length);

  if (t !== 0) data.mean = roundToTwo(((data.mean * 3) + t) / 4);

  data.rounded = Math.round(data.mean);
  return data;
}

function makeFormulaString(grd, t) {
  if (t === 0) {
    if (grd[1]) return `(${grd.map(g => `<span class="grade-num">${g}</span>`).join(' + ')}) / <span class="grade-count">${grd.length}</span> =`;
    return '';
  }

  if (!grd[0] && t !== 0) return '';

  if (grd[1]) return `((${grd.map(g => `<span class="grade-num">${g}</span>`).join(' + ')}) / <span class="grade-count">${grd.length}</span> * 3 + <span class="thesis-num">${t}</span>) / 4 =`;
  return `(<span class="grade-num">${grd[0]}</span> / <span class="grade-count">${grd.length}</span> * 3 + <span class="thesis-num">${t}</span>) / 4 =`;
}

function effect(s = true) {
  let result = document.getElementById('result');
  let mean = calculateMean(gradeArr, thesis).rounded;

  if (!s) {
    result.className = '';
    return;
  }

  if (mean < 5) {
    result.className = 'effect-red';
    return;
  }
  if (mean >= 5 && mean < 6) {
    result.className = 'effect-yellow';
    return;
  }
  if (mean >= 6 && mean < 9) {
    result.className = 'effect-blue';
    return;
  }
  if (mean >= 9 && mean < 10) {
    result.className = 'effect-green';
    return;
  }
  result.className = 'effect-rainbow';
  return;
}