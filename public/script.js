document.addEventListener('DOMContentLoaded', () => {
    const clientForm = document.getElementById('client-form');
    const clientList = document.getElementById('client-list');
    const progressForm = document.getElementById('progress-form');
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentList = document.getElementById('appointment-list');
    const revenueButton = document.getElementById('calculate-revenue');
    const statsButton = document.getElementById('show-stats');
    const revenueOutput = document.getElementById('revenue-output');
    const statsOutput = document.getElementById('stats-output');

    const fetchData = async () => {
        const response = await fetch('/api/data');
        return await response.json();
    };

    const renderClients = async () => {
        const data = await fetchData();
        clientList.innerHTML = '';
        data.clients.forEach(client => {
            const li = document.createElement('li');
            li.textContent = client;
            clientList.appendChild(li);
        });
    };

    clientForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const clientName = document.getElementById('client-name').value;
        const data = await fetchData();
        data.clients.push(clientName);
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        document.getElementById('client-name').value = '';
        renderClients();
    });

    progressForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Handle progress submission logic here
    });

    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const appointmentClient = document.getElementById('appointment-client').value;
        const appointmentTime = document.getElementById('appointment-time').value;
        const data = await fetchData();
        data.appointments.push({ client: appointmentClient, time: appointmentTime });
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        document.getElementById('appointment-client').value = '';
        document.getElementById('appointment-time').value = '';
        renderAppointments();
    });

    const renderAppointments = async () => {
        const data = await fetchData();
        appointmentList.innerHTML = '';
        data.appointments.forEach(appointment => {
            const li = document.createElement('li');
            li.textContent = `${appointment.client} - ${appointment.time}`;
            appointmentList.appendChild(li);
        });
    };

    revenueButton.addEventListener('click', async () => {
        // Calculate and display revenue logic here
    });

    statsButton.addEventListener('click', async () => {
        // Calculate and display statistics logic here
    });

    renderClients();
    renderAppointments();
});
