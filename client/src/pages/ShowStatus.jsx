import { useEffect, useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import TableLoader from '../components/TableLoader';
import formatDate from '../utils/formatDate';
import useStatuses from '../hooks/useStatuses';

const fallbackUrl = 'https://dummyjson.com/c/a1ac-a7fb-494a-8aba';

const ShowStatus = () => {
  const { statuses, loading, error } = useStatuses();
  const [fallbackStatuses, setFallbackStatuses] = useState([]);
  const [fallbackLoading, setFallbackLoading] = useState(false);

  useEffect(() => {
    if ((!statuses || statuses.length === 0 || error) && !loading) {
      setFallbackLoading(true);
      fetch(fallbackUrl)
        .then(res => res.json())
        .then(data => {
          setFallbackStatuses(data.statuses || data || []);
        })
        .catch(() => setFallbackStatuses([]))
        .finally(() => setFallbackLoading(false));
    }
  }, [statuses, loading, error]);

  if (loading || fallbackLoading) {
    return <TableLoader />;
  }

  const displayStatuses = (statuses && statuses.length > 0) ? statuses : fallbackStatuses;

  return (
    <>
      {/* <!-- Show Leads --> */}
      <main className="p-6 flex-1">
        <div className="overflow-y-auto max-h-[84vh] shadow-md rounded-lg">
          <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-200 uppercase bg-gray-600">
              <tr>
                <th className="poppins-semibold px-6 py-3">ID</th>
                <th className="poppins-semibold px-6 py-3">Status Name</th>
                <th className="poppins-semibold px-6 py-3">Created At</th>
                <th className="poppins-semibold px-6 py-3">Last Modified</th>
                <th className="poppins-semibold px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody id="leads-table-body">
              {displayStatuses.map((status, index) => (
                <tr key={status._id || status.id || index} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                  <td className="poppins-semibold px-6 py-4">{index + 1}</td>
                  <td className="poppins-semibold px-6 py-4">{status.name}</td>
                  <td className="poppins-semibold px-6 py-4">{status.createdAt ? formatDate(status.createdAt) : '-'}</td>
                  <td className="poppins-semibold px-6 py-4">{status.updatedAt ? formatDate(status.updatedAt) : '-'}</td>
                  <td className="poppins-semibold px-6 py-4">
                    <Link to={`/edit-status/${status._id || status.id || ''}`} title="Edit Status">
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

export default ShowStatus;