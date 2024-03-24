//Hiện danh sách loại
const laydshoadon = () => {
  return fetch("http://localhost:3000/don_hang")
    .then((res) => res.json())
    .then((d) => d);
};
export { laydshoadon };

export const laydsdhct = (id_dh) => {
  return fetch(`http://localhost:3000/don_hang_chi_tiet?id_dh=${id_dh}`)
    .then((res) => res.json())
    .then((d) => d);
};

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

//Xóa đơn hàng
export const xoa_dh = (id) => {
  return fetch(`http://localhost:3000/don_hang/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((d) => d);
};

export const xoa_dhct = (id) => {
  return fetch(`http://localhost:3000/don_hang_chi_tiet/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((d) => d);
};
