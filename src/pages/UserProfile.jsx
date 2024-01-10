import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    id: '',
    role: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedName = localStorage.getItem('auth_name');
      const storedAuthName = localStorage.getItem('auth_name');
      setAuthName(storedAuthName);

      if (storedName) {
        try {
          const response = await axios.get(`http://localhost:8000/api/get-user/${storedName}`);
          const { first_name, last_name, email, id } = response.data.user;
          const  role  = response.data.role.toUpperCase();
          setUserData({ first_name, last_name, email, id, role });
          console.log(response.data)
        } catch (error) {
          console.error('Eroare la căutarea utilizatorului:', error);
          setUserData(null);
        }
      }
    };

    fetchData();
  }, []); 

  return (
    <>
    <Navbar />
    <Wrapper className="shadow">
      <div className="title-box" style={{ marginBottom:'-30px' }}>
        <h1 >{authName}</h1>
      </div>
    <div className='userprofilein'>
            <div className='left'>
              <UserSidebar activepage={activepage}/>
            </div>
            <div className='right'>
              {activepage === 'accountsettings' && <AccountSettings userData={userData} setUserData={setUserData} />}
              {activepage === 'changepassword' && <ChangePassword userData={userData} />}
              {activepage === 'yourResults' && <YourResults/>}
            </div>
         </div>
    </Wrapper>
    </>
  );
}
export default UserProfile;