let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
    const list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${habit.done ? 'done' : ''}">
                ${habit.name}
            </span>
            <input type="checkbox" ${habit.done ? "checked" : ""}
                onclick="toggleHabit(${index})">
        `;
        list.appendChild(li);
    });
}

function addHabit() {
    const input = document.getElementById("habitInput");
    if (input.value === "") return;

    habits.push({ name: input.value, done: false });
    input.value = "";
    saveHabits();
    renderHabits();
}

function toggleHabit(index) {
    habits[index].done = !habits[index].done;
    saveHabits();
    renderHabits();
}

// 📊 Numbers API
function loadNumberFact() {
    const day = new Date().getDate();
    fetch(`http://numbersapi.com/${day}`)
        .then(res => res.text())
        .then(data => {
            document.getElementById("numberFact").innerText = data;
        })
        .catch(() => {
            document.getElementById("numberFact").innerText = "Bilgi alınamadı.";
        });
}

renderHabits();
loadNumberFact();
