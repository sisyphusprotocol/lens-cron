import { Table } from 'react-daisyui';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Home: NextPage = () => {
  const columns = useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Content', accessor: 'content' },
      { Header: 'Planned Time', accessor: 'time' },
      { Header: 'Status', accessor: 'status' }
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        title: 'Airdrop start',
        content: 'lens airdrop start today',
        time: 1676778221,
        status: 'pending'
      },
      {
        title: 'Anniversary',
        content: 'Today it is the second years of lens protocol',
        time: 1676778221,
        status: 'error'
      },
      {
        title: 'Announce Launch',
        content: 'Lens Protocol v2 is launched today',
        time: 1676778221,
        status: 'Finished'
      }
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
      <div className="my-16 mx-20  min-h-screen ">
        <div className="center container relative flex w-auto flex-row flex-wrap justify-end">
          <div className="btn relative">Create</div>
          <div className="relative mx-10">
            <ConnectButton />
          </div>
        </div>
        <div className="my-10 w-full overflow-x-auto">
          <Table {...getTableProps()}>
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps()}>
                          {
                            // Render the header
                            column.render('Header')
                          }
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
              {
                // Loop over the table rows
                rows.map((row) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                      {
                        // Loop over the rows cells
                        row.cells.map((cell) => (
                          // Apply the cell props
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        ))
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Home;
