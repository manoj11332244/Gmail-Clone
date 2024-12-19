// import React, { useState } from 'react'
// import { RxCross2 } from 'react-icons/rx'
// import { useDispatch, useSelector } from 'react-redux'
// import { setOpen } from '../Redux/appSlice'
// import { addDoc,collection,serverTimestamp } from 'firebase/firestore'
// import {db} from '../firebase'

// const SendMail = () => {

//     const [formData, setFormData] = useState({
//         recipients: "",
//         subject: "",
//         message: ""
//     })
//     const { open } = useSelector(store => store.app)
//     const dispatch = useDispatch()

//     const changeHandler = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }

//     const submitHandler = async(e) => {
//         e.preventDefault();
//         await addDoc(collection(db,"emails"),{
//             to: formData.recipients,
//             subject: formData.subject,
//             message: formData.message,
//             createdAt: serverTimestamp(),
//         })
//         // console.log(formData)
//         dispatch(setOpen(false))
//         setFormData({
//             recipients: "",
//             subject: "",
//             message: ""
//         })
//     }

//     return (
//         <div className={`${open ? 'block' : 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
//             <div className='flex px-3 py-2 justify-between bg-[#f2f6fc] rounded-t-md'>
//                 <h1>New Message</h1>
//                 <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
//                     <RxCross2 size={'10px'} />
//                 </div>
//             </div>
//             {/* form */}
//             <form onClick={submitHandler} className='flex flex-col p-3 gap-2'>
//                 <input onChange={changeHandler} value={formData.recipients} name='to' type='text' placeholder='To Recipent' className='outline-none py-1' />
//                 <input onChange={changeHandler} value={formData.subject} name='from' type='text' placeholder='To Subject' className='outline-none py-1' />
//                 {/* <textarea onChange={changeHandler} value={formData.message}  name='Messages' cols='30' rows='10' className='outline-none py-1'> </textarea> */}
//                 <textarea
//                     onChange={changeHandler}
//                     value={formData.message}
//                     name='message'
//                     cols='30'
//                     rows='10'
//                     placeholder='Write your message here...'
//                     className='outline-none py-1'
//                 ></textarea>
//                 <button type='submit' className='rounded-full w-fit px-4 text-white font-medium bg-[#0B57D0]'>Send</button>
//             </form>
//         </div>
//     )
// }

// export default SendMail


import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../Redux/appSlice';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const SendMail = () => {
    const [formData, setFormData] = useState({
        recipients: '',
        subject: '',
        message: '',
    });

    const { open } = useSelector((store) => store.app);
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'emails'), {
                to: formData.recipients,
                subject: formData.subject,
                message: formData.message,
                createdAt: serverTimestamp(),
            });

            console.log('Email sent successfully:', formData);

            // Reset form and close modal
            setFormData({
                recipients: '',
                subject: '',
                message: '',
            });

            dispatch(setOpen(false));
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send the email. Please try again.');
        }
    };

    return (
        <div className={`${open ? 'block' : 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
            <div className='flex px-3 py-2 justify-between bg-[#f2f6fc] rounded-t-md'>
                <h1>New Message</h1>
                <div
                    onClick={() => dispatch(setOpen(false))}
                    className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'
                >
                    <RxCross2 size={'10px'} />
                </div>
            </div>
            {/* Form */}
            <form onSubmit={submitHandler} className='flex flex-col p-3 gap-2'>
                <input
                    onChange={changeHandler}
                    value={formData.recipients}
                    name='recipients'
                    type='text'
                    placeholder='To Recipient'
                    className='outline-none py-1'
                />
                <input
                    onChange={changeHandler}
                    value={formData.subject}
                    name='subject'
                    type='text'
                    placeholder='Subject'
                    className='outline-none py-1'
                />
                <textarea
                    onChange={changeHandler}
                    value={formData.message}
                    name='message'
                    cols='30'
                    rows='10'
                    placeholder='Write your message here...'
                    className='outline-none py-1'
                ></textarea>
                <button
                    type='submit'
                    className='rounded-full w-fit px-4 py-1 text-white font-medium bg-[#0B57D0]'
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default SendMail;
