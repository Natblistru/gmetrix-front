import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/layouts/Navbar';
import Wrapper from '../components/Wrapper';
import UserSidebar from '../components/UserProfile/UserSidebar';
import AccountSettings from '../components/UserProfile/AccountSettings';
import ChangePassword from '../components/UserProfile/ChangePassword';
import YourResults from '../components/UserProfile/YourResults';

function UserProfile() {

  const {activepage} = useParams()
  const [authName, setAuthName] = useState('');

  useEffect(() => {
    const storedAuthName = localStorage.getItem('auth_name');
    setAuthName(storedAuthName);
  }, []);

  return (
    <>
    <Navbar />
    <Wrapper className="shadow">
      <div class="title-box" style={{ marginBottom:'-30px' }}>
        <h1 >{authName}</h1>
      </div>
    <div className='userprofilein'>
            <div className='left'>
              <UserSidebar activepage={activepage}/>
            </div>
            <div className='right'>
              {activepage === 'accountsettings' && <AccountSettings/>}
              {activepage === 'changepassword' && <ChangePassword/>}
              {activepage === 'yourResults' && <YourResults/>}
            </div>
         </div>
    </Wrapper>
    </>
  );
}
export default UserProfile;