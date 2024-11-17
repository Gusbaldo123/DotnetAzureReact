import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./ProfessorPage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

const infoPlaceHolder = require("../../TemporaryInfo.js");
const userInfo = infoPlaceHolder.UserInfo();
const courseInfo = infoPlaceHolder.CourseInfo();

function SubmitUpdateProfile(e,navigate)
{
    e.preventDefault();

    navigate("/home");
}

function ProfessorPage()
{
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "TODO";
  }, []);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("localUser"));
  } catch {
    user = null;
  }

  useEffect(() => {
    if (!user) navigate("/Home");
  }, [user, navigate]);
  

  return(
    <>
      <Header/>
        <main>
          <Banner/>
          <section className="professorContent">
            
            <form action="post" className="formProfessor" onSubmit={(e)=>{SubmitUpdateProfile(e,navigate)}} onChange={()=>{}}>
            <h2>{`Mr./Ms ${user.Surname}'s Account`}</h2>
              <div>
              <label htmlFor="lblEmail">Email</label>
              <input type="text" name="lblEmail" id="lblEmail" className="lblEmail" readOnly disabled value={user.Email} required onChange={()=>{}} />
              </div>
              <div>
              <label htmlFor="lblPass">Password</label>
              <input type="password" name="lblPass" id="lblPass" className="lblPass" value={user.Password} required onChange={()=>{}}/>
              </div>
              <hr />
              <h3>Informations</h3>
              <div>
              <label htmlFor="lblName">First Name</label>
              <input type="text" name="lblName" id="lblName" className="lblName" value={user.Firstname} required onChange={()=>{}}/>
              </div>
              <div>
              <label htmlFor="lblSurname">Surname</label>
              <input type="text" name="lblSurname" id="lblSurname" className="lblSurname"value={user.Surname} required onChange={()=>{}}/>
              </div>
              <div>
              <label htmlFor="lblPhone">Phone</label>
              <input type="text" name="lblPhone" id="lblPhone" className="lblPhone" value={user.Phone} required onChange={()=>{}}/>
              </div>
              <div className="btOptions">
                  <button type="submit" className="btUpdate" >Update Account</button>
                  <button className="btDelete">Delete Account</button>
                  </div>
          </form>
          </section>
        </main>
      <Footer/> 
    </>
  );
}

export default ProfessorPage;