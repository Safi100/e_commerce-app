import React, { useState } from 'react';
import './register.css'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const Register = () => {
    const [ProfileImage, setProfileImage] = useState(null);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const HandleFirstNameChange = (e) => {
      const text = e.target.value.trimStart();
      setFirstName(text)
    } 
    const HandleLastNameChange = (e) => {
      const text = e.target.value.trimStart();
      setLastName(text)
    }
    const HandleEmailChange = (e) => {
      const text = e.target.value.trimStart();
      setEmail(text)  
    }
    const HandlePasswordChange = (e) => {
      const text = e.target.value.trimStart();
      setPassword(text)
    }
    const HandleConfirmPasswordChange = (e) => {
      const text = e.target.value.trimStart();
      setConfirmPassword(text)
    }
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImage(reader.result);
          };
          reader.readAsDataURL(selectedImage);
        }
      };
      const DeleteImage = () => {
        setProfileImage(null)
      }
    return (
        <div className='reg_container'>
          <form>
              <div className="image-uploader">
                  <div className="image-preview">
                      {ProfileImage ? <img src={ProfileImage} alt="Uploaded" /> : <div className="placeholder"></div>}
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  <div className={`plus ${!ProfileImage && 'notSelected'}`}> <AddCircleOutlineOutlinedIcon style={{color:'#fff'}}/> </div>
                  </div>
                  <p>Porfile picture (Optional)</p>
                  {ProfileImage && <p className='delete_btn' onClick={DeleteImage} >Delete Image</p>}
              </div>
                <div className='grid'>
                    <div className='input'>
                      <label htmlFor="fname">First Name</label>
                      <input onChange={HandleFirstNameChange} value={firstName} id='fname' type="text" required/>
                    </div>
                    <div className='input'>
                      <label htmlFor="lname">Last Name</label>
                      <input onChange={HandleLastNameChange} value={lastName} id='lname' type="text" required/>
                    </div>
                    <div className='input input_full'>
                      <label htmlFor="email">Email</label>
                      <input onChange={HandleEmailChange} value={email} id='email' type="email" required/>
                    </div>
                    <div className='input'>
                      <label htmlFor="pass">Password</label>
                      <input onChange={HandlePasswordChange} value={password} id='pass' type="password" placeholder='At least 6 characters' required/>
                    </div>
                    <div className='input'>
                      <label htmlFor="ConfirmPass">Re-enter password</label>
                      <input onChange={HandleConfirmPasswordChange} value={ConfirmPassword} id='ConfirmPass' type="password" placeholder='Confirm your password' required/>
                    </div>
                </div>
                {error && <p className='error'>ddd</p>}
                <div className='btn_div'>
                  <p><a href="/login">Have an account? Sign in</a></p>
                  <button className='btn' type='submit'>Regsiter</button>
                </div>
          </form>
        </div>
    );
}

export default Register;
