import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CourseItemTHCS from "../CourseItemTHCS";
import { useJson } from "../../hooks/useJson";
import { useLazyJson } from "../../hooks/useLazyJson";
import ModalPortal from "../ModalPortal";
import { useState } from "react";
import useWindowWidth from "../../hooks/useWindow";

const COURSES_URL = `${import.meta.env.BASE_URL}data/thcs.json`;
const SCHEDULE_URL = `${import.meta.env.BASE_URL}schedules/thcs.json`;
const ZALO_LINK = "https://zalo.me/0369984849";

const CourseSliderTHPT = ({ items }) => {
  const {
    data: coursesData,
    loading: loadingCourses,
    error: errorCourses,
  } = useJson(COURSES_URL, { ttl: 120000 });
  const {
    data: scheduleData,
    loading: loadingSchedule,
    error: errorSchedule,
    load: loadSchedule,
  } = useLazyJson();
  const courses = coursesData?.dataTHCS ?? [];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const loading = loadingCourses || loadingSchedule;
  const error = errorCourses || errorSchedule;

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;

  function openCourse(course) {
    setSelectedCourse(course);
    if (!scheduleData) loadSchedule(SCHEDULE_URL).catch(() => {});
  }

  return (
    <>
      {/* Swiper chỉ show khi KHÔNG phải mobile */}
      {!isMobile && (
        <div className="productsSlider">
          <div className="container !w-full px-0 sm:px-0">
            <Swiper
              navigation
              modules={[Navigation]}
              className="mySwiper"
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 14 },
                480: { slidesPerView: 2, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 12 },
                768: { slidesPerView: 3, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 15 },
                1280: { slidesPerView: 4, spaceBetween: 28 },
                1536: { slidesPerView: items, spaceBetween: 28 },
              }}
            >
              {courses.map((c, idx) => (
                <SwiperSlide key={c.id ?? idx}>
                  <CourseItemTHCS
                    course={c}
                    onOpen={openCourse}
                    loading={loadingCourses}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Dạng wrap, chỉ show trên mobile */}
      {isMobile && (
        <div className="grid grid-cols-2 gap-3 px-2 overflow-hidden">
          {courses.map((c, idx) => (
            <div key={c.id ?? idx} className="">
              <CourseItemTHCS
                course={c}
                onOpen={openCourse}
                loading={loadingCourses}
              />
            </div>
          ))}
        </div>
      )}

      {/* Loading/Error */}
      {loading && (
        <div className="text-sm text-slate-600 mt-4">Đang tải dữ liệu...</div>
      )}
      {error && (
        <div className="text-sm text-red-600 mt-4">
          Lỗi khi tải dữ liệu: {error.message}
        </div>
      )}

      {/* Modal */}
      {selectedCourse && (
        <ModalPortal
          title={selectedCourse.title ?? "Chi tiết khóa"}
          schedule={scheduleData?.schedulesByCourse?.[selectedCourse.id] ?? []}
          loadingSchedule={loadingSchedule}
          onClose={() => setSelectedCourse(null)}
          ctaLink={ZALO_LINK}
        />
      )}
    </>
  );
};

export default CourseSliderTHPT;
