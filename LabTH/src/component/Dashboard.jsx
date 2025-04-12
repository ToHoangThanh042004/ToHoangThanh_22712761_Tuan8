import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Avatar from "../assets/Avatar 313.png";
import Avatar1 from "../assets/Avatar (1).png";
import Avatar2 from "../assets/Avatar (2).png";
import Avatar3 from "../assets/Avatar (3).png";
import Avatar4 from "../assets/Avatar (4).png";
import Avatar5 from "../assets/Avatar (5).png";
import create from "../assets/create.png";
// import search from "../assets/Search.png";
import group from "../assets/Group.png";
import code from "../assets/Code.png";
import bell from "../assets/Bell 1.png";
import forder from "../assets/Folder.png";
import groups from "../assets/Groups.png";
import logo from "../assets/Image 1858.png";
import pie from "../assets/Pie chart.png";
import chat from "../assets/Chat.png";
import square from "../assets/Squares four 1.png";
import question from "../assets/Question 1.png";

// Assets
import ShoppingCart from "../assets/Button 1509.png";
import DollarSign from "../assets/Button 1529.png";
import UserPlus from "../assets/Button 1530.png";
const images = {
            "Avatar 313.png" : Avatar,
            "Avatar (1).png"  : Avatar1,
            "Avatar (2).png" : Avatar2,
            "Avatar (3).png" : Avatar3,
            "Avatar (4).png" : Avatar4,
            "Avatar (5).png" : Avatar5,
        }
const iconMap = {
  cart: <img src={ShoppingCart} alt="Cart" className="w-6 h-6" />,
  dollar: <img src={DollarSign} alt="Dollar" className="w-6 h-6" />,
  user: <img src={UserPlus} alt="User" className="w-6 h-6" />,
};

// Overview Component
function Overview() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/overview")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="p-4">
      <img src={square} alt="" />
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => {
          let bgColor = "bg-white text-black";
          const title = item.title?.toLowerCase();
          if (title.includes("turnover")) bgColor = "bg-pink-500 text-white";
          else if (title.includes("profit")) bgColor = "bg-green-500 text-white";
          else if (title.includes("customer")) bgColor = "bg-blue-100 text-blue-900";

          return (
            <div key={item.id} className={`rounded-2xl p-4 shadow-sm border ${bgColor}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm">{item.title}</p>
                  <h3 className="text-2xl font-bold">
                    {item.unit}
                    {item.value.toLocaleString()}
                  </h3>
                  <p className="text-sm mt-1">{item.change}% period of change</p>
                </div>
                <div className="p-2 bg-white rounded-full">
                  {iconMap[item.icon?.toLowerCase()]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const baseClass = "px-4 py-2 text-left rounded-xl";
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [newUser, setNewUser] = useState({
    name: "",
    company: "",
    value: "",
    date: "",
    status: "New",
    avatar: "Avatar 313.png", 
  });
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 

  useEffect(() => {
    axios
      .get("http://localhost:3003/orders") // Đổi cổng thành 3003
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Tính toán dữ liệu hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Chuyển đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedOrder(null); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value, 
    }));
  };

  const handleSave = () => {
    if (selectedOrder) {
      axios
        .put(`http://localhost:3003/orders/${selectedOrder.id}`, selectedOrder) 
        .then((res) => {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === selectedOrder.id ? res.data : item
            )
          );
          closeModal(); 
          alert("Lưu thành công!"); 
        })
        .catch((err) => {
          console.error("Error updating order:", err);
          alert("Failed to update order. Please check the API endpoint or server.");
        });
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    axios
      .post("http://localhost:3003/orders", newUser) 
      .then((res) => {
        setData((prevData) => [...prevData, res.data]); 
        setIsAddModalOpen(false); 
        setNewUser({
          name: "",
          company: "",
          value: "",
          date: "",
          status: "New",
          avatar: "Avatar 313.png", 
        });
        alert("Thêm thành công!"); 
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        alert("Failed to add user. Please check the API endpoint or server.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-sm text-gray-700 grid grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="bg-white p-4 flex flex-col gap-4 shadow">
        <img src={logo} alt="Logo" />
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClass} flex items-center gap-3 ${
                isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"
              }`
            }
          >
            <img src={square} alt="Dashboard Icon" className="w-5 h-5" />
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${baseClass} flex items-center gap-3 ${
                isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"
              }`
            }
          >
            <img src={forder} alt="Projects Icon" className="w-5 h-5" />
            Projects
          </NavLink>
          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `${baseClass} flex items-center gap-3 ${
                isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"
              }`
            }
          >
            <img src={groups} alt="Teams Icon" className="w-5 h-5" />
            Teams
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${baseClass} flex items-center gap-3 ${
                isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"
              }`
            }
          >
            <img src={pie} alt="Analytics Icon" className="w-5 h-5" />
            Analytics
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `${baseClass} flex items-center gap-3 ${
                isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"
              }`
            }
          >
            <img src={chat} alt="Messages Icon" className="w-5 h-5" />
            Messages
          </NavLink>
          <NavLink
            to="/integrations"
            className={({ isActive }) =>
              `${baseClass} flex items-center gap-3 ${
                isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"
              }`
            }
          >
            <img src={code} alt="Integrations Icon" className="w-5 h-5" />
            Integrations
          </NavLink>
        </nav>
        <div className="mt-auto bg-indigo-100 p-3 rounded-xl text-center">
          <img src={group} alt="Group Icon"  />
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full">
            Try now
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-6 grid grid-rows-[auto_auto_1fr] gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-pink-600">Dashboard</h1>
          <div className="flex gap-4 items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAddModalOpen(true)} 
            >
              Add User
            </button>
            <input type="text" placeholder="Search..." className="border rounded-lg px-3 py-1" />
            <img src={bell} alt="" className="material-icons text-gray-600"/>
            <img src={question} alt="" className="material-icons text-gray-600"/>
            
            <img src={Avatar} alt="avatar" className="rounded-full w-8 h-8" />
          </div>
        </div>

        {/* Overview */}
        <Overview />

        {/* Report Table */}
        <section className="bg-white rounded-xl shadow p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-pink-600">Detailed report</h2>
            <div className="space-x-2">
              <button className="bg-pink-100 text-pink-600 px-3 py-1 rounded">Import</button>
              <button className="bg-pink-100 text-pink-600 px-3 py-1 rounded">Export</button>
            </div>
          </div>

          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="text-gray-600">
              <tr>
                <th></th>
                <th>Customer Name</th>
                <th>Company</th>
                <th>Order Value</th>
                <th>Order Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, idx) => (
                <tr key={idx} className="bg-white rounded-xl shadow">
                  <td><input type="checkbox" /></td>
                  <td className="flex items-center gap-2 font-medium">
                    <img src={images[row.avatar]} alt={row.name} className="w-8 h-8 rounded-full" />
                    {row.name}
                  </td>

                  <td>{row.company}</td>
                  <td>{row.value}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.status === "New" ? "text-blue-600 bg-blue-100"
                        : row.status === "In-progress" ? "text-yellow-600 bg-yellow-100"
                        : "text-green-600 bg-green-100"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <img
                      src={create}
                      alt="Edit"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleEditClick(row)} // Gọi hàm khi nhấn nút "Edit"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <p>{data.length} results</p>
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  className={`w-8 h-8 rounded-full ${
                    currentPage === index + 1
                      ? "bg-pink-500 text-white"
                      : "text-gray-500 hover:text-pink-600 border border-gray-300"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Edit User Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">Edit Order</h2>
              {selectedOrder && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={selectedOrder.name}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={selectedOrder.company}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Value</label>
                    <input
                      type="text"
                      name="value"
                      value={selectedOrder.value}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={selectedOrder.date}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                      name="status"
                      value={selectedOrder.status}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="New">New</option>
                      <option value="In-progress">In-progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Avatar</label>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.keys(images).map((avatar) => (
                        <img
                          key={avatar}
                          src={images[avatar]}
                          alt={avatar}
                          className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                            selectedOrder.avatar === avatar ? "border-blue-500" : "border-gray-300"
                          }`}
                          onClick={() =>
                            setSelectedOrder((prevOrder) => ({ ...prevOrder, avatar }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSave} // Gọi hàm handleSave khi nhấn "Save"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">Add User</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleAddInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={newUser.company}
                    onChange={handleAddInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Value</label>
                  <input
                    type="text"
                    name="value"
                    value={newUser.value}
                    onChange={handleAddInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newUser.date}
                    onChange={handleAddInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    value={newUser.status}
                    onChange={handleAddInputChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="New">New</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Avatar</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(images).map((avatar) => (
                      <img
                        key={avatar}
                        src={images[avatar]}
                        alt={avatar}
                        className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                          newUser.avatar === avatar ? "border-blue-500" : "border-gray-300"
                        }`}
                        onClick={() => setNewUser((prevUser) => ({ ...prevUser, avatar }))}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddUser} 
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
