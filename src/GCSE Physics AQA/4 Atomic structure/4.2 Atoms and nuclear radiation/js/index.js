document.getElementById('button').addEventListener('click', updateCount);

let count = 0;

function updateCount(e) {
    count += 1;
    e.target.innerHTML = 'clicked';
}