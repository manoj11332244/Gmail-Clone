import React, { useEffect } from 'react'
import Message from './Message'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setEmails } from '../Redux/appSlice'
// import useSelector from 'react-redux'

const Messages = () => {

  const dispatch=useDispatch()
  const {emails}=useSelector(store=>store.app.emails)

  useEffect(()=>{
    const q=query(collection(db,'emails'),orderBy('createdAt','desc'));
    const unsubscribe=onSnapshot(q,(snapshot)=>{
      const allEmails=snapshot.docs.map((doc)=>({...doc.data(),id: doc.id}))
      // console.log(allEmails)
      dispatch(setEmails(allEmails))
    })

    //cleanup message
    return ()=> unsubscribe();
  },[])
  return (
    <div>
      {
        emails && emails?.map((email)=> <Message />)
      }
       
    </div>
  )
}

export default Messages