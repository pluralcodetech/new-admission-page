import { useEffect, useRef, useState } from "react";
import Text from "../../atoms/Text";
import { Link } from "react-router-dom";
import FormNav from "../../molecules/FormNav";
import HeaderAd from "./HeaderAd";
import { BiLoaderAlt } from "react-icons/bi";
import DigitalContent from "../../contextData/DigitalContent";
import { useContext } from "react";
import random from "random";


const FormAd = () => {
  const {digital, cohort} = useContext(DigitalContent)

  const usdtref = useRef()
  const nairaref = useRef();

  const numFor = Intl.NumberFormat("en-US");

  // get referral code
  const params = new URLSearchParams(window.location.search);
  const referral = params.get("referral_code")
  const courseName = params.get("course_name")
  const cohortName = params.get("cohort")
  
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  // const [chname, setchname] = useState([]);
  // const [eachCourse, setEachCourse] = useState({});
  const [fee, setFee] = useState([]);
  const [emailmsg, setEmailmsg] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [errMsgFn, setErrMsgFn] = useState();
  const [errMsgCh, setErrMsgCh] = useState();
  const [errMsgCo, setErrMsgCo] = useState();
  const [errMsgE, setErrMsgE] = useState();
  const [errMsgPn, setErrMsgPn] = useState();
  const [errMsgS, setErrMsgS] = useState();
  const [errMsgCt, setErrMsgCt] = useState();
  const [duplicate, setDuplicate] = useState();
  const [oldPrice, setOldPrice] = useState({
    price: "",
    date: ""
  });

  const [eachFee, setEachFee] = useState({
    offset: "",
    discount_deadline: "",
    subtotal: "",
    vat: "",
    transaction: "",
    total: "",
    amountDue: "",
    sign: "",
    usd: "",
  });


  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };
  

  const [formD, setFormD] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    age_range: "",
    academy_level: "",
    course_level: "diploma",
    classF: "virtual_class",
    cohort: cohortName ? cohortName : '',
    course: courseName ? courseName : '',
    payment_plan: "full_payment",
    currency: "usd",
    country: "Nigeria",
    state: "Lagos State",
  });

  useEffect(()=>{
    digital.map(each=>{

      if (formD.course === each.name){
        setFee(each)
      }
      return null
    })
  },[digital,formD.course])
  
  // countries list
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((result) => {
        setCountry(result.data);
      })
      .catch((err) => console.log(err));
  }, []);


  
  const handleForm = (event) => {
    setErrMsg("");
    setErrMsgCh("");
    setErrMsgCo("");
    setErrMsgCt("");
    setErrMsgE("");
    setErrMsgFn("");
    setErrMsgPn("");
    setErrMsgS("");
    const { name, value } = event.target;

    setFormD((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
 

  // for fee
  useEffect(() => {
    function gg() {
      //email message
     if(formD.email){
      setEmailmsg("Kindly enter the email address you will use to access your student portal. If you are a returning student, kindly us your registered email address here")
     }

      //sort states of each country
      if (formD.country) {
        country
          .map((coun) => coun)
          .filter(
            (each) => each.name === formD.country && setState(each.states)
          );
      }
      // for currency
      if (formD.country === "Nigeria") {
        nairaref.current.style.display = "block";
      } else if (formD.country !== "Nigeria") {
        // formD.currency = "usd";
        nairaref.current.style.display = "none";
      }
      

      if (
        formD.currency === "ngn" 
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            offset: fee.ngn_offset,
            discount_deadline: fee.discount_deadline,
            amountDue:
              fee?.ngn_price,
            sign: <span>&#8358;</span>,
            usd: ""
          };
        });
       
      }

      // for usd
      if (
        formD.currency === "usd"
      ) {
        setEachFee({
          offset: fee.usd_offset,
          discount_deadline: fee.discount_deadline,
          amountDue:
              fee?.usd_price,
          sign: <span>&#36;</span>,
          usd: "(USD)",
        });
      
      } 

      //for usdt
      if (
        formD.currency === "usdt"
      ) {
        setEachFee({
          offset: fee.ngn_offset,
          discount_deadline: fee.discount_deadline,
          amountDue:
              fee?.ngn_price,
          sign: <span>&#8358;</span>,
          usd: "",
        });
      
      } 
    }
    gg();
  }, [formD, fee, country]);


  
  //for duplicate data

  useEffect(()=>{
    fetch(`https://backend.pluralcode.institute/check-loop-enrolled-courses?email=${formD.email}&course=${formD.course}`)
    .then(response=>response.json())
    .then(result=>{
    setDuplicate(result.message)})
    .catch(err=>console.log(err))
  },[formD.email,formD.course])

  //offset i.e discount prices
  useEffect(() => {

    if (eachFee.offset > 0 ) {
      const oldPrice = eachFee.offset + eachFee.amountDue
      setOldPrice({
        price: oldPrice,
        date: eachFee.discount_deadline
      })
    } else {
      setOldPrice({
        price: "",
        date: ""
      })
    }
    
  }, [eachFee.amountDue, eachFee.offset, eachFee.discount_deadline,cohort,formD.cohort, formD.payment_plan])
  //submit the form
  const rn=random.float(0,100)
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const sp = document.querySelector("#spinn");
    const sp2 = document.querySelector("#spinn2");
    let emailRegex = new RegExp(/\S+@\S+\.\S+/);
    let emailResult = emailRegex.test(formD.email.trim());

    if (checked) {
     

      if (formD.full_name.trim() === "") {
        setErrMsgFn("Fullname required!");
        setErrMsg("All fields required!");
      } else if (!emailResult) {
        setErrMsgE("Valid Email required!");
        setErrMsg("All fields required!");
      } else if (formD.phone_number.trim() === "") {
        setErrMsgPn("Phone number required!");
        setErrMsg("All fields required!");
      } else if (formD.country === "") {
        setErrMsgCt("Country required!");
        setErrMsg("All fields required!");
      } else if (formD.state === "") {
        setErrMsgS("State required!");
        setErrMsg("All fields required!");
      } else if (formD.course === "") {
        setErrMsgCo("Course required!");
        setErrMsg("All fields required!");
      } else if (formD.cohort === "") {
        setErrMsgCh("Cohort required!");
        setErrMsg("All fields required!");
      }else if(duplicate !== "No records found"){
        setErrMsg("You are already enrolled in this course!")
      } else if(formD.currency === 'ngn' || formD.currency === 'usd') {
        sp.style.display = "block";
        sp2.style.display = "block";

        const raw = JSON.stringify({
          tx_ref: "plc-" + rn,
          amount: eachFee.amountDue,
          currency: formD.currency.toUpperCase(),
          title: formD.course + " Enrollment",
          redirect_url: `https://pluralcode.academy/signup/payment?name=${formD.full_name
            }&email=${formD.email}&phone_number=${formD.phone_number}&course=${formD.course}&country=${formD.country}&state=${formD.state
            }&currency=${formD.currency.toUpperCase()}&cohort_id=${cohort[0]?.id
            }&total=${eachFee.amountDue}&ref=${referral}`,
          email: formD.email,
          phonenumber: formD.phone_number,
          name: formD.full_name,
        });
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const reqMethod = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const url = "https://backend.pluralcode.institute/initialise-payment";

        fetch(url, reqMethod)
          .then((response) => response.json())
          .then((result) => {
            window.open(result?.data?.link,'_blank')

            sp.style.display = "none";
            sp2.style.display = "none";
          })
          .catch((err) => console.log(err));
      } else if(formD.currency === 'usdt') {
        sp.style.display = "block";
        sp2.style.display = "block";
        const st=formD.state.replace(/ /g,"_")
        const cour = formD.course.replace(/ /g,"_")
        // const upperCurrency = formD.currency.toUpperCase() ///
        const raw = JSON.stringify({
          amount: eachFee.amountDue,
          baseFiat: 'NGN',
          redirectLink: `pluralcode.academy/signup/payment?name=${formD.full_name}&email=${formD.email}&phone_number=${formD.phone_number}&currency=${formD.currency.toUpperCase()}&cohort_id=${cohort[0].id}&total=${eachFee.amountDue}&ref=${referral}&country=${formD.country}&state=${st}&course=${cour}`,
          name: formD.full_name,
          description: formD.course
        });
        
        console.log(raw)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const reqMethod = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const url = "https://backend.pluralcode.institute/crypto-payment";

        fetch(url, reqMethod)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            window.open(result.paymentlink,'_blank')

            sp.style.display = "none";
            sp2.style.display = "none";
            
          })
          .catch((err) => console.log(err));
      }
      
    } else {
      setErrMsg("Box must be checked!");
    }
  };

  return (
    <>
      <FormNav
      offset={oldPrice.price}
      deadline={oldPrice.date}
        amountdue={eachFee.amountDue}
        vat={eachFee.vat}
        transaction={eachFee.transaction}
        name={fee?.name}
        sign={eachFee.sign}
        usd={eachFee.usd}
        form={formD}
      />

      <HeaderAd />

      <div className="w-full bg-white p-4 md:p-6 lg:px-16 lg:py-14">
        {/* certificate details */}
        <div className="w-full  cert-body pt-8 lg:pt-16 flex flex-col lg:flex-row lg:gap-2">
          <div className="w-full formleft">
            <div>
              <Text
                className="per-info text-center textcolor"
                body="Fill the form below"
              />
              <form className="pt-0 lg:pt-4">
                <p className="lg:hidden pb-2 enroltxt textcolor text-center">
                  Once your enrollment is complete, you will receive an email
                  address with your admission package, receipts, welcome letter,
                  links to student community, course materials & login access to
                  your Student Learning Portal.
                </p>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    name="full_name"
                    value={formD.full_name}
                    onChange={handleForm}
                    required
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  />
                  <p className="text-red-600">{errMsgFn}</p>
                </div>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Email *</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formD.email}
                    onChange={handleForm}
                    required
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  />
                  <p className="text-xs font-['Gilroy-semibold'] pt-2" >{emailmsg}</p>
                  <p className="text-red-600">{errMsgE}</p>
                </div>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    name="phone_number"
                    value={formD.phone_number}
                    onChange={handleForm}
                    required
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  />
                  <p className="text-red-600">{errMsgPn}</p>
                </div>
                
                
                <div className="w-full flex flex-row gap-4 lg:gap-6">
                  <div className="w-full ad-input flex flex-col py-2 lg:py-3">
                    <label className="textdark pb-2">Country</label>
                    <select
                      placeholder="Enter your country"
                      name="country"
                      value={formD.country}
                      onChange={handleForm}
                      required
                      className="w-full border dp p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                    >
                      {country?.map((each) => {
                        if (each.states.length > 0) {
                          return (
                            <option key={each.iso3} value={each.name}>
                              {each.name}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>
                    <p className="text-red-600">{errMsgCt}</p>
                  </div>
                  <div className="w-full ad-input flex flex-col py-2 lg:py-3">
                    <label className="textdark pb-2">State</label>
                    <select
                      placeholder="Enter your state"
                      name="state"
                      value={formD.state}
                      onChange={handleForm}
                      required
                      className="w-full border dp p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                    >
                      {state?.map((eachS) => {
                        return (
                          <option className="w-full lg:pe-7" key={eachS.name}>
                            {eachS.name}
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-red-600">{errMsgS}</p>
                  </div>
                </div>

               

                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Course Of Interest</label>
                  <select
                    name="course"
                    value={formD.course}
                    onChange={handleForm}
                    required
                    className="w-full cursor-pointer flex items-center dp border p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  >
                    <option value="" className="dptext">
                      Select your course of interest
                    </option>
                    {digital.map(each=>{
                    return <option key={each.name} defaultValue={courseName}  value={each.name}>{each.name}</option>})}
                  </select>
                  <p className="text-red-600">{errMsgCo}</p>
                </div>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Cohort (Start Month)</label>
                  <select
                    placeholder="Select your Cohort"
                    name="cohort"
                    value={formD.cohort}
                    onChange={handleForm}
                    required
                    className="w-full cursor-pointer flex items-center dp border p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  >
                    <option value="">Select your Cohort</option>
                    {cohort?.map((each) => {
                      return (
                        <option key={each.name} defaultValue={courseName}  value={each.id && each.name}>{each.name}</option>
                      );
                    })}
                  </select>
                  <p className="text-red-600">{errMsgCh}</p>
                </div>
                <div className="ad-input flex flex-col py-0 lg:py-3">
                  <label className="textdark pb-2">Currency</label>
                  <div className="flex gap-8">
                    <div className="">
                      <label className="container text-base ten">
                        USD
                        <input
                          type="radio"
                          name="currency"
                          checked={formD.currency === "usd"}
                          value="usd"
                          onChange={handleForm}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="naira" ref={nairaref}>
                      <label className="container text-base ten">
                        NGN
                        <input
                          type="radio"
                          name="currency"
                          value="ngn"
                          checked={formD.currency === "ngn"}
                          onChange={handleForm}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="" ref={usdtref}>
                      <label className="container text-base ten">
                        USDT/USDC (Cryptocurrencies)
                        <input
                          type="radio"
                          name="currency"
                          value="usdt"
                          checked={formD.currency === "usdt"}
                          onChange={handleForm}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Referral Code</label>
                  <input
                    type="text"
                    value={referral ? referral : ""}
                    placeholder="GSHJSJK"
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                    disabled
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="std_policy"
                    checked={checked}
                    onChange={handleCheck}
                    className="cursor-pointer lg:w-5"
                  />
                  <label className="text-xs lg:text-base w-full">
                    By checking this box, you have read and agreed with Pluralcode&apos;s
                    <span className="seccolor">
                      <Link
                        to="https://pluralcode.academy/payment/terms.html"
                        target="_blank"
                      >
                        {" "}
                        student policy
                      </Link>
                    </span>
                    .
                  </label>
                </div>
                {
                  <p
                    className="text-xl lg:text-2xl pt-4 text-center"
                    style={{ color: "#f00" }}
                  >
                    {errMsg}
                  </p>
                }
                <div className="block lg:hidden w-full md:w-96 m-auto rounded-xl py-4">
                  <button
                    onClick={handleSubmit}
                    className="secbgcolor justify-center flex items-center w-full py-3 md:py-4 text-white rounded-xl"
                  >
                    <div id="spinn" className="spin animate-spin text-2xl mr-4">
                      <BiLoaderAlt />
                    </div>
                    Pay {eachFee.sign}{" "}
                    {numFor.format(isNaN(eachFee.amountDue) ? 0 : eachFee.amountDue)}{" "}
                    {eachFee.usd}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* right hand side */}
          <div className="hidden lg:block w-full mt-8 lg:mt-0 lg:w-9/12 lg:ps-10">
            <div className="formright">
              <Text
                className="textcolor text-2xl text-center pt-6 lg:pt-0"
                body="Disclaimer"
              />
              <Text
                className="reg text-center w-full md:w-96 m-auto pt-2 pb-6"
                body="Please ensure that the name provided on the form is what you want on your certificate."
              />
              <div className="">
                <Text className="courseD" body="Course details" />
                <div className="flex justify-between items-center pt-4 pb-4">
                  <div className="w-full textdark">
                    <Text
                      className="text-xl lg:text-2xl"
                      body={fee?.name}
                    />
                    <p className="lg:text-lg">
                      Cohort |{" "}
                      <span className="reg lg:text-lg">{formD.cohort}</span>
                    </p>
                  </div>
                  <div className="w-3/5 text-right boldIt lg:text-xl textdark">
                    {oldPrice.price && <p className="striketh text-lg">{eachFee.sign} {numFor.format(
                      isNaN(oldPrice.price) ? 0 : oldPrice.price
                    )} {eachFee.usd}</p>}
                    {eachFee.sign}{" "}
                    {numFor.format(
                      isNaN(eachFee.amountDue) ? 0 : eachFee?.amountDue
                    )}{" "}
                    {eachFee.usd}
                    {oldPrice.date && <p className="discount text-sm">Discount Ends {oldPrice.date}</p>}
                  </div>
                </div>
              

                <Text className="courseD " body="Summary" />
                <div className="summ lg:text-xl reg flex justify-between pt-2 pb-3 my-4">
                  <Text className="" body="Sub Total:" />
                  <p className="">
                    {eachFee.sign}{" "}
                    {numFor.format(
                      isNaN(eachFee.amountDue) ? 0 : eachFee.amountDue
                    )}{" "}
                    {eachFee.usd}
                  </p>
                </div>
                <div className="summ lg:text-xl reg flex justify-between pt-2 pb-3 my-4">
                  <Text className="" body="Transaction fee:" />
                  <p className="">
                    {eachFee.sign}{" "}
                    {numFor.format(
                      isNaN(eachFee.transaction) ? 0 : eachFee.transaction
                    )}{" "}
                    {eachFee.usd}
                  </p>
                </div>
                <div className="summ lg:text-xl flex justify-between pt-2 pb-3 my-4">
                  <Text className="" body="Total:" />
                  <p className="">
                    {eachFee.sign}{" "}
                    {isNaN(eachFee.amountDue) ? 0 : numFor.format(eachFee?.amountDue)}{" "}
                    {eachFee.usd}
                  </p>
                </div>
                <div className="w-full md:w-96 m-auto rounded-xl pt-4">
                  <button
                    onClick={handleSubmit}
                    className="secbgcolor justify-center flex gap-1 items-center w-full py-3 md:py-4 text-white rounded-xl"
                  >
                    <div
                      id="spinn2"
                      className="spin animate-spin text-2xl mr-3"
                    >
                      <BiLoaderAlt />
                    </div>
                    Pay {" "}{eachFee.sign}{" "}
                    {numFor.format(isNaN(eachFee.amountDue) ? 0 : eachFee.amountDue)}{" "}
                    {eachFee.usd}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAd;
