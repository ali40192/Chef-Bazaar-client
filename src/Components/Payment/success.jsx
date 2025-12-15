import axios from "axios";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

const success = () => {
  const [trackingId, setTrackingId] = useState(null);
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    axios
      .patch(`http://localhost:3000/success-payment?session_id=${session_id}`, {
        session_id,
      })
      .then((res) => {
        console.log("Payment confirmed", {
          transectionId: res.data.transectionId,
          trackingId: res.data.trackingId,
        });
        setTrackingId(trackingId);
      })
      .catch((err) => {
        console.error("Error confirming payment", err);
      });
  }, [session_id]);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Payment Successful!</h1>
      <p className="text-center mt-4">Thank you for your purchase.</p>
      <p className="text-center mt-4">Your order number is: {session_id}</p>
    </div>
  );
};

export default success;
