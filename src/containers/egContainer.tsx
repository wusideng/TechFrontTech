import { useEffect } from "react";
import { useAppDispatch } from "@/store";

const DemoContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

  return <div>DemoContainer</div>;
};

export default DemoContainer;
