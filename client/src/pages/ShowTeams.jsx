import { useEffect, useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import TableLoader from '../components/TableLoader';
import { PiUserListLight, PiUsers } from "react-icons/pi";
import formatDate from '../utils/formatDate';
import useTeams from '../hooks/useTeams';

const fallbackUrl = 'https://dummyjson.com/c/bdb2-3564-4d92-adb1';

const ShowTeams = () => {
  const { teams, loading, error } = useTeams();
  const [fallbackTeams, setFallbackTeams] = useState([]);
  const [fallbackLoading, setFallbackLoading] = useState(false);

  useEffect(() => {
    if ((!teams || teams.length === 0 || error) && !loading) {
      setFallbackLoading(true);
      fetch(fallbackUrl)
        .then(res => res.json())
        .then(data => {
          setFallbackTeams(data.teams || data || []);
        })
        .catch(() => setFallbackTeams([]))
        .finally(() => setFallbackLoading(false));
    }
  }, [teams, loading, error]);

  if (loading || fallbackLoading) {
    return <TableLoader />
  }

  const displayTeams = (teams && teams.length > 0) ? teams : fallbackTeams;

  return (
    <>
      {/* <!-- Show Leads --> */}
      <main className="p-6 flex-1">
        <div className="overflow-y-auto max-h-[84vh] shadow-md rounded-lg">
          <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-200 uppercase bg-gray-600">
              <tr>
                <th className="poppins-semibold px-6 py-3">ID</th>
                <th className="poppins-semibold px-6 py-3">Team Name</th>
                <th className="poppins-semibold px-6 py-3">Campaign Name</th>
                <th className="poppins-semibold px-6 py-3">Date Created</th>
                <th className="poppins-semibold px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody id="leads-table-body">
              {displayTeams.map((team, index) => (
                <tr key={team._id || team.id || index} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                  <td className="poppins-semibold px-6 py-4">{index + 1}</td>
                  <td className="poppins-semibold px-6 py-4">{team.name}</td>
                  <td className="poppins-semibold px-6 py-4">{team.campaignId?.name || team.campaignName || '-'}</td>
                  <td className="poppins-semibold px-6 py-4">{formatDate(team.createdAt || team.date || new Date())}</td>
                  <td className="poppins-semibold px-6 py-4 flex items-center gap-4">
                    <Link to={`/leads?team_id=${team._id || team.id || ''}`} title="Show Leads by Team">
                      <PiUserListLight size={24} className='text-gray-500 stroke-[6px]' />
                    </Link>
                    <Link to={`/edit-team/${team._id || team.id || ''}`} title="Edit Team">
                      <TbEdit size={24} className='text-gray-500' />
                    </Link>
                    <Link to={`/show-user-by-team?team_id=${team._id || team.id || ''}`} title="Show Users by Team">
                      <PiUsers size={24} className='text-gray-500 ' />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default ShowTeams;