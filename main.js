//constants
const _LINES_COUNT = 5;

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        let target = event.target;
        if (target.classList.contains('circle')) {
            calculateNewSum(target);
        };
    });
    const sumInput = document.getElementById("sumInput");
    sumInput.value = 0;
    sumInput.addEventListener('input', (event) => {
        let sum = event.target.value;
        let validated = event.target.value.split("").reduce((acc, char) => {
            if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)
                && acc.length < _LINES_COUNT) {
                acc += char;
            };
            return acc;
        }, "");
        if (sum != validated) {
            sumInput.value = validated;
        }
        render();
    });
    window.addEventListener('resize', () => {
        requestAnimationFrame(render);
    });
    render();
});

function calculateNewSum(clickedBead) {
    let lines = Array.from(document.querySelectorAll(".line")).reverse();
    let lineIndex = lines.findIndex((elem) => elem == clickedBead.parentNode);
    let beadsInLine = Array.from(lines[lineIndex].querySelectorAll(".circle"));
    let clickedBeadIndex = beadsInLine.findIndex((elem) => elem == clickedBead);
    let beadsChange = 0;
    beadsInLine.forEach((bead, index) => {
        if (isBeadRight(clickedBead)) {
            if (isBeadRight(bead) && index <= clickedBeadIndex) {
                beadsChange--;
            }
        } else {
            if (!isBeadRight(bead) && index >= clickedBeadIndex) {
                beadsChange++;
            }
        }
    });
    const sumInput = document.getElementById("sumInput");
    let updatedSum = +sumInput.value + (10 ** lineIndex) * beadsChange;
    sumInput.value = updatedSum;
    render();
}

let isBeadRight = (bead) => bead.classList.contains("right");

function render() {
    let sum = document.getElementById("sumInput").value;
    let lines = Array.from(document.querySelectorAll(".line")).reverse();
    let digits = sum.toString().split("").reverse();
    let beadSize = document.querySelector(".circle").getBoundingClientRect().width;
    lines.forEach((line, index) => {
        let rightBeadsCount = digits[index] ? digits[index] : 0;
        let beads = line.querySelectorAll(".circle");
        Array.from(beads).forEach((bead, index, beads) => {
            if (index < beads.length - rightBeadsCount) {
                bead.classList.remove("right");
                bead.style.left = `${index * beadSize}px`;
            } else {
                bead.classList.add("right");
                bead.style.removeProperty("left");
                bead.style.right = `${(beads.length - 1 - index) * beadSize}px`;
            }
        });
    })
}



