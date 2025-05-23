import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbList, TbEdit } from "react-icons/tb";
import TableLoader from '../components/TableLoader';
import formatDate from '../utils/formatDate.js';
import useCampaigns from '../hooks/useCampaigns';

const fallbackUrl = 'https://dummyjson.com/c/87b5-888b-4d92-87e0';

const ShowCampaigns = () => {
  const { campaigns, loading, error } = useCampaigns();
  const [fallbackCampaigns, setFallbackCampaigns] = useState([]);
  const [fallbackLoading, setFallbackLoading] = useState(false);

  useEffect(() => {
    if ((!campaigns || campaigns.length === 0 || error) && !loading) {
      setFallbackLoading(true);
      fetch(fallbackUrl)
        .then(res => res.json())
        .then(data => {
          // Adjust this if the API response structure is different
          setFallbackCampaigns(data.campaigns || data || []);
        })
        .catch(() => setFallbackCampaigns([]))
        .finally(() => setFallbackLoading(false));
    }
  }, [campaigns, loading, error]);

  if (loading || fallbackLoading) {
    return <TableLoader />;
  }

  const displayCampaigns = (campaigns && campaigns.length > 0) ? campaigns : fallbackCampaigns;

  return (
    <>
      {/* <!-- Show Leads --> */}
      <main className="p-6 flex-1">
        <div className="overflow-y-auto max-h-[84vh] shadow-md rounded-lg">
          <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-200 uppercase bg-gray-600">
              <tr>
                <th className="poppins-semibold px-6 py-3">ID</th>
                <th className="poppins-semibold px-6 py-3">Campaign Name</th>
                <th className="poppins-semibold px-6 py-3">Created At</th>
                <th className="poppins-semibold px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody id="leads-table-body">
              {displayCampaigns.map((campaign, index) => (
                <tr key={campaign._id || campaign.id || index} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                  <td className="poppins-semibold px-6 py-4">{index + 1}</td>
                  <td className="poppins-semibold px-6 py-4">{campaign.name || campaign.title}</td>
                  <td className="poppins-semibold px-6 py-4">{formatDate(campaign.createdAt || campaign.date || new Date())}</td>
                  <td className="poppins-semibold px-6 py-4 flex items-center gap-4">
                    <Link to={`/leads?campaign_id=${campaign._id || campaign.id || ''}`} title="Show Leads by Campaign">
                      <TbList size={24} className='fill-gray-500' />
                    </Link>
                    <Link to={`/edit-campaign/${campaign._id || campaign.id || ''}`} title="Edit Campaign">
                      <TbEdit size={24} className='text-gray-500' />
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

export default ShowCampaigns;