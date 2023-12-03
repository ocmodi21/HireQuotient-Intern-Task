import { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

type rowProp = {
  id: number,
  name: string,
  email: string,
  role: string,
  allSelect: boolean,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  editOpen: boolean,
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setEditId: React.Dispatch<React.SetStateAction<number | undefined>>,
  removeId: number[],
  setRemoveId: React.Dispatch<React.SetStateAction<number[]>>
}

const TableRow = ({ id, name, email, role, allSelect, open, setOpen, editOpen, setEditOpen, removeId, setRemoveId, setEditId }: rowProp) => {
  const [select, setSelect] = useState(false);
  return (
    <tr className={allSelect || select ? 'bg-[#2b2eff] text-white bg-opacity-10' : 'hover:bg-[#F5F7F8] cursor-pointer'}>
      <td className="py-3 pl-4">
        <div onClick={() => setSelect(!select)} className="flex items-center h-5">
          {allSelect || select ? <CheckBoxIcon fontSize="small" sx={{ color: '#2b2eff' }} /> :
            <CheckBoxOutlineBlankIcon fontSize="small" sx={{ color: 'grey' }} />
          }
        </div>
      </td>
      <td className="px-6 py-4 text-md font-nunito font-semibold text-gray-800 whitespace-nowrap">
        {id}
      </td>
      <td className="px-6 py-4 text-md font-nunito font-semibold text-gray-800 whitespace-nowrap">
        {name}
      </td>
      <td className="px-6 py-4 text-md font-nunito font-semibold text-gray-800 whitespace-nowrap">
        {email}
      </td>
      <td className="px-6 py-4 text-md font-nunito font-semibold text-gray-800 whitespace-nowrap">
        {role}
      </td>
      <td className="px-6 py-4 text-md font-nunito font-semibold text-gray-800 whitespace-nowrap">
        <span onClick={() => { setEditOpen(!editOpen); setEditId(id) }} className="text-green-500 hover:text-green-700">
          Edit
        </span>
      </td>
      <td className="px-6 py-4 text-md font-nunito font-semibold text-gray-800 whitespace-nowrap">
        <span
          onClick={() => { setOpen(!open); setRemoveId([...(removeId || []), id]); }}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </span>
      </td>
    </tr>
  )
}

export default TableRow
