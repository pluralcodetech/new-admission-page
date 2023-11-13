import Images from "../atoms/Logo";
import adlogo from "../assets/images/Frame 427318748.png";
import Text from "../atoms/Text";
import { useRef } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types" 


const FormNav = ({
  amountdue,
  transaction,
  sign,
  usd,
  name,
  form,
  offset,
  deadline
  
}) => {
  const mob = useRef();

  const numFor = Intl.NumberFormat("en-US");
  useEffect(()=>{

      if (form.course !== ""){
          mob.current.style.display="block"
        }
    },[form.payment_plan,form.course,form.course_level])

  return (
    <div className="bgcolor sticky top-0 z-10 ">
      <div className="px-4 py-6 md:p-6 lg:px-16 lg:pt-6 lg:pb-4">
        <Images src={adlogo} className=" w-44 lg:w-56" />
      </div>
      
      <div className="mobile-summary lg:hidden px-4 py-2 md:p-6 lg:p-0" ref={mob}>
        <Text className="textcolor font-bold" body="Summary" />
        <div className="flex items-center pt-3 lg:hidden">
          <div className="w-full title">
            <p className=" font-semibold">
                {name}
            </p>
            <p>
              Course Fee:{" "}
              <span className="fee">
                {sign} {numFor.format(isNaN(amountdue) ? 0 : amountdue)} {usd}
              </span>
            </p>
          
            
            <p>
              Transaction Fee:{" "}
              <span className="fee">
                {sign} {numFor.format(isNaN(transaction) ? 0 : transaction)}{" "}
                {usd}
              </span>
            </p>
          </div>
          <div className="w-3/4">
            <div className="smalltot text-lg border-l-2 ">
              <Text className="ps-8" body="Total:" />
              <div className="ps-8">
              {offset && <p className="striketh text-sm">{sign} {numFor.format(
                      isNaN(offset) ? 0 : offset
                    )} {usd}</p>}
                {sign} {numFor.format(isNaN(amountdue) ? 0 : amountdue)} {usd}
                {deadline && <p className="discount text-sm">Discount Ends {deadline}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FormNav.propTypes={
  amountdue: PropTypes.any,
  subtotal: PropTypes.any,
  transaction: PropTypes.any,
  balance: PropTypes.any,
  total: PropTypes.any,
  sign: PropTypes.any,
  usd: PropTypes.any,
  name: PropTypes.any,
  form: PropTypes.any,
  offset: PropTypes.any,
  deadline: PropTypes.any
}

export default FormNav;
