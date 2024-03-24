//Hiện danh sách loại
const laydsloai = () => {
  return fetch("http://localhost:3000/loai")
    .then((res) => res.json())
    .then((d) => d);
};
const laydsdm = () => {
  return fetch(`http://localhost:3000/danh_muc`)
    .then((res) => res.json())
    .then((d) => d);
};
export { laydsdm, laydsloai };

//Thêm loại
export const themloai = (loai) => {
  let opt = {
    method: "POST",
    body: JSON.stringify(loai),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch("http://localhost:3000/loai", opt)
    .then((res) => res.json())
    .then((d) => d);
};

//Sửa loại
export const lay1loai = (id) => {
  return fetch(`http://localhost:3000/loai/${id}`)
    .then((res) => res.json())
    .then((d) => d);
};
export const sualoai = (id, loai) => {
  let opt = {
    method: "PUT",
    body: JSON.stringify(loai),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`http://localhost:3000/loai/${id}`, opt)
    .then((res) => res.json())
    .then((d) => d);
};

//Xóa loại
export const xoaloai = (id) => {
  return fetch(`http://localhost:3000/loai/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((d) => d);
};
