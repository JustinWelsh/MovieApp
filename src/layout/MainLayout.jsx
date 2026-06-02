import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="pt-16 min-h-[1011px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
