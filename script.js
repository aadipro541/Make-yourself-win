document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.vote-btn');
    const message = document.getElementById('message');
    
    // Check if the user has already voted by IP (in practice, you'd check the server)
    if (localStorage.getItem('hasVoted')) {
        message.textContent = 'You have already voted!';
        disableVoting();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const team = button.getAttribute('data-team');
            
            // Simulate sending the vote to the backend
            console.log(`Voted for: ${team}`);
            
            // Store the vote in local storage (for demo purposes)
            localStorage.setItem('hasVoted', 'true');
            localStorage.setItem('votedTeam', team);

            message.textContent = `You voted for ${team}. Thanks for voting!`;
            disableVoting();
        });
    });

    // Function to disable voting after user votes
    function disableVoting() {
        buttons.forEach(button => {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
            button.style.cursor = 'not-allowed';
        });
    }
});
