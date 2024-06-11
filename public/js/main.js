document.addEventListener('DOMContentLoaded', function () {
    const offerSkillForm = document.getElementById('offerSkillForm');
    const requestSkillForm = document.getElementById('requestSkillForm');

    // Event listener for offering a skill
    offerSkillForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const skill = document.getElementById('offerSkill').value;
        const response = await fetch('/dashboard/offer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill })
        });
        const data = await response.json();
        document.getElementById('messages').innerText = data.message;
    });

    // Event listener for requesting a skill
    requestSkillForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const skill = document.getElementById('requestSkill').value;
        const response = await fetch('/dashboard/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill })
        });
        const data = await response.json();
        document.getElementById('messages').innerText = data.message;
    });
});

