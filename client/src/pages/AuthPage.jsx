
import React, { useRef, useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import messagingleft from '/messagingleft.jpg';
import messagingright from '/messagingright.jpg';
import chat from '/chat.jpg';
import gsap from 'gsap';
import { signup, login } from '../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser, setError } from '../redux/AuthSlice';

const AuthPage = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const chatIconRef = useRef(null);
  const badgeRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const rootRef = useRef(null);
  const landingRef = useRef(null);
  const singupref = useRef(null);
  const loginref = useRef(null);
  const [showSignup, setShowSignup] = useState(true);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(leftRef.current, { opacity: 0, duration: 1.2 }, 0);
      tl.from(rightRef.current, { opacity: 0, duration: 1.2, delay: 0.5 }, 0);


      tl.fromTo(chatIconRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      );

      tl.from(badgeRef.current, { scale: 0, opacity: 0, duration: 0.2, ease: "expo.in", stagger: 0.25 }, ">-0.2");

      tl.from(text1Ref.current, { opacity: 0, duration: 0.1, ease: "power3.out" }, ">0.3")
        .from(text2Ref.current, { opacity: 0, duration: 0.1, delay: 0.3, ease: "power3.out" }, ">0.2")
        .from(text3Ref.current, { opacity: 0, duration: 0.1, ease: "power3.out" }, ">0.2")
        .from(text4Ref.current, { opacity: 0, duration: 0.1, ease: "power3.out" }, ">0.2");

      tl.fromTo(landingRef.current,
        { y: 0, opacity: 1 },
        { y: -300, opacity: 0, duration: 1.6, ease: "power4.out" }
      );

      tl.fromTo(singupref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );

    }, rootRef);

    return () => ctx.revert();
  }, []);


  const toggleForm = () => {
    if (showSignup) {
      gsap.to(singupref.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        onComplete: () => {
          setShowSignup(false);
          gsap.fromTo(loginref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 });
        }
      })
    } else {
      gsap.to(loginref.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        onComplete: () => {
          setShowSignup(true),
            gsap.fromTo(singupref.current, {
              opacity: 0,
              y: 30
            },
              {
                opacity: 1,
                y: 0,
                duration: 0.6
              })
        }
      })
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    emailorphone: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {

      dispatch(setLoading(true));
      const res = await signup(formData);

      dispatch(setUser({
        user: res.user,
        token: res.token
      }))
      alert(res.message);

      // localStorage.setItem("token", res.token);

      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });

      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer)

    } catch (error) {
      dispatch(setError(error.message));
      alert(error.message);
    } finally {
      dispatch(setLoading(false))
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      dispatch(setLoading(true));
      const res = await login(formData);

      dispatch(setUser({

        user: res.user,
        token: res.token
      }))
      // localStorage.setItem("token", res.token);
      alert(res.message);

      setFormData({
        emailorphone: "",
        password: "",
      });

      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer)
    } catch (error) {
      dispatch(setError(error.message));
      alert(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div ref={rootRef} className='bg-[#2B2B2B] h-screen flex items-center justify-center pt-serif-regular overflow-hidden '>
      <div className='w-[35%] h-full flex items-center justify-end'>
        <img
          ref={leftRef}
          src={messagingleft}
          alt='Messaging illustration left'
          className='mt-5 max-w-full h-auto'
        />
      </div>

      <div className='w-[30%] h-full flex justify-center'>

        <div ref={landingRef} className='text-white absolute flex flex-col justify-center h-full text-center p-8 z-0 italic text-3xl'>
          <div className='relative flex items-center justify-center'>

            <div ref={chatIconRef} className='' style={{ width: '4rem', height: '4rem' }}>
              <img src={chat} className=' h-12 w-12' alt="Chat Icon" />
            </div>
            <div
              ref={badgeRef}
              className='absolute top-0 ml-6 w-4 h-4 bg-red-600 text-white font-medium 
                         rounded-full p-1 flex items-center justify-center text-sm'>1</div>
          </div>

          <div className='flex items-end justify-center gap-2'>
            <div ref={text1Ref} className='text-3xl'>Chalo</div>
            <div ref={text2Ref} className=' text-3xl'>Thodi</div>
          </div>

          <div className='flex items-end justify-center gap-2 '>
            <div ref={text3Ref} className='text-6xl font-[800] ml-15'>BaatChit</div>
            <div ref={text4Ref} className='text-4xl'>Kare</div>
          </div>
        </div>

        <div className='z-20 w-full flex flex-col items-center justify-center'>

          <div ref={singupref} style={{ display: showSignup ? "flex" : "none" }}
            className='w-full flex flex-col items-center justify-center font-medium py-4 mt-12'>
            <div className='text-xl mb-2 poppins-medium text-white'>Account Baano Aur Thodi BaatChit Karo!</div>

            <div className='poppins-medium w-[70%] text-md flex items-center justify-between rounded-2xl bg-[#1C1C1C] mt-2 text-white'>
              <div className='w-1/2 py-1 text-center bg-white text-black rounded-2xl'>SignUp</div>
              <div className='w-1/2 text-center'>SignIn</div>
            </div>

            <form className='mt-8 w-[80%] flex flex-col gap-5 text-white'>

              <div className='flex flex-col gap-1'>
                <label className='text-lg font-medium '>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full bg-white text-white  px-4 py-1 rounded-md outline-none placeholder:text-black placeholder:opacity-65 placeholder:font-medium'
                />
              </div>


              <div className='flex flex-col gap-1'>
                <label className='text-lg font-medium'>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full bg-white text-white  px-4 py-1 rounded-md outline-none placeholder:text-black placeholder:opacity-65 placeholder:font-medium'
                />
              </div>


              <div className='flex flex-col gap-1'>
                <label className='text-lg font-medium'>Phone</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter Phone"
                  value={formData.mobile}
                  onChange={handleChange}
                  className='w-full bg-white text-white  px-4 py-1 rounded-md outline-none placeholder:text-black placeholder:opacity-65 placeholder:font-medium'
                />
              </div>


              <div className='flex flex-col gap-1'>
                <label className='text-lg font-semd'>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full bg-white text-white  px-4 py-1 rounded-md outline-none placeholder:text-black placeholder:opacity-65 placeholder:font-medium'
                />
              </div>


              <div className='w-full flex justify-center mt-4'>
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className={
                    `w-[50%] bg-[#1C1C1C] text-white rounded-lg mt-4 py-1 poppins-medium
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}>
                  {loading ? "Signing up..." : "SignUp"}
                </button>
              </div>
            </form>


            <div className='text-lg font-medium mb-2 mt-8 text-white' >Already Have An Acccount?<span className='border-b-2 mb-1 hover:cursor-pointer' onClick={toggleForm}> Login In</span></div>
          </div>

          <div ref={loginref} style={{ display: showSignup ? "none" : "flex" }}
            className='w-full flex flex-col items-center justify-center font-medium py-4 mt-12'>
            <div className='text-xl font-medium mb-2 poppins-medium text-white'>Wapis BaatChit Karni Hai? Login Karlo!</div>

            <div className='poppins-medium w-[70%] text-md flex items-center justify-between rounded-2xl bg-[#1C1C1C] mt-2 mb-4 text-white'>
              <div className='w-1/2 text-center'>SignUp</div>
              <div className='w-1/2 py-1 text-center  bg-white text-black rounded-2xl'>SignIn</div>
            </div>

            <form className='mt-8 w-[80%] flex flex-col gap-4 text-white'>

              <div className='flex flex-col gap-1'>
                <label className='text-lg font-medium'>Email/Phone</label>
                <input
                  type="text"
                  name="emailorphone"
                  placeholder="Enter Email or Phone"
                  value={formData.emailorphone}
                  onChange={handleChange}
                  className='w-full bg-white text-white  px-4 py-1 rounded-md outline-none placeholder:text-black placeholder:opacity-65 placeholder:font-medium'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-lg font-medium'>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full bg-white text-white  px-4 py-1 rounded-md outline-none placeholder:text-black placeholder:opacity-65 placeholder:font-medium'
                />
              </div>


              <div className='w-full flex justify-center mt-4 '>
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={
                    `w-[50%] bg-black  text-white rounded-lg mt-4 py-1
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>

            </form>


            <div className='text-lg font-medium mb-2 mt-8 text-white'>Dont Have An Acccount?<span className='border-b-2 mb-1 hover:cursor-pointer' onClick={toggleForm}> Sign Up</span></div>
          </div>
        </div>
      </div>

      <div className='w-[35%] h-full flex items-center justify-start'>
        <img
          ref={rightRef}
          src={messagingright}
          alt='Messaging illustration right'
          className='max-w-full h-auto'
        />
      </div>
    </div>
  );
}

export default AuthPage
