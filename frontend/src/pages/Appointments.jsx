import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointments = () => {

  const { docId } = useParams();

  const { doctors} = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)

  const fetchDocInfo = async ()=>{
    const docInfo = doctors.find(doc=> doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  }
  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])


  return docInfo &&(
    <div>
     {/* ----------- Doctor details ----------*/}
     <div>
      <div>
        <img src={docInfo.image} alt="" />
      </div>
      <div>
        <p>
          {docInfo.name}<img src={assets.verified_icon}/>
        </p>
      
      <div>
        <p>
          {docInfo.degree} - {docInfo.speciality}
        </p>
      
      </div>
      </div>
     </div>

    </div>

  )
}

export default Appointments;
