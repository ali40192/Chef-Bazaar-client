import { useSearchParams } from "react-router";

const success = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Payment Successful!</h1>
      <p className="text-center mt-4">Thank you for your purchase.</p>
      <p className="text-center mt-4">Your order number is: {session_id}</p>
    </div>
  );
};

export default success;
