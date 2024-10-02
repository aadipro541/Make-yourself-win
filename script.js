document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.vote-btn');
    const message = document.getElementById('message');
    const teamVotes = {
        'Hindu': parseInt(localStorage.getItem('team1Votes')) || 0,
        'Muslim': parseInt(localStorage.getItem('team2Votes')) || 0,
        'Sikh': parseInt(localStorage.getItem('team3Votes')) || 0,
        'Christian': parseInt(localStorage.getItem('team4Votes')) || 0
    };
    
    // Update vote counts initially
    updateVoteCounts();

    // Check if the user has already voted by using localStorage
    if (localStorage.getItem('hasVoted')) {
        message.textContent = `You have already voted for ${localStorage.getItem('votedTeam')}!`;
        disableVoting();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const team = button.getAttribute('data-team');
            
            // Increment the vote count for the selected team
            teamVotes[team]++;
            localStorage.setItem(`team${getTeamNumber(team)}Votes`, teamVotes[team]);
            
            // Store the user's vote in localStorage
            localStorage.setItem('hasVoted', 'true');
            localStorage.setItem('votedTeam', team);

            // Update message and disable further voting
            message.textContent = `You voted for ${team}. Thanks for voting!`;
            updateVoteCounts();
            disableVoting();
        });
    });

    // Function to update the displayed vote counts
    function updateVoteCounts() {
        document.getElementById('team1-votes').textContent = teamVotes['Hindu'];
        document.getElementById('team2-votes').textContent = teamVotes['Muslim'];
        document.getElementById('team3-votes').textContent = teamVotes['Sikh'];
        document.getElementById('team4-votes').textContent = teamVotes['Christian'];
    }

    // Function to disable voting after user votes
    function disableVoting() {
        buttons.forEach(button => {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
            button.style.cursor = 'not-allowed';
        });
    }

    // Helper function to map team names to localStorage keys
    function getTeamNumber(team) {
        switch (team) {
            case 'Hindu': return 1;
            case 'Muslim': return 2;
            case 'Sikh': return 3;
            case 'Christian': return 4;
            default: return 0;
        }
    }
});
