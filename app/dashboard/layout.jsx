import SideNav from "../../components/sideNav";

export default function Layout({ children }) {
  return (
      <div className="bg-blue-900 w-screen h-screen flex">
          <SideNav />
          <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
            {children}
          </div>
          
      </div>
  );
}
