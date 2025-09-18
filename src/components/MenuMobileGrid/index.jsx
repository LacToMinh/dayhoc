import { Link } from "react-router-dom";
import { MdSchool } from "react-icons/md";
import {
  FaUserGraduate,
  FaGlobeAmericas,
  FaUserTie,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStore,
  FaBoxOpen,
} from "react-icons/fa";
import useWindowWidth from "../../hooks/useWindow";

// const menu = [
//   {
//     label: "THCS",
//     id: "thcs",
//     icon: <MdSchool className="text-red-500" size={30} />,
//   },
//   {
//     label: "THPT",
//     id: "thpt",
//     icon: <FaUserGraduate className="text-green-500" size={28} />,
//   },
//   {
//     label: "IELTS-TOEIC",
//     id: "ielts-toeic",
//     icon: <FaGlobeAmericas className="text-orange-400" size={28} />,
//   },
//   {
//     label: "TUYỂN DỤNG",
//     id: "tuyendung",
//     icon: <FaUserTie className="text-pink-500" size={28} />,
//   },
//   {
//     label: "THỜI KHÓA BIỂU",
//     path: "/schedule",
//     icon: <FaCalendarAlt className="text-purple-500" size={28} />,
//   },
//   {
//     label: "CHI NHÁNH",
//     path: "/branch",
//     icon: <FaMapMarkerAlt className="text-emerald-500" size={28} />,
//   },
//   {
//     label: "CỬA HÀNG",
//     path: "/store",
//     icon: <FaStore className="text-yellow-500" size={28} />,
//   },
// ];

// Scroll tới id
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.location.hash = id;
}
``;

const menu = [
  {
    label: "THCS",
    id: "thcs",
    icon: <MdSchool size={30} className="text-red-400" />,
  },
  {
    label: "THPT",
    id: "thpt",
    icon: <FaUserGraduate size={28} className="text-green-500" />,
  },
  {
    label: "COMBO",
    id: "combo",
    icon: <FaBoxOpen size={28} className="text-pink-500" />,
  },
  {
    label: "IELTS-TOEIC",
    id: "ielts-toeic",
    icon: <FaGlobeAmericas size={28} className="text-yellow-500" />,
  },
  {
    label: "TUYỂN DỤNG",
    id: "tuyendung",
    icon: <FaUserTie size={28} className="text-pink-400" />,
  },
  {
    label: "THỜI KHÓA BIỂU",
    path: "/schedule",
    icon: <FaCalendarAlt size={28} className="text-yellow-500" />,
    bg: "yellow",
  },
  {
    label: "CHI NHÁNH",
    path: "/branches",
    icon: <FaMapMarkerAlt size={28} className="text-teal-500" />,
    bg: "yellow",
  },
  {
    label: "CỬA HÀNG",
    path: "/store",
    icon: <FaStore size={28} className="text-orange-400" />,
    bg: "yellow",
  },
];

// Thứ tự sắp xếp lại tùy bạn, trên chỉ để dễ code

const MenuMobileGrid = () => {
  const isMobile = useWindowWidth();
  if (!isMobile) return null;

  return (
    <div className="container grid grid-cols-4 sm:grid-cols-3 md:grid-cols-8 gap-3 md:gap-4 px-2 py-6">
      {menu.map((item, idx) => {
        // // Xác định nếu là box vàng
        // const isYellow = item.bg === "yellow";
        // const boxClass = isYellow
        //   ? "bg-[#FFF9DB] border-0"
        //   : "bg-white border border-slate-200";
        // const labelClass = isYellow
        //   ? "text-black font-bold"
        //   : "text-gray-700 font-bold";
        // // Link hoặc scroll
        if (item.path) {
          return (
            <Link
              key={idx}
              to={item.path}
              className={`rounded-md flex flex-col items-center justify-center p-0 min-h-[80px] shadow bg-[#FFF9DB] hover:brightness-105 transition-all duration-150`}
            >
              {item.icon}
              <div className={`mt-2 text-[8px] text-center text-black font-semibold`}>
                {item.label}
              </div>
            </Link>
          );
        }
        return (
          <button
            key={idx}
            onClick={() => scrollToId(item.id)}
            className={`rounded-md flex flex-col items-center justify-center p-0 min-h-[80px] shadow bg-[#FFF9DB] hover:brightness-105 transition-all duration-150`}
          >
            {item.icon}
            <div className={`mt-2 text-[8px] text-center text-black font-semibold`}>
              {item.label}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MenuMobileGrid;
