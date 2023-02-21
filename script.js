let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const addTimeInput = document.getElementById('addTimeInput');
const TypeInput = document.getElementById('TypeInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;
  const eventForDay = events.find(e => e.date === clicked);
  if (eventForDay) {
    document.getElementById('eventText').innerText = [eventForDay.title, eventForDay.time, eventForDay.type];
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  const hour = dt.getHours();
  const min = dt.getMinutes();

  const firstDayOfMonth = new Date(year, month, 1
  );
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText =
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = [eventForDay.title, eventForDay.time, eventForDay.type];
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  addTimeInput.value = '';
  TypeInput.value ='';
  clicked = null;
  load();
}




function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');


    events.push({
      date: clicked,
      title: eventTitleInput.value,
      time: addTimeInput.value,
      type: TypeInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}


function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();



//check if name is already in local storage

if (localStorage.getItem("nametag") === null) {
  let nametag = prompt("Please enter your name to get started:");

  while (nametag === null || nametag === "") {
    alert("Please enter a valid response.");
    nametag = prompt("Please enter your name to get started:");
  }
  alert(`Start scheduling now, ${nametag}!`);

  namePerson.innerHTML = nametag;

  localStorage.setItem("nametag", nametag);
} else {
  let nametag = localStorage.getItem("nametag");
  namePerson.innerHTML = nametag;
}

logoutButton.addEventListener("click", (e) => {
  localStorage.clear("nametag");
  location.href = "index.html";
});




