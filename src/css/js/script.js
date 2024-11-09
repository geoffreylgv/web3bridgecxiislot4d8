document.addEventListener('DOMContentLoaded', function() {
    const desks = {
      individual: Array(10).fill(false),
      team: Array(5).fill(false)
    };

    const rates = {
      basic: 10,
      premium: 15,
      executive: 20,
      team: 25
    };

    const revenue = {
      basic: 0,
      premium: 0,
      executive: 0,
      team: 0
    };

    function renderDesks() {
      const individualGrid = document.getElementById('individual-grid');
      const teamGrid = document.getElementById('team-grid');

      individualGrid.innerHTML = '';
      teamGrid.innerHTML = '';

      desks.individual.forEach((isBooked, index) => {
        const deskDiv = document.createElement('div');
        deskDiv.textContent = `I${index + 1}`;
        deskDiv.classList.add('flex', 'items-center', 'justify-center', 'h-12', 'rounded-md', 'cursor-pointer', 'bg-green-200');
        if (isBooked) deskDiv.classList.add('bg-red-300', 'cursor-not-allowed');
        deskDiv.onclick = () => selectDesk('individual', index);
        individualGrid.appendChild(deskDiv);
      });

      desks.team.forEach((isBooked, index) => {
        const deskDiv = document.createElement('div');
        deskDiv.textContent = `T${index + 1}`;
        deskDiv.classList.add('flex', 'items-center', 'justify-center', 'h-12', 'rounded-md', 'cursor-pointer', 'bg-green-200');
        if (isBooked) deskDiv.classList.add('bg-red-300', 'cursor-not-allowed');
        deskDiv.onclick = () => selectDesk('team', index);
        teamGrid.appendChild(deskDiv);
      });
    }

    function selectDesk(type, index) {
      if (desks[type][index]) {
        alert('Desk is already booked!');
        return;
      }
      document.getElementById('deskType').value = type;
    }

    function bookDesk() {
      const type = document.getElementById('deskType').value;
      const tier = document.getElementById('membershipTier').value;
      const duration = parseInt(document.getElementById('duration').value);

      const selectedDeskIndex = desks[type].indexOf(false);
      if (selectedDeskIndex === -1) {
        alert(`No available ${type} desks!`);
        return;
      }

      let rate = type === 'team' ? rates.team : rates[tier];
      let cost = rate * duration;


      desks[type][selectedDeskIndex] = true;
      renderDesks();


    }

    document.getElementById('bookBtn').onclick = bookDesk;
  
    renderDesks();
  });
  