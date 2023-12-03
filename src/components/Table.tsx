import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import ReactPaginate from "react-paginate";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type userDataType = {
  id: number,
  name: string,
  email: string,
  role: string
}

export default function Table() {
  const [userData, setUserData] = useState<userDataType[]>([]);
  const [searchData, setSearchData] = useState<userDataType[]>([]);
  const [allSelect, setAllSelect] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [removeId, setRemoveId] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number>();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_KEY)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUserData(data);
        setSearchData(data);
      })
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(searchData.length / usersPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const handleSearch = (text: string) => {
    const searchText = text.toLowerCase();
    const filteredUsers: userDataType[] = [];

    for (const user of userData) {
      if (
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText)
      ) {
        filteredUsers.push(user);
      }
    }
    setSearchData(filteredUsers);
  }

  const editEntry = () => {
    if (editId) {
      console.log(editId)
      searchData[editId - 1].name = name;
      searchData[editId - 1].email = email;
      setName('');
      setEmail('');
    }
    setEditOpen(!editOpen);
  }

  const removeEntry = () => {
    let size = removeId.length;
    let filteredUsersData: userDataType[] = [];
    for (let i = 1; i <= size; i++) {
      filteredUsersData = searchData.filter((user) => user.id !== removeId[i])
    }
    setSearchData(filteredUsersData)
    setOpen(!open);
  }

  const displayUsers = searchData
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <TableRow
          key={item.id}
          id={item.id}
          name={item.name}
          email={item.email}
          role={item.role}
          allSelect={allSelect}
          open={open}
          setOpen={setOpen}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          removeId={removeId}
          setRemoveId={setRemoveId}
          setEditId={setEditId}
        />
      );
    });

  return (
    <div className="flex flex-col absolute w-[95%] top-20 px-10 py-5 bg-white rounded-[10px] shadow-xl">
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center py-3 pl-2">
          <div className="font-nunito text-3xl font-bold text-[#2b2eff]">
            User Details
          </div>
          <div className="flex flex-row items-center">
            {allSelect ?
              <div
                className="flex flex-row items-center cursor-pointer mr-[30px] border-[1px] p-3 bg-[#FDEDED] rounded-[5px]"
                onClick={() => setOpen(!open)}
              >
                <DeleteOutlineOutlinedIcon sx={{ marginRight: "5px", color: "#D2042D" }} />
                <span className="font-nunito font-bold text-[#D2042D]">Delete</span>
              </div> :
              (null)
            }
            <div className="relative">
              <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full font-nunito p-3 pl-10 text-md font-semibold !outline-none rounded-[5px] border-[1px] border-gray-300"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 cursor-pointer">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 pl-4">
                    <div onClick={() => setAllSelect(!allSelect)} className="flex items-center h-5">
                      {!allSelect ?
                        <CheckBoxOutlineBlankIcon fontSize="small" sx={{ color: 'grey' }} /> :
                        <CheckBoxIcon fontSize="small" sx={{ color: '#2b2eff' }} />
                      }
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-nunito font-bold text-left text-gray-500 uppercase "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-nunito font-bold text-left text-gray-500 uppercase "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-nunito font-bold text-left text-gray-500 uppercase "
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-nunito font-bold text-left text-gray-500 uppercase "
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-nunito font-bold text-left text-gray-500 uppercase "
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-nunito font-bold text-left text-gray-500 uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayUsers}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>

        <EditModal
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          editEntry={editEntry}
        />

        <DeleteModal
          open={open}
          setOpen={setOpen}
          removeEntry={removeEntry}
        />
      </div>
    </div>
  );
}
