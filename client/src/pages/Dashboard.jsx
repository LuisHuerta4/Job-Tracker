import Navbar from "../components/Navbar";
import Applications from "./Applications";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Applications />
      </main>
    </>
  );
};

export default Dashboard;