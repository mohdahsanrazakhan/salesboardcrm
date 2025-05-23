import { useState, useEffect } from 'react';

const useTeams = (id) => {
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                let teamEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/teams`;
                if (id) {
                    teamEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/teams/${id}`;
                }

                const response = await fetch(teamEndpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (id) {
                    setTeam(data);
                } else {
                    setTeams(data);
                }
            } catch (error) {
                console.error('Failed to fetch teams: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [id]);

    const updateTeam = async (id, teamData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/teams/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                throw new Error('Failed to update team');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating team: ', error);
            throw error;
        }
    };

    return { teams, team, loading, updateTeam };
}

export default useTeams;