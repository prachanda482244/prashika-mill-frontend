import {  useState } from "react"
import { useDispatch } from "react-redux"
import { setModalValue, setModalValueFalse } from "../../store/slices/modelSlice"

const Modal = () => {
      const dispatch = useDispatch()
      const [isOpen,setIsOpen] = useState(true)
     const handleCancel = ()=>{
       dispatch(setModalValueFalse())
       setIsOpen(false)
     }

     const handleSave = ()=>{
      setModalValue(dispatch(setModalValue()))
      setIsOpen(false)
     }
  return (
      <>
      {
      isOpen? <div className="sticky top-2 w-10/12 flex rounded-lg  justify-between gap-5 flex-col text-white  bg-black px-10 py-5">
            <h1 className="text-xl flex items-center justify-between ">Warning! <button onClick={handleCancel} className="text-2xl text-red-500">X</button>
            </h1>
            <div className="border-b-2 mt-2"></div>
            <div className=" flex items-center justify-between p-4">
            <p className="text-white font-bold">Are you sure you want to remove this user .? </p>
            <div className="flex items-center gap-3">
            <button onClick={handleCancel} className="border px-4 py-2">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 tracking-wide">Save Changes</button>
            </div>
            </div>
          </div>
          :
          null
      }
       
    </>

  )
}

export default Modal
